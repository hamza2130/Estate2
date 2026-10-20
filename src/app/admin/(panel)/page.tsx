import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, formatPrice } from "@/lib/format";

export default async function Dashboard() {
  const [total, available, sold, projects, guides, newInq, recentInq, recentProps] = await Promise.all([
    prisma.property.count(),
    prisma.property.count({ where: { status: "Available" } }),
    prisma.property.count({ where: { status: "Sold" } }),
    prisma.project.count(),
    prisma.guide.count(),
    prisma.inquiry.count({ where: { status: "New" } }),
    prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5, include: { property: { select: { title: true } } } }),
    prisma.property.findMany({ orderBy: { updatedAt: "desc" }, take: 5 }),
  ]);
  const stats = [
    ["Total listings", total, "/admin/properties"],
    ["Available", available, "/admin/properties"],
    ["Sold", sold, "/admin/properties"],
    ["Projects", projects, "/admin/projects"],
    ["Guides", guides, "/admin/guides"],
    ["New inquiries", newInq, "/admin/inquiries"],
  ] as const;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-sans text-2xl font-bold">Dashboard</h1>
        <Link href="/admin/properties/new" className="btn-gold">+ Add property</Link>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {stats.map(([l, n, href]) => (
          <Link key={l} href={href} className="card p-4 hover:border-gold-400">
            <p className="text-xs uppercase tracking-wide text-slate-500">{l}</p>
            <p className="mt-1 text-3xl font-bold text-navy-900">{n}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section className="card p-5">
          <div className="flex items-center justify-between"><h2 className="font-sans text-lg font-semibold">Latest inquiries</h2><Link href="/admin/inquiries" className="text-sm text-gold-600">All →</Link></div>
          <ul className="mt-3 divide-y divide-slate-100">
            {recentInq.length === 0 && <li className="py-3 text-sm text-slate-500">No inquiries yet.</li>}
            {recentInq.map((i) => (
              <li key={i.id} className="py-3 text-sm">
                <div className="flex justify-between"><span className="font-semibold">{i.name}</span><span className="text-slate-500">{formatDate(i.createdAt)}</span></div>
                <p className="text-slate-600">{i.property?.title ?? i.interest} · {i.phone}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="card p-5">
          <div className="flex items-center justify-between"><h2 className="font-sans text-lg font-semibold">Recently updated listings</h2><Link href="/admin/properties" className="text-sm text-gold-600">All →</Link></div>
          <ul className="mt-3 divide-y divide-slate-100">
            {recentProps.map((p) => (
              <li key={p.id} className="flex justify-between gap-3 py-3 text-sm">
                <Link href={`/admin/properties/${p.id}`} className="font-semibold hover:text-gold-600">{p.title}</Link>
                <span className="whitespace-nowrap text-slate-500">{formatPrice(p.price, p.purpose)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
