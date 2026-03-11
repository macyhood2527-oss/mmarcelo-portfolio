'use client';

import { useState } from 'react';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';
import Chip from '../components/ui/Chip.jsx';
import { clientWork } from '../data/clientWork.js';

function Panel({ children, style }) {
  return (
    <div
      style={{
        border: '1px solid rgba(139, 107, 78, 0.18)',
        borderRadius: 18,
        overflow: 'hidden',
        background: 'rgba(255, 251, 247, 0.82)',
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

function SectionLabel({ children }) {
  return (
    <div
      style={{
        marginTop: 18,
        marginBottom: 10,
        fontSize: 12,
        letterSpacing: '0.1em',
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
  const [activeTab, setActiveTab] = useState('carousels');

  const e = clientWork.engagements?.[0];
  if (!e) return null;

  const carousels = e.media?.carousels || [];
  const video = e.media?.videos?.[0] || null;
  const testimonial = e.media?.testimonial || null;

  return (
    <section id="client" className="section">
      <Container>
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
              {open ? 'Hide details' : 'View details'}
            </Button>
          </div>

          <p className="p" style={{ marginTop: 10, maxWidth: 860 }}>
            {clientWork.intro}
          </p>

          {open && (
            <div className="fadeUp" style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{e.title}</div>
                <div style={{ color: 'var(--muted)', fontSize: 13 }}>
                  {e.role} • {e.timeframe} • {e.engagementType}
                </div>
              </div>

              <div className="clientCaseGrid" style={{ marginTop: 14, display: 'grid', gap: 12 }}>
                <CaseStudyBlock title="Problem">
                  <p className="p" style={{ fontSize: 14 }}>
                    Clients needed a practical growth system: consistent visibility, lead generation without cold-spam tactics, and qualified conversations despite limited time for daily engagement.
                  </p>
                </CaseStudyBlock>

                <CaseStudyBlock title="Solution">
                  <p className="p" style={{ marginTop: 0, fontSize: 14 }}>
                    {e.summary}
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
                    {(e.tools || []).map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </CaseStudyBlock>

                <CaseStudyBlock title="Impact">
                  <ul style={{ color: 'var(--muted)', marginTop: 0, lineHeight: 1.65, paddingLeft: 18 }}>
                    {(e.highlights || []).map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </CaseStudyBlock>
              </div>

              <SectionLabel>Media</SectionLabel>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <Button variant={activeTab === 'carousels' ? 'primary' : 'secondary'} onClick={() => setActiveTab('carousels')}>
                  Carousels
                </Button>
                <Button variant={activeTab === 'video' ? 'primary' : 'secondary'} onClick={() => setActiveTab('video')}>
                  Video
                </Button>
                <Button variant={activeTab === 'testimonial' ? 'primary' : 'secondary'} onClick={() => setActiveTab('testimonial')}>
                  Testimonial
                </Button>
              </div>

              {activeTab === 'carousels' && (
                <>
                  {carousels.length === 0 ? (
                    <div style={{ color: 'var(--faint)', fontSize: 13, marginTop: 10 }}>No carousel samples added yet.</div>
                  ) : (
                    <div className="clientCarouselRow" style={{ marginTop: 12 }}>
                      {carousels.map((c) => (
                        <div key={c.id} className="clientCarouselItem">
                          <SquareEmbed title={c.title} src={c.embedUrl} />
                          {c.viewUrl && (
                            <a
                              href={c.viewUrl}
                              target="_blank"
                              rel="noreferrer"
                              style={{ display: 'inline-block', marginTop: 6, fontSize: 12, color: 'var(--muted)' }}
                            >
                              Open in Canva
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {activeTab === 'video' && (
                <div style={{ marginTop: 12 }}>
                  {video?.url ? (
                    <YouTubeEmbed title={video.title || 'Video sample'} url={video.url} ratio={video.ratio || '16:9'} maxWidth={760} />
                  ) : (
                    <div style={{ color: 'var(--faint)', fontSize: 13 }}>No video sample added yet.</div>
                  )}
                </div>
              )}

              {activeTab === 'testimonial' && (
                <div style={{ marginTop: 12 }}>
                  {testimonial?.url ? (
                    <>
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
                    <div style={{ color: 'var(--faint)', fontSize: 13 }}>No testimonial added yet.</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <style>{`
          #client .clientCaseGrid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          #client .clientCarouselRow {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            scroll-snap-type: x proximity;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 6px;
          }

          #client .clientCarouselItem {
            flex: 0 0 auto;
            width: clamp(220px, 38vw, 320px);
            scroll-snap-align: start;
          }

          @media (max-width: 980px) {
            #client .clientCaseGrid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </Container>
    </section>
  );
}
