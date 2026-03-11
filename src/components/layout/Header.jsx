import Link from 'next/link';
import { Flower2 } from 'lucide-react';
import Container from './Container.jsx';
import Nav from './Nav.jsx';

export default function Header() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        backdropFilter: 'blur(10px)',
        background: 'rgba(247, 243, 237, 0.84)',
        borderBottom: '1px solid rgba(139, 107, 78, 0.18)',
      }}
    >
      <Container>
        <div
          style={{
            minHeight: 74,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 999,
                display: 'grid',
                placeItems: 'center',
                color: 'var(--accent-strong)',
                background: 'linear-gradient(180deg, rgba(207, 224, 195, 0.95) 0%, rgba(239, 231, 220, 0.92) 100%)',
                border: '1px solid rgba(111, 138, 110, 0.14)',
                boxShadow: '0 0 0 8px rgba(207, 224, 195, 0.48)',
                flex: '0 0 auto',
              }}
            >
              <Flower2 size={15} strokeWidth={1.9} />
            </div>

            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--text)',
                  whiteSpace: 'nowrap',
                }}
              >
                Melissa Marcelo
              </div>
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--faint)',
                }}
              >
                Developer portfolio
              </div>
            </div>
          </Link>

          <Nav />
        </div>
      </Container>
    </header>
  );
}
