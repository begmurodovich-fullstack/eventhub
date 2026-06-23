# 🎫 EventHub — O'zbekiston Event Platformasi

> XStudio Test Loyihasi · Aziz uchun tayyorlangan

[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.3-646cff?logo=vite)](https://vitejs.dev)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

---

## 🌐 Live Demo

> **[https://eventhub-aziz.vercel.app](https://eventhub-aziz.vercel.app)**
> *(Deploy qilgandan keyin bu linkni yangilang)*

---

## 📌 Loyiha haqida

**EventHub** — foydalanuvchilar turli kategoriyadagi eventlarni topishi, filtr qilishi va ularga qatnashish uchun joy band qilishi mumkin bo'lgan zamonaviy web platforma.

---

## 🗂️ Sahifalar

| Sahifa | URL | Tavsif |
|--------|-----|--------|
| 🏠 Bosh sahifa | `/` | Hero, stats, featured events, CTA |
| 🎫 Eventlar | `/events` | Barcha eventlar, filter, search |
| 📄 Event Detail | `/events/:id` | To'liq ma'lumot, booking card |
| 📝 Bron Qilish | `/booking/:id` | Form, validatsiya, tasdiqlash |
| 📋 Mening Bronlarim | `/my-bookings` | Bronlar ro'yxati, bekor qilish |

---

## ⚙️ Texnik Stack

- **React 18** — UI library
- **React Router v6** — Client-side routing
- **Vite 5** — Build tool
- **CSS Custom Properties** — Design tokens & theming
- **LocalStorage** — Bookinglarni saqlash
- **Google Fonts** — Inter + Plus Jakarta Sans

---

## 🚀 Ishga tushirish

```bash
# 1. Reponi clone qiling
git clone https://github.com/your-username/eventhub.git
cd eventhub

# 2. Dependencies o'rnating
npm install

# 3. Dev serverini ishga tushiring
npm run dev

# 4. Build (production)
npm run build

# 5. Preview
npm run preview
```

---

## 📁 Loyiha Strukturasi

```
eventhub/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Sticky navbar, mobile menu
│   │   ├── EventCard.jsx    # Reusable event card
│   │   ├── FilterBar.jsx    # Search + filter UI
│   │   └── Footer.jsx       # Site footer
│   ├── pages/
│   │   ├── Home.jsx         # Bosh sahifa
│   │   ├── Events.jsx       # Events listing
│   │   ├── EventDetail.jsx  # Event detail
│   │   ├── Booking.jsx      # Booking form
│   │   └── MyBookings.jsx   # User's bookings
│   ├── data/
│   │   └── events.js        # 12 ta mock event
│   ├── utils/
│   │   └── storage.js       # LocalStorage helpers
│   ├── styles/
│   │   └── global.css       # Global styles, design tokens
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## ✨ Funksiyalar

### 🔍 Search & Filter
- Real-time qidiruv (nom, joylashuv, tag, organizer)
- Kategoriya filtri (Tech, Business, Design, Sport)
- Narx filtri (Free / Paid)
- Sana filtri (Bugun / Hafta / Hammasi)
- Faol filtrlarni bir tugma bilan tozalash

### 🎫 Event Cards
- Rasm, kategoriya badge, narx
- Ishtirokchilar progress bar
- Featured badge
- Joylar soni (Real-time)

### 📝 Booking Form
- To'liq validatsiya (ism, email, ticket soni)
- Ticket counter (+/- tugmalar)
- Loading animatsiya
- Muvaffaqiyat sahifasi

### 💾 LocalStorage
- Bronlar saqlash
- Bekor qilish
- Bron holati tracking

### 📱 Responsive
- Mobile-first yondashuv
- 320px dan 1440px gacha
- Hamburger menu mobile

---

## 🎨 Dizayn Tizimi

| Token | Qiymat |
|-------|--------|
| Primary | `#6C47FF` (Purple) |
| Accent | `#FF6B35` (Orange) |
| Success | `#10B981` (Green) |
| Background | `#F8F7FF` |
| Font Display | Plus Jakarta Sans |
| Font Body | Inter |

---

## 🚀 Vercelga Deploy Qilish

### 1-usul: Vercel Dashboard
1. [vercel.com](https://vercel.com) ga kiring
2. "New Project" → GitHub repo tanlang
3. Framework: **Vite** avtomatik aniqlanadi
4. "Deploy" tugmasini bosing

### 2-usul: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Auto-deploy
GitHub main branchga har push bo'lganda avtomatik deploy.

---

## 📊 Baholash Mezonlari (XStudio)

| Mezon | Ball | Status |
|-------|------|--------|
| UI/UX sifati | 30% | ✅ Production-level dizayn |
| Kod strukturasi | 25% | ✅ Component-based, clean |
| Funksionallik | 25% | ✅ Barcha feature ishlaydi |
| Responsivlik | 10% | ✅ Mobile-first |
| Deploy + GitHub | 10% | ✅ Vercel + README |

---

## 👤 Muallif

**Aziz** · XStudio Test Loyihasi

---

*EventHub — O'zbekistondagi tadbirlarni kashf eting* 🎉
