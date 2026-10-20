import Link from "next/link";
import Logo from "./Logo";
import type { Settings } from "@/lib/settings";

export default function Footer({ s, projects }: { s: Settings; projects: { slug: string; name: string }[] }) {
  return (
    <footer className="bg-navy-900 text-navy-100">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo name={s.brandName} tagline={s.brandTagline} light />
          <p className="mt-4 text-sm leading-6 text-navy-200">Verified plots, villas and commercial units with title checks, guided site visits and full transfer support.</p>
          <div className="mt-4 flex gap-3 text-sm">
            <a href={s.facebook} className="hover:text-gold-300">Facebook</a>
            <a href={s.instagram} className="hover:text-gold-300">Instagram</a>
            <a href={s.youtube} className="hover:text-gold-300">YouTube</a>
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-white">Projects</h4>
          <ul className="space-y-2 text-sm">
            {projects.map((p) => (
              <li key={p.slug}><Link href={`/projects/${p.slug}`} className="hover:text-gold-300">{p.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-white">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/properties?purpose=Sale" className="hover:text-gold-300">Properties for sale</Link></li>
            <li><Link href="/properties?purpose=Rent" className="hover:text-gold-300">Properties for rent</Link></li>
            <li><Link href="/properties?type=Plot" className="hover:text-gold-300">Plots</Link></li>
            <li><Link href="/properties?type=Commercial" className="hover:text-gold-300">Commercial</Link></li>
            <li><Link href="/guides" className="hover:text-gold-300">Buying guides</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-sans text-sm font-semibold uppercase tracking-wider text-white">Head office</h4>
          <ul className="space-y-2 text-sm text-navy-200">
            <li>{s.address}</li>
            <li>{s.hours}</li>
            <li><a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:text-gold-300">{s.phone}</a></li>
            <li><a href={`mailto:${s.email}`} className="hover:text-gold-300">{s.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-700">
        <div className="container-x flex flex-col gap-2 py-5 text-xs text-navy-200 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} {s.brandName}. {s.registration}</span>
          <span>Demo website built by Autostack AI</span>
        </div>
      </div>
    </footer>
  );
}
