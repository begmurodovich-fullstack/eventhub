import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { events } from "../data/events";
import { saveBooking, formatDate, isEventBooked, getEventStats } from "../utils/storage";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === parseInt(id));
  const { spotsLeft } = getEventStats(event);
  const maxTickets = event ? Math.min(10, spotsLeft) : 1;

  const [form, setForm] = useState({ name: "", email: "", tickets: 1, note: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (event) {
      if (isEventBooked(event.id)) {
        navigate(`/events/${event.id}`);
      } else {
        const { isFull } = getEventStats(event);
        if (isFull) {
          navigate(`/events/${event.id}`);
        }
      }
    }
  }, [event, navigate]);

  if (!event) return (
    <div style={{ paddingTop: 120, textAlign: "center", minHeight: "60vh" }}>
      <h2>Event topilmadi</h2>
      <Link to="/events" className="btn btn-primary" style={{ marginTop: 20, display: "inline-flex" }}>
        Eventlarga qaytish
      </Link>
    </div>
  );

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Ism kamida 2 ta harf bo'lishi kerak";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "To'g'ri email manzil kiriting";
    
    const { spotsLeft } = getEventStats(event);
    if (!form.tickets || form.tickets < 1 || form.tickets > 10) {
      e.tickets = "Ticket soni 1 dan 10 gacha bo'lishi kerak";
    } else if (form.tickets > spotsLeft) {
      e.tickets = spotsLeft > 0 
        ? `Uzr, faqatgina ${spotsLeft} ta bo'sh joy qoldi` 
        : "Uzr, bu eventda bo'sh joy qolmagan";
    }
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    saveBooking({ eventId: event.id, eventTitle: event.title, eventDate: event.date, eventLocation: event.location, eventImage: event.image, ...form });
    setLoading(false);
    setSubmitted(true);
  };

  const total = event.price * form.tickets;

  if (submitted) return (
    <div style={{ paddingTop: 72, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
      <div style={{
        background: "white", borderRadius: "var(--radius-xl)", padding: "56px 40px",
        textAlign: "center", maxWidth: 480, width: "100%",
        boxShadow: "var(--shadow-lg)", margin: "24px"
      }}>
        <div style={{
          width: 88, height: 88, borderRadius: "50%",
          background: "var(--success-light)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px", fontSize: "2.5rem"
        }}>✅</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.6rem", marginBottom: 8 }}>
          Bron Muvaffaqiyatli!
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: 8 }}>
          <strong>{form.name}</strong>, siz <strong>{event.title}</strong> uchun {form.tickets} ta ticket bron qildingiz.
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: 28 }}>
          Tasdiqlash xati <strong>{form.email}</strong> manziliga yuborildi.
        </p>
        <div style={{
          background: "var(--bg)", borderRadius: "var(--radius-md)", padding: "16px",
          marginBottom: 28, display: "flex", justifyContent: "space-between",
          fontSize: "0.88rem"
        }}>
          <span style={{ color: "var(--text-secondary)" }}>📅 {formatDate(event.date)}</span>
          <span style={{ color: "var(--text-secondary)" }}>📍 {event.location.split(",")[0]}</span>
        </div>
        <div style={{ display: "flex", gap: 12, flexDirection: "column" }}>
          <Link to="/my-bookings" className="btn btn-primary btn-full">📋 Bronlarimni Ko'rish</Link>
          <Link to="/events" className="btn btn-outline btn-full">Boshqa Eventlar</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 72, minHeight: "100vh", background: "var(--bg)" }}>
      <div className="container" style={{ padding: "48px 24px 80px" }}>
        <button onClick={() => navigate(-1)} style={{
          color: "var(--text-secondary)", background: "white",
          border: "1px solid var(--border)", padding: "8px 16px",
          borderRadius: "var(--radius-full)", fontSize: "0.84rem",
          fontWeight: 600, marginBottom: 24, cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 6
        }}>← Orqaga</button>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: 32, alignItems: "start"
        }} className="booking-grid">

          {/* Form */}
          <div style={{ background: "white", borderRadius: "var(--radius-xl)", padding: "36px", boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.6rem", marginBottom: 6 }}>
              Ticket Bron Qilish
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: 32 }}>
              Ma'lumotlarni to'g'ri va to'liq kiriting
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Name */}
              <div className="form-group">
                <label className="form-label">To'liq Ism *</label>
                <input
                  type="text"
                  className={`form-input ${errors.name ? "error" : ""}`}
                  placeholder="Masalan: Aziz Karimov"
                  value={form.name}
                  onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                />
                {errors.name && <span className="form-error">⚠️ {errors.name}</span>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">Email Manzil *</label>
                <input
                  type="email"
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder="sizning@email.com"
                  value={form.email}
                  onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                />
                {errors.email && <span className="form-error">⚠️ {errors.email}</span>}
              </div>

              {/* Tickets */}
              <div className="form-group">
                <label className="form-label">Ticket Soni *</label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button
                    onClick={() => setForm({ ...form, tickets: Math.max(1, form.tickets - 1) })}
                    style={{
                      width: 40, height: 40, borderRadius: "var(--radius-md)",
                      background: "var(--primary-light)", color: "var(--primary)",
                      border: "none", cursor: "pointer", fontSize: "1.2rem", fontWeight: 700
                    }}>−</button>
                  <input
                    type="number"
                    className={`form-input ${errors.tickets ? "error" : ""}`}
                    style={{ textAlign: "center", width: 80 }}
                    value={form.tickets}
                    min={1} max={maxTickets}
                    onChange={e => { setForm({ ...form, tickets: parseInt(e.target.value) || 1 }); setErrors({ ...errors, tickets: "" }); }}
                  />
                  <button
                    onClick={() => setForm({ ...form, tickets: Math.min(maxTickets, form.tickets + 1) })}
                    style={{
                      width: 40, height: 40, borderRadius: "var(--radius-md)",
                      background: "var(--primary-light)", color: "var(--primary)",
                      border: "none", cursor: "pointer", fontSize: "1.2rem", fontWeight: 700
                    }}>+</button>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.84rem" }}>max {maxTickets}</span>
                </div>
                {errors.tickets && <span className="form-error">⚠️ {errors.tickets}</span>}
              </div>

              {/* Note */}
              <div className="form-group">
                <label className="form-label">Qo'shimcha Izoh <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(ixtiyoriy)</span></label>
                <textarea
                  className="form-input"
                  placeholder="Maxsus talab yoki savol bo'lsa yozing..."
                  value={form.note}
                  onChange={e => setForm({ ...form, note: e.target.value })}
                  rows={3}
                  style={{ resize: "vertical" }}
                />
              </div>

              {/* Total */}
              {event.price > 0 && (
                <div style={{
                  background: "var(--primary-light)",
                  borderRadius: "var(--radius-md)", padding: "16px 20px",
                  display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                    {form.tickets} ticket × ${event.price}
                  </span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 800, color: "var(--primary)" }}>
                    ${total}
                  </span>
                </div>
              )}

              <button
                className="btn btn-primary btn-full btn-lg"
                onClick={handleSubmit}
                disabled={loading}
                style={{ marginTop: 8, opacity: loading ? 0.8 : 1 }}
              >
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "white", borderRadius: "50%",
                      animation: "spin 0.7s linear infinite", display: "inline-block"
                    }} />
                    Bronlanmoqda...
                  </span>
                ) : "🎫 Bron Qilishni Tasdiqlash"}
              </button>
            </div>
          </div>

          {/* Summary */}
          <div style={{ position: "sticky", top: 88 }}>
            <div style={{ background: "white", borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}>
              <img
                src={event.image} alt={event.title}
                style={{ width: "100%", height: 180, objectFit: "cover" }}
                onError={e => { e.target.src = `https://placehold.co/400x180/6C47FF/white?text=${encodeURIComponent(event.category)}`; }}
              />
              <div style={{ padding: 20 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", marginBottom: 16 }}>
                  {event.title}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { icon: "📅", text: `${formatDate(event.date)}, ${event.time}` },
                    { icon: "📍", text: event.location },
                    { icon: "🎟️", text: event.type === "Free" ? "Bepul tadbir" : `$${event.price} / ticket` }
                  ].map(({ icon, text }) => (
                    <div key={icon} style={{ display: "flex", gap: 8, fontSize: "0.86rem", color: "var(--text-secondary)" }}>
                      <span>{icon}</span><span>{text}</span>
                    </div>
                  ))}
                </div>
                <div style={{
                  marginTop: 16, padding: "12px", background: "var(--success-light)",
                  borderRadius: "var(--radius-md)", fontSize: "0.82rem", color: "var(--success)", fontWeight: 600
                }}>
                  🔒 Ma'lumotlaringiz xavfsiz saqlanadi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
