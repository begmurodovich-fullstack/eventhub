import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import "./styles/global.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="*" element={
            <div style={{ paddingTop: 120, textAlign: "center", minHeight: "60vh" }}>
              <div style={{ fontSize: "5rem", marginBottom: 16 }}>🔍</div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: 12 }}>404 — Sahifa topilmadi</h1>
              <a href="/" className="btn btn-primary" style={{ display: "inline-flex", marginTop: 8 }}>Bosh sahifaga</a>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
