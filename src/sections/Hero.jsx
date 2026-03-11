import { useState } from 'react';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';
import Chip from '../components/ui/Chip.jsx';

export default function Hero() {
  const [isExpanded, setIsExpanded] = useState(false);

  const introParagraphs = [
       `I first started building small systems back in college around 2012, creating simple POS, billing, and inventory tools for local businesses, long before the current AI-assisted development era.`,
    `Life eventually took me down different paths. I spent several years working across healthcare, customer service, sales, and later as a virtual assistant supporting business growth and social media operations. Those experiences gave me a deeper understanding of how real businesses operate and the kinds of tools they actually need.`,
    `Years later, my kids introduced me to Roblox, and discovering Roblox Studio unexpectedly brought me back to development. I started building again, created a couple of games that gained traction, and it reminded me how much I enjoy creating systems people can actually use.`,
    `Today, I focus on building practical applications and backend systems, including APIs, authentication, and database-driven tools, while continuously strengthening my skills in modern web development.`,
    `I'm currently open to freelance projects, collaborations, and opportunities to build meaningful systems that solve real-world problems.`,
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
              <Chip>Backend Developer</Chip>
              <Chip>API Design</Chip>
              <Chip>Authentication Systems</Chip>
              <Chip>Database-Backed Apps</Chip>
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
