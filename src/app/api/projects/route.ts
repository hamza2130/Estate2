import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseList } from "@/lib/format";

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" }, include: { _count: { select: { properties: true } } } });
  return NextResponse.json(projects.map((p) => ({ ...p, highlights: parseList(p.highlights) })));
}
