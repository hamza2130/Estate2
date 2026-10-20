"use client";

import { useState } from "react";
import Img from "../Img";

export default function ImageField({ value, onChange, multiple }: { value: string[]; onChange: (v: string[]) => void; multiple: boolean }) {
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function add(u: string) {
    if (!u) return;
    onChange(multiple ? [...value, u] : [u]);
  }

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setError("");
    const added: string[] = [];
    for (const file of Array.from(multiple ? files : [files[0]])) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.ok) added.push(data.url);
      else setError(data.error || "Upload failed");
    }
    onChange(multiple ? [...value, ...added] : added.slice(-1).length ? added.slice(-1) : value);
    setUploading(false);
  }

  function move(i: number, dir: -1 | 1) {
    const next = [...value];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div>
      {value.length > 0 && (
        <div className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {value.map((src, i) => (
            <div key={src + i} className="group relative aspect-[4/3] overflow-hidden rounded-md border border-slate-200 bg-slate-100">
              <Img src={src} alt="" className="h-full w-full object-cover" />
              {multiple && i === 0 && <span className="absolute left-1 top-1 rounded bg-gold-500 px-1.5 text-[10px] font-bold text-navy-900">COVER</span>}
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-navy-900/80 p-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
                {multiple ? (
                  <span className="flex gap-2"><button type="button" onClick={() => move(i, -1)}>←</button><button type="button" onClick={() => move(i, 1)}>→</button></span>
                ) : <span />}
                <button type="button" onClick={() => onChange(value.filter((_, n) => n !== i))} className="text-red-300">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <label className="btn-outline cursor-pointer">
          {uploading ? "Uploading..." : "Upload image"}
          <input type="file" accept="image/*" multiple={multiple} className="hidden" onChange={(e) => { upload(e.target.files); e.target.value = ""; }} />
        </label>
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="...or paste an image URL" className="input max-w-sm flex-1" />
        <button type="button" className="btn-outline" onClick={() => { add(url.trim()); setUrl(""); }}>Add URL</button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
