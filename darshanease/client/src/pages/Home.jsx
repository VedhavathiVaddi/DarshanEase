import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import TempleCard from '../components/TempleCard';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { getTemples } from '../services/templeService';

const STEPS = [
  { title: 'Pick your temple', detail: 'Search by name, deity, or city to find the right darshan.' },
  { title: 'Choose a slot', detail: 'Select a date and time slot that fits your travel plans.' },
  { title: 'Pay & carry your e-ticket', detail: 'Confirm payment and show your QR ticket at the gate.' },
];

function Home() {
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getTemples().then((data) => {
      setTemples(data.slice(0, 3));
      setLoading(false);
    });
  }, []);

  function handleSearch(query) {
    navigate(query ? `/temples?search=${encodeURIComponent(query)}` : '/temples');
  }

  return (
    <>
      <section className="section" style={{ paddingBottom: '2rem' }}>
        <div className="container text-center">
          <span className="eyebrow">Skip the queue, not the darshan</span>
          <h1>Book your temple darshan in minutes</h1>
          <p className="text-muted" style={{ maxWidth: 560, margin: '0 auto 2rem' }}>
            DarshanEase brings verified time-slot booking for India's most visited temples —
            transparent pricing, instant e-tickets, no agents.
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      <div className="container">
        <div className="diya-divider" aria-hidden="true"><span /></div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Popular this week</span>
            <h2>Featured temples</h2>
          </div>
          {loading ? (
            <Loader label="Fetching featured temples…" />
          ) : (
            <div className="grid grid-3">
              {temples.map((temple) => (
                <TempleCard key={temple.id} temple={temple} />
              ))}
            </div>
          )}
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Button href="/temples" variant="outline">
              View all temples
            </Button>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-bg-alt)' }}>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>Three steps to your e-ticket</h2>
          </div>
          <div className="grid grid-3">
            {STEPS.map((step, i) => (
              <div key={step.title} className="arch-card" style={{ padding: '1.6rem 1.4rem' }}>
                <span className="badge badge-gold">Step {i + 1}</span>
                <h3 style={{ marginTop: '0.6rem' }}>{step.title}</h3>
                <p className="text-muted mt-0">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
