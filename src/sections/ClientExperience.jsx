// src/sections/ClientExperience.jsx
import { useState } from 'react';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';
import Chip from '../components/ui/Chip.jsx';
import { clientWork } from '../data/clientWork.js';

function Panel({ children, style }) {
  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: 12,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(10px)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SquareEmbed({ title, src }) {
  return (
    <Panel>
      {/* 1:1 */}
      <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '100%' }}>
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow="fullscreen"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      </div>
    </Panel>
  );
}

function YouTubeEmbed({ title, url, ratio = '16:9', maxWidth }) {
  const id =
    url?.includes('youtu.be/')
      ? url.split('youtu.be/')[1]?.split('?')[0]
      : url?.includes('watch?v=')
      ? url.split('watch?v=')[1]?.split('&')[0]
      : url?.includes('shorts/')
      ? url.split('shorts/')[1]?.split('?')[0]
      : '';

  if (!id) return null;

  const pad = ratio === '9:16' ? '177.7778%' : '56.25%';

  return (
    <div
      style={{
        maxWidth: maxWidth || (ratio === '9:16' ? 360 : 720),
        margin: '0 auto',
      }}
    >
      <Panel>
        <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: pad }}>
          <iframe
            title={title}
            src={`https://www.youtube.com/embed/${id}`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          />
        </div>
      </Panel>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        marginTop: 18,
        marginBottom: 10,
        fontSize: 12,
        letterSpacing: '0.10em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
      }}
    >
      {children}
    </div>
  );
}

export default function ClientExperience() {
  const [open, setOpen] = useState(false);
  const e = clientWork.engagements?.[0];
  if (!e) return null;

  const carousels = e.media?.carousels || [];
  const video = e.media?.videos?.[0] || null;
  const testimonial = e.media?.testimonial || null;

  return (
    <section id="client" className="section">
      <Container>
        {/* Always-visible box */}
        <div className="card" style={{ padding: 20 }}>
          <div className="kicker">{clientWork.kicker}</div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <h2 className="h2" style={{ marginTop: 6 }}>
              {clientWork.sectionTitle}
            </h2>

            <Button variant="secondary" onClick={() => setOpen((v) => !v)}>
              {open ? 'Hide' : 'View'} client work
            </Button>
          </div>

          <p className="p" style={{ marginTop: 10, maxWidth: 820 }}>
            {clientWork.intro}
          </p>

          {/* Collapsible details */}
          {open && (
            <div className="fadeUp" style={{ marginTop: 14 }}>
              {/* Meta */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{e.title}</div>
                <div style={{ color: 'var(--muted)', fontSize: 13 }}>
                  {e.role} • {e.timeframe} • {e.engagementType}
                </div>
              </div>

              <p className="p" style={{ marginTop: 10, maxWidth: 820 }}>
                {e.summary}
              </p>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
                {(e.tools || []).map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>

              {/* Scope */}
              <SectionLabel>Scope</SectionLabel>
              <ul style={{ color: 'var(--muted)', marginTop: 0, lineHeight: 1.7 }}>
                {(e.highlights || []).slice(0, 3).map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>

              {/* Carousel samples */}
              <SectionLabel>Carousel samples</SectionLabel>

              {carousels.length === 0 ? (
                <div style={{ color: 'var(--faint)', fontSize: 13 }}>No carousel samples added yet.</div>
              ) : (
                <div className="clientGrid">
                  {carousels.map((c) => (
                    <div key={c.id}>
                      <SquareEmbed title={c.title} src={c.embedUrl} />
                      {c.viewUrl && (
                        <a
                          href={c.viewUrl}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'inline-block',
                            marginTop: 6,
                            fontSize: 12,
                            color: 'var(--muted)',
                          }}
                        >
                          Open
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Video sample (centered) */}
              {video && (
                <>
                  <SectionLabel>Video sample</SectionLabel>
                  <YouTubeEmbed
                    title={video.title || 'Video sample'}
                    url={video.url}
                    ratio={video.ratio || '16:9'}
                    maxWidth={720}
                  />
                  {video.note && (
                    <div style={{ marginTop: 10, fontSize: 13, color: 'var(--faint)', textAlign: 'center' }}>
                      {video.note}
                    </div>
                  )}
                </>
              )}

              {/* Testimonial (embedded + centered under everything) */}
              {testimonial?.url ? (
                <>
                  <SectionLabel>Testimonial</SectionLabel>

                  <div style={{ maxWidth: 420, margin: '0 auto' }}>
                    <div
                      style={{
                        padding: 12,
                        borderRadius: 16,
                        border: '1px dashed var(--border)',
                        background: 'rgba(255,255,255,0.25)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <YouTubeEmbed
                        title={testimonial.title || 'Client testimonial'}
                        url={testimonial.url}
                        ratio={testimonial.ratio || '9:16'}
                        maxWidth={360}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: 10, fontSize: 13, color: 'var(--muted)', textAlign: 'center' }}>
                    {testimonial.note || 'Client feedback.'}
                  </div>
                </>
              ) : (
                <>
                  <SectionLabel>Testimonial</SectionLabel>
                  <div style={{ color: 'var(--faint)', fontSize: 13 }}>
                    Add a testimonial URL in <code>clientWork.js</code>.
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Local responsive CSS for this section */}
        <style>{`
          #client .clientGrid {
            display: grid;
            gap: 10px;
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          @media (max-width: 860px) {
            #client .clientGrid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </Container>
    </section>
  );
}