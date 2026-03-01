// src/sections/LiveSystemsExperience.jsx
import { useEffect, useMemo, useState } from 'react';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';
import Chip from '../components/ui/Chip.jsx';
import { liveSystems } from '../data/liveSystems.js';

// Compact thumbnails + lightbox (images only)
function MediaGallery({ items = [] }) {
  const images = useMemo(
    () => (items || []).filter((m) => m?.type === 'image' && m?.src),
    [items]
  );

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  function openAt(i) {
    setIdx(i);
    setOpen(true);
  }
  function close() {
    setOpen(false);
  }
  function prev() {
    setIdx((v) => (v - 1 + images.length) % images.length);
  }
  function next() {
    setIdx((v) => (v + 1) % images.length);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, images.length]);

  if (!images.length) return null;

  const current = images[idx];

  return (
    <>
      {/* Compact 3-col grid */}
      <div
        style={{
          marginTop: 12,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 10,
        }}
      >
        {images.map((m, i) => (
          <button
            key={m.src}
            type="button"
            onClick={() => openAt(i)}
            style={{
              padding: 0,
              cursor: 'pointer',
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              background: 'rgba(255,255,255,0.02)',
              textAlign: 'left',
            }}
            aria-label={`Open preview: ${m.caption || `Image ${i + 1}`}`}
          >
            {/* Smaller thumbnail */}
            <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '60%' }}>
              <img
                src={m.src}
                alt={m.caption || `Preview ${i + 1}`}
                loading="lazy"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {m.caption && (
              <div style={{ padding: '8px 10px', fontSize: 12, color: 'var(--faint)' }}>
                {m.caption}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
{open && current && (
  <div
    role="dialog"
    aria-modal="true"
    onMouseDown={(e) => {
      if (e.target === e.currentTarget) close();
    }}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      // soft dim + slight green tint
      background: "rgba(27, 38, 32, 0.35)",
      display: "grid",
      placeItems: "center",
      padding: 18,
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
    }}
  >
    <div
      style={{
        width: "min(980px, 96vw)",
        borderRadius: "var(--radius)",
        border: "1px solid var(--border-warm)",
        background: "var(--panel)",
        overflow: "hidden",
        boxShadow: "var(--shadow)",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 12px",
          borderBottom: "1px solid var(--border-warm)",
          background: "rgba(247, 250, 247, 0.85)", // matches --bg family
        }}
      >
        <div style={{ fontSize: 12, color: "var(--muted)" }}>
          {idx + 1} / {images.length}
        </div>

        <button
          type="button"
          onClick={close}
          style={{
            cursor: "pointer",
            border: "1px solid var(--border-warm)",
            background: "rgba(255, 255, 255, 0.72)",
            color: "var(--text)",
            padding: "6px 10px",
            borderRadius: 12,
            fontSize: 13,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-warm-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-warm)";
          }}
        >
          Close (Esc)
        </button>
      </div>

      {/* Image stage */}
      <div style={{ position: "relative", padding: 12 }}>
        <img
          src={current.src}
          alt={current.caption || "Preview"}
          style={{
            width: "100%",
            maxHeight: "78vh",
            objectFit: "contain",
            display: "block",
            borderRadius: 14,
            border: "1px solid var(--border-warm)",
            background: "rgba(247, 250, 247, 0.65)",
          }}
        />

        {/* Nav buttons */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              style={{
                position: "absolute",
                top: "50%",
                left: 18,
                transform: "translateY(-50%)",
                cursor: "pointer",
                border: "1px solid var(--border-warm)",
                background: "rgba(255, 255, 255, 0.75)",
                color: "var(--text)",
                width: 42,
                height: 42,
                borderRadius: 14,
                fontSize: 20,
                lineHeight: "40px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-warm-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-warm)";
              }}
            >
              ‹
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next"
              style={{
                position: "absolute",
                top: "50%",
                right: 18,
                transform: "translateY(-50%)",
                cursor: "pointer",
                border: "1px solid var(--border-warm)",
                background: "rgba(255, 255, 255, 0.75)",
                color: "var(--text)",
                width: 42,
                height: 42,
                borderRadius: 14,
                fontSize: 20,
                lineHeight: "40px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-warm-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-warm)";
              }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {current.caption && (
        <div style={{ padding: "0 14px 14px", fontSize: 13, color: "var(--muted)" }}>
          {current.caption}
        </div>
      )}

      <div style={{ padding: "0 14px 14px", fontSize: 12, color: "var(--muted)" }}>
        Tip: use ← → keys to navigate
      </div>
    </div>
  </div>
)}
    </>
  );
}

export default function LiveSystemsExperience() {
  const [openId, setOpenId] = useState(liveSystems?.[0]?.id ?? null);

  useEffect(() => {
    if (!liveSystems.length) setOpenId(null);
  }, []);

  return (
    <section id="systems" className="section">
      <Container>
        <div className="kicker">Real-time & interactive systems</div>
        <h2 className="h2" style={{ marginTop: 6 }}>
          Live Systems Experience
        </h2>

        <div className="card" style={{ padding: 22, marginTop: 14 }}>
          <p className="p" style={{ maxWidth: 920 }}>
            Multiplayer systems framed as engineering: data persistence, live debugging, economy logic,
            performance considerations, and compliance integration.
          </p>
        </div>

        {liveSystems.map((s, idx) => {
          const isOpen = openId === s.id;

          return (
            <div
              key={s.id}
              className="card fadeUp"
              style={{ padding: 28, marginTop: 14, animationDelay: `${idx * 60}ms` }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{s.title}</div>
                    {s.emphasis && <Chip>{s.emphasis}</Chip>}
                  </div>

                  <p className="p" style={{ marginTop: 10, maxWidth: 820 }}>
                    {s.summary}
                  </p>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                    {(s.tags || []).map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </div>

                <Button variant="secondary" onClick={() => setOpenId(isOpen ? null : s.id)}>
                  {isOpen ? 'Hide details' : 'View details'}
                </Button>
              </div>

              {/* Expandable details */}
             {isOpen && (
  <div className="detailsWrapper">
    <div className="detailsContent">
      <div className="hr" />

      <div className="detailsGrid">
        {/* LEFT COLUMN */}
        <div>
          <div className="sectionLabel">Architecture overview</div>
          <p className="p" style={{ marginTop: 0 }}>
            {s.details?.architecture}
          </p>

          <div className="sectionLabel">What I built</div>
          <ul style={{ color: 'var(--muted)', marginTop: 0, lineHeight: 1.7 }}>
            {(s.details?.responsibilities || []).map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          <div className="sectionLabel">Problems solved</div>
          <ul style={{ color: 'var(--muted)', marginTop: 0, lineHeight: 1.7 }}>
            {(s.details?.problemsSolved || []).map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>

          <div className="sectionLabel">Links</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 0 }}>
            {s.links?.game ? (
              <a href={s.links.game} target="_blank" rel="noreferrer">
                <Button variant="primary">Game</Button>
              </a>
            ) : (
              <Button variant="secondary" disabled>
                Game link (add)
              </Button>
            )}

            {s.links?.docs ? (
              <a href={s.links.docs} target="_blank" rel="noreferrer">
                <Button variant="secondary">Notes</Button>
              </a>
            ) : (
              <Button variant="secondary" disabled>
                Notes (optional)
              </Button>
            )}
          </div>

          <div className="sectionLabel">System preview</div>
          <MediaGallery items={s.media} />
        </div>
      </div>
    </div>
  </div>
)}
            </div>
          );
        })}
      </Container>
    </section>
  );
}