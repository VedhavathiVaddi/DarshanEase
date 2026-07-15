import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { validateRegister } from '../utils/validators';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError('');
    const validationErrors = validateRegister(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      await register(values);
      navigate('/login', { state: { registered: true } });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Join DarshanEase</span>
          <h1>Create your account</h1>
        </div>

        <form className="form-card" onSubmit={handleSubmit} noValidate>
          {serverError && <div className="form-error-banner">{serverError}</div>}

          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" type="text" value={values.name} onChange={(e) => update('name', e.target.value)} />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="field">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" value={values.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="field">
            <label htmlFor="phone">Mobile number</label>
            <input id="phone" type="tel" maxLength={10} value={values.phone} onChange={(e) => update('phone', e.target.value)} />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={values.password} onChange={(e) => update('password', e.target.value)} autoComplete="new-password" />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="field">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input id="confirmPassword" type="password" value={values.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} autoComplete="new-password" />
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>

          <Button type="submit" variant="primary" block disabled={submitting}>
            {submitting ? 'Creating account…' : 'Create account'}
          </Button>

          <p className="text-center text-muted" style={{ marginTop: '1.2rem' }}>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
