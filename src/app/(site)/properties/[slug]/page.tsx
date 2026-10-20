import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import InquiryForm from "@/components/InquiryForm";
import PropertyCard from "@/components/PropertyCard";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { formatArea, formatPrice, parseList } from "@/lib/format";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = await prisma.property.findUnique({ where: { slug: (await params).slug }, select: { title: true } });
  return { title: p?.title ?? "Property" };
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await prisma.property.findUnique({ where: { slug }, include: { project: true } });
  if (!p) notFound();
  const [s, similar] = await Promise.all([
    getSettings(),
    prisma.property.findMany({ where: { id: { not: p.id }, OR: [{ projectId: p.projectId ?? undefined }, { type: p.type }] }, take: 3, orderBy: { createdAt: "desc" } }),
  ]);
  const features = parseList(p.features);
  const facts = [
    ["Price", formatPrice(p.price, p.purpose)],
    ["Purpose", `For ${p.purpose}`],
    ["Type", p.type],
    ["Area", formatArea(p.areaValue, p.areaUnit)],
    ...(p.beds ? [["Bedrooms", String(p.beds)]] : []),
    ...(p.baths ? [["Bathrooms", String(p.baths)]] : []),
    ["Location", p.location],
    ["City", p.city],
    ["Status", p.status],
  ];
  const waText = encodeURIComponent(`Hi, I'm interested in "${p.title}" (${formatPrice(p.price, p.purpose)}).`);

  return (
    <div className="container-x py-10">
      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/" className="hover:text-navy-800">Home</Link> / <Link href="/properties" className="hover:text-navy-800">Properties</Link>
        {p.project && <> / <Link href={`/projects/${p.project.slug}`} className="hover:text-navy-800">{p.project.name}</Link></>}
      </nav>
      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <Gallery images={parseList(p.images)} title={p.title} />
          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded bg-navy-100 px-2 py-1 text-xs font-semibold text-navy-800">For {p.purpose}</span>
                <span className="rounded bg-navy-100 px-2 py-1 text-xs font-semibold text-navy-800">{p.type}</span>
                {p.verified && <span className="rounded bg-gold-100 px-2 py-1 text-xs font-semibold text-gold-600">✓ Title verified</span>}
                {p.status !== "Available" && <span className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">{p.status}</span>}
              </div>
              <h1 className="mt-3 text-3xl font-bold md:text-4xl">{p.title}</h1>
              <p className="mt-2 text-slate-600">{p.location}, {p.city}</p>
            </div>
            <p className="text-3xl font-bold text-gold-600">{formatPrice(p.price, p.purpose)}</p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-3">
            {facts.map(([k, v]) => (
              <div key={k} className="bg-white p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">{k}</p>
                <p className="mt-1 font-semibold text-navy-900">{v}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-bold">Description</h2>
          <p className="mt-3 whitespace-pre-line leading-7 text-slate-700">{p.description}</p>

          {features.length > 0 && (
            <>
              <h2 className="mt-10 text-2xl font-bold">Features</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-slate-700"><span className="text-gold-500">✓</span>{f}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        <aside className="space-y-4">
          <div className="card sticky top-28 p-6">
            <h3 className="font-sans text-lg font-semibold">Interested in this property?</h3>
            <p className="mt-1 text-sm text-slate-600">Send an inquiry or book a guided visit.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="btn-navy">Call</a>
              <a href={`https://wa.me/${s.whatsapp.replace(/\D/g, "")}?text=${waText}`} target="_blank" rel="noreferrer" className="btn bg-[#25D366] text-white hover:opacity-90">WhatsApp</a>
            </div>
            <div className="mt-5 border-t border-slate-100 pt-5">
              <InquiryForm propertyId={p.id} compact />
            </div>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold">Similar properties</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((x) => <PropertyCard key={x.id} p={x} />)}
          </div>
        </section>
      )}
    </div>
  );
}
