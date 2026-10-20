import type { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export type PropertyFilters = {
  q?: string;
  purpose?: string;
  type?: string;
  project?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  page?: string;
};

export const PAGE_SIZE = 9;

export async function searchProperties(f: PropertyFilters) {
  const where: Prisma.PropertyWhereInput = {};
  if (f.purpose) where.purpose = f.purpose;
  if (f.type) where.type = f.type;
  if (f.project) where.project = { slug: f.project };
  const price: Prisma.FloatFilter = {};
  if (Number(f.minPrice) > 0) price.gte = Number(f.minPrice);
  if (Number(f.maxPrice) > 0) price.lte = Number(f.maxPrice);
  if (Object.keys(price).length) where.price = price;
  if (f.q) where.OR = [{ title: { contains: f.q } }, { location: { contains: f.q } }, { description: { contains: f.q } }];

  const orderBy: Prisma.PropertyOrderByWithRelationInput =
    f.sort === "price-asc" ? { price: "asc" } : f.sort === "price-desc" ? { price: "desc" } : { createdAt: "desc" };
  const page = Math.max(1, Number(f.page) || 1);

  const [items, total] = await Promise.all([
    prisma.property.findMany({ where, orderBy, skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE, include: { project: { select: { name: true, slug: true } } } }),
    prisma.property.count({ where }),
  ]);
  return { items, total, page, pages: Math.max(1, Math.ceil(total / PAGE_SIZE)) };
}
