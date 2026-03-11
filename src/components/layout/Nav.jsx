'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BriefcaseBusiness, FlaskConical, FolderKanban, House } from 'lucide-react';

const links = [
  { href: '/', label: 'Home', Icon: House },
  { href: '/projects', label: 'Projects', Icon: FolderKanban },
  { href: '/experience', label: 'Experience', Icon: BriefcaseBusiness },
  { href: '/sandbox', label: 'Sandbox', Icon: FlaskConical },
];

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 14px',
    borderRadius: 999,
    border: '1px solid transparent',
    color: 'var(--muted)',
    fontSize: 14,
    transition: '0.2s ease',
  };

  const renderLinks = (stacked = false) =>
    links.map(({ href, label, Icon }) => {
      const active = pathname === href;

      return (
        <Link
          key={href}
          href={href}
          onClick={() => setMobileOpen(false)}
          style={{
            ...linkStyle,
            width: stacked ? '100%' : 'auto',
            justifyContent: stacked ? 'flex-start' : 'center',
            color: active ? 'var(--text)' : 'var(--muted)',
            background: active ? 'rgba(207, 224, 195, 0.28)' : 'transparent',
            borderColor: active ? 'rgba(111, 138, 110, 0.22)' : 'transparent',
            boxShadow: active ? '0 10px 18px rgba(111, 138, 110, 0.1)' : 'none',
          }}
        >
          <Icon size={18} strokeWidth={1.9} />
          <span>{label}</span>
        </Link>
      );
    });

  return (
    <>
      <div className="desktopNav">{renderLinks(false)}</div>

      <div className="mobileNav">
        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          style={{
            border: '1px solid var(--border)',
            background: 'rgba(255, 250, 244, 0.92)',
            color: 'var(--text)',
            borderRadius: 999,
            padding: '10px 14px',
            fontSize: 14,
            cursor: 'pointer',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          {mobileOpen ? 'Close' : 'Menu'}
        </button>

        {mobileOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 10px)',
              right: 0,
              minWidth: 210,
              display: 'grid',
              gap: 6,
              padding: 10,
              borderRadius: 22,
              border: '1px solid var(--border)',
              background: 'rgba(255, 250, 244, 0.98)',
              boxShadow: 'var(--shadow)',
            }}
          >
            {renderLinks(true)}
          </div>
        )}
      </div>

      <style>{`
        .desktopNav {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .mobileNav {
          display: none;
          position: relative;
        }

        @media (max-width: 860px) {
          .desktopNav {
            display: none;
          }

          .mobileNav {
            display: block;
          }
        }
      `}</style>
    </>
  );
}
