import Link from "next/link";
import Img from "@/components/Img";
import PropertyCard from "@/components/PropertyCard";
import SearchBar from "@/components/SearchBar";
import InquiryForm from "@/components/InquiryForm";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { formatDate } from "@/lib/format";

const SERVICES = [
  { title: "Title checks", text: "Ownership, dues and ballot status verified before any file is listed or any money changes hands." },
  { title: "Guided site visits", text: "We take you to the exact plot or home, in person or over a live video walkthrough for overseas clients." },
  { title: "Full transfer support", text: "Documents, appointments, biometrics and fees handled by our team until the transfer letter is in your name." },
  { title: "Investment advice", text: "Honest sector-by-sector comparisons so you buy for your budget, timeline and goals." },
];

export default async function HomePage() {
  const [s, projects, featured, latestRent, guides, testimonials, counts] = await Promise.all([
    getSettings(),
    prisma.project.findMany({ where: { featured: true }, orderBy: { sortOrder: "asc" }, include: { _count: { select: { properties: true } } } }),
    prisma.property.findMany({ where: { featured: true, status: { not: "Sold" } }, orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.property.findMany({ where: { purpose: "Rent", status: "Available" }, orderBy: { createdAt: "desc" }, take: 3 }),
    prisma.guide.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 3 }),
    prisma.testimonial.findMany({ where: { published: true }, orderBy: { createdAt: "asc" }, take: 3 }),
    Promise.all([prisma.property.count(), prisma.property.count({ where: { status: "Sold" } }), prisma.project.count()]),
  ]);
  const projectOptions = projects.map((p) => ({ value: p.slug, label: p.name }));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <Img src={s.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-navy-900/30" />
        <div className="container-x relative py-20 md:py-28">
          <p className="eyebrow text-gold-300">DHA Islamabad-Rawalpindi · Bahria Town</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">{s.heroTitle}</h1>
          <p className="mt-5 max-w-2xl text-lg text-navy-100">{s.heroSubtitle}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/properties" className="btn-gold">Browse properties</Link>
            <Link href="/contact" className="btn border border-white/40 text-white hover:bg-white/10">Talk to an advisor</Link>
          </div>
          <div className="mt-12">
            <SearchBar projects={projectOptions} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-200 bg-navy-50">
        <div className="container-x grid grid-cols-2 gap-6 py-8 text-center md:grid-cols-4">
          {[
            [counts[0], "Verified listings"],
            [counts[2], "Active projects"],
            [counts[1], "Deals closed"],
            ["6 days", "Office open weekly"],
          ].map(([n, l]) => (
            <div key={String(l)}>
              <p className="font-display text-3xl font-bold text-navy-900">{n}</p>
              <p className="mt-1 text-sm text-slate-600">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="container-x py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Our projects</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Where we work</h2>
          </div>
          <Link href="/projects" className="text-sm font-semibold text-gold-600 hover:underline">All projects →</Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <Link key={p.id} href={`/projects/${p.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-xl bg-navy-800">
              <Img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-300">{p._count.properties} listings</p>
                <h3 className="mt-1 text-xl font-bold text-white">{p.name}</h3>
                <p className="mt-1 text-sm text-navy-100">{p.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-slate-50 py-16">
        <div className="container-x">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Featured</p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">Hand-picked, title-checked listings</h2>
            </div>
            <Link href="/properties" className="text-sm font-semibold text-gold-600 hover:underline">View all →</Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => <PropertyCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-x py-16">
        <div className="max-w-2xl">
          <p className="eyebrow">Why {s.brandName}</p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">We stay with you from shortlist to transfer letter</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((sv, i) => (
            <div key={sv.title} className="card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-100 font-bold text-gold-600">{i + 1}</span>
              <h3 className="mt-4 font-sans text-lg font-semibold">{sv.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{sv.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rentals */}
      {latestRent.length > 0 && (
        <section className="bg-slate-50 py-16">
          <div className="container-x">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">For rent</p>
                <h2 className="mt-2 text-3xl font-bold md:text-4xl">Latest rentals</h2>
              </div>
              <Link href="/properties?purpose=Rent" className="text-sm font-semibold text-gold-600 hover:underline">All rentals →</Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestRent.map((p) => <PropertyCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="bg-navy-900 py-16 text-white">
          <div className="container-x">
            <p className="eyebrow text-gold-300">Client stories</p>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">Trusted by families and investors</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <figure key={t.id} className="rounded-xl border border-navy-700 bg-navy-800 p-6">
                  <p className="text-gold-400">{"★".repeat(Math.max(0, Math.min(5, t.rating)))}</p>
                  <blockquote className="mt-3 text-sm leading-6 text-navy-100">“{t.quote}”</blockquote>
                  <figcaption className="mt-4 text-sm"><span className="font-semibold text-white">{t.name}</span> <span className="text-navy-200">· {t.role}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Guides */}
      <section className="container-x py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Guides</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Know before you buy</h2>
          </div>
          <Link href="/guides" className="text-sm font-semibold text-gold-600 hover:underline">All guides →</Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {guides.map((g) => (
            <Link key={g.id} href={`/guides/${g.slug}`} className="card group overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden bg-navy-800">
                <Img src={g.coverImage} alt={g.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">{g.category} · {formatDate(g.createdAt)}</p>
                <h3 className="mt-2 font-sans text-lg font-semibold">{g.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">{g.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gold-50 py-16">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Book a guided site visit</h2>
            <p className="mt-4 text-slate-600">Tell us what you are looking for and an advisor will call you back with options that match your budget. Visit us at {s.address}, {s.hours}.</p>
          </div>
          <div className="card p-6">
            <InquiryForm interest="Site visit" />
          </div>
        </div>
      </section>
    </>
  );
}
