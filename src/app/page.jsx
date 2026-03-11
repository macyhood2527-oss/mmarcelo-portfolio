import Link from 'next/link';
import Hero from '../sections/Hero.jsx';
import Contact from '../sections/Contact.jsx';
import SectionDivider from '../components/layout/SectionDivider.jsx';
import Container from '../components/layout/Container.jsx';
import Chip from '../components/ui/Chip.jsx';
import Button from '../components/ui/Button.jsx';
import { projects } from '../data/projects.js';

export default function HomePage() {
  const featuredProjects = projects.filter((project) =>
    ['lifeos', 'brightsmile-dental'].includes(project.id),
  );

  return (
    <>
      <Hero />
      <SectionDivider />

      <section className="section" id="featured-work">
        <Container>
          <div>
            <div className="kicker">Featured work</div>
            <h2 className="h2" style={{ marginTop: 6 }}>
              A quick preview of the systems I build
            </h2>
            <p className="p" style={{ marginTop: 12, maxWidth: 760 }}>
              A few selected projects are highlighted here. The full case studies, screenshots, and technical details live on the Projects page.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 18,
              marginTop: 20,
            }}
          >
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className="card"
                style={{
                  padding: 'clamp(18px, 3vw, 24px)',
                  borderRadius: 28,
                  overflow: 'hidden',
                }}
              >
                  {project.media?.[0]?.src ? (
                    <div
                      style={{
                        margin: '-18px -18px 18px',
                        borderBottom: '1px solid rgba(139, 107, 78, 0.14)',
                        background: 'rgba(255, 250, 244, 0.76)',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={project.media[0].src}
                        alt={project.media[0].caption || `${project.title} preview`}
                        className="motionImage"
                        style={{
                          width: '100%',
                          height: 220,
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </div>
                  ) : null}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-serif)',
                        fontSize: 28,
                        lineHeight: 1,
                        fontWeight: 600,
                      }}
                    >
                      {project.title}
                    </h3>
                    {project.emphasis ? <Chip>{project.emphasis}</Chip> : null}
                  </div>

                  <p className="p" style={{ marginTop: 12 }}>
                    {project.summary}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                    {(project.tags || []).slice(0, 4).map((tag) => (
                      <Chip key={tag}>{tag}</Chip>
                    ))}
                  </div>

                  <div style={{ marginTop: 20 }}>
                    <Link href={`/projects`}>
                      <Button variant="secondary">View full project details</Button>
                    </Link>
                  </div>
              </article>
            ))}
          </div>
          <style>{`
            @media (max-width: 860px) {
              #featured-work > div > div:nth-of-type(2) {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>
        </Container>
      </section>
      <SectionDivider />
      <Contact />
    </>
  );
}
