import { useState, useEffect } from 'react';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';
import Chip from '../components/ui/Chip.jsx';

function MediaGallery({ items = [] }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const images = (items || []).filter((m) => m?.type === 'image' && m?.src);
  const hasImages = images.length > 0;
  const current = hasImages ? images[idx] : null;

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

  if (!hasImages) return null;

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
            key={`${m.src}-${i}`}
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
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(169,139,255,0.28)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            aria-label={`Open preview: ${m.caption || `Image ${i + 1}`}`}
          >
            <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '44%' }}>
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

            {m.caption && <div style={{ padding: '8px 10px', fontSize: 12, color: 'var(--faint)' }}>{m.caption}</div>}
          </button>
        ))}
      </div>

      {open && current && (
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
            background: 'rgba(27, 38, 32, 0.35)',
            display: 'grid',
            placeItems: 'center',
            padding: 18,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              width: 'min(980px, 96vw)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border-warm)',
              background: 'var(--panel)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow)',
            }}
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-warm-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-warm)';
                }}
              >
                Close (Esc)
              </button>
            </div>

            <div style={{ position: 'relative', padding: 12 }}>
              <img
                src={current.src}
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-warm-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-warm)';
                    }}
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
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-warm-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-warm)';
                    }}
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {current.caption && <div style={{ padding: '0 14px 14px', fontSize: 13, color: 'var(--muted)' }}>{current.caption}</div>}

            <div style={{ padding: '0 14px 14px', fontSize: 12, color: 'var(--muted)' }}>Tip: use ← → keys to navigate</div>
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
        border: '1px solid var(--border)',
        borderRadius: 14,
        background: 'rgba(255,255,255,0.5)',
        padding: 14,
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

export default function SelectedWork({ projects = [], activeTech, onClearFilter }) {
  const [openId, setOpenId] = useState(projects?.[0]?.id ?? null);

  useEffect(() => {
    if (!projects.length) {
      setOpenId(null);
      return;
    }

    if (openId === null) return;

    const exists = projects.some((p) => p.id === openId);
    if (!exists) setOpenId(projects[0].id);
  }, [projects, openId]);

  return (
    <section id="work" className="section" key={activeTech || 'all'}>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <div>
            <div className="kicker">Core engineering work</div>

            <h2 className="h2" style={{ marginTop: 6 }}>
              Selected Work
            </h2>

            <div style={{ marginTop: 6, color: 'var(--faint)', fontSize: 14 }}>Showing {projects.length} project{projects.length !== 1 ? 's' : ''}</div>

            {activeTech && (
              <div style={{ marginTop: 8, color: 'var(--muted)', fontSize: 14 }}>
                Filter: <span style={{ color: 'var(--text)', fontWeight: 600 }}>{activeTech}</span>

                <button
                  onClick={onClearFilter}
                  style={{
                    marginLeft: 10,
                    background: 'transparent',
                    color: 'var(--muted)',
                    border: '1px solid var(--border)',
                    padding: '4px 8px',
                    borderRadius: 10,
                    cursor: 'pointer',
                  }}
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="card fadeUp" style={{ padding: 22, marginTop: 14 }}>
            <p className="p">No projects match this filter yet.</p>
          </div>
        ) : (
          projects.map((p, idx) => {
            const isOpen = openId === p.id;

            return (
              <div
                key={p.id}
                className="card fadeUp"
                style={{
                  padding: 28,
                  marginTop: 14,
                  animationDelay: `${idx * 60}ms`,
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1fr) auto',
                    alignItems: 'start',
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>{p.title}</div>
                      {p.emphasis && <Chip>{p.emphasis}</Chip>}
                    </div>

                    <p className="p" style={{ marginTop: 10, maxWidth: 820 }}>
                      {p.summary}
                    </p>

                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
                      {(p.tags || []).map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                  </div>

                  <Button variant="secondary" onClick={() => setOpenId(isOpen ? null : p.id)}>
                    {isOpen ? 'Hide details' : 'View case study'}
                  </Button>
                </div>

                {isOpen && (
                  <div className="detailsWrapper">
                    <div className="detailsContent">
                      <div className="hr" />

                      <div className="caseStudyGrid" style={{ marginTop: 14, display: 'grid', gap: 12 }}>
                        <CaseStudyBlock title="Problem">
                          <p className="p" style={{ fontSize: 14 }}>
                            {p.summary}
                          </p>
                        </CaseStudyBlock>

                        <CaseStudyBlock title="Solution">
                          <p className="p" style={{ marginTop: 0, fontSize: 14 }}>
                            {p.details?.architecture}
                          </p>
                          {!!p.details?.responsibilities?.length && (
                            <ul style={{ color: 'var(--muted)', marginTop: 10, lineHeight: 1.65, paddingLeft: 18 }}>
                              {p.details.responsibilities.slice(0, 4).map((x) => (
                                <li key={x}>{x}</li>
                              ))}
                            </ul>
                          )}
                        </CaseStudyBlock>

                        <CaseStudyBlock title="Impact">
                          {!!p.details?.problemsSolved?.length ? (
                            <ul style={{ color: 'var(--muted)', marginTop: 0, lineHeight: 1.65, paddingLeft: 18 }}>
                              {p.details.problemsSolved.map((x) => (
                                <li key={x}>{x}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="p" style={{ fontSize: 14 }}>
                              Core system outcomes documented in architecture and delivery notes.
                            </p>
                          )}
                        </CaseStudyBlock>
                      </div>

                      <div className="sectionLabel">Build artifacts</div>
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 0 }}>
                        {p.links?.github ? (
                          <a href={p.links.github} target="_blank" rel="noreferrer">
                            <Button variant="primary">GitHub</Button>
                          </a>
                        ) : (
                          <Button variant="primary" disabled>
                            Code (private)
                          </Button>
                        )}

                        {p.links?.demo ? (
                          <a href={p.links.demo} target="_blank" rel="noreferrer">
                            <Button variant="secondary">Live / Build</Button>
                          </a>
                        ) : (
                          <Button variant="secondary" disabled>
                            Demo (later)
                          </Button>
                        )}
                      </div>

                      {p.media && p.media.length > 0 && (
                        <>
                          <div className="sectionLabel">System preview</div>
                          <MediaGallery items={p.media} />
                        </>
                      )}

                      {p.details?.mediaNote && <div style={{ marginTop: 12, color: 'var(--faint)', fontSize: 13 }}>{p.details.mediaNote}</div>}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}

        <style>{`
          #work .caseStudyGrid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          @media (max-width: 980px) {
            #work .caseStudyGrid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </Container>
    </section>
  );
}
