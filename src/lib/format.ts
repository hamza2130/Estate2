export function formatPrice(value: number, purpose = "Sale") {
  const suffix = purpose === "Rent" ? " / month" : "";
  if (value >= 10_000_000) return `PKR ${trim(value / 10_000_000)} Crore${suffix}`;
  if (value >= 100_000) return `PKR ${trim(value / 100_000)} Lakh${suffix}`;
  return `PKR ${value.toLocaleString("en-PK")}${suffix}`;
}

function trim(n: number) {
  return Number(n.toFixed(2)).toString();
}

export function formatArea(value: number, unit: string) {
  return `${Number(value.toFixed(2))} ${unit}`;
}

export function parseList(json: string | null | undefined): string[] {
  try {
    const v = JSON.parse(json || "[]");
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
