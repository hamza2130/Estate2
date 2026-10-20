// Field definitions shared by the admin forms and the admin API, so both
// agree on what each content type contains.

export type FieldType = "text" | "textarea" | "number" | "select" | "checkbox" | "list" | "images" | "image" | "project";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  help?: string;
  half?: boolean;
};

export type Resource = {
  key: string;
  model: "property" | "project" | "guide" | "testimonial";
  label: string;
  singular: string;
  titleField: string;
  slugFrom?: string;
  publicPath?: (row: Record<string, unknown>) => string;
  columns: { name: string; label: string }[];
  fields: Field[];
};

export const RESOURCES: Record<string, Resource> = {
  properties: {
    key: "properties",
    model: "property",
    label: "Properties",
    singular: "Property",
    titleField: "title",
    slugFrom: "title",
    publicPath: (r) => `/properties/${r.slug}`,
    columns: [
      { name: "title", label: "Title" },
      { name: "type", label: "Type" },
      { name: "purpose", label: "Purpose" },
      { name: "price", label: "Price" },
      { name: "status", label: "Status" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "purpose", label: "Purpose", type: "select", options: ["Sale", "Rent"], half: true },
      { name: "type", label: "Type", type: "select", options: ["Plot", "House", "Villa", "Apartment", "Commercial"], half: true },
      { name: "status", label: "Status", type: "select", options: ["Available", "Under Offer", "Sold"], half: true },
      { name: "price", label: "Price (PKR)", type: "number", required: true, half: true, help: "Full amount, e.g. 45000000 for 4.5 Crore" },
      { name: "areaValue", label: "Area", type: "number", required: true, half: true },
      { name: "areaUnit", label: "Area unit", type: "select", options: ["Marla", "Kanal", "Sq. Ft."], half: true },
      { name: "beds", label: "Bedrooms", type: "number", half: true },
      { name: "baths", label: "Bathrooms", type: "number", half: true },
      { name: "projectId", label: "Project", type: "project", half: true },
      { name: "location", label: "Location / sector", type: "text", required: true, half: true },
      { name: "city", label: "City", type: "text", half: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "features", label: "Features", type: "list", help: "One per line" },
      { name: "images", label: "Images", type: "images" },
      { name: "featured", label: "Show on homepage", type: "checkbox", half: true },
      { name: "verified", label: "Title verified", type: "checkbox", half: true },
      { name: "slug", label: "URL slug", type: "text", help: "Leave blank to generate from the title" },
    ],
  },
  projects: {
    key: "projects",
    model: "project",
    label: "Projects",
    singular: "Project",
    titleField: "name",
    slugFrom: "name",
    publicPath: (r) => `/projects/${r.slug}`,
    columns: [
      { name: "name", label: "Name" },
      { name: "location", label: "Location" },
      { name: "featured", label: "Featured" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "location", label: "Location", type: "text", required: true, half: true },
      { name: "sortOrder", label: "Sort order", type: "number", half: true },
      { name: "tagline", label: "Tagline", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "highlights", label: "Highlights", type: "list", help: "One per line" },
      { name: "image", label: "Cover image", type: "image", required: true },
      { name: "featured", label: "Show on homepage", type: "checkbox" },
      { name: "slug", label: "URL slug", type: "text", help: "Leave blank to generate from the name" },
    ],
  },
  guides: {
    key: "guides",
    model: "guide",
    label: "Guides",
    singular: "Guide",
    titleField: "title",
    slugFrom: "title",
    publicPath: (r) => `/guides/${r.slug}`,
    columns: [
      { name: "title", label: "Title" },
      { name: "category", label: "Category" },
      { name: "published", label: "Published" },
    ],
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "category", label: "Category", type: "select", options: ["Buying Guide", "Market Update", "Legal & Transfer", "Investment"], half: true },
      { name: "published", label: "Published", type: "checkbox", half: true },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
      { name: "content", label: "Content", type: "textarea", required: true, help: "Blank line between paragraphs. Start a line with '## ' for a heading or '- ' for a bullet." },
      { name: "coverImage", label: "Cover image", type: "image", required: true },
      { name: "slug", label: "URL slug", type: "text", help: "Leave blank to generate from the title" },
    ],
  },
  testimonials: {
    key: "testimonials",
    model: "testimonial",
    label: "Testimonials",
    singular: "Testimonial",
    titleField: "name",
    columns: [
      { name: "name", label: "Name" },
      { name: "role", label: "Role" },
      { name: "rating", label: "Rating" },
      { name: "published", label: "Published" },
    ],
    fields: [
      { name: "name", label: "Name", type: "text", required: true, half: true },
      { name: "role", label: "Role / location", type: "text", required: true, half: true },
      { name: "quote", label: "Quote", type: "textarea", required: true },
      { name: "rating", label: "Rating (1-5)", type: "number", half: true },
      { name: "published", label: "Published", type: "checkbox", half: true },
    ],
  },
};
