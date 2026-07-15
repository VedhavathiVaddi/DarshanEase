import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { getTempleById } from '../services/templeService';
import { TICKET_PRICE_MAP } from '../utils/constants';
import { formatCurrency } from '../utils/helpers';

function TempleDetails() {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    getTempleById(id)
      .then(setTemple)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader label="Loading temple details…" />;
  if (error) return <p className="section container text-center text-muted">{error}</p>;
  if (!temple) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="arch-card" style={{ maxWidth: 780, margin: '0 auto' }}>
          <div className="temple-media" style={{ height: 220, fontSize: '3rem' }} aria-hidden="true">
            {temple.name.charAt(0)}
          </div>
          <div className="temple-body">
            <div className="temple-meta">
              <span className="badge">{temple.deity}</span>
              <span className="badge badge-gold">★ {temple.rating}</span>
            </div>
            <h1 style={{ fontSize: '1.9rem' }}>{temple.name}</h1>
            <p className="temple-city">{temple.city}</p>
            <p>{temple.description}</p>

            <div className="diya-divider" aria-hidden="true"><span /></div>

            <h3>Darshan types &amp; pricing</h3>
            <ul className="stack" style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem' }}>
              {temple.darshanTypes.map((type) => (
                <li key={type} className="row-between" style={{ borderBottom: '1px solid var(--color-line)', paddingBottom: '0.5rem' }}>
                  <span>{type}</span>
                  <strong>{formatCurrency(TICKET_PRICE_MAP[type] ?? 0)}</strong>
                </li>
              ))}
            </ul>

            <Button href={`/book/${temple.id}`} variant="primary" block>
              Book darshan ticket
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TempleDetails;
