export default function Container({ children }) {
  return (
    <div
      style={{
        maxWidth: 'var(--container)',
        padding: '0 20px',
        margin: '0 auto',
      }}
    >
      {children}
    </div>
  );
}