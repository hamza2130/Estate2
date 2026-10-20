import InquiryForm from "@/components/InquiryForm";
import { getSettings } from "@/lib/settings";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const s = await getSettings();
  const items = [
    ["Head office", s.address],
    ["Office hours", s.hours],
    ["Phone", s.phone],
    ["Email", s.email],
  ];
  return (
    <>
      <section className="bg-navy-900 py-12">
        <div className="container-x">
          <p className="eyebrow text-gold-300">Contact</p>
          <h1 className="mt-2 text-4xl font-bold text-white">Talk to an advisor</h1>
        </div>
      </section>
      <section className="container-x grid gap-10 py-14 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="text-2xl font-bold">Visit or call us</h2>
          <dl className="mt-6 space-y-5">
            {items.map(([k, v]) => (
              <div key={k}>
                <dt className="label">{k}</dt>
                <dd className="text-lg text-navy-900">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 aspect-video overflow-hidden rounded-xl border border-slate-200">
            <iframe title="Office map" className="h-full w-full" loading="lazy" src={`https://maps.google.com/maps?q=${encodeURIComponent(s.address)}&output=embed`} />
          </div>
        </div>
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-bold">Send us a message</h2>
          <p className="mb-6 mt-1 text-sm text-slate-600">We usually reply within office hours on the same day.</p>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
