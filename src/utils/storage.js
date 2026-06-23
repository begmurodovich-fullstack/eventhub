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

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const isToday = (dateStr) => {
  const today = new Date();
  const date = new Date(dateStr);
  return date.toDateString() === today.toDateString();
};

export const isThisWeek = (dateStr) => {
  const today = new Date();
  const date = new Date(dateStr);
  const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  return date >= today && date <= weekFromNow;
};
