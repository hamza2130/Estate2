"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageField from "./ImageField";
import { RESOURCES, type Field } from "@/lib/resources";
import { parseList } from "@/lib/format";

type Values = Record<string, unknown>;

function initialValue(f: Field, initial?: Values): unknown {
  const v = initial?.[f.name];
  if (f.type === "list" || f.type === "images") return parseList(typeof v === "string" ? v : "[]");
  if (f.type === "image") return v ? [String(v)] : [];
  if (f.type === "checkbox") return v ?? (initial ? false : ["featured", "verified", "published"].includes(f.name));
  if (f.type === "number") return v ?? "";
  if (f.name === "city") return v ?? "Islamabad";
  return v ?? (f.options ? f.options[0] : "");
}

export default function ResourceForm({ resourceKey, initial, projects }: { resourceKey: string; initial?: Values; projects: { id: string; name: string }[] }) {
  const r = RESOURCES[resourceKey];
  const router = useRouter();
  const [values, setValues] = useState<Values>(() => Object.fromEntries(r.fields.map((f) => [f.name, initialValue(f, initial)])));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const set = (name: string, v: unknown) => setValues((s) => ({ ...s, [name]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const body = Object.fromEntries(
      r.fields.map((f) => [f.name, f.type === "image" ? ((values[f.name] as string[])[0] ?? "") : values[f.name]])
    );
    const res = await fetch(initial ? `/api/admin/${r.key}/${initial.id}` : `/api/admin/${r.key}`, {
      method: initial ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      router.push(`/admin/${r.key}`);
      router.refresh();
    } else {
      setError((await res.json().catch(() => ({}))).error || "Save failed");
      setSaving(false);
    }
  }

  function input(f: Field) {
    const v = values[f.name];
    switch (f.type) {
      case "textarea":
        return <textarea rows={f.name === "content" ? 14 : 5} value={String(v)} onChange={(e) => set(f.name, e.target.value)} className="input" required={f.required} />;
      case "number":
        return <input type="number" step="any" value={String(v)} onChange={(e) => set(f.name, e.target.value)} className="input" required={f.required} />;
      case "select":
        return (
          <select value={String(v)} onChange={(e) => set(f.name, e.target.value)} className="input">
            {f.options!.map((o) => <option key={o}>{o}</option>)}
          </select>
        );
      case "project":
        return (
          <select value={String(v ?? "")} onChange={(e) => set(f.name, e.target.value)} className="input">
            <option value="">No project</option>
            {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        );
      case "checkbox":
        return (
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={Boolean(v)} onChange={(e) => set(f.name, e.target.checked)} className="h-4 w-4 accent-gold-500" />
            {f.label}
          </label>
        );
      case "list":
        return <textarea rows={4} value={(v as string[]).join("\n")} onChange={(e) => set(f.name, e.target.value.split("\n"))} className="input" />;
      case "images":
      case "image":
        return <ImageField value={v as string[]} onChange={(next) => set(f.name, next)} multiple={f.type === "images"} />;
      default:
        return <input value={String(v)} onChange={(e) => set(f.name, e.target.value)} className="input" required={f.required} />;
    }
  }

  return (
    <form onSubmit={onSubmit} className="card mt-6 p-6">
      <div className="grid gap-5 md:grid-cols-2">
        {r.fields.map((f) => (
          <div key={f.name} className={f.half ? "" : "md:col-span-2"}>
            {f.type !== "checkbox" && <label className="label">{f.label}{f.required && " *"}</label>}
            {input(f)}
            {f.help && <p className="mt-1 text-xs text-slate-500">{f.help}</p>}
          </div>
        ))}
      </div>
      {error && <p className="mt-5 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="mt-6 flex gap-3 border-t border-slate-100 pt-5">
        <button className="btn-navy" disabled={saving}>{saving ? "Saving..." : initial ? "Save changes" : `Create ${r.singular.toLowerCase()}`}</button>
        <button type="button" className="btn-outline" onClick={() => router.push(`/admin/${r.key}`)}>Cancel</button>
      </div>
    </form>
  );
}
