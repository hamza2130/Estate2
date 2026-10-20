"use client";

import { useEffect, useRef, useState } from "react";

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#152d4d"/><stop offset="1" stop-color="#0a1729"/></linearGradient></defs><rect width="800" height="500" fill="url(#g)"/><path d="M300 300 L400 210 L500 300 V360 H300Z" fill="none" stroke="#c49a35" stroke-width="10" stroke-linejoin="round"/><rect x="380" y="310" width="40" height="50" fill="#c49a35"/></svg>`
  );

export default function Img({ src, alt, className }: { src?: string | null; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // An image can fail before React hydrates and attaches onError, so check once on mount.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0 && src) setFailed(true);
  }, [src]);

  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={!src || failed ? FALLBACK : src} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />;
}
