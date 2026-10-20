"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LONG = ["heroSubtitle", "aboutText"];

export default function SettingsForm({ fields, initial }: { fields: { key: string; label: string }[]; initial: Record<string, string> }) {
  const router = useRouter();
  const [values, setValues] = useState(initial);
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("saving");
    const res = await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
    setState(res.ok ? "saved" : "error");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card mt-6 grid gap-5 p-6 md:grid-cols-2">
      {fields.map((f) => (
        <div key={f.key} className={LONG.includes(f.key) || f.key === "heroTitle" || f.key === "heroImage" ? "md:col-span-2" : ""}>
          <label className="label">{f.label}</label>
          {LONG.includes(f.key) ? (
            <textarea rows={4} value={values[f.key]} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} className="input" />
          ) : (
            <input value={values[f.key]} onChange={(e) => setValues({ ...values, [f.key]: e.target.value })} className="input" />
          )}
        </div>
      ))}
      <div className="flex items-center gap-3 md:col-span-2">
        <button className="btn-navy" disabled={state === "saving"}>{state === "saving" ? "Saving..." : "Save settings"}</button>
        {state === "saved" && <span className="text-sm text-green-700">Saved. Changes are live on the site.</span>}
        {state === "error" && <span className="text-sm text-red-600">Save failed.</span>}
      </div>
    </form>
  );
}
