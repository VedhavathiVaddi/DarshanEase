import { createContext, useContext, useState, useCallback } from 'react';

export const BookingContext = createContext(null);

const emptyDraft = {
  templeId: null,
  templeName: '',
  visitorName: '',
  phone: '',
  date: '',
  timeSlot: '',
  darshanType: '',
  quantity: 1,
  amount: 0,
};

export function BookingProvider({ children }) {
  const [draft, setDraftState] = useState(emptyDraft);
  const [lastBooking, setLastBooking] = useState(null);

  const setDraft = useCallback((updates) => {
    setDraftState((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetDraft = useCallback(() => setDraftState(emptyDraft), []);

  const value = { draft, setDraft, resetDraft, lastBooking, setLastBooking };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider.');
  }
  return context;
}
