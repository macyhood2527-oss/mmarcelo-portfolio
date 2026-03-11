'use client';

import { useState } from 'react';
import Link from 'next/link';
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
          className="card heroGrid heroCard editorialShell"
          style={{
            padding: 'clamp(24px, 4vw, 40px)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(280px, 0.75fr)',
            gap: 34,
            alignItems: 'start',
          }}
        >
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Chip>Backend Developer</Chip>
              <Chip>API Design</Chip>
              <Chip>Authentication Systems</Chip>
              <Chip>Database-Backed Apps</Chip>
            </div>

            <div className="kicker" style={{ marginTop: 22 }}>
              Thoughtful developer portfolio
            </div>

            <h1 className="h1" style={{ marginTop: 14, maxWidth: 720 }}>
              Melissa Marcelo
            </h1>

            <div style={{ marginBottom: 22, maxWidth: 680 }}>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.25rem, 2vw, 1.7rem)',
                  lineHeight: 1.25,
                  color: 'var(--text)',
                }}
              >
                Hi, I&apos;m Melissa.
              </div>

              <div
                style={{
                  color: 'var(--faint)',
                  fontSize: 13,
                  marginTop: 10,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                }}
              >
                Building calm, capable systems for real-world work
              </div>
            </div>

            <div
              style={{
                maxWidth: 720,
                display: 'grid',
                gap: 16,
              }}
            >
              {visibleParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="p"
                  style={{
                    fontSize: 16,
                    lineHeight: 1.82,
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
              <Link href="/projects">
                <Button variant="primary">View Projects</Button>
              </Link>
              <a href="#contact">
                <Button variant="secondary">Let&apos;s Collaborate</Button>
              </a>
              <a
                href="/resume.html"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="secondary">Open Resume / Save PDF</Button>
              </a>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 18 }}>
            <div className="heroPhotoWrapper drift">
              <img
                src="/me.png"
                alt="Melissa Marcelo"
                className="motionImage"
                style={{
                  width: '100%',
                  maxWidth: 320,
                  margin: '0 auto',
                  borderRadius: 22,
                  display: 'block',
                }}
              />
            </div>

            <div
              className="card"
              style={{
                padding: 22,
                borderRadius: 26,
                background: 'linear-gradient(180deg, rgba(255, 250, 244, 0.94), rgba(239, 231, 220, 0.86))',
              }}
            >
              <div className="kicker">Studio notes</div>
              <div
                style={{
                  marginTop: 14,
                  display: 'grid',
                  gap: 14,
                }}
              >
                <div>
                  <div style={{ fontSize: 13, color: 'var(--faint)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Focus
                  </div>
                  <div style={{ marginTop: 6, fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>
                    Backend systems, practical product thinking, and warm developer collaboration.
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 13, color: 'var(--faint)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    Best fit
                  </div>
                  <div style={{ marginTop: 6, fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>
                    Freelance builds, collaborative product work, and grounded systems that need reliability without losing personality.
                  </div>
                </div>
              </div>
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
