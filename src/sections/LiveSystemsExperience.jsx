'use client';

// src/sections/LiveSystemsExperience.jsx
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';
import Chip from '../components/ui/Chip.jsx';
import { liveSystems } from '../data/liveSystems.js';

function resolveMediaSrc(src) {
  if (!src) return '';
  if (typeof src === 'string') return src;
  if (typeof src === 'object' && 'src' in src) return src.src;
  return String(src);
}

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
      <div
        style={{
          marginTop: 12,
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x proximity',
          WebkitOverflowScrolling: 'touch',
          gap: 10,
          paddingBottom: 6,
        }}
      >
        {images.map((m, i) => (
          <button
            key={`${resolveMediaSrc(m.src)}-${i}`}
            type="button"
            onClick={() => openAt(i)}
            style={{
              flex: '0 0 auto',
              width: 'clamp(220px, 40vw, 320px)',
              scrollSnapAlign: 'start',
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
                src={resolveMediaSrc(m.src)}
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
          src={resolveMediaSrc(current.src)}
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

function CaseStudyBlock({ title, children }) {
  return (
    <div
      style={{
        border: '1px solid rgba(139, 107, 78, 0.18)',
        borderRadius: 20,
        background: 'rgba(255, 251, 247, 0.8)',
        padding: 18,
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--faint)',
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function LiveSystemCard({ system, isOpen, onToggle, index = 0 }) {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    setContentHeight(contentRef.current.scrollHeight);
  }, [isOpen, system]);

  const s = system;

  return (
    <div
      className="card fadeUp"
      style={{ padding: 28, marginTop: 14, animationDelay: `${index * 60}ms` }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
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

        <Button variant="secondary" onClick={onToggle}>
          {isOpen ? 'Hide details' : 'View details'}
        </Button>
      </div>

      <div
        className={`detailsWrapper ${isOpen ? 'is-open' : ''}`}
        style={{
          maxHeight: isOpen ? `${contentHeight + 24}px` : '0px',
          opacity: isOpen ? 1 : 0,
        }}
        aria-hidden={!isOpen}
      >
        <div ref={contentRef} className="detailsContent">
          <div className="hr" />

          <div className="liveCaseGrid" style={{ marginTop: 14, display: 'grid', gap: 12 }}>
            <CaseStudyBlock title="Problem">
              <p className="p" style={{ fontSize: 14 }}>
                {s.summary}
              </p>
            </CaseStudyBlock>

            <CaseStudyBlock title="Solution">
              <p className="p" style={{ marginTop: 0, fontSize: 14 }}>
                {s.details?.architecture}
              </p>
              {!!s.details?.responsibilities?.length && (
                <ul style={{ color: 'var(--muted)', marginTop: 10, lineHeight: 1.65, paddingLeft: 18 }}>
                  {s.details.responsibilities.slice(0, 4).map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              )}
            </CaseStudyBlock>

            <CaseStudyBlock title="Impact">
              {!!s.details?.problemsSolved?.length ? (
                <ul style={{ color: 'var(--muted)', marginTop: 0, lineHeight: 1.65, paddingLeft: 18 }}>
                  {s.details.problemsSolved.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              ) : (
                <p className="p" style={{ fontSize: 14 }}>
                  Outcomes documented across live operations and stability updates.
                </p>
              )}
            </CaseStudyBlock>
          </div>

          <div className="sectionLabel">Build artifacts</div>
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
          </div>

          <div className="sectionLabel">System preview</div>
          <MediaGallery items={s.media} />
        </div>
      </div>
    </div>
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
        <div className="kicker">Live systems experience</div>
        <h2 className="h2" style={{ marginTop: 6 }}>
          Real-world systems, shipped in live environments
        </h2>

        <div className="card" style={{ padding: 22, marginTop: 14 }}>
          <p className="p" style={{ maxWidth: 920 }}>
            Practical engineering work across multiplayer and live systems, focused on persistence, debugging, economy logic, deployment realities, and day-to-day operational reliability.
          </p>
        </div>

        {liveSystems.map((s, idx) => {
          const isOpen = openId === s.id;

          return (
            <LiveSystemCard
              key={s.id}
              system={s}
              isOpen={isOpen}
              onToggle={() => setOpenId(isOpen ? null : s.id)}
              index={idx}
            />
          );
        })}

        <style>{`
          #systems .liveCaseGrid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          @media (max-width: 980px) {
            #systems .liveCaseGrid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </Container>
    </section>
  );
}
