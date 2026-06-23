import { Link } from "react-router-dom";
import { events } from "../data/events";
import EventCard from "../components/EventCard";
import { RightArrow, LeftArrow } from "../components/ArrowIcons";

const stats = [
  { number: "500+", label: "Aktiv eventlar" },
  { number: "12K+", label: "Foydalanuvchilar" },
  { number: "50+", label: "Organizer" },
  { number: "98%", label: "Mamnunlik" }
];

export default function Home() {
  const featured = events.filter(e => e.featured).slice(0, 3);

  return (
    <div>
      {/* ─── HERO ─── */}
      <section style={{
        background: "linear-gradient(135deg, #0F0A2A 0%, #1a0f4a 40%, #0d1a3a 100%)",
        minHeight: "100vh",
        display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden", paddingTop: 72
      }}>
        {/* Background blobs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {[
            { top: "10%", left: "5%", size: 400, color: "rgba(108,71,255,0.18)" },
            { top: "50%", right: "5%", size: 350, color: "rgba(255,107,53,0.12)" },
            { bottom: "10%", left: "30%", size: 300, color: "rgba(16,185,129,0.08)" }
          ].map((blob, i) => (
            <div key={i} style={{
              position: "absolute", ...blob,
              width: blob.size, height: blob.size,
              borderRadius: "50%", background: blob.color,
              filter: "blur(60px)"
            }} />
          ))}
        </div>

        {/* Grid pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(108,71,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(108,71,255,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1, padding: "80px 24px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            {/* Tag */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(108,71,255,0.2)",
              border: "1px solid rgba(108,71,255,0.4)",
              color: "#a78bfa",
              padding: "8px 18px", borderRadius: "var(--radius-full)",
              fontSize: "0.8rem", fontWeight: 700, marginBottom: 28,
              letterSpacing: "0.05em"
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a78bfa", animation: "pulse 2s infinite" }} />
              O'ZBEKISTONDAGI #1 EVENT PLATFORMASI
            </div>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              fontWeight: 800, color: "white", lineHeight: 1.1,
              marginBottom: 20
            }}>
              Hayotingizni{" "}
              <span style={{
                background: "linear-gradient(135deg, #a78bfa, #6C47FF)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>To'ldiradigan</span>
              {" "}Eventlarni Toping
            </h1>

            <p style={{
              color: "rgba(255,255,255,0.65)", fontSize: "1.1rem",
              lineHeight: 1.7, maxWidth: 540, margin: "0 auto 36px"
            }}>
              Tech konferensiyalar, biznes forumlar, dizayn masterclasslar va sport tadbirlar — hammasi bir joyda. Bron qilish bir zumda.
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/events" className="btn btn-primary btn-lg" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                🎫 Eventlarni Ko'rish <RightArrow size={18} color="white" />
              </Link>
              <Link to="/my-bookings" className="btn btn-ghost btn-lg" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                📋 Mening Bronlarim <RightArrow size={18} color="white" />
              </Link>
            </div>

            {/* Floating badges */}
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 36, flexWrap: "wrap" }}>
              {["🤖 AI & Tech", "💼 Business", "🎨 Design", "⚽ Sport"].map(tag => (
                <span key={tag} style={{
                  padding: "6px 16px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "var(--radius-full)",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.82rem", fontWeight: 600
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div style={{ position: "absolute", bottom: -1, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 20C1200 60 960 80 720 60C480 40 240 0 0 20L0 80Z" fill="#F8F7FF"/>
          </svg>
        </div>

        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ padding: "60px 0", background: "white" }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 24
          }}>
            {stats.map(({ number, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.4rem", fontWeight: 800,
                  background: "linear-gradient(135deg, var(--primary), var(--accent))",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
                }}>{number}</div>
                <div style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginTop: 4, fontWeight: 500 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED EVENTS ─── */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">⭐ Featured</div>
            <h2 className="section-title">Tanlangan Eventlar</h2>
            <p className="section-subtitle">
              Eng ommabop va sifatli tadbirlar — siz uchun maxsus tanlab olingan
            </p>
          </div>
          <div className="events-grid">
            {featured.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link to="/events" className="btn btn-outline btn-lg" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              Barcha Eventlarni Ko'rish <RightArrow size={18} color="var(--primary)" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="section" style={{ background: "white" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Qanday ishlaydi</div>
            <h2 className="section-title">3 Oddiy Qadam</h2>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 32
          }}>
            {[
              {
                step: "01", icon: "🔍", title: "Eventni Toping",
                desc: "Kategoriya, narx va sana bo'yicha filtr qiling. Yuzlab eventlar ichidan o'zingizga mosini toping."
              },
              {
                step: "02", icon: "📝", title: "Joy Band Qiling",
                desc: "Ism, email va ticket soni kiriting. Bir necha soniyada bronlash yakunlanadi."
              },
              {
                step: "03", icon: "🎉", title: "Tadbirda Ishtirok Eting",
                desc: "Bronlaringizni 'Mening Bronlarim' sahifasida kuzating va tadbirga boring."
              }
            ].map(({ step, icon, title, desc }) => (
              <div key={step} style={{ textAlign: "center", padding: "32px 24px" }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "var(--radius-xl)",
                  background: "linear-gradient(135deg, var(--primary-light), #e0d9ff)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px", fontSize: "1.8rem",
                  position: "relative"
                }}>
                  {icon}
                  <span style={{
                    position: "absolute", top: -8, right: -8,
                    width: 26, height: 26,
                    background: "var(--primary)", color: "white",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.7rem", fontWeight: 800
                  }}>{step}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 10, fontSize: "1.1rem" }}>
                  {title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{
        background: "linear-gradient(135deg, #6C47FF 0%, #4a2fd4 50%, #1a0f4a 100%)",
        padding: "80px 24px", textAlign: "center"
      }}>
        <div className="container">
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 800, color: "white", marginBottom: 16
          }}>Bugun Boshlang!</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
            Minglab foydalanuvchilar allaqachon EventHub orqali o'zlari uchun mos tadbirlarni topishdi.
          </p>
          <Link to="/events" className="btn btn-accent btn-lg" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            🚀 Hoziroq Boshlang <RightArrow size={18} color="white" />
          </Link>
        </div>
      </section>
    </div>
  );
}
