function Loader({ label = 'Loading…' }) {
  return (
    <div className="loader-wrap" role="status" aria-live="polite">
      <div className="loader-ring" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default Loader;
