const BOOKINGS_KEY = 'eventhub_bookings';

export const getBookings = () => {
  try {
    const data = localStorage.getItem(BOOKINGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveBooking = (booking) => {
  const bookings = getBookings();
  const newBooking = {
    ...booking,
    id: Date.now(),
    bookedAt: new Date().toISOString(),
    status: 'confirmed'
  };
  bookings.push(newBooking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  return newBooking;
};

export const cancelBooking = (bookingId) => {
  const bookings = getBookings();
  const updated = bookings.map(b =>
    b.id === bookingId ? { ...b, status: 'cancelled' } : b
  );
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
};

export const isEventBooked = (eventId) => {
  const bookings = getBookings();
  return bookings.some(b => b.eventId === eventId && b.status === 'confirmed');
};

export const getEventStats = (event) => {
  if (!event) return { registered: 0, spotsLeft: 0, isFull: false, fillPct: 0 };
  const bookings = getBookings().filter(b => b.eventId === event.id && b.status === 'confirmed');
  const bookedTicketsCount = bookings.reduce((sum, b) => sum + Number(b.tickets), 0);
  const totalRegistered = event.registered + bookedTicketsCount;
  const spotsLeft = event.capacity - totalRegistered;
  return {
    registered: totalRegistered,
    spotsLeft: Math.max(0, spotsLeft),
    isFull: spotsLeft <= 0,
    fillPct: Math.min((totalRegistered / event.capacity) * 100, 100)
  };
};

export const parseLocalDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const formatDate = (dateStr) => {
  const date = parseLocalDate(dateStr);
  return date.toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const isToday = (dateStr) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = parseLocalDate(dateStr);
  return date.getTime() === today.getTime();
};

export const isThisWeek = (dateStr) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = parseLocalDate(dateStr);
  const weekFromNow = new Date(today);
  weekFromNow.setDate(today.getDate() + 7);
  weekFromNow.setHours(23, 59, 59, 999);
  return date >= today && date <= weekFromNow;
};

