import Link from "next/link";
import { notFound } from "next/navigation";
import Img from "@/components/Img";
import InquiryForm from "@/components/InquiryForm";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";
import { renderContent } from "@/lib/content";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const g = await prisma.guide.findUnique({ where: { slug: (await params).slug }, select: { title: true, excerpt: true } });
  return { title: g?.title ?? "Guide", description: g?.excerpt };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const g = await prisma.guide.findUnique({ where: { slug: (await params).slug } });
  if (!g || !g.published) notFound();
  return (
    <article className="container-x max-w-3xl py-12">
      <Link href="/guides" className="text-sm font-semibold text-gold-600">← All guides</Link>
      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-gold-600">{g.category} · {formatDate(g.createdAt)}</p>
      <h1 className="mt-2 text-4xl font-bold leading-tight">{g.title}</h1>
      <p className="mt-4 text-lg text-slate-600">{g.excerpt}</p>
      <div className="mt-8 aspect-[16/9] overflow-hidden rounded-xl bg-navy-800">
        <Img src={g.coverImage} alt={g.title} className="h-full w-full object-cover" />
      </div>
      <div className="prose-guide mt-8">{renderContent(g.content)}</div>
      <div className="card mt-12 p-6">
        <h2 className="font-sans text-lg font-semibold">Have a question about this?</h2>
        <p className="mb-4 mt-1 text-sm text-slate-600">Our advisors will answer for your specific situation.</p>
        <InquiryForm interest={`Guide: ${g.title}`} />
      </div>
    </article>
  );
}
