import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getSettings } from "@/lib/settings";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [s, projects] = await Promise.all([
    getSettings(),
    prisma.project.findMany({ orderBy: { sortOrder: "asc" }, select: { slug: true, name: true } }),
  ]);
  return (
    <>
      <Header name={s.brandName} tagline={s.brandTagline} phone={s.phone} />
      <main>{children}</main>
      <Footer s={s} projects={projects} />
      <WhatsAppButton number={s.whatsapp} />
    </>
  );
}
