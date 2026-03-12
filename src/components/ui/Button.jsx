'use client';

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
    borderRadius: 999,
    padding: '12px 18px',
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: '0.01em',
    border: '1px solid var(--border)',
    cursor: 'pointer',
    transition: 'transform 180ms ease, background 180ms ease, border-color 180ms ease, box-shadow 180ms ease, color 180ms ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    whiteSpace: 'nowrap',
  };

  const styles =
    variant === 'primary'
      ? {
          background: 'linear-gradient(180deg, var(--accent) 0%, var(--accent-strong) 100%)',
          borderColor: 'rgba(111, 138, 110, 0.34)',
          color: '#fffdf9',
          boxShadow: '0 14px 26px rgba(111, 138, 110, 0.24)',
        }
      : variant === 'lavender'
      ? {
          background: 'linear-gradient(180deg, rgba(201, 195, 230, 0.96) 0%, rgba(177, 168, 214, 0.98) 100%)',
          borderColor: 'rgba(160, 148, 201, 0.5)',
          color: '#fffdf9',
          boxShadow: '0 14px 24px rgba(169, 154, 204, 0.22)',
        }
      : {
          background: 'rgba(255, 250, 244, 0.82)',
          color: 'var(--text)',
          borderColor: 'rgba(139, 107, 78, 0.24)',
          boxShadow: '0 8px 16px rgba(91, 74, 52, 0.06)',
        };

  return (
    <button
      type={type}
      className={cx(className)}
      style={{ ...base, ...styles }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(1px) scale(0.99)';
        onMouseDown?.(e);
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(0px) scale(1)';
        onMouseUp?.(e);
      }}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 18px 28px rgba(111, 138, 110, 0.28)';
        }
        if (variant === 'lavender') {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.borderColor = 'rgba(160, 148, 201, 0.65)';
          e.currentTarget.style.background = 'linear-gradient(180deg, rgba(208, 202, 235, 1) 0%, rgba(185, 176, 220, 1) 100%)';
          e.currentTarget.style.boxShadow = '0 18px 28px rgba(169, 154, 204, 0.28)';
        }
        if (variant !== 'primary' && variant !== 'lavender') {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.borderColor = 'rgba(111, 138, 110, 0.36)';
          e.currentTarget.style.background = 'rgba(255, 252, 247, 0.98)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0px) scale(1)';
        if (variant === 'primary') {
          e.currentTarget.style.boxShadow = '0 14px 26px rgba(111, 138, 110, 0.24)';
        }
        if (variant === 'lavender') {
          e.currentTarget.style.borderColor = 'rgba(160, 148, 201, 0.5)';
          e.currentTarget.style.background = 'linear-gradient(180deg, rgba(201, 195, 230, 0.96) 0%, rgba(177, 168, 214, 0.98) 100%)';
          e.currentTarget.style.boxShadow = '0 14px 24px rgba(169, 154, 204, 0.22)';
        }
        if (variant !== 'primary' && variant !== 'lavender') {
          e.currentTarget.style.borderColor = 'rgba(139, 107, 78, 0.24)';
          e.currentTarget.style.background = 'rgba(255, 250, 244, 0.82)';
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}
