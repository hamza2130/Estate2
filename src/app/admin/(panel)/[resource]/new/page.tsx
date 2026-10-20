import { notFound } from "next/navigation";
import ResourceForm from "@/components/admin/ResourceForm";
import { getResource } from "@/lib/admin-data";
import { prisma } from "@/lib/prisma";

export default async function NewResource({ params }: { params: Promise<{ resource: string }> }) {
  const r = getResource((await params).resource);
  if (!r) notFound();
  const projects = await prisma.project.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true, name: true } });
  return (
    <div>
      <h1 className="font-sans text-2xl font-bold">Add {r.singular.toLowerCase()}</h1>
      <ResourceForm resourceKey={r.key} projects={projects} />
    </div>
  );
}
