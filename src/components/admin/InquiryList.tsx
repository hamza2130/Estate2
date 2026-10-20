"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatDate } from "@/lib/format";

type Row = {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  interest: string;
  status: string;
  createdAt: string;
  property: { title: string; slug: string } | null;
};

const STATUS_STYLE: Record<string, string> = {
  New: "bg-gold-100 text-gold-600",
  Contacted: "bg-blue-100 text-blue-700",
  Closed: "bg-slate-200 text-slate-600",
};

export default function InquiryList({ rows }: { rows: Row[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState("All");
  const shown = rows.filter((r) => filter === "All" || r.status === filter);

  async function setStatus(id: string, status: string) {
    await fetch(`/api/admin/inquiries/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    router.refresh();
  }
  async function remove(id: string) {
    if (!confirm("Delete this inquiry?")) return;
    await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="mt-6">
      <div className="flex gap-2">
        {["All", "New", "Contacted", "Closed"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full px-3 py-1 text-sm font-semibold ${filter === s ? "bg-navy-800 text-white" : "bg-white text-slate-600"}`}>
            {s}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        {shown.length === 0 && <div className="card p-10 text-center text-slate-500">No inquiries.</div>}
        {shown.map((r) => (
          <div key={r.id} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-navy-900">{r.name} <span className={`ml-2 rounded px-2 py-0.5 text-xs ${STATUS_STYLE[r.status]}`}>{r.status}</span></p>
                <p className="mt-1 text-sm text-slate-600">
                  <a href={`tel:${r.phone}`} className="hover:underline">{r.phone}</a>
                  {r.email && <> · <a href={`mailto:${r.email}`} className="hover:underline">{r.email}</a></>}
                  {" · "}{formatDate(r.createdAt)}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {r.property ? <>Property: <a href={`/properties/${r.property.slug}`} target="_blank" className="font-medium text-gold-600 hover:underline">{r.property.title}</a></> : r.interest}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select value={r.status} onChange={(e) => setStatus(r.id, e.target.value)} className="input w-auto">
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Closed</option>
                </select>
                <button onClick={() => remove(r.id)} className="text-sm font-semibold text-red-600">Delete</button>
              </div>
            </div>
            <p className="mt-3 whitespace-pre-line rounded-md bg-slate-50 p-3 text-sm text-slate-700">{r.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
