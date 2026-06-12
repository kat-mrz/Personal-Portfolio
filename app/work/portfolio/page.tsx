import Link from "next/link";
import { CursorTracker } from "../[slug]/CursorTracker";
import { AnimateIn } from "../[slug]/AnimateIn";
import { HeroTextParallax } from "../[slug]/HeroTextParallax";
import {
  EggHud, MoonPhases, WishStar, PerfumeBottle, WalkingCat, TeaCup,
  CameraSnap, CatConstellation, VinylDisc, EggCarton, Saturn,
  BigDipper, LittleDipper, CassiopeiaConst, OrionConst, LepusConst,
} from "./Eggs";

/* ─── Design tokens ─── */
const T = {
  serif:   "var(--font-playfair), Georgia, serif",
  mid:     "#0d1b3e",
  amber:   "#e8a020",
  gold:    "#e8c828",
  light:   "#f0f4ff",
  ink:     "#080f1c",
  muted:   "#374151",
  padX:    "clamp(1.5rem, 7vw, 8rem)" as const,
  padY:    "clamp(3.5rem, 7vw, 7rem)" as const,
  divider: "1px solid rgba(13,27,62,0.08)" as const,
  marble:  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.008 0.003' numOctaves='5' seed='5' result='t'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.55 0 0 0 0 0.57 0 0 0 0 0.65 0 0 0 0.09 0' in='t'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23m)'/%3E%3C/svg%3E\")" as const,
  dots:    "radial-gradient(ellipse 65% 55% at var(--cx, 78%) var(--cy, 18%), rgba(75,55,185,0.18) 0%, transparent 55%), radial-gradient(circle, rgba(255,255,255,0.048) 1px, transparent 1px)" as const,
  dotSize: "auto, 9px 9px" as const,
  aurora:  "linear-gradient(120deg, #07101f 0%, #0b1836 20%, #0f2244 38%, #0d1b3e 52%, #091530 66%, #0e1e42 80%, #07101f 100%)" as const,
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

function FireflyDots() {
  const dots = [
    { left: "12%",  top: "22%", size: 3,   opacity: 0.7  },
    { left: "78%",  top: "15%", size: 2.5, opacity: 0.55 },
    { left: "55%",  top: "60%", size: 2,   opacity: 0.45 },
    { left: "88%",  top: "55%", size: 3,   opacity: 0.6  },
    { left: "34%",  top: "80%", size: 2.2, opacity: 0.5  },
    { left: "92%",  top: "30%", size: 1.8, opacity: 0.4  },
  ];
  return (
    <>
      {dots.map((d, i) => (
        <span key={i} aria-hidden style={{
          position: "absolute",
          left: d.left, top: d.top,
          width: d.size, height: d.size,
          borderRadius: "50%",
          backgroundColor: T.gold,
          boxShadow: `0 0 ${d.size * 2.5}px ${d.size}px rgba(232,200,40,0.5)`,
          opacity: d.opacity,
          pointerEvents: "none",
          animation: `ff-blink ${1.8 + i * 0.4}s ease-in-out ${i * 0.6}s infinite`,
        }} />
      ))}
    </>
  );
}

const HERO_STYLES = `
  @keyframes ff-blink-slow {
    0%, 100% { opacity: 0.55; }
    50%       { opacity: 0.15; }
  }
`;

export default function PortfolioPage() {
  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", backgroundColor: T.light, color: T.mid }}>
      <style dangerouslySetInnerHTML={{ __html: HERO_STYLES }} />
      <CursorTracker />
      <EggHud />

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

      {/* ════════════════════════════════════════════════
          SECTION 1 — HERO  (aurora night sky)
      ════════════════════════════════════════════════ */}
      <section style={{
        background: T.aurora,
        padding: `calc(${T.padY} + 4rem) ${T.padX} clamp(3.5rem, 7vw, 6rem)`,
        minHeight: "75vh",
        display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
      }}>
        <FireflyDots />

        {/* Night sky objects — all absolutely positioned */}
        <MoonPhases />
        <WishStar />
        {/* Big & Little Dipper flank the left side of the sky */}
        <BigDipper />
        <LittleDipper />
        {/* Vinyl record — bottom right where the perfume used to live */}
        <VinylDisc />

        <div style={{ maxWidth: 780, width: "100%", position: "relative", zIndex: 1 }}>
          <HeroTextParallax rate={0.10}>
            <div style={{
              display: "inline-block",
              border: `1px solid ${T.amber}`,
              color: T.amber,
              fontSize: "0.65rem", letterSpacing: "0.2em",
              textTransform: "uppercase", padding: "0.35rem 0.9rem",
              borderRadius: "2px", marginBottom: "clamp(1.8rem, 3.5vw, 3rem)",
              fontWeight: 600,
            }}>
              ✦ Easter Eggs Inside
            </div>

            <h1 style={{
              fontFamily: T.serif,
              fontSize: "clamp(3.8rem, 10vw, 9rem)",
              fontWeight: 400, lineHeight: 0.92,
              color: "#fff", letterSpacing: "-0.01em",
              marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
              WebkitFontSmoothing: "antialiased",
            }}>
              This Portfolio
            </h1>

            <AnimateIn delay={0.1}>
              <p style={{
                fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                color: "rgba(255,255,255,0.65)", lineHeight: 1.65,
                maxWidth: 560,
                marginBottom: "clamp(2.5rem, 5vw, 4.5rem)",
              }}>
                The site you&apos;re on right now. Built to feel like something worth exploring —
                not just a list of work, but a space with its own atmosphere.
              </p>
            </AnimateIn>

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
                  { label: "Role",    value: "Design + Engineering" },
                  { label: "Stack",   value: "Next.js 16 · TypeScript · Tailwind" },
                  { label: "Status",  value: "Live — always evolving" },
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

      {/* ════════════════════════════════════════════════
          INTERSTITIAL — soft prompt
      ════════════════════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(180deg, #07101f 0%, #0c1630 100%)",
        padding: `clamp(2rem, 4vw, 3.5rem) ${T.padX}`,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: T.serif,
          fontStyle: "italic",
          fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
          color: "rgba(255,255,255,0.48)",
          margin: "0 auto",
          maxWidth: 560,
        }}>
          Before we start: have you tried clicking on the{" "}
          <Link href="/" style={{ color: T.amber, textDecoration: "none", borderBottom: `1px solid ${T.amber}` }}>
            jar
          </Link>
          {" "}at the top of my main page?
        </p>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 2 — THE KID  (light + marble)
      ════════════════════════════════════════════════ */}
      <section style={{
        background: T.light,
        backgroundImage: T.marble,
        padding: `${T.padY} ${T.padX}`,
        position: "relative",
        textAlign: "center",
      }}>
        {/* Camera (hint shots) — left margin on wide screens */}
        <CameraSnap />
        {/* Tea — right margin on wide screens */}
        <TeaCup />
        {/* Cat walks along the bottom */}
        <WalkingCat />

        <AnimateIn>
          <Label>Where It Starts</Label>
          <p style={{
            fontFamily: T.serif,
            fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
            fontWeight: 400,
            color: T.mid,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            maxWidth: 760,
            margin: "0 auto clamp(2rem, 4vw, 3.5rem)",
          }}>
            I&apos;ve always loved exploratory experiences.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.08}>
          <p style={{
            fontSize: "clamp(1rem, 1.5vw, 1.12rem)",
            color: T.muted, lineHeight: 1.85,
            maxWidth: 620,
            margin: "0 auto clamp(1.5rem, 3vw, 2.5rem)",
          }}>
            One of my fondest childhood memories is getting a summer pass to Science World
            and spending every week roaming the exhibits — poking, prodding, and experimenting
            with every button, lever, and sensory object I could find.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.14}>
          <p style={{
            fontSize: "clamp(1rem, 1.5vw, 1.12rem)",
            color: T.muted, lineHeight: 1.85,
            maxWidth: 620,
            margin: "0 auto clamp(2rem, 4vw, 3.5rem)",
          }}>
            Now I&apos;m in university. I&apos;ve learned to channel my curiosity into solving
            business problems — to{" "}
            <em style={{ color: T.mid, fontStyle: "italic" }}>&ldquo;align shareholder value,&rdquo;</em>
            {" "}<em style={{ color: T.mid, fontStyle: "italic" }}>&ldquo;circle back,&rdquo;</em>
            {" "}and{" "}
            <em style={{ color: T.mid, fontStyle: "italic" }}>&ldquo;take it offline.&rdquo;</em>
          </p>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <blockquote style={{
            borderTop: `1px solid ${T.amber}`,
            paddingTop: "clamp(1.25rem, 2.5vw, 2rem)",
            margin: "0 auto",
            maxWidth: 620,
          }}>
            <p style={{
              fontFamily: T.serif,
              fontSize: "clamp(1.2rem, 2.4vw, 2rem)",
              fontWeight: 400,
              color: T.mid,
              lineHeight: 1.3,
              fontStyle: "italic",
              margin: 0,
            }}>
              But deep down, I&apos;m still that kid at Science World — playing with
              anything that looks interactive, just to see what happens.
            </p>
          </blockquote>
        </AnimateIn>
      </section>

      {/* ════════════════════════════════════════════════
          SECTION 3 — THE EASTER EGGS  (dark + dots)
      ════════════════════════════════════════════════ */}
      <section style={{
        background: T.ink,
        backgroundImage: T.dots,
        backgroundSize: T.dotSize,
        padding: `${T.padY} ${T.padX}`,
        position: "relative",
        textAlign: "center",
      }}>
        {/* Constellations — left and right margins */}
        <CatConstellation />      {/* left top */}
        <CassiopeiaConst />       {/* right top */}
        <Saturn />                {/* left mid */}
        <OrionConst />            {/* left lower */}
        <LepusConst />            {/* right lower */}
        {/* Perfume — right bottom (where vinyl used to be) */}
        <PerfumeBottle />

        <AnimateIn>
          <Label light>The Easter Eggs</Label>
          <H2 dark>Joy of Exploration, By Design</H2>
        </AnimateIn>

        <AnimateIn delay={0.08}>
          <p style={{
            fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
            color: "rgba(255,255,255,0.6)", lineHeight: 1.85,
            maxWidth: 620,
            margin: "0 auto clamp(1.5rem, 3vw, 2.5rem)",
          }}>
            My goal is to bring that same joy of exploration into my work — starting
            with this portfolio. I&apos;ve hidden interactive easter eggs throughout the
            site, inspired by some of my favourite video games.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.14}>
          <p style={{
            fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
            color: "rgba(255,255,255,0.6)", lineHeight: 1.85,
            maxWidth: 620,
            margin: "0 auto clamp(2.5rem, 5vw, 4.5rem)",
          }}>
            I&apos;ll keep adding new secrets over time — so click, hover over, and drag
            anything that looks interesting.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.22}>
          <p style={{
            fontFamily: T.serif,
            fontSize: "clamp(2rem, 5.5vw, 5rem)",
            fontWeight: 400,
            color: "#fff",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            opacity: 0.92,
          }}>
            Who knows<br />what you&apos;ll find?
          </p>
        </AnimateIn>

        <EggCarton />
      </section>

      {/* ── Footer Nav ── */}
      <footer style={{
        background: T.ink,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: `clamp(2.5rem, 4.5vw, 4.5rem) ${T.padX}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "1rem",
      }}>
        <Link href="/work/grayne" style={{
          color: "rgba(255,255,255,0.45)", textDecoration: "none",
          fontSize: "0.82rem", letterSpacing: "0.08em", transition: "color 0.2s",
        }}>
          ← Grayne
        </Link>
        <span aria-hidden title="you know what to do" style={{
          color: "rgba(255,255,255,0.1)", fontSize: "0.68rem", letterSpacing: "0.25em",
          userSelect: "none",
        }}>
          ↑ ↑ ↓ ↓ ← → ← → B A
        </span>
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
