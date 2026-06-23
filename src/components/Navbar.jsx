import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getBookings } from "../utils/storage";
import { RightArrow } from "./ArrowIcons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const bookings = getBookings().filter(b => b.status === "confirmed");
    setBookingCount(bookings.length);
    setMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: (scrolled || menuOpen) ? "rgba(255,255,255,0.98)" : "transparent",
      backdropFilter: (scrolled || menuOpen) ? "blur(12px)" : "none",
      boxShadow: (scrolled || menuOpen) ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
      transition: "all 0.3s ease",
      borderBottom: (scrolled || menuOpen) ? "1px solid rgba(229,231,235,0.6)" : "none"
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifySpace: "space-between", justifyContent: "space-between", height: "72px" }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: 38, height: 38,
            background: "linear-gradient(135deg, #6C47FF, #FF6B35)",
            borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.1rem", fontWeight: 800, color: "white",
            fontFamily: "var(--font-display)"
          }}>E</div>
          <span style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800, fontSize: "1.25rem",
            color: (scrolled || menuOpen) ? "var(--text-primary)" : "white",
            transition: "color 0.3s ease"
          }}>EventHub</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="desktop-nav">
          {[
            { path: "/", label: "Bosh sahifa" },
            { path: "/events", label: "Eventlar" },
            { path: "/my-bookings", label: "Bronlarim" }
          ].map(({ path, label }) => (
            <Link key={path} to={path} className="nav-link" style={{
              padding: "8px 16px",
              borderRadius: "var(--radius-full)",
              fontWeight: 600,
              fontSize: "0.88rem",
              color: isActive(path)
                ? "var(--primary)"
                : (scrolled ? "var(--text-secondary)" : "rgba(255,255,255,0.85)"),
              background: isActive(path) ? "var(--primary-light)" : "transparent",
              transition: "var(--transition)",
              position: "relative"
            }}>
              {label}
              {path === "/my-bookings" && bookingCount > 0 && (
                <span style={{
                  position: "absolute", top: -2, right: -2,
                  background: "var(--accent)", color: "white",
                  borderRadius: "var(--radius-full)",
                  width: 18, height: 18,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.65rem", fontWeight: 700
                }}>{bookingCount}</span>
              )}
            </Link>
          ))}
          <Link to="/events" className="btn btn-primary btn-sm" style={{ marginLeft: "8px", display: "inline-flex", alignItems: "center", gap: 6 }}>
            Bron qilish <RightArrow size={15} color="white" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            display: "none", flexDirection: "column", gap: 5,
            padding: 8, borderRadius: 8,
            background: (scrolled || menuOpen) ? "var(--primary-light)" : "rgba(255,255,255,0.15)",
            border: (scrolled || menuOpen) ? "none" : "1px solid rgba(255,255,255,0.25)"
          }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: "block", width: 22, height: 2,
              background: (scrolled || menuOpen) ? "var(--primary)" : "white",
              borderRadius: 2, transition: "all 0.2s",
              transform: menuOpen
                ? i === 0 ? "translateY(7px) rotate(45deg)"
                  : i === 1 ? "scale(0)"
                  : "translateY(-7px) rotate(-45deg)"
                : "none",
              opacity: menuOpen && i === 1 ? 0 : 1
            }} />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: "white",
          padding: "16px 24px 24px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          display: "flex", flexDirection: "column", gap: 4
        }}>
          {[
            { path: "/", label: "🏠 Bosh sahifa" },
            { path: "/events", label: "🎫 Eventlar" },
            { path: "/my-bookings", label: `📋 Bronlarim ${bookingCount > 0 ? `(${bookingCount})` : ""}` }
          ].map(({ path, label }) => (
            <Link key={path} to={path} style={{
              padding: "12px 16px",
              borderRadius: "var(--radius-md)",
              fontWeight: 600,
              color: isActive(path) ? "var(--primary)" : "var(--text-secondary)",
              background: isActive(path) ? "var(--primary-light)" : "transparent"
            }}>{label}</Link>
          ))}
        </div>
      )}

    </nav>
  );
}
