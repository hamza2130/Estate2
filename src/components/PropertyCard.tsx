import Link from "next/link";
import Img from "./Img";
import { formatArea, formatPrice, parseList } from "@/lib/format";

export type CardProperty = {
  slug: string;
  title: string;
  purpose: string;
  type: string;
  status: string;
  price: number;
  areaValue: number;
  areaUnit: string;
  beds: number;
  baths: number;
  location: string;
  images: string;
  verified: boolean;
};

export default function PropertyCard({ p }: { p: CardProperty }) {
  const cover = parseList(p.images)[0];
  return (
    <Link href={`/properties/${p.slug}`} className="card group overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-800">
        <Img src={cover} alt={p.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded bg-navy-900/85 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">For {p.purpose}</span>
          {p.status !== "Available" && <span className="rounded bg-red-600 px-2 py-1 text-[11px] font-semibold uppercase text-white">{p.status}</span>}
        </div>
        {p.verified && (
          <span className="absolute right-3 top-3 rounded bg-gold-500 px-2 py-1 text-[11px] font-semibold text-navy-900">✓ Verified</span>
        )}
      </div>
      <div className="p-4">
        <p className="text-lg font-bold text-navy-900">{formatPrice(p.price, p.purpose)}</p>
        <h3 className="mt-1 line-clamp-1 font-sans text-base font-semibold text-slate-800">{p.title}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-slate-500">{p.location}</p>
        <div className="mt-3 flex gap-4 border-t border-slate-100 pt-3 text-xs font-medium text-slate-600">
          <span>{p.type}</span>
          <span>{formatArea(p.areaValue, p.areaUnit)}</span>
          {p.beds > 0 && <span>{p.beds} Beds</span>}
          {p.baths > 0 && <span>{p.baths} Baths</span>}
        </div>
      </div>
    </Link>
  );
}
