import { useEffect, useState } from 'react';

const links = [
  { href: '#work', label: 'Projects' },
  { href: '#stack', label: 'Stack' },
  { href: '#systems', label: 'Systems' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth < 820;
      setIsMobile(mobile);

      if (!mobile) {
        setMobileOpen(false);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const linkStyle = {
    color: 'var(--muted)',
    fontSize: 14,
    padding: '8px 10px',
    borderRadius: 10,
    textDecoration: 'none',
    transition: '0.2s ease',
    display: 'inline-block',
  };

  const buttonStyle = {
    border: '1px solid var(--border)',
    background: 'rgba(255,255,255,0.65)',
    color: 'var(--text)',
    borderRadius: 12,
    padding: '8px 12px',
    fontSize: 14,
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  };

  if (isMobile) {
    return (
      <div style={{ position: 'relative' }}>
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          style={buttonStyle}
        >
          {mobileOpen ? 'Close' : 'Menu'}
        </button>

        {mobileOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              right: 0,
              minWidth: 180,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              padding: 10,
              borderRadius: 16,
              border: '1px solid var(--border)',
              background: 'rgba(255,255,255,0.9)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              zIndex: 50,
            }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  ...linkStyle,
                  width: '100%',
                  padding: '10px 12px',
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <nav style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {links.map((l) => (
        <a key={l.href} href={l.href} style={linkStyle}>
          {l.label}
        </a>
      ))}
    </nav>
  );
}
