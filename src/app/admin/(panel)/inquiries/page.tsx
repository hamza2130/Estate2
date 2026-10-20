import InquiryList from "@/components/admin/InquiryList";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Inquiries" };

export default async function InquiriesPage() {
  const rows = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, include: { property: { select: { title: true, slug: true } } } });
  return (
    <div>
      <h1 className="font-sans text-2xl font-bold">Inquiries <span className="text-base font-normal text-slate-500">({rows.length})</span></h1>
      <InquiryList rows={JSON.parse(JSON.stringify(rows))} />
    </div>
  );
}
