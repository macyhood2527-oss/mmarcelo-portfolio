export default function Chip({ children }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 12px',
        borderRadius: 999,
        border: '1px solid rgba(186, 142, 96, 0.45)', // pastel brown
        background: 'rgba(47, 111, 87, 0.08)',        // soft sage tint
        color: 'var(--text)',
        fontSize: 13,
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}