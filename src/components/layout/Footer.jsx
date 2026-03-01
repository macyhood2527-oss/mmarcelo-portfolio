import Container from './Container.jsx';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)' }}>
      <Container>
        <div style={{ padding: '22px 0', color: 'var(--faint)', fontSize: 13 }}>
        © {new Date().getFullYear()} Melissa Marcelo.
Designed & built with intention. 🌿
        </div>
      </Container>
    </footer>
  );
}