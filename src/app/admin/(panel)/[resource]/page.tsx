import Link from "next/link";
import { notFound } from "next/navigation";
import ResourceTable from "@/components/admin/ResourceTable";
import { delegate, getResource } from "@/lib/admin-data";
import { formatPrice } from "@/lib/format";

export default async function ResourceList({ params }: { params: Promise<{ resource: string }> }) {
  const r = getResource((await params).resource);
  if (!r) notFound();
  const rows: Record<string, unknown>[] = await delegate(r).findMany({ orderBy: { createdAt: "desc" } });
  const display = rows.map((row) => ({
    id: String(row.id),
    href: r.publicPath?.(row),
    cells: r.columns.map((c) => {
      const v = row[c.name];
      if (c.name === "price") return formatPrice(Number(v), String(row.purpose));
      if (typeof v === "boolean") return v ? "Yes" : "No";
      return String(v ?? "");
    }),
  }));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-sans text-2xl font-bold">{r.label} <span className="text-base font-normal text-slate-500">({rows.length})</span></h1>
        <Link href={`/admin/${r.key}/new`} className="btn-gold">+ Add {r.singular.toLowerCase()}</Link>
      </div>
      <ResourceTable resource={r.key} columns={r.columns.map((c) => c.label)} rows={display} />
    </div>
  );
}
