import { categories, priceFilters, dateFilters } from "../data/events";

export default function FilterBar({ filters, onChange, totalResults }) {
  const handleChange = (key, value) => onChange({ ...filters, [key]: value });

  const FilterGroup = ({ label, options, filterKey }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </span>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {options.map(opt => (
          <button
            key={opt}
            onClick={() => handleChange(filterKey, opt)}
            style={{
              padding: "7px 14px",
              borderRadius: "var(--radius-full)",
              fontSize: "0.82rem",
              fontWeight: 600,
              border: "1.5px solid",
              borderColor: filters[filterKey] === opt ? "var(--primary)" : "var(--border)",
              background: filters[filterKey] === opt ? "var(--primary)" : "white",
              color: filters[filterKey] === opt ? "white" : "var(--text-secondary)",
              cursor: "pointer",
              transition: "var(--transition)"
            }}
          >{opt}</button>
        ))}
      </div>
    </div>
  );

  const hasActiveFilters =
    filters.category !== "All" ||
    filters.price !== "All" ||
    filters.date !== "All" ||
    filters.search;

  return (
    <div style={{
      background: "white",
      borderRadius: "var(--radius-lg)",
      padding: "20px 24px",
      boxShadow: "var(--shadow-card)",
      border: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      gap: 16
    }}>
      {/* Search */}
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: "1rem" }}>🔍</span>
        <input
          type="text"
          placeholder="Event nomini qidiring..."
          value={filters.search}
          onChange={e => handleChange("search", e.target.value)}
          className="form-input"
          style={{ paddingLeft: 40, width: "100%" }}
        />
        {filters.search && (
          <button
            onClick={() => handleChange("search", "")}
            style={{
              position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
              background: "var(--border)", border: "none", borderRadius: "50%",
              width: 22, height: 22, cursor: "pointer", fontSize: "0.7rem",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "var(--text-secondary)"
            }}
          >✕</button>
        )}
      </div>

      {/* Filter groups */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 16
      }}>
        <FilterGroup label="Kategoriya" options={categories} filterKey="category" />
        <FilterGroup label="Narx" options={priceFilters} filterKey="price" />
        <FilterGroup label="Sana" options={dateFilters} filterKey="date" />
      </div>

      {/* Results count + reset */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4, borderTop: "1px solid var(--border)" }}>
        <span style={{ fontSize: "0.84rem", color: "var(--text-secondary)" }}>
          <strong style={{ color: "var(--primary)" }}>{totalResults}</strong> ta event topildi
        </span>
        {hasActiveFilters && (
          <button
            onClick={() => onChange({ category: "All", price: "All", date: "All", search: "" })}
            style={{
              fontSize: "0.82rem", color: "var(--danger)", fontWeight: 600,
              background: "var(--danger-light)", border: "none", padding: "5px 12px",
              borderRadius: "var(--radius-full)", cursor: "pointer"
            }}
          >✕ Filtrlarni tozalash</button>
        )}
      </div>
    </div>
  );
}
