"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Row = { id: string; href?: string; cells: string[] };

export default function ResourceTable({ resource, columns, rows }: { resource: string; columns: string[]; rows: Row[] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const filtered = useMemo(() => rows.filter((r) => r.cells.join(" ").toLowerCase().includes(q.toLowerCase())), [rows, q]);

  async function remove(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setBusy(id);
    const res = await fetch(`/api/admin/${resource}/${id}`, { method: "DELETE" });
    setBusy(null);
    if (!res.ok) alert("Delete failed");
    router.refresh();
  }

  return (
    <div className="card mt-6 overflow-hidden">
      <div className="border-b border-slate-200 p-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="input max-w-xs" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {columns.map((c) => <th key={c} className="px-4 py-3 font-semibold">{c}</th>)}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50">
                {r.cells.map((c, i) => (
                  <td key={i} className={`px-4 py-3 ${i === 0 ? "font-semibold text-navy-900" : "text-slate-600"}`}>
                    {i === 0 ? <Link href={`/admin/${resource}/${r.id}`} className="hover:text-gold-600">{c}</Link> : c}
                  </td>
                ))}
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  {r.href && <a href={r.href} target="_blank" className="mr-3 text-slate-500 hover:text-navy-800">View</a>}
                  <Link href={`/admin/${resource}/${r.id}`} className="mr-3 font-semibold text-navy-800 hover:text-gold-600">Edit</Link>
                  <button onClick={() => remove(r.id, r.cells[0])} disabled={busy === r.id} className="font-semibold text-red-600 hover:text-red-700">
                    {busy === r.id ? "..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="px-4 py-10 text-center text-slate-500">Nothing here yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
