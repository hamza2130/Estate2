import { notFound } from "next/navigation";
import Img from "@/components/Img";
import PropertyCard from "@/components/PropertyCard";
import InquiryForm from "@/components/InquiryForm";
import { prisma } from "@/lib/prisma";
import { parseList } from "@/lib/format";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = await prisma.project.findUnique({ where: { slug: (await params).slug }, select: { name: true } });
  return { title: p?.name ?? "Project" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = await prisma.project.findUnique({
    where: { slug: (await params).slug },
    include: { properties: { orderBy: { createdAt: "desc" } } },
  });
  if (!project) notFound();
  const highlights = parseList(project.highlights);

  return (
    <>
      <section className="relative overflow-hidden bg-navy-900">
        <Img src={project.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 to-navy-900/40" />
        <div className="container-x relative py-20">
          <p className="eyebrow text-gold-300">{project.location}</p>
          <h1 className="mt-2 text-4xl font-bold text-white md:text-5xl">{project.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-navy-100">{project.tagline}</p>
        </div>
      </section>
      <section className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_360px]">
        <div>
          <h2 className="text-2xl font-bold">About the project</h2>
          <p className="mt-3 leading-7 text-slate-700">{project.description}</p>
          {highlights.length > 0 && (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h} className="card flex items-center gap-3 p-4 text-sm font-medium"><span className="text-gold-500">◆</span>{h}</li>
              ))}
            </ul>
          )}
          <h2 className="mt-12 text-2xl font-bold">Available in {project.name}</h2>
          {project.properties.length === 0 ? (
            <p className="mt-3 text-slate-600">No listings right now. Send us an inquiry and we will share off-market options.</p>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {project.properties.map((p) => <PropertyCard key={p.id} p={p} />)}
            </div>
          )}
        </div>
        <aside>
          <div className="card sticky top-28 p-6">
            <h3 className="font-sans text-lg font-semibold">Ask about {project.name}</h3>
            <p className="mt-1 mb-4 text-sm text-slate-600">Latest prices, availability and a guided visit.</p>
            <InquiryForm interest={`Project: ${project.name}`} compact />
          </div>
        </aside>
      </section>
    </>
  );
}
