import { cookies } from "next/headers";
import Sidebar from "@/components/admin/Sidebar";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: { default: "Admin", template: "%s | Admin" } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await verifySession((await cookies()).get(SESSION_COOKIE)?.value);
  const newInquiries = await prisma.inquiry.count({ where: { status: "New" } });
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar user={session?.email ?? ""} newInquiries={newInquiries} />
      <div className="p-4 md:ml-60 md:p-8">{children}</div>
    </div>
  );
}
