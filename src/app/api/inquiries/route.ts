import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const name = str(body?.name, 120);
  const phone = str(body?.phone, 40);
  const message = str(body?.message);
  if (!name || !phone || !message) {
    return NextResponse.json({ error: "Name, phone and message are required." }, { status: 400 });
  }
  let propertyId: string | null = str(body?.propertyId, 40) || null;
  if (propertyId && !(await prisma.property.findUnique({ where: { id: propertyId }, select: { id: true } }))) propertyId = null;

  const inquiry = await prisma.inquiry.create({
    data: { name, phone, message, email: str(body?.email, 200), interest: str(body?.interest, 200) || "General", propertyId },
  });
  return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
}
