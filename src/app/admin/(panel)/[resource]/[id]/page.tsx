import { notFound } from "next/navigation";
import ResourceForm from "@/components/admin/ResourceForm";
import { delegate, getResource } from "@/lib/admin-data";
import { prisma } from "@/lib/prisma";

export default async function EditResource({ params }: { params: Promise<{ resource: string; id: string }> }) {
  const { resource, id } = await params;
  const r = getResource(resource);
  if (!r) notFound();
  const row = await delegate(r).findUnique({ where: { id } });
  if (!row) notFound();
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true, name: true } });
  return (
    <div>
      <h1 className="font-sans text-2xl font-bold">Edit {r.singular.toLowerCase()}</h1>
      <p className="mt-1 text-sm text-slate-500">{String(row[r.titleField])}</p>
      <ResourceForm resourceKey={r.key} projects={projects} initial={JSON.parse(JSON.stringify(row))} />
    </div>
  );
}
