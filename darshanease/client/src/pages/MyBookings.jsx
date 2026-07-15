import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { useAuth } from '../hooks/useAuth';
import { getBookingsForUser, cancelBooking } from '../services/bookingService';
import { formatCurrency, formatDate } from '../utils/helpers';
import { BOOKING_STATUS } from '../utils/constants';

function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  async function loadBookings() {
    setLoading(true);
    const data = await getBookingsForUser(user.id);
    setBookings(data);
    setLoading(false);
  }

  useEffect(() => {
    loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  async function handleCancel(id) {
    setCancellingId(id);
    await cancelBooking(id);
    await loadBookings();
    setCancellingId(null);
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Your account</span>
          <h1>My bookings</h1>
        </div>

        {loading ? (
          <Loader label="Fetching your bookings…" />
        ) : bookings.length === 0 ? (
          <div className="text-center">
            <p className="text-muted">You haven't booked any darshan slots yet.</p>
            <Button href="/temples" variant="primary">Browse temples</Button>
          </div>
        ) : (
          <div className="grid grid-2">
            {bookings.map((booking) => (
              <div key={booking.id} className="arch-card" style={{ padding: '1.4rem' }}>
                <div className="row-between" style={{ marginBottom: '0.6rem' }}>
                  <span className="badge badge-gold">{booking.id}</span>
                  <span
                    className="badge"
                    style={
                      booking.status === BOOKING_STATUS.CANCELLED
                        ? { background: 'rgba(179,54,44,0.12)', color: 'var(--color-danger)' }
                        : undefined
                    }
                  >
                    {booking.status}
                  </span>
                </div>
                <h3>{booking.templeName}</h3>
                <div className="stack" style={{ fontSize: '0.9rem' }}>
                  <div className="row-between"><span className="text-muted">Date</span><span>{formatDate(booking.date)}</span></div>
                  <div className="row-between"><span className="text-muted">Slot</span><span>{booking.timeSlot}</span></div>
                  <div className="row-between"><span className="text-muted">Darshan type</span><span>{booking.darshanType}</span></div>
                  <div className="row-between"><span className="text-muted">Amount</span><span>{formatCurrency(booking.amount)}</span></div>
                </div>

                {booking.status === BOOKING_STATUS.CONFIRMED && (
                  <Button
                    variant="outline"
                    size="sm"
                    block
                    style={{ marginTop: '1rem' }}
                    disabled={cancellingId === booking.id}
                    onClick={() => handleCancel(booking.id)}
                  >
                    {cancellingId === booking.id ? 'Cancelling…' : 'Cancel booking'}
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default MyBookings;
