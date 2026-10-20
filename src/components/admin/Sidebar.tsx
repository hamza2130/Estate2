"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/properties", label: "Properties" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/guides", label: "Guides" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/settings", label: "Site settings" },
];

export default function Sidebar({ user, newInquiries }: { user: string; newInquiries: number }) {
  const pathname = usePathname();
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }
  return (
    <aside className="flex flex-col bg-navy-900 text-navy-100 md:fixed md:inset-y-0 md:w-60">
      <div className="p-5"><Logo name="Autostack AI" tagline="Admin" light /></div>
      <nav className="flex gap-1 overflow-x-auto px-3 md:flex-1 md:flex-col">
        {LINKS.map((l) => {
          const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
          return (
            <Link key={l.href} href={l.href} className={`flex items-center justify-between whitespace-nowrap rounded-md px-3 py-2 text-sm ${active ? "bg-navy-700 font-semibold text-white" : "hover:bg-navy-800"}`}>
              {l.label}
              {l.href === "/admin/inquiries" && newInquiries > 0 && <span className="ml-2 rounded-full bg-gold-500 px-2 text-xs font-bold text-navy-900">{newInquiries}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="hidden border-t border-navy-700 p-4 text-sm md:block">
        <p className="truncate text-navy-200">{user}</p>
        <div className="mt-2 flex gap-3">
          <a href="/" target="_blank" className="text-gold-300 hover:underline">View site</a>
          <button onClick={logout} className="text-navy-200 hover:text-white">Log out</button>
        </div>
      </div>
    </aside>
  );
}
