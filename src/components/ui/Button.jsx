import { cx } from '../../utils/cx.js';

export default function Button({
  variant = 'primary',
  className,
  children,
  onMouseDown,
  onMouseUp,
  type = 'button',
  ...props
}) {
  const base = {
    borderRadius: 12,
    padding: '10px 14px',
    fontSize: 14,
    border: '1px solid var(--border)',
    cursor: 'pointer',
    transition: 'transform 140ms ease, background 140ms ease, border-color 140ms ease, box-shadow 140ms ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    whiteSpace: 'nowrap',
  };

  const styles =
    variant === 'primary'
      ? {
          background: 'var(--accent)',
          borderColor: 'rgba(47, 111, 87, 0.28)',
          color: '#ffffff',
          boxShadow: '0 10px 22px rgba(0,0,0,0.10)',
        }
      : {
          background: 'rgba(255,255,255,0.55)',
          color: 'var(--text)',
          borderColor: 'rgba(21, 33, 27, 0.14)',
          backdropFilter: 'blur(10px)',
        };

  return (
    <button
      type={type}
      className={cx(className)}
      style={{ ...base, ...styles }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(1px)';
        onMouseDown?.(e);
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(0px)';
        onMouseUp?.(e);
      }}
      onMouseEnter={(e) => {
        if (variant === 'primary') e.currentTarget.style.background = 'rgba(47, 111, 87, 0.92)';
        if (variant !== 'primary') e.currentTarget.style.borderColor = 'rgba(47, 111, 87, 0.24)';
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') e.currentTarget.style.background = 'var(--accent)';
        if (variant !== 'primary') e.currentTarget.style.borderColor = 'rgba(21, 33, 27, 0.14)';
      }}
      {...props}
    >
      {children}
    </button>
  );
}