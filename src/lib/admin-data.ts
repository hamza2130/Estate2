import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
import { RESOURCES, type Resource } from "./resources";
import { slugify } from "./format";

export function getResource(key: string): Resource | null {
  return RESOURCES[key] ?? null;
}

// Prisma delegates share the same method shapes; this keeps the generic handlers simple.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function delegate(r: Resource): any {
  return (prisma as unknown as Record<string, unknown>)[r.model];
}

/** Turns a submitted form body into a Prisma data object, validating required fields. */
export async function toData(r: Resource, body: Record<string, unknown>, id?: string) {
  const data: Record<string, unknown> = {};
  const errors: string[] = [];

  for (const f of r.fields) {
    const v = body[f.name];
    switch (f.type) {
      case "number": {
        const n = v === "" || v == null ? 0 : Number(v);
        if (Number.isNaN(n)) errors.push(`${f.label} must be a number`);
        if (f.required && (v === "" || v == null)) errors.push(`${f.label} is required`);
        data[f.name] = f.name === "price" || f.name === "areaValue" ? n : Math.round(n);
        break;
      }
      case "checkbox":
        data[f.name] = v === true || v === "true" || v === "on";
        break;
      case "list":
      case "images": {
        const arr = Array.isArray(v) ? v : typeof v === "string" ? v.split("\n") : [];
        data[f.name] = JSON.stringify(arr.map((x) => String(x).trim()).filter(Boolean));
        break;
      }
      case "project":
        data[f.name] = typeof v === "string" && v ? v : null;
        break;
      default: {
        const s = typeof v === "string" ? v.trim() : "";
        if (f.required && !s) errors.push(`${f.label} is required`);
        if (f.options && s && !f.options.includes(s)) errors.push(`${f.label} must be one of ${f.options.join(", ")}`);
        data[f.name] = f.options && !s ? f.options[0] : s;
      }
    }
  }

  if (r.slugFrom) {
    const base = slugify(String(data.slug || data[r.slugFrom] || "")) || "item";
    let slug = base;
    for (let i = 2; ; i++) {
      const clash = await delegate(r).findFirst({ where: { slug, ...(id ? { NOT: { id } } : {}) }, select: { id: true } });
      if (!clash) break;
      slug = `${base}-${i}`;
    }
    data.slug = slug;
  }
  if (r.key === "properties" && !data.city) data.city = "Islamabad";

  return { data, errors };
}

export function errorResponse(e: unknown) {
  if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  console.error(e);
  return Response.json({ error: "Server error" }, { status: 500 });
}
