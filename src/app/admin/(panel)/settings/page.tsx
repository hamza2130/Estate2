import SettingsForm from "@/components/admin/SettingsForm";
import { SETTING_FIELDS, getSettings } from "@/lib/settings";

export const metadata = { title: "Site settings" };

export default async function SettingsPage() {
  const values = await getSettings();
  return (
    <div>
      <h1 className="font-sans text-2xl font-bold">Site settings</h1>
      <p className="mt-1 text-sm text-slate-500">Brand, contact details and homepage text shown across the public site.</p>
      <SettingsForm fields={SETTING_FIELDS.map((f) => ({ key: f.key, label: f.label }))} initial={values} />
    </div>
  );
}
