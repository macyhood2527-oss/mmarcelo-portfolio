import Container from './Container.jsx';

export default function PageIntro({ kicker, title, description, icon: Icon }) {
  return (
    <section className="section" style={{ paddingBottom: 28 }}>
      <Container>
        <div
          className="card"
          style={{
            padding: 'clamp(24px, 4vw, 40px)',
            borderRadius: 32,
            background: 'linear-gradient(180deg, rgba(255, 250, 244, 0.96), rgba(239, 231, 220, 0.82))',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            {Icon ? (
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 18,
                  display: 'grid',
                  placeItems: 'center',
                  background: 'rgba(207, 224, 195, 0.42)',
                  color: 'var(--accent-strong)',
                  border: '1px solid rgba(111, 138, 110, 0.16)',
                }}
              >
                <Icon size={20} strokeWidth={1.9} />
              </div>
            ) : null}

            <div className="kicker">{kicker}</div>
          </div>

          <h1 className="h2" style={{ marginTop: 16, maxWidth: 780 }}>
            {title}
          </h1>

          {description ? (
            <p className="p" style={{ marginTop: 14, maxWidth: 820 }}>
              {description}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
