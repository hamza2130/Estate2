type Option = { value: string; label: string };

export default function SearchBar({ projects, defaults = {} }: { projects: Option[]; defaults?: Record<string, string | undefined> }) {
  return (
    <form action="/properties" className="grid gap-3 rounded-xl bg-white p-4 shadow-xl sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.3fr_1fr_auto]">
      <div>
        <label className="label">Purpose</label>
        <select name="purpose" defaultValue={defaults.purpose || ""} className="input">
          <option value="">Buy or rent</option>
          <option value="Sale">Buy</option>
          <option value="Rent">Rent</option>
        </select>
      </div>
      <div>
        <label className="label">Type</label>
        <select name="type" defaultValue={defaults.type || ""} className="input">
          <option value="">All types</option>
          {["Plot", "House", "Villa", "Apartment", "Commercial"].map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label className="label">Project</label>
        <select name="project" defaultValue={defaults.project || ""} className="input">
          <option value="">All projects</option>
          {projects.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
      </div>
      <div>
        <label className="label">Max budget</label>
        <select name="maxPrice" defaultValue={defaults.maxPrice || ""} className="input">
          <option value="">Any budget</option>
          <option value="200000">2 Lakh / month</option>
          <option value="20000000">2 Crore</option>
          <option value="50000000">5 Crore</option>
          <option value="100000000">10 Crore</option>
        </select>
      </div>
      <div className="flex items-end">
        <button className="btn-navy h-[38px] w-full lg:w-auto">Search</button>
      </div>
    </form>
  );
}
