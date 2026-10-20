import Link from "next/link";
import Img from "@/components/Img";
import { getSettings } from "@/lib/settings";

export const metadata = { title: "About" };

const VALUES = [
  ["Verified first", "Nothing goes live on our site until our team has checked the title, dues and location."],
  ["Honest advice", "We recommend what fits your budget and timeline, even when that means waiting."],
  ["End-to-end", "From the first call to the transfer letter, one advisor stays with you throughout."],
];

export default async function AboutPage() {
  const s = await getSettings();
  return (
    <>
      <section className="bg-navy-900 py-12">
        <div className="container-x">
          <p className="eyebrow text-gold-300">About us</p>
          <h1 className="mt-2 text-4xl font-bold text-white">{s.brandName} {s.brandTagline}</h1>
        </div>
      </section>
      <section className="container-x grid items-center gap-12 py-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Who we are</p>
          <h2 className="mt-2 text-3xl font-bold">Property advisors for DHA Islamabad-Rawalpindi</h2>
          <p className="mt-4 leading-7 text-slate-700">{s.aboutText}</p>
          <p className="mt-4 text-sm text-slate-500">{s.registration}</p>
          <Link href="/contact" className="btn-gold mt-6">Visit our office</Link>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-xl bg-navy-800">
          <Img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=70&auto=format&fit=crop" alt="Our office" className="h-full w-full object-cover" />
        </div>
      </section>
      <section className="bg-slate-50 py-14">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {VALUES.map(([t, d]) => (
            <div key={t} className="card p-6">
              <h3 className="font-sans text-lg font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
