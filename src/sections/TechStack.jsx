import Container from '../components/layout/Container.jsx';
import { tech } from '../data/tech.js';

const groups = [
  { title: 'Backend', keys: ['Node.js', 'Express', 'TypeScript', 'REST API'] },
  { title: 'Frontend', keys: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'React Native', 'Expo Router', 'JavaScript', 'Framer Motion', 'Recharts', 'Lucide React'] },
  { title: 'Data & Auth', keys: ['MySQL', 'PostgreSQL', 'SQL Reports', 'Dexie', 'IndexedDB', 'JWT Auth', 'RBAC', 'Role-Based Access', 'Supabase Auth', 'Passport (Google OAuth)', 'RLS', 'Row Level Security'] },
  { title: 'Platforms & Delivery', keys: ['Supabase', 'Supabase Storage', 'MySQL (Railway)', 'Vercel', 'Web Push', 'PWA'] },
];

export default function TechStack({ activeTech, onToggleTech }) {
  const byKey = new Map(tech.map((item) => [item.key, item]));

  return (
    <section id="stack" className="section">
      <Container>
        <div className="kicker">Technical stack</div>
        <h2 className="h2" style={{ marginTop: 6 }}>
          Tools I reach for, grouped the way I think about building
        </h2>

        <p className="p" style={{ marginTop: 10, maxWidth: 760 }}>
          A softer map of the stack behind my projects, from backend foundations to the tools I use for delivery and iteration.
        </p>

        <div
          style={{
            marginTop: 18,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 14,
          }}
        >
          {groups.map((group) => (
            <div key={group.title} className="card" style={{ padding: 22, borderRadius: 26 }}>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-strong)',
                }}
              >
                {group.title}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
                {group.keys.map((key) => {
                  const item = byKey.get(key);
                  if (!item) return null;
                  const isActive = activeTech === key;

                  return (
                    <button
                      key={key}
                      onClick={() => onToggleTech(key)}
                      style={{
                        borderRadius: 999,
                        padding: '8px 13px',
                        border: isActive ? '1px solid rgba(111, 138, 110, 0.44)' : '1px solid rgba(139, 107, 78, 0.2)',
                        background: isActive
                          ? 'linear-gradient(180deg, rgba(207, 224, 195, 0.52), rgba(255, 251, 247, 0.96))'
                          : 'rgba(255, 251, 247, 0.8)',
                        color: isActive ? 'var(--text)' : 'var(--muted)',
                        fontSize: 13,
                        cursor: 'pointer',
                        transition: 'transform 140ms ease, background 140ms ease, border-color 140ms ease',
                        boxShadow: isActive ? '0 10px 18px rgba(111, 138, 110, 0.12)' : 'none',
                      }}
                      title={isActive ? 'Click to clear filter' : 'Filter projects by this tech'}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
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

        <style>{`
          @media (max-width: 860px) {
            #stack > div > div:nth-of-type(3) {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </Container>
    </section>
  );
}
