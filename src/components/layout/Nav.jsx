const links = [
  { href: '#work', label: 'Projects' },
  { href: '#stack', label: 'Stack' },
  { href: '#systems', label: 'Systems' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  return (
    <nav style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          style={{
            color: 'var(--muted)',
            fontSize: 14,
            padding: '8px 10px',
            borderRadius: 10,
          }}
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}