import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { errorResponse } from "@/lib/admin-data";

const STATUSES = ["New", "Contacted", "Closed"];

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { status } = (await req.json().catch(() => ({}))) as { status?: string };
  if (!status || !STATUSES.includes(status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  try {
    return NextResponse.json(await prisma.inquiry.update({ where: { id: (await params).id }, data: { status } }));
  } catch (e) {
    return errorResponse(e);
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await prisma.inquiry.delete({ where: { id: (await params).id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
