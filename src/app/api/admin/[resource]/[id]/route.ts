import { NextResponse } from "next/server";
import { delegate, errorResponse, getResource, toData } from "@/lib/admin-data";

type Ctx = { params: Promise<{ resource: string; id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { resource, id } = await params;
  const r = getResource(resource);
  if (!r) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  const row = await delegate(r).findUnique({ where: { id } });
  return row ? NextResponse.json(row) : NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req: Request, { params }: Ctx) {
  const { resource, id } = await params;
  const r = getResource(resource);
  if (!r) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  const { data, errors } = await toData(r, await req.json().catch(() => ({})), id);
  if (errors.length) return NextResponse.json({ error: errors.join(". ") }, { status: 400 });
  try {
    return NextResponse.json(await delegate(r).update({ where: { id }, data }));
  } catch (e) {
    return errorResponse(e);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { resource, id } = await params;
  const r = getResource(resource);
  if (!r) return NextResponse.json({ error: "Unknown resource" }, { status: 404 });
  try {
    await delegate(r).delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
