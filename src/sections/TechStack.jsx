import Container from '../components/layout/Container.jsx';
import { tech } from '../data/tech.js';

export default function TechStack({ activeTech, onToggleTech }) {
  return (
    <section id="stack" className="section">
      <Container>
        <div className="kicker">Technical stack</div>
        <h2 className="h2" style={{ marginTop: 6 }}>
          Tools I use (and grow into)
        </h2>

        <div
          className="card"
          style={{
            padding: 22,
            marginTop: 14,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          {tech.map(({ key, label }) => {
            const isActive = activeTech === key;

            return (
              <button
                key={key}
                onClick={() => onToggleTech(key)}
                style={{
                  borderRadius: 999,
                  padding: '7px 12px',
                  border: '1px solid var(--border)',
                  background: isActive ? 'var(--accent-2)' : 'rgba(255,255,255,0.02)',
                  color: isActive ? 'var(--text)' : 'var(--muted)',
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'transform 140ms ease, background 140ms ease',
                }}
                title={isActive ? 'Click to clear filter' : 'Filter projects by this tech'}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div style={{ color: 'var(--faint)', fontSize: 13, marginTop: 10 }}>
          {activeTech ? (
            <>
              Filtering projects by <span style={{ color: 'var(--text)' }}>{activeTech}</span> (click again to
              clear).
            </>
          ) : (
            <>Click a tag to filter related projects.</>
          )}
        </div>
      </Container>
    </section>
  );
}