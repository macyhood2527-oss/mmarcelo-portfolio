import Container from './Container.jsx';
import Nav from './Nav.jsx';

export default function Header({ activeTech, onClearTech }) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        backdropFilter: 'blur(12px)',
        background: 'rgba(255,255,255,0.72)', // ✅ light frosted
        borderBottom: '1px solid var(--border)', // ✅ pastel brown via tokens
      }}
    >
      <Container>
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: 'var(--accent)',
                boxShadow: '0 0 0 6px var(--accent-2)',
                flex: '0 0 auto',
              }}
            />
            <span style={{ fontWeight: 650, letterSpacing: 0.2, whiteSpace: 'nowrap', color: 'var(--text)' }}>
              crafted in logic 🌷
            </span>

            {activeTech && (
              <button
                onClick={onClearTech}
                style={{
                  marginLeft: 6,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 10px',
                  borderRadius: 999,
                  border: '1px dashed var(--border)', // ✅ dashed pastel border
                  background: 'rgba(47, 111, 87, 0.10)', // ✅ soft green tint
                  color: 'var(--text)',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
                title="Clear active filter"
              >
                <span style={{ opacity: 0.85 }}>Filter:</span>
                <span style={{ fontWeight: 650 }}>{activeTech}</span>
                <span style={{ opacity: 0.8 }}>×</span>
              </button>
            )}
          </div>

          <Nav />
        </div>
      </Container>
    </header>
  );
}