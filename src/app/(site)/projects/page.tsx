import Link from "next/link";
import Img from "@/components/Img";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" }, include: { _count: { select: { properties: true } } } });
  return (
    <>
      <section className="bg-navy-900 py-12">
        <div className="container-x">
          <p className="eyebrow text-gold-300">Projects</p>
          <h1 className="mt-2 text-4xl font-bold text-white">Communities we specialise in</h1>
        </div>
      </section>
      <section className="container-x grid gap-8 py-12 md:grid-cols-2">
        {projects.map((p) => (
          <Link key={p.id} href={`/projects/${p.slug}`} className="card group overflow-hidden">
            <div className="aspect-[16/9] overflow-hidden bg-navy-800">
              <Img src={p.image} alt={p.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">{p.location} · {p._count.properties} listings</p>
              <h2 className="mt-2 text-2xl font-bold">{p.name}</h2>
              <p className="mt-2 text-slate-600">{p.tagline}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
