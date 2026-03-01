import Container from './Container.jsx';

export default function SectionDivider() {
  return (
    <div style={{ margin: '0px 0' }}>
      <Container>
        <div
          style={{
            height: 100, // smaller
            backgroundImage: 'url(/dividers/floral-divider.png)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            opacity: 1,
          }}
          aria-hidden="true"
        />
      </Container>
    </div>
  );
}