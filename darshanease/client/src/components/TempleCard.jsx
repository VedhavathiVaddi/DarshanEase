import { Link } from 'react-router-dom';

function TempleCard({ temple }) {
  const initial = temple.name.trim().charAt(0);

  return (
    <article className="arch-card">
      <div className="temple-media" aria-hidden="true">
        {initial}
      </div>
      <div className="temple-body">
        <div className="temple-meta">
          <span className="badge">{temple.deity}</span>
          <span className="badge badge-gold">★ {temple.rating}</span>
        </div>
        <h3>{temple.name}</h3>
        <p className="temple-city">{temple.city}</p>
        <p className="temple-desc">{temple.description}</p>
        <Link to={`/temples/${temple.id}`} className="btn btn-outline btn-sm btn-block">
          View details
        </Link>
      </div>
    </article>
  );
}

export default TempleCard;
