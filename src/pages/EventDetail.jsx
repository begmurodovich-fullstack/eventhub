import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { events } from "../data/events";
import EventCard from "../components/EventCard";
import { formatDate, isEventBooked, getEventStats } from "../utils/storage";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === parseInt(id));
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (event) setBooked(isEventBooked(event.id));
  }, [id, event]);

  if (!event) return (
    <div style={{ paddingTop: 120, textAlign: "center", minHeight: "60vh" }}>
      <div style={{ fontSize: "4rem", marginBottom: 16 }}>😕</div>
      <h2>Event topilmadi</h2>
      <Link to="/events" className="btn btn-primary" style={{ marginTop: 20, display: "inline-flex" }}>
        Eventlarga qaytish
      </Link>
    </div>
  );

  const related = events.filter(e => e.category === event.category && e.id !== event.id).slice(0, 3);
  const { registered, spotsLeft, isFull, fillPct } = getEventStats(event);

  const categoryColors = { Tech: "#2563EB", Business: "#D97706", Design: "#9333EA", Sport: "#16A34A" };

  return (
    <div style={{ paddingTop: 72, minHeight: "100vh" }}>
      {/* Banner */}
      <div style={{ position: "relative", height: "clamp(280px, 45vh, 480px)", overflow: "hidden" }}>
        <img
          src={event.image} alt={event.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={e => { e.target.src = `https://placehold.co/1200x480/6C47FF/white?text=${encodeURIComponent(event.category)}`; }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)"
        }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 24px" }}>
          <div className="container">
            <button onClick={() => navigate(-1)} style={{
              color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)", padding: "8px 16px",
              borderRadius: "var(--radius-full)", fontSize: "0.84rem", fontWeight: 600,
              marginBottom: 16, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6
            }}>← Orqaga</button>
            <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
              <span className="badge" style={{ background: categoryColors[event.category], color: "white" }}>
                {event.category}
              </span>
              <span className={`badge ${event.type === "Free" ? "badge-free" : "badge-paid"}`}>
                {event.type === "Free" ? "✓ Bepul" : `$${event.price}`}
              </span>
              {event.featured && (
                <span style={{ background: "var(--accent)", color: "white" }} className="badge">⭐ Featured</span>
              )}
            </div>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
              fontWeight: 800, color: "white", lineHeight: 1.2
            }}>{event.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container" style={{ padding: "40px 24px 80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 32,
          alignItems: "start"
        }} className="detail-grid">

          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* About */}
            <div style={{ background: "white", borderRadius: "var(--radius-lg)", padding: 28, boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", marginBottom: 16 }}>
                Event haqida
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "0.95rem" }}>
                {event.description}
              </p>
            </div>

            {/* Details */}
            <div style={{ background: "white", borderRadius: "var(--radius-lg)", padding: 28, boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", marginBottom: 20 }}>
                Tadbir ma'lumotlari
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { icon: "📅", label: "Sana", value: `${formatDate(event.date)}, ${event.time}` },
                  { icon: "📍", label: "Joylashuv", value: event.location },
                  { icon: "🏷️", label: "Narx", value: event.type === "Free" ? "Bepul" : `$${event.price}` },
                  { icon: "👥", label: "Sig'im", value: `${event.capacity} kishi` },
                  { icon: "✅", label: "Ro'yxatdan o'tganlar", value: `${registered} kishi` }
                ].map(({ icon, label, value }) => (
                  <div key={label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "var(--radius-md)",
                      background: "var(--primary-light)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.1rem", flexShrink: 0
                    }}>{icon}</div>
                    <div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {label}
                      </div>
                      <div style={{ fontWeight: 600, color: "var(--text-primary)", marginTop: 2 }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Organizer */}
            <div style={{ background: "white", borderRadius: "var(--radius-lg)", padding: 28, boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", marginBottom: 16 }}>
                Organizer
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "var(--radius-full)",
                  background: "linear-gradient(135deg, var(--primary), var(--accent))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontWeight: 800, fontSize: "1.3rem",
                  fontFamily: "var(--font-display)"
                }}>
                  {event.organizer[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1rem" }}>{event.organizer}</div>
                  <a href={`mailto:${event.organizerEmail}`} style={{ color: "var(--primary)", fontSize: "0.88rem", fontWeight: 500 }}>
                    {event.organizerEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Tags */}
            {event.tags && (
              <div style={{ background: "white", borderRadius: "var(--radius-lg)", padding: 24, boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}>
                <h3 style={{ fontWeight: 700, marginBottom: 12, fontSize: "1rem" }}>Teglar</h3>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {event.tags.map(tag => (
                    <span key={tag} style={{
                      padding: "6px 14px", background: "var(--primary-light)",
                      color: "var(--primary)", borderRadius: "var(--radius-full)",
                      fontSize: "0.84rem", fontWeight: 600
                    }}>#{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — Booking card */}
          <div style={{ position: "sticky", top: 88 }}>
            <div style={{
              background: "white", borderRadius: "var(--radius-xl)",
              padding: 28, boxShadow: "var(--shadow-lg)",
              border: "2px solid var(--primary-light)"
            }}>
              <div style={{
                fontSize: "2rem", fontWeight: 800,
                fontFamily: "var(--font-display)",
                color: event.type === "Free" ? "var(--success)" : "var(--primary)",
                marginBottom: 4
              }}>
                {event.type === "Free" ? "Bepul" : `$${event.price}`}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.84rem", marginBottom: 20 }}>
                {event.type === "Free" ? "Hech qanday to'lov talab etilmaydi" : "Har bir ticket uchun"}
              </div>

              {/* Progress */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "0.84rem" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Band qilingan joylar</span>
                  <span style={{
                    fontWeight: 700,
                    color: isFull ? "var(--danger)" : spotsLeft <= 20 ? "var(--warning)" : "var(--success)"
                  }}>
                    {isFull ? "To'ldi!" : `${spotsLeft} joy qoldi`}
                  </span>
                </div>
                <div style={{ height: 8, background: "var(--border)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${fillPct}%`,
                    background: isFull ? "var(--danger)"
                      : spotsLeft <= 20 ? "linear-gradient(90deg, var(--warning), var(--accent))"
                      : "linear-gradient(90deg, var(--primary), var(--success))",
                    borderRadius: "var(--radius-full)", transition: "width 0.8s ease"
                  }} />
                </div>
                <div style={{ textAlign: "right", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 4 }}>
                  {registered} / {event.capacity}
                </div>
              </div>

              {booked ? (
                <div>
                  <div style={{
                    background: "var(--success-light)", color: "var(--success)",
                    borderRadius: "var(--radius-md)", padding: "12px 16px",
                    fontWeight: 600, textAlign: "center", marginBottom: 12, fontSize: "0.9rem"
                  }}>✅ Siz allaqachon bron qilgansiz!</div>
                  <Link to="/my-bookings" className="btn btn-outline btn-full">
                    Bronlarimni Ko'rish
                  </Link>
                </div>
              ) : isFull ? (
                <div style={{
                  background: "var(--danger-light)", color: "var(--danger)",
                  borderRadius: "var(--radius-md)", padding: "14px",
                  fontWeight: 700, textAlign: "center", fontSize: "0.95rem"
                }}>❌ Joylar to'ldi</div>
              ) : (
                <Link to={`/booking/${event.id}`} className="btn btn-primary btn-full btn-lg">
                  🎫 Ticket Bron Qilish
                </Link>
              )}

              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "✓ Bir zumda tasdiqlash",
                  "✓ Bepul bekor qilish",
                  "✓ Xavfsiz to'lov"
                ].map(item => (
                  <div key={item} style={{ color: "var(--text-secondary)", fontSize: "0.82rem", display: "flex", gap: 6 }}>
                    <span style={{ color: "var(--success)", fontWeight: 700 }}>{item.split(" ")[0]}</span>
                    <span>{item.split(" ").slice(1).join(" ")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", marginBottom: 24 }}>
              O'xshash Eventlar
            </h2>
            <div className="events-grid">
              {related.map(e => <EventCard key={e.id} event={e} compact />)}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
