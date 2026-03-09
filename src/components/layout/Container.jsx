export default function Container({ children }) {
  return (
    <div
      style={{
        maxWidth: 'var(--container)',
        padding: '0 clamp(14px, 4vw, 20px)',
        margin: '0 auto',
      }}
    >
      {children}
    </div>
  );
}
