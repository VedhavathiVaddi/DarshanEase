import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import Loader from '../components/Loader';
import { getTempleById } from '../services/templeService';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../hooks/useAuth';

function BookTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setDraft } = useBooking();
  const { user } = useAuth();

  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getTempleById(id)
      .then(setTemple)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  function handleSubmit(draft) {
    setDraft({ ...draft, phone: draft.phone || user?.phone });
    navigate('/payment');
  }

  if (loading) return <Loader label="Preparing booking form…" />;
  if (error) return <p className="section container text-center text-muted">{error}</p>;
  if (!temple) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">{temple.name}</span>
          <h1>Book your darshan slot</h1>
        </div>
        <BookingForm temple={temple} onSubmit={handleSubmit} />
      </div>
    </section>
  );
}

export default BookTicket;
