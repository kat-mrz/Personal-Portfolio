import Link from "next/link";
import Image from "next/image";
import { LazyJourneyScroll } from "./LazyJourneyScroll";
import { LazyConceptSlideshow } from "./LazyConceptSlideshow";
import { CursorTracker } from "./CursorTracker";
import { AnimateIn } from "./AnimateIn";
import { HeroBottle } from "./HeroBottle";
import { HeroGlow } from "./HeroGlow";
import { HeroTextParallax } from "./HeroTextParallax";

/* ─── Tokens ─────────────────────────────────────────────────── */
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
      color: dark ? "#fff" : T.mid, lineHeight: 1.0, letterSpacing: "0.06em",
      marginBottom: "clamp(2rem, 4vw, 4rem)",
      WebkitFontSmoothing: "antialiased",
    }}>
      {children}
    </h2>
  );
}

function Placeholder({ label, ratio = "16/9", dark = false }: { label: string; ratio?: string; dark?: boolean }) {
  return (
    <div style={{
      width: "100%", aspectRatio: ratio,
      backgroundColor: dark ? "rgba(255,255,255,0.03)" : "rgba(13,27,62,0.04)",
      border: dark ? "1px dashed rgba(255,255,255,0.1)" : "1px dashed rgba(13,27,62,0.12)",
      borderRadius: 3, display: "flex", flexDirection: "column" as const,
      alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "1.25rem",
    }}>
      <span style={{ fontSize: "0.85rem", opacity: 0.15 }}>📷</span>
      <span style={{
        fontSize: "0.6rem", fontWeight: 500, textAlign: "center" as const,
        maxWidth: "24ch", lineHeight: 1.5,
        color: dark ? "rgba(255,255,255,0.18)" : "rgba(13,27,62,0.22)",
      }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */
const PROJECTS: Record<string, { slug: string }> = { "project-1": { slug: "project-1" } };
export function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

/* ─── Page ───────────────────────────────────────────────────── */
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!PROJECTS[slug]) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: T.serif, fontSize: "2rem", color: T.mid }}>Not found.</p>
    </div>
  );

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", backgroundColor: T.light, color: T.mid }}>
      <CursorTracker />

      {/* NAV */}
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

      {/* ══════════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: T.ink, paddingLeft: T.padX, paddingRight: T.padX,
        paddingTop: "clamp(7rem, 12vw, 11rem)", paddingBottom: "clamp(4rem, 7vw, 7rem)",
        backgroundImage: T.dots, backgroundSize: T.dotSize,
        position: "relative", overflow: "hidden",
      }}>
        {/* Hover glow — sits BEHIND the bottle (rendered first, same z-index) */}
        <HeroGlow />
        {/* Parallax bottle — in front of the glow */}
        <HeroBottle />

        <HeroTextParallax rate={0.10}>
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.5rem", marginBottom: "1.75rem" }}>
            {["Product Design", "Brand Strategy", "GTM Strategy"].map(tag => (
              <span key={tag} style={{
                fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.07em",
                padding: "0.3rem 0.85rem", borderRadius: "999px",
                backgroundColor: "rgba(232,160,32,0.1)", border: "1px solid rgba(232,160,32,0.28)",
                color: T.amber,
              }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 20, height: 1, backgroundColor: T.amber, flexShrink: 0 }} />
            <p style={{
              fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em",
              color: T.amber, margin: 0, textTransform: "uppercase" as const,
            }}>
              3rd · National Finalist · L'Oréal Brandstorm 2026
            </p>
          </div>
          <h1 style={{
            fontFamily: T.serif, fontWeight: 400, color: "#fff",
            fontSize: "clamp(2.25rem, 5.5vw, 5rem)", lineHeight: 1.0, letterSpacing: "-0.01em",
            maxWidth: "20ch", marginBottom: "1.75rem",
          }}>
            Dualité: A Fragrance Built for Authenticity
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.42)", fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)",
            lineHeight: 1.8, maxWidth: "58ch", marginBottom: "clamp(2rem, 2.5vw, 2.5rem)",
          }}>
            A <strong style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>full product strategy</strong> spanning
            consumer research, concept development, brand architecture, and go-to-market. Presented live at the{" "}
            <strong style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>L'Oréal Brandstorm National Finals</strong> in Montréal.
          </p>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px",
            backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.07)",
            marginBottom: 0,
          }}>
            {[
              { label: "Competition", value: "L'Oréal Brandstorm Case Competition 2026" },
              { label: "Industry",    value: "Luxury Fragrance" },
              { label: "Outcome",     value: "3rd Place National Finalist, Top 10 of 300+ Teams" },
            ].map(({ label, value }) => (
              <div key={label} style={{ padding: "1.4rem 1.6rem", backgroundColor: T.ink }}>
                <p style={{
                  fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em",
                  textTransform: "uppercase" as const, color: T.amber, marginBottom: "0.45rem",
                }}>{label}</p>
                <p style={{
                  fontSize: "clamp(0.8rem, 1vw, 0.9rem)",
                  color: "rgba(255,255,255,0.55)", lineHeight: 1.4, margin: 0,
                }}>{value}</p>
              </div>
            ))}
          </div>
        </HeroTextParallax>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. AT A GLANCE
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: T.light, paddingLeft: T.padX, paddingRight: T.padX,
        paddingTop: T.padY, paddingBottom: T.padY, borderBottom: T.divider,
        backgroundImage: T.marble,
      }}>
        <Label>Project Overview</Label>
        <H2>At a Glance</H2>

        <AnimateIn delay={0.1}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "1px", backgroundColor: "rgba(13,27,62,0.08)",
          }}>

            {/* Challenge — dark card */}
            <div style={{
              padding: "3rem 2.5rem", backgroundColor: T.mid,
              borderTop: `3px solid ${T.amber}`,
              display: "flex", flexDirection: "column" as const, gap: "1.25rem",
            }}>
              <p style={{
                fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em",
                textTransform: "uppercase" as const, color: T.amber, margin: 0,
              }}>Challenge</p>
              <p style={{
                fontFamily: T.serif, fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                fontWeight: 400, color: "#fff", lineHeight: 1.2, margin: 0, fontStyle: "italic",
              }}>
                Fragrance was built for occasions.<br />Identity isn't.
              </p>
              <p style={{
                fontSize: "clamp(0.9rem, 1.05vw, 1rem)",
                color: "rgba(255,255,255,0.5)", lineHeight: 1.85, margin: 0,
              }}>
                The market expected consumers to own multiple scents for different contexts.
                Gen Z doesn't fragment their identity by situation — and had no product designed for them.
              </p>
            </div>

            {/* Solution — light card */}
            <div style={{
              padding: "3rem 2.5rem", backgroundColor: T.light,
              borderTop: `3px solid ${T.amber}`,
              display: "flex", flexDirection: "column" as const, gap: "1.25rem",
            }}>
              <p style={{
                fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em",
                textTransform: "uppercase" as const, color: T.amber, margin: 0,
              }}>Solution</p>
              <p style={{
                fontFamily: T.serif, fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                fontWeight: 400, color: T.mid, lineHeight: 1.2, margin: 0, fontStyle: "italic",
              }}>
                One bottle.<br />Two formulas.<br />No compromise.
              </p>
              <p style={{
                fontSize: "clamp(0.9rem, 1.05vw, 1rem)",
                color: T.muted, lineHeight: 1.85, margin: 0,
              }}>
                A <strong>dual-chamber fragrance system</strong> with complementary light and dark
                formulas, anchored by a <strong>shared signature accord</strong>. One coherent
                identity, adaptable to any context.
              </p>
            </div>

          </div>
        </AnimateIn>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. MARKET OPPORTUNITY
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: T.ink, paddingLeft: T.padX, paddingRight: T.padX,
        paddingTop: T.padY, paddingBottom: T.padY, borderBottom: T.divider,
        backgroundImage: T.dots, backgroundSize: T.dotSize,
      }}>
        <Label light>Market Opportunity</Label>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(3rem, 6vw, 8rem)", alignItems: "center",
        }}>
          <div>
            <H2 dark>A Shift in What Luxury Means</H2>
            <p style={{
              color: "rgba(255,255,255,0.5)", lineHeight: 1.9,
              fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
            }}>
              Emerging consumers, particularly <strong style={{ color: "rgba(255,255,255,0.75)" }}>younger,
              identity-driven audiences</strong>, are reshaping what premium brands must deliver. For them,
              luxury is no longer about exclusivity alone — it's about{" "}
              <strong style={{ color: "rgba(255,255,255,0.75)" }}>personal relevance, authenticity, and
              value alignment</strong>. The question shifted from{" "}
              <em style={{ color: "rgba(255,255,255,0.65)" }}>"How exclusive is this?"</em> to{" "}
              <em style={{ color: "rgba(255,255,255,0.65)" }}>"How well does this reflect who I am?"</em>
            </p>
          </div>

          {/* Big stat */}
          <AnimateIn delay={0.15}>
            <div style={{
              padding: "2.5rem",
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderTop: `3px solid ${T.amber}`,
            }}>
              <p style={{
                fontFamily: T.serif, fontSize: "clamp(4.5rem, 8vw, 7rem)",
                fontWeight: 400, color: T.amber, lineHeight: 1, marginBottom: "1rem",
              }}>73%</p>
              <p style={{
                fontSize: "clamp(0.92rem, 1.05vw, 1rem)", color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75, margin: 0, marginBottom: "1.25rem",
              }}>
                of Gen Z cite <strong style={{ color: "rgba(255,255,255,0.75)" }}>self-expression</strong> as
                foundational to a fulfilling life.
              </p>
              <p style={{
                fontSize: "0.62rem", color: "rgba(255,255,255,0.2)",
                lineHeight: 1.6, margin: 0, borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: "0.85rem",
              }}>
                Source: Vatere, B. "Generation Z: Identity and Expression in the Digital World."
                {" "}<em>Medium</em>, 2023.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. RESEARCH & INSIGHTS
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: T.light, paddingLeft: T.padX, paddingRight: T.padX,
        paddingTop: T.padY, paddingBottom: T.padY, borderBottom: T.divider,
        backgroundImage: T.marble,
      }}>
        <Label>Research &amp; Insights</Label>
        <H2>Understanding the Consumer</H2>

        {/* Lead stats — two side by side */}
        <AnimateIn delay={0.05}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "clamp(2rem, 4vw, 4rem)",
            marginBottom: "clamp(2rem, 3.5vw, 3.5rem)",
          }}>
            {[
              {
                stat: "88%",
                body: <>of consumers cite <strong>authenticity</strong> as a key factor when deciding which brands to support.</>,
                source: "Nosto Consumer Content Report, 2021.",
              },
              {
                stat: "1 in 5",
                body: <>consumers will pay a <strong>premium for a personalized product</strong> — a signal that customization is now a commercial lever, not a novelty.</>,
                source: "Deloitte Consumer Review, 2015.",
              },
            ].map(({ stat, body, source }) => (
              <div key={stat} style={{
                display: "grid", gridTemplateColumns: "auto 1fr",
                gap: "2rem", alignItems: "center",
                borderLeft: `3px solid ${T.amber}`, paddingLeft: "2rem",
              }}>
                <p style={{
                  fontFamily: T.serif, fontSize: "clamp(3rem, 5vw, 4.5rem)",
                  fontWeight: 400, color: T.amber, lineHeight: 1, margin: 0,
                }}>{stat}</p>
                <div>
                  <p style={{ fontSize: "clamp(0.88rem, 1vw, 0.96rem)", color: T.mid, lineHeight: 1.6, marginBottom: "0.4rem" }}>{body}</p>
                  <p style={{ fontSize: "0.62rem", color: "rgba(55,65,81,0.5)", margin: 0 }}>{source}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>

        {/* 3-col findings grid */}
        <AnimateIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {[
              {
                n: "01",
                heading: "Authenticity is a purchase driver",
                stat: null,
                statNote: null,
                statSource: null,
                body: (<>Brands that enable <strong>genuine self-expression</strong> don't just earn affinity — they earn purchase intent. Authenticity has become a functional product feature, not just a brand value.</>),
              },
              {
                n: "02",
                heading: "Consumers resist fragmented identities",
                stat: null,
                statNote: null,
                statSource: null,
                body: (<>People navigate <strong>multiple roles daily</strong>, but they don't want to feel like different people in each one. Brands that hold that coherence together build deeper, more durable loyalty.</>),
              },
              {
                n: "03",
                heading: "Personalization turns products into possessions",
                stat: null,
                statNote: null,
                statSource: null,
                body: (<>When consumers shape a product — choosing, customizing, evolving it over time — the relationship shifts from <strong>transactional to personal</strong>. Personalized products become harder to replace and easier to recommend.</>),
              },
            ].map(({ n, heading, stat, statNote, statSource, body }) => (
              <div key={n} style={{ borderTop: `2px solid ${T.amber}`, paddingTop: "1.75rem" }}>
                <p style={{
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em",
                  textTransform: "uppercase" as const, color: T.amber,
                  marginBottom: "0.6rem",
                }}>Finding {n}</p>
                <h3 style={{
                  fontFamily: T.serif, fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)",
                  fontWeight: 400, color: T.mid, lineHeight: 1.2, marginBottom: stat ? "0.85rem" : "0.75rem",
                }}>{heading}</h3>

                {/* Inline stat for finding 01 */}
                {stat && (
                  <div style={{ marginBottom: "0.85rem" }}>
                    <p style={{
                      fontFamily: T.serif, fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                      fontWeight: 400, color: T.amber, lineHeight: 1, marginBottom: "0.3rem",
                    }}>{stat}</p>
                    <p style={{
                      fontSize: "0.72rem", color: T.muted, lineHeight: 1.5, margin: 0,
                      marginBottom: "0.25rem",
                    }}>{statNote}</p>
                    <p style={{
                      fontSize: "0.6rem", color: "rgba(55,65,81,0.55)", margin: 0,
                    }}>{statSource}</p>
                  </div>
                )}

                <p style={{
                  fontSize: "clamp(0.88rem, 0.95vw, 0.94rem)",
                  color: T.muted, lineHeight: 1.8, margin: 0,
                }}>{body}</p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. CONCEPT DEVELOPMENT
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: T.ink, paddingLeft: T.padX, paddingRight: T.padX,
        paddingTop: T.padY, paddingBottom: T.padY, borderBottom: T.divider,
        backgroundImage: T.dots, backgroundSize: T.dotSize,
      }}>
        <Label light>Concept Development</Label>
        <H2 dark>Translating Insight into Product</H2>

        {/* Row 1 — dual-formula system + fragrance architecture slideshow */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(3rem, 6vw, 8rem)", alignItems: "center",
          marginBottom: "clamp(5rem, 9vw, 9rem)",
        }}>
          <div>
            <p style={{
              fontFamily: T.serif, fontSize: "clamp(1.3rem, 2vw, 1.7rem)",
              fontWeight: 400, color: "#fff", lineHeight: 1.2,
              marginBottom: "1.5rem", fontStyle: "italic",
            }}>
              One system. Two formulas.<br />No fragmentation.
            </p>
            <p style={{
              color: "rgba(255,255,255,0.5)", lineHeight: 1.9,
              fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
            }}>
              The insight pointed to a clear product strategy: a{" "}
              <strong style={{ color: "rgba(255,255,255,0.75)" }}>dual-formula fragrance system</strong> with
              complementary light and dark compositions, anchored by a{" "}
              <strong style={{ color: "rgba(255,255,255,0.75)" }}>shared signature accord</strong> that
              preserves a cohesive olfactory identity while allowing variation in intensity.
            </p>
          </div>
          <AnimateIn delay={0.15}>
            <LazyConceptSlideshow />
          </AnimateIn>
        </div>

        {/* Row 2 — dual-chamber format + bottle video */}
        <AnimateIn delay={0.1}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "clamp(3rem, 6vw, 8rem)", alignItems: "center",
          }}>
            <div>
              <p style={{
                fontFamily: T.serif, fontSize: "clamp(1.3rem, 2vw, 1.7rem)",
                fontWeight: 400, color: "#fff", lineHeight: 1.2,
                marginBottom: "1.5rem", fontStyle: "italic",
              }}>
                One object.<br />Every context.
              </p>
              <p style={{
                color: "rgba(255,255,255,0.5)", lineHeight: 1.9,
                fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
              }}>
                The <strong style={{ color: "rgba(255,255,255,0.75)" }}>dual-chamber format</strong> solved
                the packaging challenge simultaneously: one portable object that adapts to the moment without
                asking the person to change who they are.
              </p>
            </div>
            <div style={{
              border: "1px solid rgba(232,160,32,0.2)",
              borderRadius: 4, overflow: "hidden",
              boxShadow: "0 0 40px 0 rgba(232,160,32,0.07)",
            }}>
              <video src="/dualite-bottle-loop.mp4" autoPlay muted loop playsInline
                style={{ width: "100%", display: "block" }} />
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. BRAND STRATEGY — STP Framework
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: T.light, paddingLeft: T.padX, paddingRight: T.padX,
        paddingTop: T.padY, paddingBottom: T.padY, borderBottom: T.divider,
        backgroundImage: T.marble,
      }}>
        <Label>Brand Strategy</Label>
        <H2>Building a Brand Around the Idea</H2>

        <AnimateIn delay={0.05}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "1px", backgroundColor: "rgba(13,27,62,0.08)",
          }}>

            {/* Segmentation */}
            <div style={{ padding: "2.5rem 2.25rem", backgroundColor: T.light, borderTop: `3px solid ${T.amber}` }}>
              <p style={{
                fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em",
                textTransform: "uppercase" as const, color: T.amber, marginBottom: "1.5rem",
              }}>Segmentation</p>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "1.5rem" }}>
                {[
                  {
                    seg: "Identity-First Shoppers",
                    desc: "Gen Z + younger Millennials (22–32) for whom self-expression is non-negotiable. Sceptical of performative luxury — they want products that adapt to them and reflect their choices over time.",
                  },
                  {
                    seg: "Simplicity Seekers",
                    desc: "Professionals (28–38) who want one versatile scent across environments, without curating a fragrance wardrobe.",
                  },
                ].map(({ seg, desc }) => (
                  <div key={seg}>
                    <p style={{ fontSize: "0.85rem", fontWeight: 700, color: T.mid, marginBottom: "0.35rem" }}>{seg}</p>
                    <p style={{ fontSize: "clamp(0.88rem, 0.95vw, 0.94rem)", color: T.muted, lineHeight: 1.75, margin: 0 }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Targeting */}
            <div style={{ padding: "2.5rem 2.25rem", backgroundColor: T.light, borderTop: `3px solid ${T.amber}` }}>
              <p style={{
                fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em",
                textTransform: "uppercase" as const, color: T.amber, marginBottom: "1.5rem",
              }}>Targeting</p>
              <p style={{ fontSize: "clamp(0.88rem, 0.95vw, 0.94rem)", color: T.muted, lineHeight: 1.75, marginBottom: "1rem" }}>
                Primary: <strong style={{ color: T.mid }}>Identity-First Shoppers.</strong>{" "}
                Secondary: <strong style={{ color: T.mid }}>Simplicity Seekers.</strong>
              </p>
              <p style={{ fontSize: "clamp(0.88rem, 0.95vw, 0.94rem)", color: T.muted, lineHeight: 1.75, margin: 0 }}>
                Reached through a <strong style={{ color: T.mid }}>multi-channel approach</strong> — social
                media and UGC, editorial partnerships, and dual-channel retail via Miu Miu flagship and Sephora.
              </p>
            </div>

            {/* Positioning Statement — full-width base row */}
            <div style={{
              gridColumn: "1 / -1",
              padding: "2.5rem 2.25rem", backgroundColor: T.mid,
              borderTop: `3px solid ${T.amber}`,
              display: "grid", gridTemplateColumns: "auto 1fr", gap: "3rem", alignItems: "center",
            }}>
              <p style={{
                fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em",
                textTransform: "uppercase" as const, color: T.amber,
                writingMode: "vertical-rl" as const, transform: "rotate(180deg)",
                margin: 0, whiteSpace: "nowrap" as const,
              }}>Positioning Statement</p>
              <p style={{
                fontFamily: T.serif, fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)",
                color: "#fff", lineHeight: 1.65, margin: 0,
              }}>
                "For consumers navigating multiple environments, Dualité provides a luxury fragrance
                experience that <em style={{ color: T.amber }}>evolves alongside them</em>,
                reinforcing a consistent, uncompromised sense of self."
              </p>
            </div>

          </div>
        </AnimateIn>
      </section>

      {/* ══════════════════════════════════════════════════════════
          7. THE REFILL RITUAL
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: T.ink, paddingLeft: T.padX, paddingRight: T.padX,
        paddingTop: T.padY, paddingBottom: T.padY, borderBottom: T.divider,
        backgroundImage: T.dots, backgroundSize: T.dotSize,
      }}>
        <Label light>The Refill Ritual</Label>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(3rem, 6vw, 8rem)", alignItems: "start",
        }}>
          <div>
            <H2 dark>Designing the Experience</H2>
            <p style={{
              color: "rgba(255,255,255,0.5)", lineHeight: 1.9,
              fontSize: "clamp(0.9rem, 1.1vw, 1rem)", marginBottom: "1.5rem",
            }}>
              The fragrance industry makes refills cheaper than buying new. Rational, but uninspiring.
              We asked a different question:{" "}
              <strong style={{ color: "rgba(255,255,255,0.8)", fontStyle: "italic" }}>
                what if the refill was something customers looked forward to?
              </strong>
            </p>
            <p style={{
              color: "rgba(255,255,255,0.5)", lineHeight: 1.9,
              fontSize: "clamp(0.9rem, 1.1vw, 1rem)", marginBottom: "2rem",
            }}>
              With Dualité, every refill becomes a <strong style={{ color: "rgba(255,255,255,0.75)" }}>ritual</strong>.
              Customers bring their bottle to a Miu Miu boutique or partner locations like Holt Renfrew,
              where an associate adds a custom colour splash to the lid. Over time, the bottle becomes a{" "}
              <strong style={{ color: "rgba(255,255,255,0.75)" }}>personal artifact</strong> — a record of
              moments and moods. The product grows with the person who carries it.
            </p>

            <div style={{
              padding: "1.5rem 1.75rem",
              backgroundColor: "rgba(232,160,32,0.06)",
              borderLeft: `3px solid ${T.amber}`,
            }}>
              <p style={{
                fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em",
                textTransform: "uppercase" as const, color: T.amber, marginBottom: "1rem",
              }}>Why It Works</p>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.7rem" }}>
                {[
                  <><strong style={{ color: "rgba(255,255,255,0.65)" }}>Attachment drives retention.</strong> Customers who personalize their bottle are invested beyond preference.</>,
                  <><strong style={{ color: "rgba(255,255,255,0.65)" }}>Return visits generate revenue.</strong> Each refill is an in-store brand immersion moment.</>,
                ].map((pt, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: T.amber, flexShrink: 0, marginTop: "0.45rem" }} />
                    <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.75, margin: 0 }}>{pt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <AnimateIn delay={0.2} style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            <div style={{
              border: "1px solid rgba(232,160,32,0.2)",
              borderRadius: 4, overflow: "hidden",
              boxShadow: "0 0 40px 0 rgba(232,160,32,0.07)",
            }}>
              <video src="/dualite-bottle-loop.mp4" autoPlay muted loop playsInline
                style={{ width: "100%", display: "block" }} />
            </div>
            <p style={{
              fontSize: "0.75rem", color: T.amber, opacity: 0.6,
              letterSpacing: "0.1em", textAlign: "center" as const,
              paddingTop: "0.85rem",
            }}>Dual-chamber format — one object, two formulas</p>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          8. COMMERCIAL STRATEGY
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: T.light, paddingLeft: T.padX, paddingRight: T.padX,
        paddingTop: T.padY, paddingBottom: T.padY, borderBottom: T.divider,
        backgroundImage: T.marble,
      }}>
        <Label>Commercial Strategy</Label>
        <H2>Creating Business Value</H2>

        {/* #AlwaysMe hero */}
        <div style={{
          padding: "2.5rem 3rem", backgroundColor: T.mid,
          borderRadius: 3, marginBottom: "1.5rem",
          display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "2rem",
        }}>
          <div>
            <p style={{
              fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em",
              textTransform: "uppercase" as const, color: T.amber, marginBottom: "0.6rem",
            }}>Campaign</p>
            <p style={{
              fontFamily: T.serif, fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              color: "#fff", lineHeight: 1.1, marginBottom: "0.6rem", fontWeight: 400,
            }}>#AlwaysMe</p>
            <p style={{
              fontSize: "clamp(0.88rem, 1vw, 0.95rem)", color: "rgba(255,255,255,0.5)",
              lineHeight: 1.75, margin: 0, maxWidth: "55ch", marginBottom: "0.85rem",
            }}>
              A multi-channel brand platform anchoring Dualité's market entry, built around{" "}
              <strong style={{ color: "rgba(255,255,255,0.75)" }}>authentic self-expression</strong> rather
              than aspirational identity.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div style={{ width: 14, height: 1, backgroundColor: T.amber, flexShrink: 0 }} />
              <p style={{
                fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em",
                color: T.amber, margin: 0,
              }}>
                Ambassador: Alysa Liu · Olympic Figure Skater
              </p>
            </div>
          </div>
          <p style={{
            fontFamily: T.serif, fontSize: "clamp(3rem, 5vw, 4.5rem)",
            color: "rgba(232,160,32,0.15)", lineHeight: 1, fontWeight: 400,
            whiteSpace: "nowrap" as const,
          }}>✦</p>
        </div>

        {/* Funnel visualization */}
        <AnimateIn delay={0.1}>
          <div style={{ position: "relative", marginBottom: "1.5rem" }}>
            <div style={{
              position: "absolute", top: "1.6rem", left: "calc(12.5% + 0.5rem)", right: "calc(12.5% + 0.5rem)",
              height: 1, backgroundColor: "rgba(13,27,62,0.1)", zIndex: 0,
            }} />
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px",
              backgroundColor: "rgba(13,27,62,0.08)", position: "relative", zIndex: 1,
            }}>
              {[
                {
                  phase: "01", label: "Awareness",
                  heading: "Alysa Liu Launch",
                  body: "Not an endorsement — a public declaration of identity consistency, anchored in authentic storytelling.",
                },
                {
                  phase: "02", label: "Consideration",
                  heading: "#AlwaysMe UGC",
                  body: "Consumer content inviting audiences to share how they stay consistent across different contexts.",
                },
                {
                  phase: "03", label: "Conversion",
                  heading: "Flagship + Sephora",
                  body: "Dual-channel retail: Miu Miu for the luxury experience, Sephora for accessible reach and discovery.",
                },
                {
                  phase: "04", label: "Retention",
                  heading: "Refill Ritual + Cap Drops",
                  body: "In-store refill stations as a loyalty mechanic. Limited artist-designed cap drops extend collectibility.",
                },
              ].map(({ phase, label, heading, body }) => (
                <div key={phase} style={{
                  padding: "2rem 1.5rem", backgroundColor: T.light,
                  borderTop: `3px solid ${T.amber}`,
                }}>
                  <p style={{
                    fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em",
                    textTransform: "uppercase" as const, color: "rgba(13,27,62,0.3)",
                    marginBottom: "0.35rem",
                  }}>{phase}</p>
                  <p style={{
                    fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em",
                    textTransform: "uppercase" as const, color: T.amber,
                    marginBottom: "0.65rem",
                  }}>{label}</p>
                  <p style={{
                    fontFamily: T.serif, fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                    color: T.mid, lineHeight: 1.25, marginBottom: "0.65rem", fontWeight: 400,
                  }}>{heading}</p>
                  <p style={{
                    fontSize: "clamp(0.82rem, 0.9vw, 0.88rem)",
                    color: T.muted, lineHeight: 1.75, margin: 0,
                  }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

      </section>

      {/* ══════════════════════════════════════════════════════════
          9. CUSTOMER JOURNEY
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: T.mid, paddingLeft: T.padX, paddingRight: T.padX,
        paddingTop: T.padY, paddingBottom: T.padY, borderBottom: T.divider,
        backgroundImage: T.dots, backgroundSize: T.dotSize,
      }}>
        <Label light>Customer Journey</Label>
        <H2 dark>Designing Beyond the Product</H2>

        <p style={{
          fontSize: "0.78rem", color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.1em", textTransform: "uppercase" as const,
          marginTop: "clamp(-1.5rem, -2vw, -2rem)", marginBottom: "1.5rem",
        }}>
          6-stage customer lifecycle
        </p>

        <p style={{
          color: "rgba(255,255,255,0.55)", lineHeight: 1.8,
          fontSize: "clamp(0.875rem, 1.1vw, 1rem)",
          maxWidth: "58ch", marginBottom: "clamp(1rem, 2vw, 1.5rem)",
        }}>
          Designed to earn awareness, convert with confidence, and build{" "}
          <strong style={{ color: "rgba(255,255,255,0.8)" }}>the kind of attachment that makes switching feel like a loss</strong>.
        </p>

        <p style={{
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em",
          color: "rgba(232,160,32,0.5)", marginBottom: "clamp(2rem, 3.5vw, 3.5rem)",
          textTransform: "uppercase" as const,
        }}>↓ scroll to trace the journey</p>

        <LazyJourneyScroll stages={[
          {
            stage: "Awareness",
            icon: "✦",
            goal: "Discover the brand exists and what it stands for",
            touch: "Social media, editorial coverage, word of mouth",
            biz: "Build brand recognition",
          },
          {
            stage: "Consideration",
            icon: "◎",
            goal: "Research Dualité and compare it to alternatives",
            touch: "#AlwaysMe campaign, fragrance bar, press coverage",
            biz: "Drive purchase intent",
          },
          {
            stage: "Decision",
            icon: "◈",
            goal: "Weigh options and commit to a values-aligned purchase",
            touch: "Retail experience, online checkout, sampling",
            biz: "Convert to first purchase",
          },
          {
            stage: "Onboarding",
            icon: "◇",
            goal: "Experience the product and its dual-formula concept",
            touch: "Premium unboxing, onboarding insert, first wear",
            biz: "Deliver on the promise",
          },
          {
            stage: "Retention",
            icon: "◉",
            goal: "Stay engaged and deepen the relationship over time",
            touch: "Refill ritual, evolving cap, boutique visits",
            biz: "LTV + churn reduction",
          },
          {
            stage: "Advocacy",
            icon: "★",
            goal: "Recommend Dualité to others and share the experience",
            touch: "#AlwaysMe UGC, social sharing, gifting",
            biz: "Organic growth + word-of-mouth",
          },
        ]} />
      </section>

      {/* ══════════════════════════════════════════════════════════
          10. COMPETITION OUTCOME
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: T.light, paddingLeft: T.padX, paddingRight: T.padX,
        paddingTop: T.padY, paddingBottom: T.padY, borderBottom: T.divider,
        backgroundImage: T.marble,
        position: "relative", overflow: "hidden",
      }}>
        <Label>Competition Outcome</Label>
        <H2>Presenting on a National Stage</H2>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(3rem, 6vw, 8rem)", alignItems: "start",
          position: "relative",
        }}>
          <div>
            <p style={{
              color: T.muted, lineHeight: 1.9,
              fontSize: "clamp(0.9rem, 1.1vw, 1rem)", marginBottom: "2.5rem",
            }}>
              Out of <strong>300+ teams across Canada</strong>, our team was selected as one of{" "}
              <strong>ten finalists</strong> to present live at the L'Oréal Brandstorm national finals in
              Montréal, presenting to C-suite executives including regional presidents and innovation leaders.
              We placed <strong>3rd nationally</strong>.
            </p>

            <div style={{ display: "flex", flexDirection: "column" as const, gap: 0 }}>
              {[
                { phase: "Oct 2025", event: "Brandstorm brief released" },
                { phase: "Feb 2026", event: "Finalists announced, selected as top 10 of 300+ teams" },
                { phase: "Mar 2026", event: "Product and pitch coaching by L'Oréal professionals" },
                { phase: "Apr 2026", event: "Live presentation to C-suite, Montréal" },
                { phase: "Apr 2026", event: "🏆  3rd place nationally, Canada", highlight: true },
              ].map(({ phase, event, highlight }, i, arr) => (
                <div key={event} style={{ display: "flex", gap: "1.25rem", paddingBottom: i < arr.length - 1 ? "1.25rem" : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", flexShrink: 0 }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: "50%",
                      backgroundColor: highlight ? T.amber : "rgba(13,27,62,0.18)",
                      border: `2px solid ${highlight ? T.amber : "rgba(13,27,62,0.12)"}`,
                      marginTop: 4, flexShrink: 0,
                    }} />
                    {i < arr.length - 1 && <div style={{ width: 1, flex: 1, backgroundColor: "rgba(13,27,62,0.08)", marginTop: 4 }} />}
                  </div>
                  <div style={{ paddingBottom: i < arr.length - 1 ? "0.25rem" : 0 }}>
                    <p style={{
                      fontSize: "0.72rem", fontWeight: 700, color: T.amber,
                      letterSpacing: "0.1em", marginBottom: "0.2rem",
                    }}>{phase}</p>
                    <p style={{
                      fontSize: "0.85rem",
                      color: highlight ? T.mid : T.muted,
                      fontWeight: highlight ? 700 : 400, lineHeight: 1.5, margin: 0,
                    }}>{event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* "3rd" hero number */}
          <AnimateIn delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
              <div style={{
                padding: "2rem 2.5rem 1.5rem",
                backgroundColor: T.mid, borderRadius: 3,
                borderTop: `3px solid ${T.amber}`,
                display: "flex", flexDirection: "column" as const, alignItems: "flex-start",
              }}>
                <p style={{
                  fontFamily: T.serif, fontSize: "clamp(5rem, 10vw, 9rem)",
                  fontWeight: 400, color: T.amber, lineHeight: 1, marginBottom: "0.25rem",
                }}>3rd</p>
                <p style={{
                  fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em",
                  textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)",
                }}>National Finalist · Canada · 300+ Teams</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <Placeholder label="Presentation at Montréal finals" ratio="4/3" />
                <Placeholder label="Receiving 3rd place" ratio="4/3" />
              </div>
              <Placeholder label="Pitch deck / presentation slide" ratio="16/9" />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          11. REFLECTIONS
      ══════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: T.ink, paddingLeft: T.padX, paddingRight: T.padX,
        paddingTop: T.padY, paddingBottom: T.padY, borderBottom: T.divider,
        backgroundImage: T.dots, backgroundSize: T.dotSize,
      }}>
        <Label light>Reflections</Label>
        <H2 dark>What I Take Into Every Project</H2>

        {/* For PM / For GTM boxes */}
        <AnimateIn delay={0.05}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "1px", backgroundColor: "rgba(255,255,255,0.04)",
            marginBottom: "clamp(2.5rem, 4vw, 4rem)",
          }}>
            <div style={{
              padding: "2.5rem", backgroundColor: "rgba(232,160,32,0.07)",
              border: "1px solid rgba(232,160,32,0.18)", borderTop: `3px solid ${T.amber}`,
            }}>
              <p style={{
                fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em",
                textTransform: "uppercase" as const, color: T.amber, marginBottom: "1rem",
              }}>For Product Managers</p>
              <p style={{
                fontFamily: T.serif, fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
                color: "#fff", lineHeight: 1.75, margin: 0,
              }}>
                This project reflects how I approach product work: start with a{" "}
                <strong style={{ color: T.amber }}>real human tension</strong>, translate it into a
                coherent product vision, and build every downstream decision in service of that original
                insight. Brand, experience, go-to-market — all of it.
              </p>
            </div>

            <div style={{
              padding: "2.5rem", backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)", borderTop: `3px solid rgba(232,160,32,0.4)`,
            }}>
              <p style={{
                fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em",
                textTransform: "uppercase" as const, color: T.amber, marginBottom: "1rem",
              }}>For GTM Strategists</p>
              <p style={{
                fontFamily: T.serif, fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
                color: "rgba(255,255,255,0.65)", lineHeight: 1.75, margin: 0,
              }}>
                The #AlwaysMe campaign wasn't an afterthought. It was the{" "}
                <strong style={{ color: "rgba(255,255,255,0.85)" }}>commercial spine</strong> of the
                product strategy. Awareness, conversion, retention, and advocacy were all designed from
                the same consumer truth that drove the product itself.
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* Intro line */}
        <p style={{
          color: "rgba(255,255,255,0.45)", lineHeight: 1.9,
          fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
          marginBottom: "clamp(2rem, 3.5vw, 3.5rem)", maxWidth: "60ch",
        }}>
          Dualité won because it started with a real tension and followed it all the way through.
          No shortcuts between the insight and the answer.
        </p>

        {/* Two reflections side by side */}
        <AnimateIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem, 4vw, 4rem)" }}>
            {[
              {
                icon: "◎", topic: "Product-market fit starts with friction",
                body: <>Treat <strong style={{ color: "rgba(255,255,255,0.65)" }}>unmet tension as the actual brief</strong>. The category and the technology are just context.</>,
              },
              {
                icon: "★", topic: "The best retention is emotional",
                body: <>A customer who has personalized their bottle isn't just loyal — <strong style={{ color: "rgba(255,255,255,0.65)" }}>they're invested</strong>. Designing for attachment is designing for LTV.</>,
              },
            ].map(({ icon, topic, body }) => (
              <div key={topic} style={{
                borderTop: `2px solid rgba(232,160,32,0.3)`, paddingTop: "1.75rem",
              }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "0.65rem" }}>
                  <span style={{ color: T.amber, fontSize: "1rem", flexShrink: 0, marginTop: "0.1rem" }}>{icon}</span>
                  <p style={{ fontWeight: 700, fontSize: "0.98rem", color: "#fff", margin: 0 }}>{topic}</p>
                </div>
                <p style={{
                  fontSize: "0.92rem", color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.8, margin: 0, paddingLeft: "2rem",
                }}>{body}</p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </section>

      {/* COLOPHON */}
      <section style={{
        backgroundColor: T.ink,
        paddingTop: "clamp(2rem, 3.5vw, 3.5rem)", paddingBottom: "clamp(2rem, 3.5vw, 3.5rem)",
        paddingLeft: T.padX, paddingRight: T.padX,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap" as const, gap: "1rem",
      }}>
        <p style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.72rem", lineHeight: 1.7, maxWidth: "60ch", margin: 0 }}>
          Dualité is a concept created for{" "}
          <span style={{ color: "rgba(255,255,255,0.4)" }}>L'Oréal Brandstorm 2026</span>.{" "}
          <span style={{ color: "rgba(255,255,255,0.4)" }}>3rd place nationally · Canada</span>.
        </p>
        <Link href="/#work" style={{
          textDecoration: "none", color: "rgba(255,255,255,0.2)",
          fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.04em", flexShrink: 0,
        }}>
          ← Back to work
        </Link>
      </section>

    </div>
  );
}
