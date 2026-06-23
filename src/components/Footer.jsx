import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-dark)", color: "white", padding: "56px 0 24px" }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 40,
          marginBottom: 48
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 38, height: 38,
                background: "linear-gradient(135deg, #6C47FF, #FF6B35)",
                borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.1rem", fontWeight: 800, fontFamily: "var(--font-display)"
              }}>E</div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem" }}>EventHub</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", lineHeight: 1.7, maxWidth: 260 }}>
              O'zbekistondagi eng yirik event platformasi. Tadbirlarni topish, bron qilish va boshqarish uchun yagona platforma.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.5)" }}>
              Sahifalar
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { to: "/", label: "Bosh sahifa" },
                { to: "/events", label: "Barcha eventlar" },
                { to: "/my-bookings", label: "Mening bronlarim" }
              ].map(({ to, label }) => (
                <Link key={to} to={to} style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "white"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}
                >{label}</Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.5)" }}>
              Kategoriyalar
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Tech", "Business", "Design", "Sport"].map(cat => (
                <Link key={cat} to={`/events?category=${cat}`}
                  style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "white"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}
                >{cat}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(255,255,255,0.5)" }}>
              Aloqa
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "📧", text: "info@eventhub.uz" },
                { icon: "📞", text: "+998 71 123 45 67" },
                { icon: "📍", text: "Toshkent, O'zbekiston" }
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", gap: 8, color: "rgba(255,255,255,0.6)", fontSize: "0.88rem" }}>
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12
        }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem" }}>
            © 2025 EventHub. Barcha huquqlar himoyalangan.
          </p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem" }}>
            XStudio Test Loyihasi · Aziz uchun tayyorlangan
          </p>
        </div>
      </div>
    </footer>
  );
}
