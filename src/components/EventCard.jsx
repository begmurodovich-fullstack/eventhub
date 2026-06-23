import { Link } from "react-router-dom";
import { formatDate } from "../utils/storage";
import { RightArrow } from "./ArrowIcons";

const categoryColors = {
  Tech: "badge-tech",
  Business: "badge-business",
  Design: "badge-design",
  Sport: "badge-sport"
};

export default function EventCard({ event, compact = false }) {
  const spotsLeft = event.capacity - event.registered;
  const isFull = spotsLeft <= 0;
  const isAlmostFull = spotsLeft > 0 && spotsLeft <= 20;

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column" }}>
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: compact ? 160 : 200 }}>
        <img
          src={event.image}
          alt={event.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.4s ease"
          }}
          onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
          onError={e => {
            e.target.src = `https://placehold.co/800x400/6C47FF/white?text=${encodeURIComponent(event.category)}`;
          }}
        />
        <div style={{
          position: "absolute", top: 12, left: 12,
          display: "flex", gap: 6
        }}>
          <span className={`badge ${categoryColors[event.category] || "badge-tech"}`}>
            {event.category}
          </span>
          <span className={`badge ${event.type === "Free" ? "badge-free" : "badge-paid"}`}>
            {event.type === "Free" ? "✓ Bepul" : `$${event.price}`}
          </span>
        </div>
        {event.featured && (
          <div style={{
            position: "absolute", top: 12, right: 12,
            background: "linear-gradient(135deg,#FF6B35,#ff8c5a)",
            color: "white", padding: "4px 10px",
            borderRadius: "var(--radius-full)",
            fontSize: "0.72rem", fontWeight: 700
          }}>⭐ Featured</div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: compact ? "16px" : "20px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: compact ? "1rem" : "1.1rem",
          fontWeight: 700, color: "var(--text-primary)",
          lineHeight: 1.3
        }}>{event.title}</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-secondary)", fontSize: "0.84rem" }}>
            <span>📅</span>
            <span>{formatDate(event.date)} · {event.time}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-secondary)", fontSize: "0.84rem" }}>
            <span>📍</span>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {event.location}
            </span>
          </div>
        </div>

        {/* Capacity bar */}
        {!compact && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "0.78rem" }}>
              <span style={{ color: "var(--text-muted)" }}>Ishtirokchilar</span>
              <span style={{
                fontWeight: 600,
                color: isFull ? "var(--danger)" : isAlmostFull ? "var(--warning)" : "var(--success)"
              }}>
                {isFull ? "To'ldi" : isAlmostFull ? `${spotsLeft} joy qoldi` : `${event.registered}/${event.capacity}`}
              </span>
            </div>
            <div style={{ height: 5, background: "var(--border)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${Math.min((event.registered / event.capacity) * 100, 100)}%`,
                background: isFull ? "var(--danger)" : isAlmostFull
                  ? "linear-gradient(90deg, var(--warning), var(--accent))"
                  : "linear-gradient(90deg, var(--primary), var(--success))",
                borderRadius: "var(--radius-full)",
                transition: "width 0.5s ease"
              }} />
            </div>
          </div>
        )}

        {/* Tags */}
        {!compact && event.tags && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {event.tags.map(tag => (
              <span key={tag} style={{
                padding: "2px 10px",
                background: "var(--primary-light)",
                color: "var(--primary)",
                borderRadius: "var(--radius-full)",
                fontSize: "0.72rem", fontWeight: 600
              }}>#{tag}</span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: "auto", paddingTop: 8, display: "flex", gap: 10 }}>
          <Link
            to={`/events/${event.id}`}
            className="btn btn-primary btn-sm"
            style={{ flex: 1, justifyContent: "center", gap: 6 }}
          >
            Batafsil ko'rish <RightArrow size={14} color="white" />
          </Link>
          {!isFull && (
            <Link
              to={`/booking/${event.id}`}
              className="btn btn-outline btn-sm"
              style={{ flex: 1, justifyContent: "center", gap: 6 }}
            >
              Bron qilish <RightArrow size={14} color="var(--primary)" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
