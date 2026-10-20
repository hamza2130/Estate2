export default function Logo({ name, tagline, light = false }: { name: string; tagline: string; light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-10 w-10 place-items-center rounded-md bg-gold-500 font-display text-lg font-bold text-navy-900">
        {name.slice(0, 1)}
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-lg font-bold ${light ? "text-white" : "text-navy-900"}`}>{name}</span>
        <span className={`block text-[10px] font-semibold uppercase tracking-[0.18em] ${light ? "text-gold-300" : "text-gold-600"}`}>{tagline}</span>
      </span>
    </span>
  );
}
