export default function Chip({ children }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '7px 13px',
        borderRadius: 999,
        border: '1px solid rgba(139, 107, 78, 0.22)',
        background: 'linear-gradient(180deg, rgba(255, 251, 247, 0.96), rgba(207, 224, 195, 0.28))',
        color: 'var(--text)',
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: '0.02em',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.52)',
      }}
    >
      {children}
    </span>
  );
}
