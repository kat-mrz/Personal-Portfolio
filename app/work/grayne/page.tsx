import Link from "next/link";
import { CursorTracker } from "../[slug]/CursorTracker";
import { AnimateIn } from "../[slug]/AnimateIn";
import { HeroTextParallax } from "../[slug]/HeroTextParallax";

const T = {
  serif:   "var(--font-playfair), Georgia, serif",
  mid:     "#0d1b3e",
  amber:   "#e8a020",
  light:   "#f0f4ff",
  ink:     "#080f1c",
  muted:   "#374151",
  padX:    "clamp(1.5rem, 7vw, 8rem)" as const,
  padY:    "clamp(3.5rem, 7vw, 7rem)" as const,
  divider: "1px solid rgba(13,27,62,0.08)" as const,
  marble:  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.008 0.003' numOctaves='5' seed='5' result='t'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.55 0 0 0 0 0.57 0 0 0 0 0.65 0 0 0 0.09 0' in='t'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23m)'/%3E%3C/svg%3E\")" as const,
  dots:    "radial-gradient(ellipse 65% 55% at var(--cx, 78%) var(--cy, 18%), rgba(75,55,185,0.18) 0%, transparent 55%), radial-gradient(circle, rgba(255,255,255,0.048) 1px, transparent 1px)" as const,
  dotSize: "auto, 9px 9px" as const,
};

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 40 40" fill="currentColor" aria-hidden>
      <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" />
    </svg>
  );
}

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p style={{
      fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em",
      textTransform: "uppercase", color: T.amber,
      marginBottom: "0.75rem", opacity: light ? 0.85 : 1,
    }}>
      {children}
    </p>
  );
}

function H2({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <h2 style={{
      fontFamily: T.serif, fontSize: "clamp(1.7rem, 3.2vw, 2.8rem)", fontWeight: 400,
      color: dark ? "#fff" : T.mid, lineHeight: 1.05, letterSpacing: "0.05em",
      marginBottom: "clamp(1.5rem, 3vw, 3rem)",
      WebkitFontSmoothing: "antialiased",
    }}>
      {children}
    </h2>
  );
}

export default function GraynePage() {
  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", backgroundColor: T.light, color: T.mid }}>
      <CursorTracker />

      {/* ── Nav ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.1rem 2.5rem", backgroundColor: T.ink,
      }}>
        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: "0.45rem",
          textDecoration: "none", color: "#fff", fontFamily: T.serif, fontSize: "1.05rem",
        }}>
          <span style={{ color: T.amber }}><StarIcon /></span>
          Katrina Mrzljak
        </Link>
        <Link href="/#work" style={{
          textDecoration: "none", color: "rgba(255,255,255,0.35)",
          fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.04em",
        }}>← Work</Link>
      </header>

      {/* ════════════════════════════════════
          SECTION 1 — HERO  (dark + dots)
      ════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(120deg, #07101f 0%, #0b1836 20%, #0f2244 38%, #0d1b3e 52%, #091530 66%, #0e1e42 80%, #07101f 100%)",
        padding: `calc(${T.padY} + 4rem) ${T.padX} clamp(3.5rem, 7vw, 6rem)`,
        minHeight: "70vh",
        display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: 780, width: "100%" }}>
        <HeroTextParallax rate={0.10}>
          {/* Badge */}
          <div style={{
            display: "inline-block",
            border: `1px solid ${T.amber}`,
            color: T.amber,
            fontSize: "0.65rem", letterSpacing: "0.2em",
            textTransform: "uppercase", padding: "0.35rem 0.9rem",
            borderRadius: "2px", marginBottom: "clamp(1.8rem, 3.5vw, 3rem)",
            fontWeight: 600,
          }}>
            In Progress — Personal Project
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: T.serif,
            fontSize: "clamp(3.8rem, 10vw, 9rem)",
            fontWeight: 400, lineHeight: 0.92,
            color: "#fff", letterSpacing: "-0.01em",
            marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
            WebkitFontSmoothing: "antialiased",
          }}>
            Grayne
          </h1>

          {/* Tagline */}
          <AnimateIn delay={0.1}>
            <p style={{
              fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
              color: "rgba(255,255,255,0.65)", lineHeight: 1.65,
              maxWidth: 560,
              marginBottom: "clamp(2.5rem, 5vw, 4.5rem)",
            }}>
              A journaling app that keeps track of how you feel about the people and things
              in your life. Reflection simplified.
            </p>
          </AnimateIn>

          {/* Meta strip */}
          <AnimateIn delay={0.2}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, auto)",
              gap: "0 clamp(2rem, 4vw, 4rem)",
              justifyContent: "start",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "clamp(1.5rem, 3vw, 2.5rem)",
            }}>
              {[
                { label: "Status", value: "In Progress" },
                { label: "Type", value: "Web App" },
                { label: "Stack", value: "React + Vite" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: T.amber, marginBottom: "0.35rem" }}>
                    {label}
                  </p>
                  <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </HeroTextParallax>
        </div>
      </section>

      {/* ════════════════════════════════════
          SECTION 2 — THE CONCEPT  (light + marble)
      ════════════════════════════════════ */}
      <section style={{
        background: T.light,
        backgroundImage: T.marble,
        padding: `${T.padY} ${T.padX}`,
      }}>
        <AnimateIn>
          <Label>The Concept</Label>
          <H2>Journaling Without the Structure</H2>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <p style={{
            fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
            color: T.muted, lineHeight: 1.75,
            maxWidth: 640,
          }}>
            I identified two problems I have with journaling. One: I get so caught up in formatting and grammar checking my entries that I never just dump my feelings out. Two: I rarely revisit old entries and forget about important moments. Which is why I'm developing Grayne.
            The user will jot down their entry through bullet points, while Grayne analyzes the sentiment of the statement, grading the sentiment of the day. Grayne will also track the sentiment attached to each person, place, or thing mentioned for analytics-supported reflection.
          </p>
        </AnimateIn>
      </section>

      {/* ════════════════════════════════════
          SECTION 3 — FEATURES  (dark + dots)
      ════════════════════════════════════ */}
      <section style={{
        background: T.ink,
        backgroundImage: T.dots,
        backgroundSize: T.dotSize,
        padding: `${T.padY} ${T.padX}`,
      }}>
        <AnimateIn>
          <Label light>What It Does</Label>
          <H2 dark>A Few Things Worth Noting</H2>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "clamp(1rem, 2vw, 1.5rem)",
            marginTop: "clamp(0.5rem, 1.5vw, 1rem)",
          }}>
            {[
              {
                title: "Impressions",
                body: "A sentiment word cloud and line graph per entity. See which names and places carry the most emotional weight over time.",
              },
              {
                title: "Sentiment Calendar",
                body: "A month view shaded green to red by day. Spot patterns in your life without having to re-read a word.",
              },
              {
                title: "Ask Gray",
                body: "An AI chat with full journal context. Ask Grayne's mascot anything. Gray can give you answers informed by your experiences.",
              },
            ].map(({ title, body }) => (
              <div key={title} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "4px",
                padding: "clamp(1.5rem, 3vw, 2.2rem)",
              }}>
                <p style={{
                  fontFamily: T.serif, fontSize: "1.05rem",
                  color: "#fff", marginBottom: "0.75rem",
                  letterSpacing: "0.02em",
                }}>
                  {title}
                </p>
                <p style={{
                  fontSize: "0.9rem", color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.65,
                }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </section>

      {/* ════════════════════════════════════
          SECTION 4 — STATUS  (light + marble)
      ════════════════════════════════════ */}
      <section style={{
        background: T.light,
        backgroundImage: T.marble,
        padding: `${T.padY} ${T.padX}`,
      }}>
        <AnimateIn>
          <Label>Status</Label>
          <H2>Still Cooking</H2>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <p style={{
            fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
            color: T.muted, lineHeight: 1.75,
            maxWidth: 560,
            marginBottom: "clamp(2rem, 4vw, 3rem)",
          }}>
            Core features are working. Polishing the experience before a proper writeup.
          </p>

          <span
            aria-disabled="true"
            title="Coming soon — still polishing"
            style={{
              display: "inline-block",
              background: "rgba(232,160,32,0.35)",
              color: "rgba(255,255,255,0.55)",
              textDecoration: "none",
              fontSize: "0.82rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 600,
              padding: "0.85rem 2rem",
              borderRadius: "2px",
              cursor: "not-allowed",
              userSelect: "none",
            }}
          >
            Coming Soon →
          </span>
        </AnimateIn>
      </section>

      {/* ── Footer Nav ── */}
      <footer style={{
        background: T.ink,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: `clamp(2.5rem, 4.5vw, 4.5rem) ${T.padX}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "1rem",
      }}>
        <Link href="/work/platebook" style={{
          color: "rgba(255,255,255,0.45)", textDecoration: "none",
          fontSize: "0.82rem", letterSpacing: "0.08em", transition: "color 0.2s",
        }}>
          ← PlateBook
        </Link>
        <Link href="/work/portfolio" style={{
          color: "rgba(255,255,255,0.45)", textDecoration: "none",
          fontSize: "0.82rem", letterSpacing: "0.08em", transition: "color 0.2s",
        }}>
          This Portfolio →
        </Link>
        <Link href="/#work" style={{
          color: "rgba(255,255,255,0.45)", textDecoration: "none",
          fontSize: "0.82rem", letterSpacing: "0.08em", transition: "color 0.2s",
        }}>
          All Work ↗
        </Link>
      </footer>
    </div>
  );
}
