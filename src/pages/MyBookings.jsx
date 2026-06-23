import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBookings, cancelBooking, formatDate } from "../utils/storage";
import { events } from "../data/events";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [cancelId, setCancelId] = useState(null);

  const load = () => setBookings(getBookings());

  useEffect(() => {
    load();
    window.scrollTo(0, 0);
  }, []);

  const handleCancel = (id) => {
    cancelBooking(id);
    load();
    setCancelId(null);
  };

  const confirmed = bookings.filter(b => b.status === "confirmed");
  const cancelled = bookings.filter(b => b.status === "cancelled");

  const BookingCard = ({ booking }) => {
    const event = events.find(e => e.id === booking.eventId);
    const isCancelled = booking.status === "cancelled";

    return (
      <div style={{
        background: "white",
        borderRadius: "var(--radius-lg)",
        border: `1px solid ${isCancelled ? "var(--border)" : "var(--border)"}`,
        boxShadow: "var(--shadow-card)",
        overflow: "hidden",
        opacity: isCancelled ? 0.65 : 1,
        transition: "var(--transition)"
      }}>
        <div style={{ display: "flex" }} className="booking-card-inner">
          {/* Image */}
          <div style={{ width: 140, flexShrink: 0, position: "relative" }}>
            <img
              src={booking.eventImage || event?.image}
              alt={booking.eventTitle}
              style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 140 }}
              onError={e => { e.target.src = `https://placehold.co/140x140/6C47FF/white?text=Event`; }}
            />
            {isCancelled && (
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(0,0,0,0.5)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <span style={{ color: "white", fontWeight: 700, fontSize: "0.8rem", textAlign: "center", padding: "0 8px" }}>
                  BEKOR QILINDI
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 10, justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", lineHeight: 1.3 }}>
                  {booking.eventTitle}
                </h3>
                <span className={`badge ${isCancelled ? "badge-cancelled" : "badge-confirmed"}`}>
                  {isCancelled ? "❌ Bekor" : "✅ Tasdiqlangan"}
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ display: "flex", gap: 8, color: "var(--text-secondary)", fontSize: "0.84rem", alignItems: "center" }}>
                  <span>📅</span>
                  <span>{formatDate(booking.eventDate)}</span>
                </div>
                <div style={{ display: "flex", gap: 8, color: "var(--text-secondary)", fontSize: "0.84rem", alignItems: "center" }}>
                  <span>📍</span>
                  <span>{booking.eventLocation}</span>
                </div>
                <div style={{ display: "flex", gap: 8, color: "var(--text-secondary)", fontSize: "0.84rem", alignItems: "center" }}>
                  <span>🎟️</span>
                  <span><strong>{booking.tickets}</strong> ta ticket · <strong>{booking.name}</strong></span>
                </div>
                <div style={{ display: "flex", gap: 8, color: "var(--text-muted)", fontSize: "0.78rem", alignItems: "center" }}>
                  <span>🕐</span>
                  <span>Bron sanasi: {new Date(booking.bookedAt).toLocaleDateString("uz-UZ")}</span>
                </div>
              </div>
            </div>

            {!isCancelled && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link to={`/events/${booking.eventId}`} className="btn btn-outline btn-sm">
                  Batafsil
                </Link>
                {cancelId === booking.id ? (
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Ishonchingiz komilmi?</span>
                    <button className="btn btn-danger btn-sm" onClick={() => handleCancel(booking.id)}>
                      Ha, bekor qil
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={() => setCancelId(null)}>
                      Yo'q
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-sm" onClick={() => setCancelId(booking.id)} style={{
                    background: "var(--danger-light)", color: "var(--danger)",
                    border: "1px solid rgba(239,68,68,0.3)", borderRadius: "var(--radius-full)",
                    padding: "8px 16px", fontWeight: 600, fontSize: "0.82rem"
                  }}>
                    Bekor qilish
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ paddingTop: 72, minHeight: "100vh", background: "var(--bg)" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a0f4a 0%, #0F0A2A 100%)",
        padding: "56px 24px 48px",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", top: -80, right: -80,
          width: 300, height: 300, borderRadius: "50%",
          background: "rgba(255,107,53,0.1)", filter: "blur(60px)"
        }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="section-tag" style={{ background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.3)", color: "#fba578" }}>
            📋 Mening Bronlarim
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 800, color: "white", marginTop: 12, marginBottom: 10
          }}>Mening Bronlarim</h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}>
            Jami {confirmed.length} ta aktiv bron
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "40px 24px 80px" }}>
        {bookings.length === 0 ? (
          <div className="empty-state" style={{ paddingTop: 100 }}>
            <div className="empty-state-icon">🎫</div>
            <h3>Hali bron qilmadingiz</h3>
            <p style={{ marginBottom: 24 }}>Qiziqarli eventlarni toping va birinchi broningizni qiling</p>
            <Link to="/events" className="btn btn-primary">
              Eventlarni Ko'rish →
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* Active */}
            {confirmed.length > 0 && (
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    background: "var(--success-light)", color: "var(--success)",
                    borderRadius: "var(--radius-full)", padding: "4px 12px", fontSize: "0.82rem"
                  }}>✅ Aktiv</span>
                  {confirmed.length} ta bron
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {confirmed.map(b => <BookingCard key={b.id} booking={b} />)}
                </div>
              </div>
            )}

            {/* Cancelled */}
            {cancelled.length > 0 && (
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{
                    background: "var(--danger-light)", color: "var(--danger)",
                    borderRadius: "var(--radius-full)", padding: "4px 12px", fontSize: "0.82rem"
                  }}>❌ Bekor qilingan</span>
                  {cancelled.length} ta
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {cancelled.map(b => <BookingCard key={b.id} booking={b} />)}
                </div>
              </div>
            )}

            <div style={{ marginTop: 16, textAlign: "center" }}>
              <Link to="/events" className="btn btn-outline">
                🎫 Boshqa Eventlar
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .booking-card-inner { flex-direction: column !important; }
          .booking-card-inner > div:first-child { width: 100% !important; height: 180px !important; }
        }
      `}</style>
    </div>
  );
}
