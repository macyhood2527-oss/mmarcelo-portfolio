import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';

export default function Contact() {
  return (
    <section id="contact" className="section">
  <Container>
    <div
      className="card"
      style={{
        padding: 28,
        marginTop: 14,
      }}
    >
      <div className="kicker">Contact</div>

      <h2 className="h2" style={{ marginTop: 6 }}>
        Let’s connect.
      </h2>

      <p
        className="p"
        style={{
          marginTop: 12,
          maxWidth: 720,
          color: 'var(--muted)',
        }}
      >
        I’m currently growing as a backend developer and open to
        learning-focused roles, collaborative builds, and meaningful system work.
        Feel free to reach out.
      </p>

      <div
        style={{
          display: 'flex',
          gap: 12,
          marginTop: 20,
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

      <div
        style={{
          marginTop: 16,
          fontSize: 13,
          color: 'var(--faint)',
        }}
      >
        macyhood2527@gmail.com
      </div>
    </div>
  </Container>
</section>
  );
}