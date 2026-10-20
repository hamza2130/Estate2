import { NextResponse, type NextRequest } from "next/server";
import { searchProperties } from "@/lib/queries";
import { parseList } from "@/lib/format";

// Public listings API: GET /api/properties?purpose=Sale&type=Plot&project=dha-phase-5-islamabad&maxPrice=50000000&page=1
export async function GET(req: NextRequest) {
  const f = Object.fromEntries(req.nextUrl.searchParams);
  const result = await searchProperties(f);
  return NextResponse.json({
    ...result,
    items: result.items.map((p) => ({ ...p, images: parseList(p.images), features: parseList(p.features) })),
  });
}
