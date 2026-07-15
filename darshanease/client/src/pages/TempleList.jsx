import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import TempleCard from '../components/TempleCard';
import Loader from '../components/Loader';
import { getTemples } from '../services/templeService';

function TempleList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTemples({ search: initialSearch }).then((data) => {
      setTemples(data);
      setLoading(false);
    });
  }, [initialSearch]);

  function handleSearch(query) {
    setSearchParams(query ? { search: query } : {});
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Temple directory</span>
          <h1>Find your temple</h1>
        </div>

        <SearchBar initialValue={initialSearch} onSearch={handleSearch} />

        <div style={{ marginTop: '2.5rem' }}>
          {loading ? (
            <Loader label="Loading temples…" />
          ) : temples.length === 0 ? (
            <p className="text-center text-muted">
              No temples match "{initialSearch}". Try a different city or deity name.
            </p>
          ) : (
            <div className="grid grid-3">
              {temples.map((temple) => (
                <TempleCard key={temple.id} temple={temple} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TempleList;
