import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';
import Chip from '../components/ui/Chip.jsx';

export default function Hero() {
  return (
    <section className="section">
      <Container>
        <div
          className="card heroGrid"
          style={{
            padding: 32,
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: 32,
            alignItems: 'center',
          }}
        >
          {/* LEFT SIDE */}
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Chip>Backend-first</Chip>
              <Chip>Node.js • Express • MySQL</Chip>
              <Chip>JWT • RBAC • REST APIs</Chip>
            </div>

            <h1 className="h1" style={{ marginTop: 16 }}>
              Melissa Marcelo
            </h1>

            <div style={{ marginBottom: 18 }}>
  <div
    style={{
      fontWeight: 600,
      color: 'var(--text)',
      fontSize: 17,
    }}
  >
    Backend Developer (Node.js)
  </div>

  <div
    style={{
      color: 'var(--muted)',
      fontSize: 14,
      marginTop: 4,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
    }}
  >
    Rest APIs • Authentication • Practical System Design
  </div>
</div>

            <p
  className="p"
  style={{
    maxWidth: 680,
    fontSize: 16,
    lineHeight: 1.7,
  }}
>
  I build backend systems focused on clarity, security, and maintainability.
  My work includes authentication flows, REST APIs, and structured database design.
  I’m currently strengthening my frontend skills with React while continuing
  to deepen my backend foundations.
</p>

            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              <a href="#work">
                <Button variant="primary">View Projects</Button>
              </a>
              <a href="#contact">
                <Button variant="secondary">Contact</Button>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE — PHOTO */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="heroPhotoWrapper">
              <img
                src="/me.png"
                alt="Melissa Marcelo"
                style={{
                  width: '100%',
                  maxWidth: 280,
                  borderRadius: 18,
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}