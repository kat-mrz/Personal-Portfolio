import Link from "next/link";
import Image from "next/image";
import { CursorTracker } from "../[slug]/CursorTracker";
import { AnimateIn } from "../[slug]/AnimateIn";
import { HeroTextParallax } from "../[slug]/HeroTextParallax";
import { SwipeDemo } from "./SwipeDemo";
import { ServingDemo } from "./ServingDemo";

/* ─── Tokens ─────────────────────────────────────────────────── */
const T = {
  serif:   "var(--font-playfair), Georgia, serif",
  mid:     "#0d1b3e",
  amber:   "#e8a020",
  limeViv: "#C5E84A",
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

/* ─── Atoms ──────────────────────────────────────────────────── */
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
      textTransform: "uppercase" as const, color: T.amber,
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

function Phone({ tint = "#1C1C1C", screenLabel, src }: { tint?: string; screenLabel?: string; src?: string }) {
  return (
    <div className="phone-wrap" style={{ width: "100%", maxWidth: 280, margin: "0 auto", position: "relative" }}>
      <div style={{
        width: "100%", aspectRatio: "9/19.5",
        backgroundColor: "#111",
        borderRadius: "clamp(28px, 5vw, 40px)",
        border: "2px solid rgba(255,255,255,0.12)",
        boxShadow: "0 0 0 6px rgba(0,0,0,0.6), 0 32px 80px rgba(0,0,0,0.55)",
        overflow: "hidden",
        position: "relative",
        display: "flex", flexDirection: "column" as const,
      }}>
        {src ? (
          <>
            <Image
              src={src}
              alt={screenLabel ?? ""}
              fill
              style={{ objectFit: "cover", objectPosition: "top center" }}
              sizes="280px"
            />
            {/* Dynamic Island — iPhone 15 Pro pill, ~32% wide, ~4.3% tall, 1.4% from top */}
            <div aria-hidden style={{
              position: "absolute",
              top: "1.4%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "32%",
              height: "4.3%",
              backgroundColor: "#000",
              borderRadius: 999,
              zIndex: 10,
              pointerEvents: "none",
            }} />
          </>
        ) : (
          <>
            <div style={{
              width: "100%", height: "5%",
              backgroundColor: "rgba(0,0,0,0.8)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <div style={{ width: 60, height: 6, backgroundColor: "#222", borderRadius: 3 }} />
            </div>
            <div style={{
              flex: 1, backgroundColor: tint,
              display: "flex", flexDirection: "column" as const,
              alignItems: "center", justifyContent: "center",
              gap: "0.5rem", padding: "1rem",
            }}>
              <span style={{ fontSize: "1.5rem", opacity: 0.15 }}>📱</span>
              {screenLabel && (
                <span style={{
                  fontSize: "0.55rem", fontWeight: 600, textAlign: "center" as const,
                  maxWidth: "80%", lineHeight: 1.5, letterSpacing: "0.06em",
                  color: tint === "#1C1C1C" ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)",
                }}>
                  {screenLabel}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function PlateBookPage() {
  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", backgroundColor: T.light, color: T.mid }}>
      <CursorTracker />

      <style>{`
        /* ── Playbook feature cells ── */
        .pb-cell {
          padding: 1.4rem 1.5rem;
          background: rgba(255,255,255,0.04);
          transition: background 0.2s ease, transform 0.2s ease;
          cursor: default;
        }
        .pb-cell:hover {
          background: rgba(255,255,255,0.09);
          transform: translateY(-2px);
        }
        .pb-cell:hover .pb-cell-title { color: ${T.limeViv}; }

        /* ── Phone hover tilt ── */
        .phone-wrap {
          transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1),
                      filter 0.45s ease;
          will-change: transform;
        }
        .phone-wrap:hover {
          transform: perspective(900px) rotateY(-5deg) rotateX(2deg)
                     translateY(-12px) scale(1.04);
          filter: drop-shadow(0 28px 48px rgba(0,0,0,0.45));
        }
      `}</style>

      {/* ── Nav ─────────────────────────────────────────────────── */}
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

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section style={{
        backgroundColor: T.ink,
        backgroundImage: T.dots,
        backgroundSize: T.dotSize,
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(7rem, 14vw, 12rem)",
        paddingBottom: "clamp(3.5rem, 7vw, 6rem)",
        paddingLeft: T.padX,
        paddingRight: T.padX,
      }}>
        <div style={{
          position: "relative", zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr clamp(200px, 28%, 300px)",
          gap: "clamp(3rem, 6vw, 7rem)",
          alignItems: "center",
          maxWidth: 1200,
        }}>
          {/* Left */}
          <HeroTextParallax rate={0.10}>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const, marginBottom: "1.25rem" }}>
              {["iOS · React Native", "Product Design", "Personal Project"].map((b) => (
                <span key={b} style={{
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em",
                  textTransform: "uppercase" as const,
                  border: "1px solid rgba(232,160,32,0.35)",
                  color: T.amber, padding: "0.35rem 0.85rem", borderRadius: 2,
                }}>
                  {b}
                </span>
              ))}
            </div>

            <p style={{
              fontFamily: T.serif, fontStyle: "italic",
              fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
              color: "rgba(255,255,255,0.45)", marginBottom: "0.75rem",
            }}>
              A meal tracking app you'll actually keep using
            </p>

            <h1 style={{
              fontFamily: T.serif, fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
              fontWeight: 400, color: "#fff", lineHeight: 1.0,
              letterSpacing: "0.04em", marginBottom: "clamp(1.25rem, 2.5vw, 2rem)",
              WebkitFontSmoothing: "antialiased",
            }}>
              PlateBook
            </h1>

            <p style={{
              fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)", color: "rgba(255,255,255,0.5)",
              lineHeight: 1.8, maxWidth: "52ch",
              marginBottom: "clamp(2rem, 4vw, 3.5rem)",
            }}>
              Build a library of the meals you already eat. Log them in one tap. Let the app figure out the rest.
            </p>

            <div style={{ display: "flex", gap: "clamp(1.5rem, 3vw, 3rem)", flexWrap: "wrap" as const }}>
              {[
                { value: "5", label: "Screens" },
                { value: "0", label: "Logins" },
                { value: "1", label: "Suggestion Engine" },
                { value: "2024", label: "Year Built" },
              ].map(({ value, label }) => (
                <div key={label} style={{ borderLeft: `3px solid ${T.amber}`, paddingLeft: "1rem" }}>
                  <p style={{ fontFamily: T.serif, fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", color: "#fff", lineHeight: 1, marginBottom: "0.2rem" }}>{value}</p>
                  <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.35)" }}>{label}</p>
                </div>
              ))}
            </div>
          </HeroTextParallax>

          {/* Right — phone */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Phone src="/pb-home.png" screenLabel="Home screen: calories & protein donut charts" tint="#1C1C1C" />
          </div>
        </div>

        {/* Role strip */}
        <div style={{
          position: "relative", zIndex: 1,
          display: "grid", gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1px", backgroundColor: "rgba(255,255,255,0.06)",
          marginTop: "clamp(2.5rem, 4vw, 4rem)", maxWidth: 1200,
        }}>
          {[
            { label: "Role", value: "Designer & Developer" },
            { label: "Platform", value: "iOS · React Native" },
            { label: "Stack", value: "Expo SDK 54 · AsyncStorage" },
            { label: "Tools", value: "Figma · Claude Code" },
            { label: "Type", value: "Personal Project" },
          ].map(({ label, value }) => (
            <div key={label} style={{ backgroundColor: "rgba(255,255,255,0.02)", padding: "1.5rem 1.75rem" }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", marginBottom: "0.4rem" }}>{label}</p>
              <p style={{ fontSize: "clamp(0.85rem, 1vw, 0.95rem)", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── AT A GLANCE ─────────────────────────────────────────── */}
      <section style={{
        paddingTop: "clamp(3rem, 6vw, 6rem)", paddingBottom: "clamp(3rem, 6vw, 6rem)",
        paddingLeft: T.padX, paddingRight: T.padX,
        backgroundImage: T.marble,
      }}>
        <AnimateIn>
          <Label>At a Glance</Label>
          <H2>The Problem Worth Solving</H2>
        </AnimateIn>
        <AnimateIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "rgba(13,27,62,0.08)" }}>

            {/* Problem */}
            <div style={{ padding: "3rem 2.5rem", backgroundColor: T.mid, borderTop: `3px solid ${T.amber}`, display: "flex", flexDirection: "column" as const, gap: "1.25rem" }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: T.amber }}>Problem</p>
              <p style={{ fontFamily: T.serif, fontSize: "clamp(1.4rem,2.2vw,1.9rem)", fontStyle: "italic", color: "#fff", lineHeight: 1.25 }}>
                Tracking nutrition<br />shouldn't be a job.
              </p>
              <p style={{ fontSize: "clamp(0.9rem,1.05vw,1rem)", color: "rgba(255,255,255,0.5)", lineHeight: 1.85 }}>
                Most apps ask you to scan barcodes, weigh ingredients, and build a food database from scratch, every single day. Most people quit within a week.
              </p>
            </div>

            {/* Solution */}
            <div style={{ padding: "3rem 2.5rem", backgroundColor: T.light, borderTop: `3px solid ${T.amber}`, display: "flex", flexDirection: "column" as const, gap: "1.25rem" }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: T.amber }}>Solution</p>
              <p style={{ fontFamily: T.serif, fontSize: "clamp(1.4rem,2.2vw,1.9rem)", fontStyle: "italic", color: T.mid, lineHeight: 1.25 }}>
                A playbook.<br />Not a database.
              </p>

              {/* Stat */}
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", borderLeft: `3px solid ${T.amber}`, paddingLeft: "1.25rem" }}>
                <p style={{ fontFamily: T.serif, fontSize: "clamp(2.5rem, 4vw, 3.5rem)", color: T.amber, lineHeight: 1, flexShrink: 0 }}>9</p>
                <div>
                  <p style={{ fontSize: "clamp(0.85rem,1vw,0.95rem)", color: T.mid, lineHeight: 1.55 }}>
                    meals is the average adult's weekly rotation; most people already eat from a small, fixed repertoire.
                  </p>
                  <p style={{ fontSize: "0.62rem", color: "rgba(13,27,62,0.4)", marginTop: "0.35rem" }}>NPD Group, Eating Patterns in America</p>
                </div>
              </div>

              <p style={{ fontSize: "clamp(0.9rem,1.05vw,1rem)", color: T.muted, lineHeight: 1.85 }}>
                PlateBook leans into that. Save your meals once, log them in a tap, and let a context-aware engine fill in the rest.
              </p>
            </div>

          </div>
        </AnimateIn>
      </section>

      {/* ── FEATURE 1: HOME ─────────────────────────────────────── */}
      <section style={{ backgroundColor: T.ink, paddingTop: T.padY, paddingBottom: T.padY, paddingLeft: T.padX, paddingRight: T.padX }}>
        <AnimateIn>
          <Label light>01 · Home Screen</Label>
          <H2 dark>The Day at a Glance</H2>
        </AnimateIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2.5rem, 5vw, 6rem)", alignItems: "center" }}>
          <AnimateIn delay={0.05}>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "clamp(1.1rem, 2.2vw, 2rem)" }}>
              <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)", color: "rgba(255,255,255,0.75)", lineHeight: 1.45 }}>
                Two numbers.<br />Every answer.
              </p>
              <p style={{ fontSize: "clamp(0.9rem, 1.05vw, 1rem)", color: "rgba(255,255,255,0.48)", lineHeight: 1.85 }}>
                Two donut charts (calories and protein) front and center. No tabs. Everything you need to make a food decision is above the fold.
              </p>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.85rem" }}>
                {[
                  { icon: "⏰", title: "Greeting that rotates daily", body: "Five time-of-day pools, changes each day. Personal without needing any setup." },
                  { icon: "←", title: "Swipe to remove", body: "Swipe left on any logged meal to delete it. No confirmation dialog." },
                  { icon: "⚡", title: "Live progress pills", body: "Remaining calories and protein update in real time. Pills go red near the limit." },
                ].map(({ icon, title, body }) => (
                  <div key={title} style={{
                    display: "flex", gap: "1rem", alignItems: "flex-start",
                    padding: "1.1rem 1.4rem",
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderLeft: `3px solid ${T.amber}`,
                  }}>
                    <span style={{ fontSize: "1rem", flexShrink: 0, marginTop: "0.1rem" }}>{icon}</span>
                    <div>
                      <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "rgba(255,255,255,0.65)", marginBottom: "0.25rem" }}>{title}</p>
                      <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.65 }}>{body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive swipe demo */}
              <div>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", marginBottom: "0.75rem" }}>
                  Try it
                </p>
                <SwipeDemo />
              </div>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <Phone src="/pb-home.png" screenLabel="Home: donut charts, today's meal log" tint="#1C1C1C" />
          </AnimateIn>
        </div>
      </section>

      {/* ── FEATURE 2: SUGGESTIONS ──────────────────────────────── */}
      <section style={{ paddingTop: T.padY, paddingBottom: T.padY, paddingLeft: T.padX, paddingRight: T.padX }}>
        <AnimateIn>
          <Label>02 · Suggestion Engine</Label>
          <H2>It Knows What You Usually Eat Right Now</H2>
        </AnimateIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2.5rem, 5vw, 6rem)", alignItems: "center" }}>
          <AnimateIn delay={0.05}>
            <Phone src="/pb-suggestions.png" screenLabel="Suggestions: meal picks with reasoning" tint="#f9f9f9" />
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "clamp(1.5rem, 3vw, 2.5rem)" }}>
              <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)", color: T.mid, lineHeight: 1.45 }}>
                Not just "what fits."<br />What fits <em style={{ color: T.amber }}>right now.</em>
              </p>
              <p style={{ fontSize: "clamp(0.9rem, 1.05vw, 1rem)", color: T.muted, lineHeight: 1.85 }}>
                The engine ranks your playbook meals by protein density, how much of your remaining gap they cover, and how often you've eaten them at this time of day. Each pick comes with a one-line reason so you're never just guessing.
              </p>
              <div style={{ border: `1px solid rgba(13,27,62,0.1)`, borderTop: `3px solid ${T.amber}`, padding: "1.75rem 2rem" }}>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: T.amber, marginBottom: "1rem" }}>
                  How it scores
                </p>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.65rem" }}>
                  {[
                    { factor: "Protein density", note: "protein ÷ calories" },
                    { factor: "Protein coverage", note: "how much of your gap this fills" },
                    { factor: "Time-of-day boost", note: "meals you eat around now score up to 2.5×" },
                  ].map(({ factor, note }, i) => (
                    <div key={factor} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <span style={{
                        width: 20, height: 20, borderRadius: "50%",
                        backgroundColor: T.amber, color: T.ink,
                        fontSize: "0.6rem", fontWeight: 800,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, marginTop: "0.1rem",
                      }}>{i + 1}</span>
                      <div>
                        <p style={{ fontSize: "0.82rem", fontWeight: 700, color: T.mid }}>{factor}</p>
                        <p style={{ fontSize: "0.78rem", color: T.muted, lineHeight: 1.55 }}>{note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── FEATURE 3: PLAYBOOK ─────────────────────────────────── */}
      <section style={{ backgroundColor: T.ink, paddingTop: T.padY, paddingBottom: T.padY, paddingLeft: T.padX, paddingRight: T.padX }}>
        <AnimateIn>
          <Label light>03 · Playbook</Label>
          <H2 dark>Your Meal Library</H2>
        </AnimateIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2.5rem, 5vw, 6rem)", alignItems: "center" }}>
          <AnimateIn delay={0.05}>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "clamp(1.5rem, 3vw, 2.5rem)" }}>
              <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)", color: "rgba(255,255,255,0.75)", lineHeight: 1.45 }}>
                Save once.<br />Log forever.
              </p>
              <p style={{ fontSize: "clamp(0.9rem, 1.05vw, 1rem)", color: "rgba(255,255,255,0.48)", lineHeight: 1.85 }}>
                Add a meal with a name, calories, protein, and optional notes. After that it's a single tap (with a serving scale modal if the portion changes).
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", backgroundColor: "rgba(255,255,255,0.06)" }}>
                {[
                  { title: "5 Sort Modes", body: "Newest · Oldest · Most Used · A→Z · P/C Ratio" },
                  { title: "Smart Search", body: "Searches meal name and individual ingredients" },
                  { title: "Usage Count", body: "Every log tap increments a counter on the card" },
                  { title: "P/C Ratio Badge", body: "Protein efficiency shown at a glance on every card" },
                  { title: "Serving Scale", body: "Adjust serving size; macros preview updates live" },
                  { title: "Swipe to Delete", body: "Swipe left to remove. No confirmation needed." },
                ].map(({ title, body }) => (
                  <div key={title} className="pb-cell">
                    <p className="pb-cell-title" style={{ fontSize: "0.82rem", fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: "0.4rem", transition: "color 0.2s ease" }}>{title}</p>
                    <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.6 }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start" }}>
              <Phone src="/pb-playbook.png" screenLabel="Playbook: meal cards with macro pills, P/C ratio" tint="#f9f9f9" />
              <div style={{ marginTop: "3rem" }}>
                <ServingDemo />
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── FEATURE 4: ANALYTICS ─────────────────────────────────── */}
      <section style={{ backgroundColor: T.light, paddingTop: T.padY, paddingBottom: T.padY, paddingLeft: T.padX, paddingRight: T.padX }}>
        <AnimateIn>
          <Label>04 · Analytics</Label>
          <H2>Patterns Over Perfection</H2>
        </AnimateIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2.5rem, 5vw, 6rem)", alignItems: "center" }}>
          <AnimateIn delay={0.05}>
            <Phone src="/pb-analytics.png" screenLabel="Analytics: monthly calendar, streak, trend charts" tint="#1C1C1C" />
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "clamp(1.1rem, 2.2vw, 2rem)" }}>
              <p style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)", color: T.mid, lineHeight: 1.45 }}>
                Consistency is the metric<br />that actually matters.
              </p>
              <p style={{ fontSize: "clamp(0.9rem, 1.05vw, 1rem)", color: T.muted, lineHeight: 1.85 }}>
                A monthly calendar marks days where you hit both goals. The pattern of green cells tells you more than a daily calorie count ever could.
              </p>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
                {[
                  { title: "Goal-aware marking", body: "Cut/recomp = under limit. Bulk = hit minimum. Maintain = within 10%. Each mode defines a green day differently." },
                  { title: "Streak counter", body: "Consecutive days with both goals met. A simple retention hook." },
                  { title: "Monthly trend lines", body: "Calories and protein charted over time. Navigate back to any month." },
                  { title: "Targets set by science", body: "Goals are calculated using Mifflin-St Jeor BMR with activity multipliers. Protein targets scale from 1.4 g/kg (maintain) to 2.2 g/kg (recomp), based on published research." },
                ].map(({ title, body }) => (
                  <div key={title} style={{ borderLeft: `3px solid ${T.amber}`, paddingLeft: "1.25rem" }}>
                    <p style={{ fontSize: "0.8rem", fontWeight: 700, color: T.mid, marginBottom: "0.25rem" }}>{title}</p>
                    <p style={{ fontSize: "0.82rem", color: T.muted, lineHeight: 1.65 }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── DESIGN SYSTEM ───────────────────────────────────────── */}
      <section style={{
        backgroundColor: "#fff",
        paddingTop: T.padY, paddingBottom: T.padY,
        paddingLeft: T.padX, paddingRight: T.padX,
        borderTop: T.divider,
      }}>
        <AnimateIn>
          <Label>Design System</Label>
          <H2>Visual Language</H2>
        </AnimateIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 6vw, 6rem)" }}>
          {/* Colour */}
          <AnimateIn delay={0.05}>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: T.amber, marginBottom: "1.5rem" }}>Colour</p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
              {[
                { swatch: "#C5E84A", name: "Lime", role: "Primary accent: CTAs, active states, progress" },
                { swatch: "#1C1C1C", name: "Dark", role: "Card backgrounds, content containers" },
                { swatch: "#F9F9F9", name: "Off-white", role: "Screen background, cards" },
                { swatch: "#E8F5C0", name: "Lime Light", role: "Secondary fills, macro pills" },
                { swatch: "#8A8A8A", name: "Gray", role: "Supporting text, metadata" },
                { swatch: "#FF5C5C", name: "Red", role: "Over-limit warnings" },
              ].map(({ swatch, name, role }) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 6, backgroundColor: swatch, flexShrink: 0, border: "1px solid rgba(13,27,62,0.08)" }} />
                  <div>
                    <p style={{ fontSize: "0.8rem", fontWeight: 700, color: T.mid, marginBottom: "0.1rem" }}>{name}</p>
                    <p style={{ fontSize: "0.72rem", color: T.muted, lineHeight: 1.5 }}>{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>

          {/* Type */}
          <AnimateIn delay={0.1}>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: T.amber, marginBottom: "1.5rem" }}>Typography</p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "2rem" }}>
              <div style={{ borderLeft: `3px solid ${T.amber}`, paddingLeft: "1.5rem" }}>
                <p style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", color: T.mid, fontWeight: 700, letterSpacing: "2px", marginBottom: "0.3rem", lineHeight: 1 }}>MILKER</p>
                <p style={{ fontSize: "0.72rem", color: T.muted }}>Display · hero numbers · page titles</p>
              </div>
              <div style={{ borderLeft: `3px solid rgba(13,27,62,0.15)`, paddingLeft: "1.5rem" }}>
                <p style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", color: T.mid, fontWeight: 700, letterSpacing: "0.3px", marginBottom: "0.3rem", lineHeight: 1 }}>ZT Nature Bold</p>
                <p style={{ fontSize: "0.72rem", color: T.muted }}>Section headers · button labels · card names</p>
              </div>
              <div style={{ borderLeft: `3px solid rgba(13,27,62,0.07)`, paddingLeft: "1.5rem" }}>
                <p style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)", color: T.muted, marginBottom: "0.3rem", lineHeight: 1 }}>ZT Nature Regular</p>
                <p style={{ fontSize: "0.72rem", color: T.muted, opacity: 0.65 }}>Body text · notes · supporting copy</p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── WHAT'S NEXT ─────────────────────────────────────────── */}
      <section style={{ backgroundColor: T.ink, paddingTop: "clamp(3rem, 6vw, 6rem)", paddingBottom: "clamp(3rem, 6vw, 6rem)", paddingLeft: T.padX, paddingRight: T.padX }}>
        <div style={{ maxWidth: 720 }}>
          <AnimateIn>
            <Label light>What's Next</Label>
            <H2 dark>Meal packs: shareable playbook templates</H2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <p style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)", color: "rgba(255,255,255,0.5)", lineHeight: 1.9 }}>
              The playbook format maps naturally to sharing. A "meal pack" (a curated set of playbook entries for a specific goal) could export as a file and import in one tap. It would solve the cold-start problem and let people share what's working, without needing a backend.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── GLOOK ───────────────────────────────────────────────── */}
      <section style={{ backgroundColor: T.light, paddingTop: "clamp(2.5rem, 4.5vw, 4.5rem)", paddingBottom: "clamp(2.5rem, 4.5vw, 4.5rem)", paddingLeft: T.padX, paddingRight: T.padX }}>
        <AnimateIn>
          <Label>Related Project</Label>
          <div style={{
            display: "grid", gridTemplateColumns: "auto 1fr", gap: "clamp(2rem, 4vw, 4rem)",
            alignItems: "center", maxWidth: 860,
            borderLeft: `3px solid ${T.amber}`, paddingLeft: "2rem",
          }}>
            <div>
              <p style={{ fontFamily: T.serif, fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", color: T.mid, lineHeight: 1, marginBottom: "0.3rem" }}>Glook</p>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: T.amber }}>iOS · React Native</p>
            </div>
            <p style={{ fontSize: "clamp(0.9rem, 1.05vw, 1rem)", color: T.muted, lineHeight: 1.8 }}>
              A companion app applying the same one-tap logging model to glucose management. Tracks daily carbs and fiber intake against personal goals, designed for health-conscious users and those managing prediabetes. Built with the same stack (Expo SDK 54, React Native) with a distinct pink visual identity.
            </p>
          </div>
        </AnimateIn>
      </section>

      {/* ── NEXT PROJECT NAV ─────────────────────────────────────── */}
      <section style={{
        backgroundColor: T.ink,
        paddingTop: "clamp(4rem, 7vw, 7rem)", paddingBottom: "clamp(4rem, 7vw, 7rem)",
        paddingLeft: T.padX, paddingRight: T.padX,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap" as const, gap: "2rem",
      }}>
        <Link href="/work/project-1" style={{ textDecoration: "none" }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", marginBottom: "0.5rem" }}>← Previous</p>
          <p style={{ fontFamily: T.serif, fontSize: "clamp(1rem, 1.6vw, 1.4rem)", color: "#fff" }}>Dualité Fragrance</p>
        </Link>
        <Link href="/#work" style={{ textDecoration: "none" }}>
          <span style={{
            fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            border: "1px solid rgba(232,160,32,0.4)", color: T.amber,
            padding: "0.75rem 2rem", display: "inline-block",
          }}>All Work ↗</span>
        </Link>
      </section>
    </div>
  );
}
