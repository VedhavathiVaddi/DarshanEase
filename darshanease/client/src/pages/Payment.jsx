import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../hooks/useAuth';
import { charge } from '../services/paymentService';
import { createBooking, confirmBooking } from '../services/bookingService';
import { validatePayment } from '../utils/validators';
import { formatCurrency, formatDate } from '../utils/helpers';

function Payment() {
  const { draft, resetDraft, setLastBooking } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!draft.templeId) {
      navigate('/temples', { replace: true });
    }
  }, [draft.templeId, navigate]);

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError('');
    const validationErrors = validatePayment(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setProcessing(true);
    try {
      // Free darshan types skip the gateway entirely.
      if (draft.amount > 0) {
        await charge({ amount: draft.amount, cardNumber: values.cardNumber });
      }
      const booking = await createBooking(user.id, draft);
      const confirmed = await confirmBooking(booking.id);
      setLastBooking(confirmed);
      resetDraft();
      navigate('/booking-success');
    } catch (err) {
      setServerError(err.message);
    } finally {
      setProcessing(false);
    }
  }

  if (!draft.templeId) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Final step</span>
          <h1>Payment</h1>
        </div>

        <div className="arch-card" style={{ maxWidth: 440, margin: '0 auto 1.5rem', padding: '1.2rem 1.4rem' }}>
          <div className="row-between"><span className="text-muted">Temple</span><strong>{draft.templeName}</strong></div>
          <div className="row-between"><span className="text-muted">Date</span><strong>{formatDate(draft.date)}</strong></div>
          <div className="row-between"><span className="text-muted">Slot</span><strong>{draft.timeSlot}</strong></div>
          <div className="row-between"><span className="text-muted">Devotees</span><strong>{draft.quantity}</strong></div>
          <div className="row-between"><span className="text-muted">Amount payable</span><strong>{formatCurrency(draft.amount)}</strong></div>
        </div>

        {draft.amount === 0 ? (
          <form className="form-card" onSubmit={handleSubmit}>
            <p className="text-center text-muted">
              This darshan type is free of charge. Confirm your booking below.
            </p>
            {serverError && <div className="form-error-banner">{serverError}</div>}
            <Button type="submit" variant="primary" block disabled={processing}>
              {processing ? 'Confirming…' : 'Confirm booking'}
            </Button>
          </form>
        ) : (
          <form className="form-card" onSubmit={handleSubmit} noValidate>
            {serverError && <div className="form-error-banner">{serverError}</div>}

            <div className="field">
              <label htmlFor="cardName">Name on card</label>
              <input id="cardName" type="text" value={values.cardName} onChange={(e) => update('cardName', e.target.value)} />
              {errors.cardName && <span className="field-error">{errors.cardName}</span>}
            </div>

            <div className="field">
              <label htmlFor="cardNumber">Card number</label>
              <input id="cardNumber" type="text" inputMode="numeric" maxLength={19} placeholder="1234 5678 9012 3456"
                value={values.cardNumber} onChange={(e) => update('cardNumber', e.target.value)} />
              {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
            </div>

            <div className="row">
              <div className="field" style={{ flex: 1 }}>
                <label htmlFor="expiry">Expiry (MM/YY)</label>
                <input id="expiry" type="text" placeholder="08/29" value={values.expiry} onChange={(e) => update('expiry', e.target.value)} />
                {errors.expiry && <span className="field-error">{errors.expiry}</span>}
              </div>
              <div className="field" style={{ flex: 1 }}>
                <label htmlFor="cvv">CVV</label>
                <input id="cvv" type="password" maxLength={4} value={values.cvv} onChange={(e) => update('cvv', e.target.value)} />
                {errors.cvv && <span className="field-error">{errors.cvv}</span>}
              </div>
            </div>

            <Button type="submit" variant="primary" block disabled={processing}>
              {processing ? 'Processing payment…' : `Pay ${formatCurrency(draft.amount)}`}
            </Button>
            <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.8rem' }}>
              This is a demo payment form — no real card details are transmitted.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

export default Payment;
