import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   ATOMS
───────────────────────────────────────────────────────────── */
function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 40 40" fill="currentColor" aria-hidden>
      <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" />
    </svg>
  );
}

function ImgSlot({
  label, ratio = "16/9", dark = false, tall = false,
}: {
  label?: string; ratio?: string; dark?: boolean; tall?: boolean;
}) {
  return (
    <div style={{
      width: "100%",
      aspectRatio: tall ? "3/4" : ratio,
      backgroundColor: dark ? "rgba(255,255,255,0.05)" : "rgba(13,27,62,0.05)",
      border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(13,27,62,0.07)",
      display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: 2,
    }}>
      <span style={{
        fontSize: "0.65rem",
        color: dark ? "rgba(255,255,255,0.18)" : "rgba(13,27,62,0.18)",
        fontWeight: 500,
      }}>
        {label ?? "Image"}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const PROJECTS: Record<string, { slug: string }> = {
  "project-1": { slug: "project-1" },
};

export function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!PROJECTS[slug]) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2rem", color: "#0d1b3e" }}>
          Not found.
        </p>
      </div>
    );
  }

  const serif   = "var(--font-playfair), Georgia, serif";
  const mid     = "#0d1b3e";
  const amber   = "#e8a020";
  const light   = "#f0f4ff";
  const ink     = "#080f1c";
  const padX    = "clamp(1.5rem, 7vw, 8rem)";

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", backgroundColor: light, color: mid }}>

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.1rem 2.5rem",
      }}>
        <Link href="/" style={{
          display: "flex", alignItems: "center", gap: "0.45rem",
          textDecoration: "none", color: "#fff",
          fontWeight: 700, fontFamily: serif, fontSize: "1rem",
        }}>
          <span style={{ color: amber }}><StarIcon /></span>
          Katrina Mrzljak
        </Link>
        <Link href="/#work" style={{
          textDecoration: "none", color: "rgba(255,255,255,0.4)",
          fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.04em",
        }}>
          ← Work
        </Link>
      </header>

      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section style={{
        minHeight: "100vh",
        backgroundColor: ink,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: `clamp(7rem, 10vw, 10rem) ${padX} clamp(4rem, 7vw, 7rem)`,
        gap: "clamp(3rem, 6vw, 7rem)",
      }}>
        {/* Left: text */}
        <div>
          <p style={{
            fontSize: "0.65rem", fontWeight: 700,
            letterSpacing: "0.35em", textTransform: "uppercase" as const,
            color: amber, marginBottom: "1.75rem",
          }}>
            Miu Miu
          </p>
          <h1 style={{
            fontFamily: serif,
            fontSize: "clamp(4.5rem, 10vw, 10rem)",
            fontWeight: 900, color: "#fff",
            lineHeight: 0.88, letterSpacing: "-0.03em",
            marginBottom: "2.5rem",
          }}>
            Dua&shy;lité
          </h1>
          <div style={{ width: "clamp(1.5rem, 3vw, 2.5rem)", height: "1px", backgroundColor: amber, marginBottom: "2rem" }} />
          <p style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
            fontStyle: "italic", fontFamily: serif,
            letterSpacing: "0.04em", lineHeight: 1.6,
            maxWidth: "24ch",
          }}>
            Two sides. One you.
          </p>
        </div>

        {/* Right: bottle */}
        <ImgSlot label="Product — Dualité bottle" tall dark />
      </section>

      {/* ── 2. STATEMENT ───────────────────────────────────────── */}
      <section style={{
        paddingTop: "clamp(5rem, 10vw, 10rem)",
        paddingBottom: "clamp(5rem, 10vw, 10rem)",
        paddingLeft: padX, paddingRight: padX,
        maxWidth: "1400px", margin: "0 auto",
      }}>
        <p style={{
          fontFamily: serif,
          fontSize: "clamp(1.6rem, 3.5vw, 3.2rem)",
          fontWeight: 900, color: mid,
          lineHeight: 1.1, letterSpacing: "-0.02em",
          maxWidth: "22ch",
        }}>
          Your day doesn't stop at sundown.
          <span style={{ color: amber }}> Neither should your fragrance.</span>
        </p>
        <p style={{
          marginTop: "2rem",
          color: "#888",
          fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
          lineHeight: 1.8, maxWidth: "52ch",
        }}>
          A light formula and a dark formula — same bottle, same olfactive DNA, different depth.
          Dualité evolves with your day without ever losing who you are.
        </p>
      </section>

      {/* ── 3. THE COLLECTION ──────────────────────────────────── */}
      <section style={{
        backgroundColor: ink,
        paddingTop: "clamp(4rem, 8vw, 8rem)",
        paddingBottom: "clamp(4rem, 8vw, 8rem)",
        paddingLeft: padX, paddingRight: padX,
      }}>
        <p style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.3em",
          textTransform: "uppercase" as const, color: amber,
          marginBottom: "clamp(3rem, 6vw, 6rem)",
        }}>
          The collection
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(1.5rem, 3vw, 3.5rem)" }}>
          {[
            {
              name: "Jeune Élan",
              mood: "Energetic · Playful · Free-Spirited",
              core: "Ambrette, mandarin, ginger",
              day: "Bergamot, apricot, blackcurrant",
              night: "Pink pepper, basil, jasmine, dates",
            },
            {
              name: "Balcon en Velours",
              mood: "Luxurious · Alluring · Suave",
              core: "Neroli, saffron, tobacco, cedar",
              day: "Bergamot, madagascar vanilla, pine",
              night: "Rosemary, tonka, amber",
            },
            {
              name: "Nouvelle Soie",
              mood: "Clean · Elegant · Calm",
              core: "Bergamot, lavender, sandalwood",
              day: "Fig, honey accord, cashmere",
              night: "Black tea, jasmine, musk, amber",
            },
          ].map(({ name, mood, core, day, night }) => (
            <div key={name}>
              <ImgSlot label={`${name}`} ratio="3/4" dark />
              <div style={{ paddingTop: "1.75rem" }}>
                <h2 style={{
                  fontFamily: serif,
                  fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                  fontWeight: 800, color: "#fff",
                  letterSpacing: "-0.01em", marginBottom: "0.3rem",
                }}>
                  {name}
                </h2>
                <p style={{ color: amber, fontSize: "0.7rem", fontStyle: "italic", marginBottom: "1.5rem", opacity: 0.85 }}>
                  {mood}
                </p>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.55rem" }}>
                  {[
                    { label: "Core",  notes: core },
                    { label: "Day",   notes: day },
                    { label: "Night", notes: night },
                  ].map(({ label, notes }) => (
                    <div key={label} style={{ display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
                      <span style={{
                        fontSize: "0.58rem", fontWeight: 700,
                        letterSpacing: "0.14em", textTransform: "uppercase" as const,
                        color: amber, minWidth: "2.5rem", flexShrink: 0, opacity: 0.8,
                      }}>
                        {label}
                      </span>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.76rem", lineHeight: 1.55 }}>
                        {notes}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. CAMPAIGN ────────────────────────────────────────── */}
      <section style={{ position: "relative" as const, overflow: "hidden" }}>
        <ImgSlot label="Campaign — Always Me" ratio="21/9" />
        <div style={{
          position: "absolute" as const, inset: 0,
          display: "flex", flexDirection: "column" as const,
          alignItems: "flex-start", justifyContent: "flex-end",
          padding: `clamp(2rem, 5vw, 5rem) ${padX}`,
          background: "linear-gradient(to top, rgba(8,15,28,0.85) 0%, transparent 60%)",
        }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: amber, marginBottom: "0.75rem" }}>
            Always Me
          </p>
          <p style={{
            fontFamily: serif,
            fontSize: "clamp(2rem, 5vw, 4.5rem)",
            fontWeight: 900, color: "#fff",
            lineHeight: 0.9, letterSpacing: "-0.025em",
          }}>
            Be you.<br />Morning to midnight.
          </p>
        </div>
      </section>

      {/* ── 5. COLOPHON ────────────────────────────────────────── */}
      <section style={{
        backgroundColor: ink,
        paddingTop: "clamp(2.5rem, 4vw, 4rem)",
        paddingBottom: "clamp(2.5rem, 4vw, 4rem)",
        paddingLeft: padX, paddingRight: padX,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap" as const,
        gap: "1.25rem",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", lineHeight: 1.7, maxWidth: "60ch", margin: 0 }}>
          Dualité is a concept created for{" "}
          <span style={{ color: "rgba(255,255,255,0.5)" }}>L'Oréal Brandstorm 2026</span>{" "}
          by Katrina Mrzljak, Helen Xu &amp; Khaldoun Fansa.{" "}
          <span style={{ color: "rgba(255,255,255,0.5)" }}>3rd place nationally · Canada</span>.
        </p>
        <Link href="/#work" style={{
          textDecoration: "none", color: "rgba(255,255,255,0.2)",
          fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.04em",
          flexShrink: 0,
        }}>
          ← Back to work
        </Link>
      </section>

    </div>
  );
}
