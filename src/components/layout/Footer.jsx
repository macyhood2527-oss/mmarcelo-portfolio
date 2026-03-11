import Container from './Container.jsx';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(139, 107, 78, 0.18)',
        background: 'rgba(251, 247, 241, 0.64)',
      }}
    >
      <Container>
        <div
          style={{
            padding: '28px 0',
            color: 'var(--faint)',
            fontSize: 13,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <span>© {new Date().getFullYear()} Melissa Marcelo.</span>
          <span>Designed like a calm working studio, built for thoughtful collaboration.</span>
        </div>
      </Container>
    </footer>
  );
}
