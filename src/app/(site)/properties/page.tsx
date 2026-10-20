import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { prisma } from "@/lib/prisma";
import { searchProperties, type PropertyFilters } from "@/lib/queries";

export const metadata = { title: "Properties" };

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<PropertyFilters> }) {
  const f = await searchParams;
  const [{ items, total, page, pages }, projects] = await Promise.all([
    searchProperties(f),
    prisma.project.findMany({ orderBy: { sortOrder: "asc" }, select: { slug: true, name: true } }),
  ]);
  const pageHref = (n: number) => {
    const params = new URLSearchParams(Object.entries(f).filter(([, v]) => v) as [string, string][]);
    params.set("page", String(n));
    return `/properties?${params}`;
  };

  return (
    <>
      <section className="bg-navy-900 py-12">
        <div className="container-x">
          <p className="eyebrow text-gold-300">Listings</p>
          <h1 className="mt-2 text-4xl font-bold text-white">Properties</h1>
          <p className="mt-2 text-navy-100">{total} verified {total === 1 ? "property" : "properties"} match your search</p>
        </div>
      </section>
      <section className="container-x grid gap-8 py-10 lg:grid-cols-[280px_1fr]">
        <aside>
          <form className="card sticky top-28 space-y-4 p-5">
            <div>
              <label className="label">Keyword</label>
              <input name="q" defaultValue={f.q} placeholder="Sector, title..." className="input" />
            </div>
            <div>
              <label className="label">Purpose</label>
              <select name="purpose" defaultValue={f.purpose || ""} className="input">
                <option value="">Buy or rent</option>
                <option value="Sale">For sale</option>
                <option value="Rent">For rent</option>
              </select>
            </div>
            <div>
              <label className="label">Type</label>
              <select name="type" defaultValue={f.type || ""} className="input">
                <option value="">All types</option>
                {["Plot", "House", "Villa", "Apartment", "Commercial"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Project</label>
              <select name="project" defaultValue={f.project || ""} className="input">
                <option value="">All projects</option>
                {projects.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="label">Min PKR</label>
                <input name="minPrice" type="number" defaultValue={f.minPrice} className="input" />
              </div>
              <div>
                <label className="label">Max PKR</label>
                <input name="maxPrice" type="number" defaultValue={f.maxPrice} className="input" />
              </div>
            </div>
            <div>
              <label className="label">Sort by</label>
              <select name="sort" defaultValue={f.sort || ""} className="input">
                <option value="">Newest first</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>
            <button className="btn-navy w-full">Apply filters</button>
            <Link href="/properties" className="block text-center text-xs font-semibold text-slate-500 hover:text-navy-800">Clear all</Link>
          </form>
        </aside>
        <div>
          {items.length === 0 ? (
            <div className="card p-10 text-center">
              <h2 className="text-2xl font-bold">No properties match these filters</h2>
              <p className="mt-2 text-slate-600">Try widening your budget or clearing a filter.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((p) => <PropertyCard key={p.id} p={p} />)}
            </div>
          )}
          {pages > 1 && (
            <nav className="mt-10 flex justify-center gap-2">
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <Link key={n} href={pageHref(n)} className={`grid h-10 w-10 place-items-center rounded-md border text-sm font-semibold ${n === page ? "border-navy-800 bg-navy-800 text-white" : "border-slate-300 bg-white text-navy-800"}`}>
                  {n}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
