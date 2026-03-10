import { useState } from 'react';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';
import Chip from '../components/ui/Chip.jsx';

export default function Hero() {
  const [isExpanded, setIsExpanded] = useState(false);

  const introParagraphs = [
    `Hi, I'm Melissa.`,
    `I first started building small systems back in college around 2012. At the time, I created simple POS, cashiering, billing, and inventory tools for small local businesses, long before the current wave of AI tools made development more accessible.`,
    `Life eventually took me down a different path. I spent several years working across different roles, from the medical field to customer service, sales, and later as a virtual assistant handling growth consulting and social media management. Each experience helped me understand how businesses operate and the kinds of tools people actually need.`,
    `Years later, something unexpected brought me back to development. My kids invited me to play Roblox, and out of curiosity I discovered Roblox Studio. That moment reignited my passion for building systems. I started experimenting again, created a couple of games, and to my surprise they gained traction.`,
    `That experience reminded me how much I enjoy creating things that people can use and interact with.`,
    `Since then, I've been intentionally returning to software development, building projects of my own while strengthening my skills in backend systems, APIs, authentication flows, and practical application architecture. My goal is simple: to build useful, reliable tools that solve real problems.`,
    `And that's the journey that brings me here today.`,
  ];

  const visibleParagraphs = isExpanded
    ? introParagraphs
    : introParagraphs.slice(0, 3);

  return (
    <section className="section">
      <Container>
        <div
          className="card heroGrid heroCard"
          style={{
            padding: 32,
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: 28,
            alignItems: 'start',
          }}
        >
          {/* LEFT SIDE */}
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Chip>API Engineering</Chip>
              <Chip>Node.js • Express • TypeScript</Chip>
              <Chip>Supabase • MySQL • PostgreSQL</Chip>
              <Chip>JWT • OAuth • RLS • RBAC</Chip>
            </div>

            <h1 className="h1" style={{ marginTop: 16 }}>
              Melissa Marcelo
            </h1>

            <div style={{ marginBottom: 18 }}>
  <div
    style={{
      fontWeight: 600,
      color: 'var(--text)',
      fontSize: 17,
    }}
  >
    Backend Developer building secure, production-ready APIs
  </div>

  <div
    style={{
      color: 'var(--muted)',
      fontSize: 14,
      marginTop: 4,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
    }}
  >
    Rest APIs • Authentication • Practical System Design
  </div>
</div>

            <div
              style={{
                maxWidth: 720,
                display: 'grid',
                gap: 14,
              }}
            >
              {visibleParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="p"
                  style={{
                    fontSize: 16,
                    lineHeight: 1.75,
                  }}
                >
                  {paragraph}
                </p>
              ))}

              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button
                  variant="secondary"
                  onClick={() => setIsExpanded((value) => !value)}
                  aria-expanded={isExpanded}
                  aria-label={isExpanded ? 'Show less about Melissa' : 'Read more about Melissa'}
                >
                  {isExpanded ? 'Show Less' : 'Read More'}
                </Button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              <a href="#work">
                <Button variant="primary">View Projects</Button>
              </a>
              <a href="#contact">
                <Button variant="secondary">Contact</Button>
              </a>
              <a
                href="/resume.html"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="secondary">Download Resume</Button>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE — PHOTO */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="heroPhotoWrapper">
              <img
                src="/me.png"
                alt="Melissa Marcelo"
                style={{
                  width: '100%',
                  maxWidth: 280,
                  borderRadius: 18,
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      </Container>
      <style>{`
        @media (max-width: 860px) {
          .heroCard {
            padding: 22px !important;
            gap: 18px !important;
          }
        }

        @media (max-width: 520px) {
          .heroCard {
            padding: 18px !important;
          }
        }
      `}</style>
    </section>
  );
}
