const FACTS = [
  { label: 'Temples onboarded', value: '6+' },
  { label: 'Bookings served', value: '2,40,000+' },
  { label: 'Avg. queue time saved', value: '90 min' },
];

function About() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Our story</span>
          <h1>About DarshanEase</h1>
        </div>

        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <p>
            DarshanEase started with a simple frustration: devotees travelling for hours, then
            standing in line for hours more, just to have a few seconds of darshan. We partner
            directly with temple trusts to open up verified time-slot booking online, so a visit
            can be planned around the darshan — not the queue.
          </p>
          <p>
            Every listing on DarshanEase reflects the temple's own published darshan types and
            pricing. We don't mark up tickets, and we don't sell through agents.
          </p>

          <div className="diya-divider" aria-hidden="true"><span /></div>

          <div className="grid grid-3">
            {FACTS.map((fact) => (
              <div key={fact.label} className="arch-card text-center" style={{ padding: '1.4rem' }}>
                <h3 style={{ marginBottom: '0.2rem' }}>{fact.value}</h3>
                <p className="text-muted mt-0">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
