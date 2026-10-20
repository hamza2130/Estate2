import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SETTING_FIELDS, getSettings } from "@/lib/settings";

export async function GET() {
  return NextResponse.json(await getSettings());
}

export async function PUT(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const writes = SETTING_FIELDS.filter((f) => typeof body[f.key] === "string").map((f) =>
    prisma.setting.upsert({
      where: { key: f.key },
      update: { value: String(body[f.key]).trim() },
      create: { key: f.key, value: String(body[f.key]).trim() },
    })
  );
  await prisma.$transaction(writes);
  return NextResponse.json(await getSettings());
}
