'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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

function MediaGallery({ items = [], compact = false }) {
  const images = useMemo(
    () => (items || []).filter((m) => m?.type === 'image' && m?.src),
    [items],
  );

  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const leadImage = images[0] || null;
  const current = images[idx] || null;

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
    if (!open) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowLeft') {
        setIdx((v) => (v - 1 + images.length) % images.length);
      }
      if (e.key === 'ArrowRight') {
        setIdx((v) => (v + 1) % images.length);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, images.length]);

  useEffect(() => {
    if (!open) return undefined;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  if (!images.length) return null;

  return (
    <>
      {compact ? (
        <div style={{ display: 'grid', gap: 10 }}>
          <button
            type="button"
            onClick={() => openAt(0)}
            style={{
              position: 'relative',
              width: '100%',
              padding: 0,
              borderRadius: 24,
              overflow: 'hidden',
              border: '1px solid rgba(139, 107, 78, 0.18)',
              background: 'rgba(255, 250, 244, 0.72)',
              cursor: 'pointer',
              textAlign: 'left',
            }}
            aria-label={`Open screenshots for ${leadImage?.caption || 'live system preview'}`}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10' }}>
              <img
                src={resolveMediaSrc(leadImage.src)}
                alt={leadImage.caption || 'Live system thumbnail'}
                loading="lazy"
                className="motionImage"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            <div
              style={{
                position: 'absolute',
                right: 14,
                bottom: 14,
                padding: '8px 12px',
                borderRadius: 999,
                background: 'rgba(59, 47, 47, 0.74)',
                color: '#fffdf9',
                fontSize: 12,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {images.length} screenshot{images.length > 1 ? 's' : ''}
            </div>
          </button>

          {images.length > 1 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: 10,
              }}
            >
              {images.slice(1, 4).map((m, i) => (
                <button
                  key={`${resolveMediaSrc(m.src)}-${i + 1}`}
                  type="button"
                  onClick={() => openAt(i + 1)}
                  style={{
                    padding: 0,
                    border: '1px solid rgba(139, 107, 78, 0.16)',
                    borderRadius: 16,
                    overflow: 'hidden',
                    background: 'rgba(255,255,255,0.45)',
                    cursor: 'pointer',
                  }}
                  aria-label={`Open screenshot ${i + 2}`}
                >
                  <div style={{ aspectRatio: '4 / 3' }}>
                    <img
                      src={resolveMediaSrc(m.src)}
                      alt={m.caption || `Live system screenshot ${i + 2}`}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
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
                cursor: 'pointer',
                flex: '0 0 auto',
                width: 'clamp(220px, 40vw, 320px)',
                scrollSnapAlign: 'start',
                padding: 0,
                border: '1px solid var(--border)',
                borderRadius: 12,
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.02)',
                textAlign: 'left',
                transition: 'transform 120ms ease, border-color 120ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(111, 138, 110, 0.36)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              aria-label={`Open preview: ${m.caption || `Image ${i + 1}`}`}
            >
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
      )}

      {open && current
        ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(33, 27, 21, 0.56)',
            display: 'grid',
            placeItems: 'center',
            padding: 18,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            animation: 'lightboxFadeIn 180ms ease',
          }}
          className="lightboxOverlay"
        >
          <div
            style={{
              width: 'min(980px, 96vw)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-warm)',
              background: 'var(--panel)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow)',
              animation: 'lightboxScaleIn 220ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
            className="lightboxPanel"
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 12px',
                borderBottom: '1px solid var(--border-warm)',
                background: 'rgba(247, 250, 247, 0.85)',
              }}
            >
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                {idx + 1} / {images.length}
              </div>

              <button
                type="button"
                onClick={close}
                style={{
                  cursor: 'pointer',
                  border: '1px solid var(--border-warm)',
                  background: 'rgba(255, 255, 255, 0.72)',
                  color: 'var(--text)',
                  padding: '6px 10px',
                  borderRadius: 12,
                  fontSize: 13,
                }}
              >
                Close (Esc)
              </button>
            </div>

            <div style={{ position: 'relative', padding: 12 }} className="lightboxStage">
              <img
                src={resolveMediaSrc(current.src)}
                alt={current.caption || 'Preview'}
                style={{
                  width: '100%',
                  maxHeight: '78vh',
                  objectFit: 'contain',
                  display: 'block',
                  borderRadius: 14,
                  border: '1px solid var(--border-warm)',
                  background: 'rgba(247, 250, 247, 0.65)',
                }}
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 18,
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      border: '1px solid var(--border-warm)',
                      background: 'rgba(255, 255, 255, 0.75)',
                      color: 'var(--text)',
                      width: 42,
                      height: 42,
                      borderRadius: 14,
                      fontSize: 20,
                      lineHeight: '40px',
                    }}
                    className="lightboxNav lightboxNavPrev"
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: 18,
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                      border: '1px solid var(--border-warm)',
                      background: 'rgba(255, 255, 255, 0.75)',
                      color: 'var(--text)',
                      width: 42,
                      height: 42,
                      borderRadius: 14,
                      fontSize: 20,
                      lineHeight: '40px',
                    }}
                    className="lightboxNav lightboxNavNext"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {current.caption && (
              <div style={{ padding: '0 14px 14px', fontSize: 13, color: 'var(--muted)' }}>
                {current.caption}
              </div>
            )}

            {images.length > 1 && (
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  overflowX: 'auto',
                  padding: '0 14px 14px',
                }}
              >
                {images.map((image, imageIndex) => (
                  <button
                    key={`${resolveMediaSrc(image.src)}-thumb-${imageIndex}`}
                    type="button"
                    onClick={() => setIdx(imageIndex)}
                    aria-label={`View screenshot ${imageIndex + 1}`}
                    style={{
                      padding: 0,
                      width: 92,
                      minWidth: 92,
                      borderRadius: 12,
                      overflow: 'hidden',
                      border:
                        imageIndex === idx
                          ? '2px solid rgba(111, 138, 110, 0.7)'
                          : '1px solid rgba(139, 107, 78, 0.16)',
                      background: 'rgba(255,255,255,0.55)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ aspectRatio: '4 / 3' }}>
                      <img
                        src={resolveMediaSrc(image.src)}
                        alt={image.caption || `Screenshot ${imageIndex + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div style={{ padding: '0 14px 14px', fontSize: 12, color: 'var(--muted)' }}>
              Tip: use ← → keys to navigate
            </div>
          </div>
          <style>{`
            @keyframes lightboxFadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes lightboxScaleIn {
              from {
                opacity: 0;
                transform: translateY(8px) scale(0.985);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }

            @media (max-width: 640px) {
              .lightboxOverlay {
                padding: 10px !important;
              }

              .lightboxPanel {
                width: 100% !important;
                max-height: calc(100vh - 20px);
              }

              .lightboxStage {
                padding: 8px !important;
              }

              .lightboxNav {
                top: auto !important;
                bottom: 14px !important;
                transform: none !important;
                width: 48px !important;
                height: 48px !important;
                border-radius: 16px !important;
                font-size: 22px !important;
                line-height: 46px !important;
                background: rgba(255, 255, 255, 0.92) !important;
                box-shadow: 0 10px 18px rgba(59, 47, 47, 0.18);
              }

              .lightboxNavPrev {
                left: 14px !important;
              }

              .lightboxNavNext {
                right: 14px !important;
              }
            }
          `}</style>
        </div>
        ,
        document.body,
      )
        : null}
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
      style={{
        padding: 'clamp(22px, 3vw, 30px)',
        marginTop: 18,
        borderRadius: 30,
        transitionDelay: `${index * 40}ms`,
      }}
    >
      <div
        className="liveSystemCardGrid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 0.92fr) minmax(0, 1.08fr)',
          alignItems: 'start',
          gap: 22,
        }}
      >
        <div>
          <MediaGallery items={s.media} compact />
        </div>

        <div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 30,
                lineHeight: 1,
                fontWeight: 600,
              }}
            >
              {s.title}
            </div>
            {s.emphasis && <Chip>{s.emphasis}</Chip>}
          </div>

          <p className="p" style={{ marginTop: 10, maxWidth: 780 }}>
            {s.summary}
          </p>

          <div
            style={{
              marginTop: 14,
              fontSize: 13,
              color: 'var(--faint)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Stack
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
            {(s.tags || []).map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
            <Button variant="secondary" onClick={onToggle}>
              {isOpen ? 'Hide details' : 'View details'}
            </Button>

            {s.links?.game ? (
              <a href={s.links.game} target="_blank" rel="noreferrer">
                <Button variant="primary">Open experience</Button>
              </a>
            ) : (
              <Button variant="secondary" disabled>
                Experience link (add)
              </Button>
            )}
          </div>
        </div>
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
              {s.details?.problemsSolved?.length ? (
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
        </div>
      </div>
    </div>
  );
}

export default function LiveSystemsExperience() {
  const [openId, setOpenId] = useState(liveSystems?.[0]?.id ?? null);
  const visibleOpenId = openId && liveSystems.some((s) => s.id === openId) ? openId : null;

  return (
    <section id="systems" className="section">
      <Container>
        <div className="kicker">Live systems experience</div>
        <h2 className="h2" style={{ marginTop: 6 }}>
          Real-world systems, shipped in live environments
        </h2>

        <div className="card" style={{ padding: 22, marginTop: 14 }}>
          <p className="p" style={{ maxWidth: 920 }}>
            A cleaner view of the live systems work: screenshot first, key context up front, then the deeper case-study
            notes when you want them.
          </p>
        </div>

        {liveSystems.map((s, idx) => {
          const isOpen = visibleOpenId === s.id;

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

          #systems .liveSystemCardGrid {
            grid-template-columns: minmax(280px, 0.92fr) minmax(0, 1.08fr);
          }

          #systems .card > div,
          #systems .detailsContent {
            position: relative;
            z-index: 1;
          }

          @media (max-width: 980px) {
            #systems .liveCaseGrid {
              grid-template-columns: 1fr;
            }

            #systems .liveSystemCardGrid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 640px) {
            #systems .liveSystemCardGrid {
              gap: 18px;
            }
          }
        `}</style>
      </Container>
    </section>
  );
}
