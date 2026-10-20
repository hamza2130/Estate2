import { NextResponse } from "next/server";
import { delegate, errorResponse, getResource, toData } from "@/lib/admin-data";

type Ctx = { params: Promise<{ resource: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const r = getResource((await params).resource);
  if (!r) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  const rows = await delegate(r).findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(rows);
}

export async function POST(req: Request, { params }: Ctx) {
  const r = getResource((await params).resource);
  if (!r) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  const { data, errors } = await toData(r, await req.json().catch(() => ({})));
  if (errors.length) return NextResponse.json({ error: errors.join(". ") }, { status: 400 });
  try {
    const row = await delegate(r).create({ data });
    return NextResponse.json(row, { status: 201 });
  } catch (e) {
    return errorResponse(e);
  }
}
