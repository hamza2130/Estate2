"use client";

import { useState } from "react";
import Img from "./Img";

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [i, setI] = useState(0);
  const list = images.length ? images : [""];
  return (
    <div>
      <div className="aspect-[16/10] overflow-hidden rounded-xl bg-navy-800">
        <Img key={list[i]} src={list[i]} alt={title} className="h-full w-full object-cover" />
      </div>
      {list.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {list.map((src, n) => (
            <button key={src + n} onClick={() => setI(n)} className={`aspect-square overflow-hidden rounded-md border-2 ${n === i ? "border-gold-500" : "border-transparent opacity-70 hover:opacity-100"}`}>
              <Img src={src} alt={`${title} photo ${n + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
