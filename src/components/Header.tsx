"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/projects", label: "Projects" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ name, tagline, phone }: { name: string; tagline: string; phone: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="hidden bg-navy-900 text-xs text-navy-100 md:block">
        <div className="container-x flex h-9 items-center justify-between">
          <span>DHA Islamabad-Rawalpindi &amp; Bahria Town property advisors</span>
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="font-semibold text-gold-300">Call {phone}</a>
        </div>
      </div>
      <div className="container-x flex items-center justify-between py-3">
        <Link href="/" onClick={() => setOpen(false)}>
          <Logo name={name} tagline={tagline} />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={`text-sm font-medium transition hover:text-gold-600 ${active(n.href) ? "text-gold-600" : "text-navy-800"}`}>
              {n.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-gold">Book a site visit</Link>
        </nav>
        <button className="rounded-md border border-slate-300 p-2 lg:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} /></svg>
        </button>
      </div>
      {open && (
        <nav className="border-t border-slate-200 bg-white lg:hidden">
          <div className="container-x flex flex-col py-2">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className={`py-3 text-sm font-medium ${active(n.href) ? "text-gold-600" : "text-navy-800"}`}>
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
