import { useState } from 'react';
import Button from '../components/Button';
import { isNotEmpty, isValidEmail } from '../utils/validators';
import { sleep } from '../utils/helpers';

function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = {};
    if (!isNotEmpty(values.name)) validationErrors.name = 'Enter your name.';
    if (!isValidEmail(values.email)) validationErrors.email = 'Enter a valid email address.';
    if (!isNotEmpty(values.message)) validationErrors.message = 'Write a short message.';
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSending(true);
    await sleep(500); // mock network call — wire to a real support endpoint later
    setSending(false);
    setSent(true);
    setValues({ name: '', email: '', message: '' });
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">We're here to help</span>
          <h1>Contact us</h1>
        </div>

        <form className="form-card" onSubmit={handleSubmit} noValidate>
          {sent && (
            <div className="badge badge-gold" style={{ marginBottom: '1rem' }}>
              Message sent — we'll reply within 24 hours.
            </div>
          )}

          <div className="field">
            <label htmlFor="name">Your name</label>
            <input id="name" type="text" value={values.name} onChange={(e) => update('name', e.target.value)} />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" value={values.email} onChange={(e) => update('email', e.target.value)} />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows={5} value={values.message} onChange={(e) => update('message', e.target.value)} />
            {errors.message && <span className="field-error">{errors.message}</span>}
          </div>

          <Button type="submit" variant="primary" block disabled={sending}>
            {sending ? 'Sending…' : 'Send message'}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
