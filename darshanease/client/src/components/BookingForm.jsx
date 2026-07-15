import { useMemo, useState } from 'react';
import TimeSlot from './TimeSlot';
import Button from './Button';
import { TICKET_PRICE_MAP } from '../utils/constants';
import { validateBooking } from '../utils/validators';
import { formatCurrency } from '../utils/helpers';

const todayISO = new Date().toISOString().split('T')[0];

function BookingForm({ temple, initialValues, onSubmit, submitLabel = 'Continue to payment' }) {
  const [values, setValues] = useState({
    visitorName: '',
    phone: '',
    date: todayISO,
    timeSlot: '',
    darshanType: temple.darshanTypes[0],
    quantity: 1,
    ...initialValues,
  });
  const [errors, setErrors] = useState({});

  const unitPrice = TICKET_PRICE_MAP[values.darshanType] ?? 0;
  const totalAmount = useMemo(() => unitPrice * Number(values.quantity || 0), [unitPrice, values.quantity]);

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateBooking(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onSubmit({
      ...values,
      templeId: temple.id,
      templeName: temple.name,
      quantity: Number(values.quantity),
      amount: totalAmount,
    });
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <h3 className="text-center">Devotee details</h3>

      <div className="field">
        <label htmlFor="visitorName">Lead visitor name</label>
        <input
          id="visitorName"
          type="text"
          value={values.visitorName}
          onChange={(e) => update('visitorName', e.target.value)}
          placeholder="As per photo ID"
        />
        {errors.visitorName && <span className="field-error">{errors.visitorName}</span>}
      </div>

      <div className="field">
        <label htmlFor="phone">Mobile number</label>
        <input
          id="phone"
          type="tel"
          value={values.phone}
          onChange={(e) => update('phone', e.target.value)}
          placeholder="10-digit mobile number"
          maxLength={10}
        />
        {errors.phone && <span className="field-error">{errors.phone}</span>}
      </div>

      <div className="field">
        <label htmlFor="date">Darshan date</label>
        <input
          id="date"
          type="date"
          min={todayISO}
          value={values.date}
          onChange={(e) => update('date', e.target.value)}
        />
        {errors.date && <span className="field-error">{errors.date}</span>}
      </div>

      <div className="field">
        <label htmlFor="darshanType">Darshan type</label>
        <select
          id="darshanType"
          value={values.darshanType}
          onChange={(e) => update('darshanType', e.target.value)}
        >
          {temple.darshanTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.darshanType && <span className="field-error">{errors.darshanType}</span>}
      </div>

      <div className="field">
        <label htmlFor="quantity">Number of devotees</label>
        <input
          id="quantity"
          type="number"
          min={1}
          max={10}
          value={values.quantity}
          onChange={(e) => update('quantity', e.target.value)}
        />
        {errors.quantity && <span className="field-error">{errors.quantity}</span>}
      </div>

      <div className="field">
        <label>Time slot</label>
        <TimeSlot value={values.timeSlot} onChange={(slot) => update('timeSlot', slot)} />
        {errors.timeSlot && <span className="field-error">{errors.timeSlot}</span>}
      </div>

      <div className="diya-divider" aria-hidden="true"><span /></div>

      <div className="row-between">
        <span className="text-muted">Total amount</span>
        <strong>{formatCurrency(totalAmount)}</strong>
      </div>

      <Button type="submit" variant="primary" block className="mt-0" style={{ marginTop: '1.2rem' }}>
        {submitLabel}
      </Button>
    </form>
  );
}

export default BookingForm;
