'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Container from '../components/layout/Container.jsx';
import Button from '../components/ui/Button.jsx';

const GRID_SIZE = 12;
const ROUND_SECONDS = 30;
const MAX_CHAOS = 5;
const TICK_MS = 220;
const BUG_TYPES = [
  { label: 'Timeout', points: 1, ttl: 1500, color: 'rgba(217, 167, 167, 0.9)' },
  { label: 'Null Ref', points: 2, ttl: 1300, color: 'rgba(201, 195, 230, 0.92)' },
  { label: 'Failed Auth', points: 2, ttl: 1400, color: 'rgba(139, 107, 78, 0.88)' },
  { label: 'Queue Spike', points: 3, ttl: 1100, color: 'rgba(111, 138, 110, 0.92)' },
];

function StatChip({ label, value, tone = 'default' }) {
  const toneStyle =
    tone === 'accent'
      ? {
          borderColor: 'rgba(111, 138, 110, 0.34)',
          background: 'rgba(111, 138, 110, 0.1)',
        }
      : tone === 'danger'
      ? {
          borderColor: 'rgba(217, 167, 167, 0.38)',
          background: 'rgba(217, 167, 167, 0.12)',
        }
      : {};

  return (
    <div
      style={{
        display: 'grid',
        gap: 4,
        minWidth: 92,
        padding: '10px 12px',
        borderRadius: 16,
        border: '1px solid rgba(139, 107, 78, 0.18)',
        background: 'rgba(255, 252, 247, 0.76)',
        ...toneStyle,
      }}
    >
      <span style={{ fontSize: 11, color: 'var(--faint)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        {label}
      </span>
      <span style={{ fontSize: 18, color: 'var(--text)', fontWeight: 600 }}>{value}</span>
    </div>
  );
}

export default function BugSquash() {
  const [bugs, setBugs] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    if (typeof window === 'undefined') return 0;
    return Number(window.localStorage.getItem('sandbox-bug-squash-best')) || 0;
  });
  const [chaos, setChaos] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const nextIdRef = useRef(1);

  useEffect(() => {
    window.localStorage.setItem('sandbox-bug-squash-best', String(bestScore));
  }, [bestScore]);

  useEffect(() => {
    if (!isPlaying) return undefined;

    const interval = window.setInterval(() => {
      const now = Date.now();

      setTimeLeft((current) => {
        const next = Math.max(0, current - TICK_MS / 1000);
        if (next === 0) {
          setIsPlaying(false);
          setGameOver(true);
        }
        return next;
      });

      setBugs((current) => {
        const expired = current.filter((bug) => now >= bug.expiresAt);
        if (expired.length) {
          setChaos((value) => {
            const next = Math.min(MAX_CHAOS, value + expired.length);
            if (next >= MAX_CHAOS) {
              setIsPlaying(false);
              setGameOver(true);
            }
            return next;
          });
          setStreak(0);
        }

        const remaining = current.filter((bug) => now < bug.expiresAt);
        const availableCells = Array.from({ length: GRID_SIZE }, (_, index) => index).filter(
          (index) => !remaining.some((bug) => bug.cell === index),
        );

        const shouldSpawn = remaining.length < 3 && Math.random() > 0.48 && availableCells.length > 0;
        if (!shouldSpawn) return remaining;

        const cell = availableCells[Math.floor(Math.random() * availableCells.length)];
        const type = BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)];

        return [
          ...remaining,
          {
            id: nextIdRef.current++,
            cell,
            label: type.label,
            points: type.points,
            expiresAt: now + type.ttl,
            color: type.color,
          },
        ];
      });
    }, TICK_MS);

    return () => window.clearInterval(interval);
  }, [isPlaying]);

  const cells = useMemo(
    () =>
      Array.from({ length: GRID_SIZE }, (_, index) => ({
        index,
        bug: bugs.find((entry) => entry.cell === index) || null,
      })),
    [bugs],
  );

  const statusText = gameOver
    ? chaos >= MAX_CHAOS
      ? 'System overloaded. Too many issues slipped through.'
      : 'Round complete. Clean, quick triage.'
    : isPlaying
    ? 'Tap the active bug cards before they expire.'
    : 'Start a 30-second round and keep system chaos under control.';

  function startGame() {
    setBugs([]);
    setScore(0);
    setChaos(0);
    setTimeLeft(ROUND_SECONDS);
    setStreak(0);
    setGameOver(false);
    setIsPlaying(true);
  }

  function stopGame() {
    setIsPlaying(false);
    setGameOver(true);
    setBugs([]);
  }

  function squashBug(bugId) {
    if (!isPlaying) return;

    setBugs((current) => {
      const found = current.find((bug) => bug.id === bugId);
      if (!found) return current;

      const nextStreak = streak + 1;
      const bonus = nextStreak > 0 && nextStreak % 5 === 0 ? 2 : 0;

      setScore((value) => {
        const nextScore = value + found.points + bonus;
        setBestScore((current) => (nextScore > current ? nextScore : current));
        return nextScore;
      });
      setStreak(nextStreak);

      return current.filter((bug) => bug.id !== bugId);
    });
  }

  return (
    <section className="section">
      <Container>
        <div className="kicker">Mini game</div>
        <h2 className="h2" style={{ marginTop: 6 }}>
          Bug Squash
        </h2>

        <p className="p" style={{ marginTop: 10, maxWidth: 760 }}>
          A tiny debugging sprint: squash live issues before they age out and push the system into chaos.
        </p>

        <div
          className="card"
          style={{
            marginTop: 18,
            padding: 'clamp(18px, 3vw, 24px)',
            display: 'grid',
            gap: 18,
            background:
              'linear-gradient(180deg, rgba(255, 252, 247, 0.94), rgba(241, 232, 221, 0.92))',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 14,
              flexWrap: 'wrap',
              alignItems: 'flex-start',
            }}
          >
            <div style={{ maxWidth: 620 }}>
              <div className="sectionLabel" style={{ marginTop: 0 }}>
                Ops drill
              </div>
              <p className="p" style={{ fontSize: 15 }}>
                {statusText}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <StatChip label="Score" value={score} tone="accent" />
              <StatChip label="Best" value={bestScore} />
              <StatChip label="Streak" value={streak} />
              <StatChip label="Chaos" value={`${chaos}/${MAX_CHAOS}`} tone="danger" />
              <StatChip label="Time" value={`${Math.ceil(timeLeft)}s`} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={startGame}>
              {gameOver ? 'Play again' : isPlaying ? 'Restart round' : 'Start round'}
            </Button>
            <Button variant="secondary" onClick={stopGame} disabled={!isPlaying}>
              Stop
            </Button>
          </div>

          <div
            className="bugBoard"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 12,
            }}
          >
            {cells.map(({ index, bug }) => (
              <button
                key={index}
                type="button"
                onClick={() => bug && squashBug(bug.id)}
                disabled={!bug || !isPlaying}
                aria-label={bug ? `Squash ${bug.label}` : `Empty bug slot ${index + 1}`}
                className={bug ? 'bugCell is-live' : 'bugCell'}
                style={{
                  minHeight: 116,
                  borderRadius: 22,
                  border: bug ? '1px solid rgba(111, 138, 110, 0.32)' : '1px dashed rgba(139, 107, 78, 0.2)',
                  background: bug
                    ? `radial-gradient(circle at top, rgba(255,255,255,0.5), transparent 60%), ${bug.color}`
                    : 'rgba(255, 250, 244, 0.55)',
                  color: bug ? '#fffdf9' : 'var(--faint)',
                  padding: 14,
                  textAlign: 'left',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: bug && isPlaying ? 'pointer' : 'default',
                  transition: 'transform 180ms ease, border-color 180ms ease, background 180ms ease',
                }}
              >
                {bug ? (
                  <div style={{ display: 'grid', gap: 8 }}>
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        opacity: 0.82,
                      }}
                    >
                      Active issue
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 22,
                        lineHeight: 1,
                        fontWeight: 600,
                      }}
                    >
                      {bug.label}
                    </span>
                    <span style={{ fontSize: 13, opacity: 0.9 }}>+{bug.points} pts</span>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: 8 }}>
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Stable slot
                    </span>
                    <span style={{ fontSize: 15, lineHeight: 1.5 }}>Monitoring for the next issue.</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: 14,
            }}
          >
            <div
              style={{
                padding: 16,
                borderRadius: 20,
                border: '1px solid rgba(139, 107, 78, 0.16)',
                background: 'rgba(255,255,255,0.42)',
              }}
            >
              <div className="sectionLabel" style={{ marginTop: 0 }}>
                Rules
              </div>
              <p className="p" style={{ fontSize: 14 }}>
                Each issue expires quickly. Squash them before they vanish. Every missed issue raises chaos. Reach
                five chaos or run out of time and the round ends.
              </p>
            </div>

            <div
              style={{
                padding: 16,
                borderRadius: 20,
                border: '1px solid rgba(139, 107, 78, 0.16)',
                background: 'rgba(255,255,255,0.42)',
              }}
            >
              <div className="sectionLabel" style={{ marginTop: 0 }}>
                Bonus
              </div>
              <p className="p" style={{ fontSize: 14 }}>
                Every fifth clean squash adds a small combo bonus, so fast, accurate clicks matter more than random tapping.
              </p>
            </div>
          </div>
        </div>

        <style>{`
          .bugCell.is-live:hover {
            transform: translateY(-2px) scale(1.01);
          }

          .bugCell.is-live::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.24), transparent 45%);
            pointer-events: none;
          }

          @media (max-width: 900px) {
            .bugBoard {
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 640px) {
            .bugBoard {
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 860px) {
            .bugBoard + div {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </Container>
    </section>
  );
}
