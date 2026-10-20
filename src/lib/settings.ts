import { prisma } from "./prisma";

export const SETTING_FIELDS = [
  { key: "brandName", label: "Brand name", default: "Autostack AI" },
  { key: "brandTagline", label: "Brand tagline", default: "Real Estate & Builders" },
  { key: "phone", label: "Phone", default: "+92 300 0000000" },
  { key: "whatsapp", label: "WhatsApp number (digits only)", default: "923000000000" },
  { key: "email", label: "Email", default: "info@autostack.ai" },
  { key: "address", label: "Office address", default: "Office 12, Sector A, DHA Phase 5, Islamabad" },
  { key: "hours", label: "Office hours", default: "Mon to Sat, 10:00 AM to 8:00 PM" },
  { key: "heroTitle", label: "Homepage headline", default: "Verified property in DHA Islamabad, without the guesswork" },
  { key: "heroSubtitle", label: "Homepage sub-headline", default: "Plots, villas and commercial units across DHA Phase 5 & 6, Margalla Orchard and Bahria Town, with title checks, guided site visits and full transfer support." },
  { key: "heroImage", label: "Homepage hero image URL", default: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=70&auto=format&fit=crop" },
  { key: "aboutText", label: "About us text", default: "Autostack AI Real Estate & Builders is an Islamabad property advisory focused on DHA Islamabad-Rawalpindi and Bahria Town. We help families, overseas Pakistanis and investors buy, sell and rent with confidence: every file we list is title-checked, every visit is guided, and we stay with you until the transfer is complete." },
  { key: "registration", label: "Registration line", default: "Registered as Autostack AI Real Estate & Builders (Pvt) Ltd (demo company)." },
  { key: "facebook", label: "Facebook URL", default: "#" },
  { key: "instagram", label: "Instagram URL", default: "#" },
  { key: "youtube", label: "YouTube URL", default: "#" },
] as const;

export type SettingKey = (typeof SETTING_FIELDS)[number]["key"];
export type Settings = Record<SettingKey, string>;

export async function getSettings(): Promise<Settings> {
  const rows = await prisma.setting.findMany();
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return Object.fromEntries(SETTING_FIELDS.map((f) => [f.key, map[f.key] ?? f.default])) as Settings;
}
