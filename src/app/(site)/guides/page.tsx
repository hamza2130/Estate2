import Link from "next/link";
import Img from "@/components/Img";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";

export const metadata = { title: "Guides" };

export default async function GuidesPage() {
  const guides = await prisma.guide.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
  return (
    <>
      <section className="bg-navy-900 py-12">
        <div className="container-x">
          <p className="eyebrow text-gold-300">Guides</p>
          <h1 className="mt-2 text-4xl font-bold text-white">Buying guides and market notes</h1>
        </div>
      </section>
      <section className="container-x grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => (
          <Link key={g.id} href={`/guides/${g.slug}`} className="card group overflow-hidden">
            <div className="aspect-[16/9] overflow-hidden bg-navy-800">
              <Img src={g.coverImage} alt={g.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">{g.category} · {formatDate(g.createdAt)}</p>
              <h2 className="mt-2 font-sans text-lg font-semibold">{g.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{g.excerpt}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
