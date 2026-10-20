import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseList } from "@/lib/format";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const p = await prisma.property.findUnique({ where: { slug: (await params).slug }, include: { project: { select: { name: true, slug: true } } } });
  if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ...p, images: parseList(p.images), features: parseList(p.features) });
}
