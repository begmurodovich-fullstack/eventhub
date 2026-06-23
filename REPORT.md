# 📊 EventHub — Loyiha Hisoboti

**XStudio Frontend Test · Aziz**  
**Sana:** 2025  
**Stack:** React 18 + Vite + CSS Custom Properties

---

## 1. Loyiha Tavsifi

EventHub — O'zbekistondagi foydalanuvchilar uchun zamonaviy event booking va listing platformasi. Loyiha XStudio test vazifasi sifatida ishlab chiqilgan bo'lib, real production darajasidagi frontend application yaratish maqsadini ko'zlaydi.

---

## 2. Texnik Yechimlar

### 2.1 Stack Tanlovi

**React 18** tanlandi, chunki:
- Component-based arxitektura kodni modular va reusable qiladi
- Hooks (useState, useEffect, useMemo) bilan state management qulay
- React Router v6 orqali SPA navigation

**Vite** build tool sifatida:
- Dev server tezligi (< 300ms cold start)
- ES modules asosida ishlaydi
- Vercel bilan native integratsiya

**CSS Custom Properties** (Tailwind o'rniga):
- Zero dependency
- Design token tizimi
- Runtime theming imkoniyati

### 2.2 State Management

Loyihada external state management library ishlatilmadi. Buning o'rniga:
- `useState` — lokal komponent state
- `useMemo` — filter natijalarini memoize qilish (performance)
- `LocalStorage` — persistent user data

```javascript
// Misol: filter optimizatsiyasi
const filtered = useMemo(() => {
  return events.filter(event => {
    const matchCat = filters.category === "All" || event.category === filters.category;
    const matchPrice = filters.price === "All" || event.type === filters.price;
    // ...
  });
}, [filters]); // faqat filters o'zgarganda qayta hisoblaydi
```

### 2.3 LocalStorage Arxitekturasi

```javascript
// Barcha booking operatsiyalari storage.js da markazlashgan
getBookings()     → barcha bronlarni olish
saveBooking()     → yangi bron saqlash (auto ID + timestamp)
cancelBooking()   → status = 'cancelled' ga o'zgartirish
isEventBooked()   → event bron qilinganligini tekshirish
```

---

## 3. Komponent Arxitekturasi

```
App (routing)
├── Navbar          → Sticky, scroll-aware, mobile responsive
├── Pages
│   ├── Home        → Hero + Stats + Featured + How it works + CTA
│   ├── Events      → FilterBar + EventCard grid
│   ├── EventDetail → Banner + Info + Booking sidebar + Related
│   ├── Booking     → Form + Validation + Success state
│   └── MyBookings  → Confirmed + Cancelled lists
├── Components
│   ├── EventCard   → Image, badges, capacity bar, tags, CTA
│   └── FilterBar   → Search input + 3 filter groups + reset
└── Footer
```

### Reusable Components

**EventCard** — `compact` prop orqali 2 xil rejimda ishlaydi:
- Normal: tags, capacity bar, to'liq ma'lumot
- Compact: Event Detail sahifasidagi "O'xshash eventlar" uchun

**FilterBar** — ichki `FilterGroup` helper component bilan DRY yondashuv

---

## 4. Dizayn Tizimi

### Color Palette

```css
--primary: #6C47FF    /* Asosiy rang — purple */
--accent:  #FF6B35    /* Accent — orange */
--success: #10B981    /* Muvaffaqiyat — green */
--danger:  #EF4444    /* Xato — red */
--bg:      #F8F7FF    /* Background */
```

Rang strategiyasi: Purple asosiy rang sifatida professional va ishonchli ko'rinish beradi. Orange accent energiya va harakatni ifodalaydi — event platformasiga mos.

### Typography

- **Plus Jakarta Sans** — Display/heading uchun (bold, expressive)
- **Inter** — Body/UI text uchun (o'qishli, neytral)

### Spacing & Radius

CSS Custom Properties orqali butun loyihada izchil spacing va border-radius ishlatiladi.

---

## 5. Funksionallik Tavsifi

### 5.1 Search

```
Real-time qidiruv quyidagi maydonlar bo'yicha:
- event.title
- event.location
- event.organizer
- event.tags (array)
```

### 5.2 Filter Kombinatsiyasi

Barcha filtrlar bir vaqtda ishlaydi (AND logic):
```
category === "Tech" AND price === "Free" AND date === "This Week" AND search === "AI"
```

### 5.3 Form Validatsiya

```javascript
validate() → {
  name: "Ism kamida 2 ta harf bo'lishi kerak",
  email: "To'g'ri email manzil kiriting",  // regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  tickets: "Ticket soni 1 dan 10 gacha"
}
```

Real-time error clearing: foydalanuvchi yozgan zahot error yo'qoladi.

### 5.4 Capacity System

```
spotsLeft = capacity - registered
isFull: danger qizil rang
isAlmostFull (≤20): warning sariq rang
Normal: success yashil rang
```

---

## 6. Responsive Dizayn

### Breakpoints

```css
Mobile:  < 640px   → 1 column, hamburger menu
Tablet:  640-768px → 1-2 column
Desktop: > 768px   → 2-3 column grid
```

### Mobile-specific

- Hamburger menu (animatsiyali)
- Booking card: flex → column
- Detail page grid: 2col → 1col
- Font size: `clamp()` bilan fluid scaling

---

## 7. Performance

| Texnika | Foyda |
|---------|-------|
| `useMemo` filter | Har render qayta hisoblashni oldini oladi |
| Lazy image | `onError` fallback bilan |
| CSS transitions | GPU-accelerated transform |
| No external CSS lib | Bundle hajmi minimal |

---

## 8. Kelajakdagi Yaxshilanishlar

Hozirgi loyihaga qo'shish mumkin bo'lgan funksiyalar:

- **Backend integratsiya** — Node.js/Django API
- **Autentifikatsiya** — JWT token, Google OAuth
- **To'lov tizimi** — Click, Payme integratsiyasi
- **Email notification** — Bron tasdiqlash emaili
- **Map integratsiya** — Event joylashuvi xaritada
- **Rating & Review** — Event baholash tizimi
- **Admin Panel** — Event yaratish va boshqarish

---

## 9. Deploy Ko'rsatmalari

### Vercel (Tavsiya etiladi)

```bash
# 1. GitHub ga push
git init
git add .
git commit -m "feat: initial EventHub release"
git remote add origin https://github.com/username/eventhub.git
git push -u origin main

# 2. vercel.com/new → GitHub repo → Deploy
# Framework auto-detected: Vite
```

### Netlify

```bash
# Build command: npm run build
# Publish directory: dist
# Add _redirects file:
echo "/* /index.html 200" > public/_redirects
```

---

## 10. Xulosa

EventHub loyihasi XStudio test vazifasining barcha talablarini qamrab oladi:

| Talab | Bajarildi |
|-------|-----------|
| 5 ta sahifa | ✅ Home, Events, Detail, Booking, MyBookings |
| Real search | ✅ 4 ta maydon bo'yicha |
| Filterlar | ✅ Kategoriya + Narx + Sana |
| Form validatsiya | ✅ 3 maydon, real-time |
| Responsive | ✅ Mobile-first, 320px+ |
| LocalStorage | ✅ Booking + Cancel |
| Clean kod | ✅ Component-based, reusable |
| Deploy ready | ✅ Vercel konfiguratsiyasi tayyor |
| README | ✅ To'liq dokumentatsiya |

---

*Hisobot tayyorlandi: EventHub v1.0.0*
