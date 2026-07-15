import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useBooking } from '../context/BookingContext';
import { formatCurrency, formatDate } from '../utils/helpers';

function BookingSuccess() {
  const { lastBooking } = useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lastBooking) navigate('/', { replace: true });
  }, [lastBooking, navigate]);

  if (!lastBooking) return null;

  return (
    <section className="section">
      <div className="container text-center">
        <span className="eyebrow">Booking confirmed</span>
        <h1>Your darshan is booked 🙏</h1>
        <p className="text-muted" style={{ maxWidth: 480, margin: '0 auto 2rem' }}>
          A copy of this e-ticket has been saved to your account. Show the booking ID at the
          entry gate along with a valid photo ID.
        </p>

        <div className="arch-card" style={{ maxWidth: 420, margin: '0 auto', padding: '1.6rem' }}>
          <div className="badge badge-gold" style={{ marginBottom: '1rem' }}>
            {lastBooking.status}
          </div>
          <h2 style={{ fontSize: '1.4rem' }}>{lastBooking.templeName}</h2>
          <div className="stack" style={{ textAlign: 'left', marginTop: '1rem' }}>
            <div className="row-between"><span className="text-muted">Booking ID</span><strong style={{ fontFamily: 'var(--font-mono)' }}>{lastBooking.id}</strong></div>
            <div className="row-between"><span className="text-muted">Visitor</span><strong>{lastBooking.visitorName}</strong></div>
            <div className="row-between"><span className="text-muted">Date</span><strong>{formatDate(lastBooking.date)}</strong></div>
            <div className="row-between"><span className="text-muted">Slot</span><strong>{lastBooking.timeSlot}</strong></div>
            <div className="row-between"><span className="text-muted">Darshan type</span><strong>{lastBooking.darshanType}</strong></div>
            <div className="row-between"><span className="text-muted">Devotees</span><strong>{lastBooking.quantity}</strong></div>
            <div className="row-between"><span className="text-muted">Amount paid</span><strong>{formatCurrency(lastBooking.amount)}</strong></div>
          </div>
        </div>

        <div className="row" style={{ justifyContent: 'center', marginTop: '2rem' }}>
          <Button href="/my-bookings" variant="primary">View my bookings</Button>
          <Button href="/temples" variant="outline">Book another temple</Button>
        </div>
      </div>
    </section>
  );
}

export default BookingSuccess;
