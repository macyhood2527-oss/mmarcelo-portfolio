import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';

export default function Contact() {
  return (
    <section id="contact" className="section">
      <Container>
        <div
          className="card"
          style={{
            padding: 'clamp(24px, 4vw, 38px)',
            marginTop: 14,
            borderRadius: 32,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.15fr) minmax(260px, 0.85fr)',
              gap: 22,
              alignItems: 'start',
            }}
          >
            <div>
              <div className="kicker">Connect with me</div>

              <h2 className="h2" style={{ marginTop: 6 }}>
                Let&apos;s make something quietly excellent together.
              </h2>

              <p
                className="p"
                style={{
                  marginTop: 12,
                  maxWidth: 720,
                  color: 'var(--muted)',
                }}
              >
                I&apos;m open to freelance projects, thoughtful collaborations, and practical systems work that benefits from
                strong backend foundations and a warm product mindset.
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  marginTop: 22,
                  flexWrap: 'wrap',
                }}
              >
                <a href="mailto:macyhood2527@gmail.com">
                  <Button variant="primary">Email me</Button>
                </a>

                <a
                  href="https://www.linkedin.com/in/melissamarcelo/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="secondary">LinkedIn</Button>
                </a>

                <a
                  href="https://github.com/macyhood2527-oss"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="secondary">GitHub</Button>
                </a>
              </div>
            </div>

            <div
              style={{
                borderRadius: 26,
                border: '1px solid rgba(139, 107, 78, 0.18)',
                background: 'linear-gradient(180deg, rgba(239, 231, 220, 0.82), rgba(255, 250, 244, 0.9))',
                padding: 22,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
              }}
            >
              <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent-strong)' }}>
                Best for
              </div>
              <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
                <div className="p">Freelance product work</div>
                <div className="p">Backend implementation support</div>
                <div className="p">Collaborative builds with clear communication</div>
              </div>

              <div
                style={{
                  marginTop: 18,
                  paddingTop: 18,
                  borderTop: '1px solid rgba(139, 107, 78, 0.14)',
                  fontSize: 14,
                  color: 'var(--text)',
                }}
              >
                macyhood2527@gmail.com
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            #contact .card > div {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </Container>
    </section>
  );
}
