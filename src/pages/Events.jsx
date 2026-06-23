import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { events } from "../data/events";
import EventCard from "../components/EventCard";
import FilterBar from "../components/FilterBar";
import { isToday, isThisWeek } from "../utils/storage";

export default function Events() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "All",
    price: "All",
    date: "All",
    search: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = useMemo(() => {
    return events.filter(event => {
      const matchCat = filters.category === "All" || event.category === filters.category;
      const matchPrice = filters.price === "All" || event.type === filters.price;
      const matchDate =
        filters.date === "All" ? true :
        filters.date === "Today" ? isToday(event.date) :
        isThisWeek(event.date);
      const matchSearch = !filters.search ||
        event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.organizer.toLowerCase().includes(filters.search.toLowerCase()) ||
        (event.tags || []).some(t => t.toLowerCase().includes(filters.search.toLowerCase()));
      return matchCat && matchPrice && matchDate && matchSearch;
    });
  }, [filters]);

  return (
    <div style={{ paddingTop: 72, minHeight: "100vh" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a0f4a 0%, #0F0A2A 100%)",
        padding: "56px 24px 48px",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: -80, right: -80,
          width: 300, height: 300, borderRadius: "50%",
          background: "rgba(108,71,255,0.15)", filter: "blur(60px)"
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-tag" style={{ background: "rgba(108,71,255,0.2)", border: "1px solid rgba(108,71,255,0.3)", color: "#a78bfa" }}>
            🎫 Barcha Eventlar
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 800, color: "white", marginTop: 12, marginBottom: 10
          }}>Eventlarni Kashf Eting</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}>
            {events.length}+ ta tadbir siz uchun tayyor. Qidiring, filtrlang va bron qiling.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "32px 24px 80px" }}>
        {/* Filter Bar */}
        <div style={{ marginBottom: 28 }}>
          <FilterBar filters={filters} onChange={setFilters} totalResults={filtered.length} />
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="events-grid">
            {filtered.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h3>Hech narsa topilmadi</h3>
            <p style={{ marginBottom: 20 }}>Filtr yoki qidiruv so'zini o'zgartirib ko'ring</p>
            <button
              className="btn btn-primary"
              onClick={() => setFilters({ category: "All", price: "All", date: "All", search: "" })}
            >Filtrlarni tozalash</button>
          </div>
        )}
      </div>
    </div>
  );
}
