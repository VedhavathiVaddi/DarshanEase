import { useState } from 'react';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { isValidPhone, isNotEmpty } from '../utils/validators';

function Profile() {
  const { user, updateProfile } = useAuth();
  const [values, setValues] = useState({ name: user.name, phone: user.phone });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  function update(field, value) {
    setSaved(false);
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = {};
    if (!isNotEmpty(values.name)) validationErrors.name = 'Enter your full name.';
    if (!isValidPhone(values.phone)) validationErrors.phone = 'Enter a valid 10-digit mobile number.';
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSaving(true);
    await updateProfile(values);
    setSaving(false);
    setSaved(true);
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Your account</span>
          <h1>Profile</h1>
        </div>

        <form className="form-card" onSubmit={handleSubmit} noValidate>
          {saved && <div className="badge badge-gold" style={{ marginBottom: '1rem' }}>Profile updated</div>}

          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" value={user.email} disabled />
          </div>

          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" type="text" value={values.name} onChange={(e) => update('name', e.target.value)} />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="field">
            <label htmlFor="phone">Mobile number</label>
            <input id="phone" type="tel" maxLength={10} value={values.phone} onChange={(e) => update('phone', e.target.value)} />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>

          <Button type="submit" variant="primary" block disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Profile;
