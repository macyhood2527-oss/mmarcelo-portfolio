import Container from './Container.jsx';

export default function SectionDivider() {
  return (
    <div style={{ margin: '0' }}>
      <Container>
        <div
          style={{
            height: 84,
            backgroundImage: 'url(/dividers/floral-divider.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            opacity: 0.72,
            filter: 'sepia(0.18) saturate(0.76)',
          }}
          aria-hidden="true"
        />
      </Container>
    </div>
  );
}
