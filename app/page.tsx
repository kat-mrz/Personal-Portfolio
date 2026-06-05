"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   TINY SVG PIECES
───────────────────────────────────────────────────────────── */
function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" className={className} aria-hidden>
      <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   MASON JAR
───────────────────────────────────────────────────────────── */
function MasonJar({ tipped, onClick }: { tipped: boolean; onClick: () => void }) {
  return (
    <div
      role="button"
      aria-label={tipped ? "Fireflies released!" : "Click to release fireflies"}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      className="cursor-pointer select-none outline-none"
      style={{
        transform: tipped ? "rotate(108deg)" : "rotate(0deg)",
        transformOrigin: "78% 100%",
        transition: "transform 0.75s cubic-bezier(0.34, 1.15, 0.64, 1)",
        filter: tipped ? "none" : "drop-shadow(0 0 10px rgba(232,160,32,0.45))",
      }}
    >
      <svg width="80" height="104" viewBox="0 0 80 104" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="13" y="2"  width="54" height="8"  rx="4"   fill="#c8a040" />
        <rect x="17" y="10" width="46" height="7"  rx="1.5" fill="#9a7824" />
        <path d="M20 17 L60 17 L62 27 L18 27 Z" fill="rgba(180,220,255,0.2)" stroke="rgba(180,220,255,0.55)" strokeWidth="1.2" />
        <rect x="9"  y="27" width="62" height="72" rx="7"   fill="rgba(180,220,255,0.10)" stroke="rgba(180,220,255,0.48)" strokeWidth="1.5" />
        <rect x="15" y="33" width="8"  height="48" rx="4"   fill="rgba(255,255,255,0.07)" />
        <rect x="14" y="50" width="52" height="26" rx="3"   fill="rgba(232,160,32,0.18)"  stroke="rgba(232,160,32,0.65)" strokeWidth="1" />
        <text x="40" y="61" textAnchor="middle" fill="rgba(232,160,32,0.95)" fontSize="7.5" fontFamily="Georgia,serif" fontStyle="italic">click</text>
        <text x="40" y="72" textAnchor="middle" fill="rgba(232,160,32,0.95)" fontSize="7.5" fontFamily="Georgia,serif" fontStyle="italic">me ✦</text>
        {!tipped && (
          <>
            <circle cx="33" cy="78" r="3"   fill="#e8c020" className="firefly-in-jar" style={{ animationDelay: "0s" }} />
            <circle cx="48" cy="68" r="2.2" fill="#e8c020" className="firefly-in-jar" style={{ animationDelay: "0.7s" }} />
            <circle cx="40" cy="86" r="2.2" fill="#e8c020" className="firefly-in-jar" style={{ animationDelay: "1.4s" }} />
          </>
        )}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────── */
function Navbar({ light }: { light?: boolean }) {
  const textColor = light ? "text-[#0d1b3e]" : "text-white";
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-colors duration-300 ${light ? "bg-[#f0f4ff] shadow-sm" : "bg-transparent"}`}>
      <div className={`flex items-center gap-2 font-bold text-lg tracking-tight ${textColor}`}>
        <Star className="w-5 h-5 text-[#e8a020]" />
        <span style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Katrina Mrzljak</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {[
          { label: "About me", href: "#about"  },
          { label: "Resume",   href: "#resume" },
          { label: "Work",     href: "#work"   },
        ].map(({ label, href }) => (
          <a key={label} href={href}
            className={`text-sm font-medium hover:opacity-60 transition-opacity ${textColor}`}>{label}</a>
        ))}
        <a href="#get-in-touch" className="bg-[#e8a020] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#d4911c] transition-colors">
          Get in touch!
        </a>
      </div>
      <button className={`md:hidden flex flex-col gap-1.5 ${textColor}`} aria-label="menu">
        <span className="block w-6 h-0.5 bg-current" />
        <span className="block w-6 h-0.5 bg-current" />
        <span className="block w-4 h-0.5 bg-current" />
      </button>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO SECTION — STARS
   Each star has:
     depth  — parallax factor (higher = scrolls away faster = closer to viewer)
     glow   — drop-shadow radius in px (applied to outer wrapper so it fades with scale)
───────────────────────────────────────────────────────────── */
const PORTFOLIO_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-playfair), Georgia, serif",
  fontSize: "clamp(4rem, 11vw, 10rem)",
  letterSpacing: "-0.02em",
};

type HeroStar = {
  top?: string; bottom?: string; left?: string; right?: string;
  size: string; color: string; opacity: number; delay: number;
  depth: number; glow: number;
};

/* Stars are organised in three depth layers so parallax reads clearly */
const HERO_STARS: HeroStar[] = [
  /* ── deep background (tiny, barely move) ── */
  { top: "8%",  left: "4%",   size: "0.38vw", color: "#ffffff", opacity: 0.52, delay: 1.1,  depth: 0.04, glow: 3.5},
  { top: "16%", left: "16%",  size: "0.34vw", color: "#ffffff", opacity: 0.48, delay: 2.4,  depth: 0.05, glow: 3  },
  { top: "24%", right: "7%",  size: "0.36vw", color: "#ffffff", opacity: 0.45, delay: 3.6,  depth: 0.04, glow: 3  },
  { top: "36%", left: "57%",  size: "0.36vw", color: "#ffffff", opacity: 0.50, delay: 0.9,  depth: 0.05, glow: 3.5},
  { top: "50%", right: "18%", size: "0.33vw", color: "#ffffff", opacity: 0.42, delay: 1.8,  depth: 0.04, glow: 3  },
  { top: "63%", left: "7%",   size: "0.36vw", color: "#ffffff", opacity: 0.48, delay: 2.9,  depth: 0.05, glow: 3.5},
  { top: "77%", right: "11%", size: "0.34vw", color: "#ffffff", opacity: 0.44, delay: 0.5,  depth: 0.04, glow: 3  },
  { top: "89%", left: "42%",  size: "0.33vw", color: "#ffffff", opacity: 0.40, delay: 3.2,  depth: 0.05, glow: 3  },
  { top: "55%", left: "30%",  size: "0.36vw", color: "#ffffff", opacity: 0.46, delay: 1.4,  depth: 0.04, glow: 3.5},
  { top: "10%", left: "72%",  size: "0.36vw", color: "#ffffff", opacity: 0.50, delay: 4.1,  depth: 0.05, glow: 3.5},
  { top: "42%", left: "5%",   size: "0.34vw", color: "#ffffff", opacity: 0.44, delay: 2.7,  depth: 0.04, glow: 3  },
  { top: "68%", left: "65%",  size: "0.36vw", color: "#ffffff", opacity: 0.48, delay: 0.2,  depth: 0.05, glow: 3.5},

  /* ── mid field (medium, moderate parallax) ── */
  { top: "13%", left: "8%",   size: "1.05vw", color: "#e0eaff", opacity: 0.75, delay: 0.8,  depth: 0.13, glow: 6.5},
  { top: "28%", left: "22%",  size: "0.7vw",  color: "#ffffff", opacity: 0.62, delay: 1.7,  depth: 0.15, glow: 5  },
  { top: "44%", left: "48%",  size: "0.8vw",  color: "#ffffff", opacity: 0.65, delay: 0.3,  depth: 0.14, glow: 5.5},
  { top: "73%", left: "54%",  size: "0.9vw",  color: "#ffffff", opacity: 0.68, delay: 2.6,  depth: 0.12, glow: 5  },
  { top: "38%", right: "29%", size: "0.72vw", color: "#ffffff", opacity: 0.60, delay: 3.2,  depth: 0.16, glow: 5  },
  { top: "84%", left: "27%",  size: "1.0vw",  color: "#ddeeff", opacity: 0.58, delay: 0.7,  depth: 0.11, glow: 5.5},
  { top: "19%", right: "16%", size: "0.65vw", color: "#ffffff", opacity: 0.55, delay: 2.8,  depth: 0.14, glow: 4.5},
  { top: "52%", left: "63%",  size: "0.7vw",  color: "#ffffff", opacity: 0.60, delay: 1.6,  depth: 0.15, glow: 5  },
  { top: "60%", left: "18%",  size: "0.75vw", color: "#ffffff", opacity: 0.58, delay: 3.8,  depth: 0.13, glow: 5.5},

  /* ── foreground amber (large, strong glow, most parallax) ── */
  { top: "7vh",    left: "34%",  size: "1.6vw",  color: "#e8a020", opacity: 1.0,  delay: 0.4,  depth: 0.28, glow: 13 },
  { top: "58%",    left: "34%",  size: "0.95vw", color: "#e8a020", opacity: 0.65, delay: 1.2,  depth: 0.22, glow: 8  },
  { bottom: "6vh", right: "3vw", size: "2.0vw",  color: "#e8a020", opacity: 1.0,  delay: 2.1,  depth: 0.32, glow: 15 },
  { top: "11%",    right: "22%", size: "1.35vw", color: "#e8c060", opacity: 0.85, delay: 1.0,  depth: 0.25, glow: 10 },
  { top: "65%",    right: "40%", size: "0.88vw", color: "#e8a020", opacity: 0.75, delay: 1.9,  depth: 0.20, glow: 7  },
  { top: "32%",    left: "75%",  size: "1.05vw", color: "#e8c060", opacity: 0.70, delay: 3.0,  depth: 0.24, glow: 8  },
  { top: "80%",    left: "14%",  size: "1.15vw", color: "#e8a020", opacity: 0.78, delay: 0.6,  depth: 0.26, glow: 9  },
];

function HeroSection({ onJarClick, jarTipped }: { onJarClick: () => void; jarTipped: boolean }) {
  /* Refs for direct DOM parallax — avoids React re-renders on every scroll tick */
  const starWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      starWrapperRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = HERO_STARS[i]?.depth ?? 0.1;
        // Positive translateY → element drifts down relative to section = scrolls slower = looks farther away
        el.style.transform = `translateY(${sy * d * 0.35}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="hero" className="relative hero-bg min-h-screen">

      {/* ── Mobile hero ── */}
      <div className="md:hidden flex flex-col justify-between min-h-screen px-6 pt-24 pb-12 overflow-hidden">
        <div className="text-center">
          <h1 className="text-white font-black leading-[0.88] mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(3.5rem, 18vw, 5.5rem)", letterSpacing: "-0.02em" }}>
            PORTFOLIO
          </h1>
          <p className="text-white/70 text-sm leading-relaxed max-w-xs mx-auto">
            I&apos;m a product designer passionate about creating elevated experiences through engaging consumer journeys.
          </p>
        </div>
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <span className="text-white/50 tracking-widest uppercase text-xs block mb-2">Find me</span>
            {[
              { label: "LI: /katrina-mrzljak", href: "https://ca.linkedin.com/in/katrina-mrzljak" },
              { label: "IG: @yourhandle", href: "#" },
              { label: "BE: /yourhandle", href: "#" },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="block text-white font-medium hover:text-[#e8a020] transition-colors text-sm leading-relaxed">{label}</a>
            ))}
          </div>
          <a href="#about" className="rounded-full bg-[#e8a020] text-white font-semibold flex items-center justify-center text-center text-sm leading-snug hover:bg-[#d4911c] transition-colors w-24 h-24">
            Scroll<br />down
          </a>
        </div>
      </div>

      {/* ── Desktop hero ── */}
      <div className="hidden md:block relative h-screen overflow-visible">

        {/* ── Stars (two-element: outer = parallax + glow filter, inner = twinkle anim) ── */}
        {HERO_STARS.map((s, i) => (
          <div
            key={i}
            ref={(el) => { starWrapperRefs.current[i] = el; }}
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: s.top, bottom: s.bottom, left: s.left, right: s.right,
              width: s.size, height: s.size,
              opacity: s.opacity,
              /* drop-shadow on the wrapper: as the inner star scales down the shadow
                 naturally shrinks too, so glow and twinkle stay in sync */
              filter: `drop-shadow(0 0 ${s.glow}px ${s.color})`,
            }}
          >
            <span
              className="block w-full h-full"
              style={{
                color: s.color,
                animation: `twinkle ${2.1 + (i % 6) * 0.62}s ease-in-out ${s.delay}s infinite`,
              }}
            >
              <Star className="w-full h-full" />
            </span>
          </div>
        ))}

        {/* Ghost PORTFOLIO lines */}
        <div className="absolute inset-x-0 z-10 select-none pointer-events-none" style={{ top: "14%" }}>
          <div aria-hidden className="font-black leading-[0.88] invisible" style={PORTFOLIO_STYLE}>PORTFOLIO</div>
          {[{ stroke: 0.18, opacity: 1 }, { stroke: 0.13, opacity: 0.75 }, { stroke: 0.09, opacity: 0.5 }].map(({ stroke, opacity }, i) => (
            <span key={i} aria-hidden className="block text-center font-black leading-[0.88]"
              style={{ ...PORTFOLIO_STYLE, WebkitTextStroke: `1.5px rgba(255,255,255,${stroke})`, color: "transparent", opacity }}>
              PORTFOLIO
            </span>
          ))}
        </div>

        {/* Photo */}
        <div className="absolute z-20"
          style={{ left: "12%", top: "calc(14vh + clamp(1.76rem, 4.84vw, 4.4rem) + min(36vh, 27vw))", transform: "translateY(-50%)", height: "min(65vh, 49vw)", aspectRatio: "3/4" }}>
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-[#e8a020]" style={{ transform: "translate(-1.1vw, 1.1vw)" }} />
            <div className="absolute inset-0 bg-[#060d1a] overflow-hidden flex items-center justify-center">
              <span className="text-white/20 text-xs text-center px-4 leading-relaxed">Your photo here<br />(use Next.js &lt;Image&gt;)</span>
            </div>
          </div>
        </div>

        {/* PORTFOLIO heading — sits below the navbar (z-50) */}
        <div className="absolute inset-x-0 select-none pointer-events-none" style={{ top: "14%", zIndex: 40 }}>
          <h1 className="text-white font-black text-center leading-[0.88]"
            style={{ ...PORTFOLIO_STYLE }}>PORTFOLIO</h1>
        </div>

        {/* Find Me panel */}
        <div className="absolute z-40 bg-[#0d1b3e] flex flex-col justify-end"
          style={{ right: "8%", bottom: "calc(86vh - 19.36vw + 0.75vw - 15px)", width: "16vw", padding: "1.2vw 1.25vw" }}>
          <span className="text-white/50 tracking-widest uppercase mb-2 block" style={{ fontSize: "clamp(8px, 0.8vw, 11px)" }}>Find me</span>
          {[
            { label: "LI: /katrina-mrzljak", href: "https://ca.linkedin.com/in/katrina-mrzljak" },
            { label: "IG: @yourhandle", href: "#" },
            { label: "BE: /yourhandle", href: "#" },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="block text-white font-medium hover:text-[#e8a020] transition-colors leading-relaxed"
              style={{ fontSize: "clamp(10px, 1.1vw, 15px)" }}>{label}</a>
          ))}
        </div>

        {/* Amber divider */}
        <div className="absolute z-40"
          style={{ right: "8%", top: "calc(14vh + 19.36vw + 5px)", width: "16vw", height: "1.5px", backgroundColor: "#e8a020" }} />

        {/* Bio card */}
        <div className="absolute z-40 bg-[#0d1b3e]"
          style={{ right: "8%", top: "calc(14vh + 19.36vw + 0.75vw)", width: "16vw", padding: "1.2vw 1.25vw" }}>
          <p className="text-white font-bold leading-relaxed" style={{ fontSize: "clamp(10px, 1vw, 14px)", textAlign: "left" }}>
            I&apos;m a product designer passionate about creating elevated experiences through engaging consumer journeys.
          </p>
        </div>

        {/* Mason jar — resting on the bottom edge of the hero section */}
        <div className="absolute z-40" style={{ left: "60%", bottom: "0" }}>
          <MasonJar tipped={jarTipped} onClick={onJarClick} />
        </div>

        {/* Scroll down circle */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-40">
          <a href="#about" className="rounded-full bg-[#e8a020] text-white font-semibold flex items-center justify-center text-center leading-snug hover:bg-[#d4911c] transition-colors"
            style={{ width: "clamp(80px, 10vw, 128px)", height: "clamp(80px, 10vw, 128px)", fontSize: "clamp(10px, 1vw, 14px)" }}>
            Scroll<br />down
          </a>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   ABOUT SECTION
───────────────────────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" className="relative bg-[#f0f4ff] overflow-visible" style={{ position: "relative", zIndex: 2 }}>
      <div id="contact" className="absolute top-0 pointer-events-none" aria-hidden />

      {/* ── Mobile ── */}
      <div className="md:hidden px-6 pb-10" style={{ paddingTop: "clamp(4rem, 12vw, 6rem)" }}>
        <h2 className="text-[#1a1a1a] leading-tight font-black mb-4"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2.2rem, 10vw, 4rem)" }}>
          Hello,<br />I&apos;m Kat!
        </h2>
        <p className="text-[#444] leading-relaxed mb-6" style={{ fontSize: "clamp(0.875rem, 4vw, 1rem)" }}>
          I&apos;m a 4th year BUCS student at UBC Sauder building experience-focused products. I&apos;m excited about creating immersive experiences through storytelling, whether it&apos;s through mindfully designed user-journeys or a well-crafted marketing campaign.
        </p>
        <a href="https://ca.linkedin.com/in/katrina-mrzljak" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-[#e8a020] text-white font-medium rounded-full hover:bg-[#d4911c] transition-colors mb-8"
          style={{ fontSize: "clamp(0.8rem, 3.5vw, 0.95rem)", padding: "0.6rem 1.25rem" }}>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 w-4 h-4">
            <circle cx="8.5" cy="8.5" r="5.5" /><line x1="13" y1="13" x2="18" y2="18" strokeLinecap="round" />
          </svg>
          linkedin.com/in/katrina-mrzljak
        </a>
        <div className="w-full max-w-sm mx-auto">
          <div className="w-full bg-[#0d1b3e] rounded-[2px] overflow-hidden flex items-center justify-center" style={{ aspectRatio: "3/4" }}>
            <span className="text-white/25 text-xs text-center px-4">Your photo here</span>
          </div>
          <div className="bg-[#1a1a1a] text-white w-full p-5">
            <h4 className="font-bold mb-3" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.1rem" }}>Contact</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#e8a020] w-4 h-4">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Vancouver, BC (open to relocation)
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#e8a020] w-4 h-4">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                katrina.mrzljak@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:block" style={{ paddingTop: "clamp(6rem, 10vw, 10rem)", paddingLeft: "10.5vw", paddingRight: "5vw", paddingBottom: "6vw" }}>
        <div style={{ width: "46vw" }}>
          <h2 className="text-[#1a1a1a] leading-tight font-black"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", marginBottom: "1.5vw" }}>
            Hello,<br />I&apos;m Kat!
          </h2>
          <p className="text-[#444] leading-relaxed"
            style={{ fontSize: "clamp(0.85rem, 1.15vw, 1rem)", maxWidth: "32vw", marginBottom: "2.5vw" }}>
            I&apos;m a 4th year BUCS student at UBC Sauder building experience-focused products. I&apos;m excited about creating immersive experiences through storytelling, whether it&apos;s through mindfully designed user-journeys or a well-crafted marketing campaign.
          </p>
          <a href="https://ca.linkedin.com/in/katrina-mrzljak" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#e8a020] text-white font-medium rounded-full hover:bg-[#d4911c] transition-colors"
            style={{ fontSize: "clamp(0.8rem, 1.1vw, 1rem)", padding: "clamp(0.5rem, 0.75vw, 0.85rem) clamp(1rem, 1.6vw, 1.6rem)", marginBottom: "3vw", display: "inline-flex" }}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"
              style={{ width: "clamp(14px, 1.1vw, 18px)", height: "clamp(14px, 1.1vw, 18px)" }}>
              <circle cx="8.5" cy="8.5" r="5.5" /><line x1="13" y1="13" x2="18" y2="18" strokeLinecap="round" />
            </svg>
            linkedin.com/in/katrina-mrzljak
          </a>
        </div>

        {/* Photo + Contact group */}
        <div style={{ position: "absolute", left: "calc(75vw - 14.5vw)", top: "clamp(2rem, 4vw, 4rem)", width: "29vw", zIndex: 2 }}>
          <div className="w-full bg-[#0d1b3e] rounded-[2px] overflow-hidden flex items-center justify-center" style={{ aspectRatio: "3/4" }}>
            <span className="text-white/25 text-xs text-center px-4">Your photo here</span>
          </div>
          <div className="bg-[#1a1a1a] text-white w-full"
            style={{ position: "absolute", top: "100%", left: 0, padding: "clamp(1rem, 1.5vw, 1.5rem) clamp(1.2rem, 1.75vw, 1.75rem)", zIndex: 3 }}>
            <h4 className="font-bold" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1rem, 1.4vw, 1.25rem)", marginBottom: "1vw" }}>Contact</h4>
            <ul style={{ fontSize: "clamp(0.7rem, 0.95vw, 0.875rem)", display: "flex", flexDirection: "column", gap: "0.8vw" }}>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#e8a020]" style={{ width: "clamp(12px, 1vw, 16px)", height: "clamp(12px, 1vw, 16px)" }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Vancouver, BC (open to relocation)
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#e8a020]" style={{ width: "clamp(12px, 1vw, 16px)", height: "clamp(12px, 1vw, 16px)" }}>
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                katrina.mrzljak@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Ghost RESUME text */}
        <div aria-hidden className="select-none pointer-events-none"
          style={{ position: "absolute", left: "52.5vw", width: "45vw", bottom: "-18vw", zIndex: 1 }}>
          {[
            { stroke: 0.42, opacity: 1 }, { stroke: 0.29, opacity: 0.82 },
            { stroke: 0.18, opacity: 0.6 }, { stroke: 0.10, opacity: 0.4 },
          ].map(({ stroke, opacity }, i) => (
            <span key={i} className="block font-black leading-[0.88]"
              style={{ ...RESUME_STYLE, fontSize: "clamp(2.8rem, 7.7vw, 7.7rem)", WebkitTextStroke: `2px rgba(232,160,32,${stroke})`, color: "transparent", opacity, textAlign: "center" }}>
              RESUME
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const RESUME_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-playfair), Georgia, serif",
  fontSize: "clamp(3rem, 7.5vw, 7.5rem)",
  letterSpacing: "-0.02em",
};

/* ─────────────────────────────────────────────────────────────
   RESUME SECTION
───────────────────────────────────────────────────────────── */
function ResumeSection() {
  const tools = ["Figma", "Adobe XD", "Illustrator", "Photoshop", "After Effects", "Webflow", "Framer", "Notion"];
  const skills = ["UX Research", "Wireframing", "Prototyping", "Brand Strategy", "Visual Design", "User Testing"];
  const experiences = [
    { dates: "2024 – Present", role: "Product Designer", org: "Company Name", desc: "Brief description of role and key contributions." },
    { dates: "2023 – 2024", role: "UX Research Intern", org: "Company Name", desc: "Brief description of role and key contributions." },
  ];

  return (
    <section id="resume" className="relative bg-[#0d1b3e] overflow-visible" style={{ position: "relative", zIndex: 1 }}>

      {/* ── Mobile ── */}
      <div className="md:hidden px-6 py-10 flex flex-col gap-8">
        <div>
          <h3 className="text-[#e8a020] font-black mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.8rem, 8vw, 2.5rem)" }}>Education</h3>
          <div className="flex items-start gap-3">
            <div className="text-[#e8a020] shrink-0 mt-1 w-3 h-3"><Star className="w-full h-full" /></div>
            <div>
              <p className="text-[#e8a020] font-semibold text-sm">2023 – Present</p>
              <p className="text-white font-bold">University of British Columbia</p>
              <p className="text-white/60 text-sm">Business and Computer Science Dual Major</p>
            </div>
          </div>
        </div>
        <div className="bg-[#e8a020] p-6">
          <h3 className="text-white font-black mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.8rem, 8vw, 2.5rem)" }}>Experiences</h3>
          {experiences.map((exp, i) => (
            <div key={i} className="flex items-start gap-3" style={{ marginBottom: i < experiences.length - 1 ? "1.5rem" : 0 }}>
              <div className="text-white shrink-0 mt-1 w-3 h-3"><Star className="w-full h-full" /></div>
              <div>
                <p className="text-white/70 font-semibold text-xs">{exp.dates}</p>
                <p className="text-white font-bold text-sm">{exp.role} — {exp.org}</p>
                <p className="text-white/80 text-xs">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-white font-black mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.8rem, 8vw, 2.5rem)" }}>Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => <span key={s} className="border border-white/30 text-white/80 text-sm px-3 py-1">{s}</span>)}
          </div>
        </div>
        <div>
          <h3 className="text-white font-black mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.8rem, 8vw, 2.5rem)" }}>Tools</h3>
          <div className="flex flex-wrap gap-2">
            {tools.map(t => <span key={t} className="bg-white/10 text-white/80 text-sm px-3 py-1">{t}</span>)}
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex items-start"
        style={{ paddingTop: "clamp(2rem, 4vw, 4rem)", paddingLeft: "5vw", paddingRight: "5vw", paddingBottom: "clamp(2rem, 3vw, 3rem)", gap: "4vw" }}>
        <div style={{ width: "36vw", flexShrink: 0 }} aria-hidden />
        <div style={{ flex: 1 }}>
          <h3 className="text-white font-black" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "2vw" }}>Skills</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75vw", marginBottom: "3vw" }}>
            {skills.map(s => <span key={s} className="border border-white/30 text-white/80" style={{ fontSize: "clamp(0.75rem, 1vw, 0.9rem)", padding: "0.4vw 1vw" }}>{s}</span>)}
          </div>
          <h3 className="text-white font-black" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "2vw" }}>Tools</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75vw" }}>
            {tools.map(t => <span key={t} className="bg-white/10 text-white/80" style={{ fontSize: "clamp(0.75rem, 1vw, 0.9rem)", padding: "0.4vw 1vw" }}>{t}</span>)}
          </div>
        </div>
        <div className="bg-[#0d1b3e]"
          style={{ position: "absolute", top: "clamp(1rem, 2vw, 2rem)", left: "5vw", width: "36vw", zIndex: 2, padding: "clamp(1rem, 2vw, 2rem) clamp(1.2rem, 2.5vw, 2.5rem)" }}>
          <h3 className="text-[#e8a020] font-black" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "1.5vw" }}>Education</h3>
          <div className="flex items-start" style={{ gap: "1.2vw" }}>
            <div className="text-[#e8a020] shrink-0 mt-1" style={{ width: "clamp(10px, 1.1vw, 14px)", height: "clamp(10px, 1.1vw, 14px)" }}>
              <Star className="w-full h-full" />
            </div>
            <div>
              <p className="text-[#e8a020] font-semibold" style={{ fontSize: "clamp(0.7rem, 0.95vw, 0.85rem)" }}>2023 – Present</p>
              <p className="text-white font-bold" style={{ fontSize: "clamp(0.85rem, 1.15vw, 1rem)" }}>University of British Columbia</p>
              <p className="text-white/60" style={{ fontSize: "clamp(0.7rem, 0.9vw, 0.8rem)" }}>Business and Computer Science Dual Major</p>
            </div>
          </div>
        </div>
        <div className="bg-[#e8a020]"
          style={{ position: "absolute", top: "18vw", left: "5vw", width: "36vw", zIndex: 2, padding: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
          <h3 className="text-white font-black" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "2vw" }}>Experiences</h3>
          {experiences.map((exp, i) => (
            <div key={i} className="flex items-start" style={{ gap: "1.2vw", marginBottom: i < experiences.length - 1 ? "2vw" : 0 }}>
              <div className="text-white shrink-0 mt-1" style={{ width: "clamp(10px, 1.1vw, 14px)", height: "clamp(10px, 1.1vw, 14px)" }}>
                <Star className="w-full h-full" />
              </div>
              <div>
                <p className="text-white/70 font-semibold" style={{ fontSize: "clamp(0.7rem, 0.95vw, 0.85rem)" }}>{exp.dates}</p>
                <p className="text-white font-bold" style={{ fontSize: "clamp(0.85rem, 1.15vw, 1rem)" }}>{exp.role} — {exp.org}</p>
                <p className="text-white/80" style={{ fontSize: "clamp(0.7rem, 0.9vw, 0.8rem)" }}>{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   WORK SECTION
───────────────────────────────────────────────────────────── */
function WorkSection() {
  const projects = [
    { title: "Project Title", tag: "UX Design · 2024",       href: "/work/project-1" },
    { title: "Project Title", tag: "Brand Identity · 2024",  href: null },
    { title: "Project Title", tag: "Product Design · 2023",  href: null },
    { title: "Project Title", tag: "UX Research · 2023",     href: null },
  ];

  const cards = (cols: number, gap: string, pad: string) => (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap }}>
      {projects.map((p, i) => {
        const inner = (
          <>
            <div className="absolute inset-0 bg-[#e8a020] opacity-0 group-hover:opacity-10 transition-opacity" />
            <span className="text-white/30 block" style={{ fontSize: "clamp(0.65rem, 0.9vw, 0.8rem)", marginBottom: "0.4vw" }}>{p.tag}</span>
            <span className="text-white font-bold" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1rem, 1.6vw, 1.5rem)" }}>{p.title}</span>
          </>
        );
        return p.href ? (
          <a key={i} href={p.href}
            className="bg-[#0d1b3e] flex flex-col justify-end cursor-pointer group relative overflow-hidden no-underline"
            style={{ aspectRatio: "16/10", padding: pad }}>
            {inner}
          </a>
        ) : (
          <div key={i} className="bg-[#0d1b3e] flex flex-col justify-end cursor-pointer group relative overflow-hidden"
            style={{ aspectRatio: "16/10", padding: pad }}>
            {inner}
          </div>
        );
      })}
    </div>
  );

  return (
    <section id="work" className="bg-[#f0f4ff]" style={{ paddingBottom: "clamp(4rem, 8vw, 8rem)" }}>
      <div className="md:hidden" style={{ paddingTop: "clamp(4rem, 12vw, 12rem)", paddingLeft: "clamp(1.5rem, 5vw, 5vw)", paddingRight: "clamp(1.5rem, 5vw, 5vw)" }}>
        <h2 className="font-black text-[#1a1a1a]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2.5rem, 6vw, 6rem)", marginBottom: "clamp(2rem, 4vw, 4rem)", textAlign: "right" }}>
          Selected Work
        </h2>
        {cards(1, "0.75rem", "1rem")}
      </div>
      <div className="hidden md:block" style={{ paddingTop: "clamp(1rem, 2vw, 2rem)" }}>
        <div style={{ paddingLeft: "43vw", paddingRight: "5vw" }}>
          <h2 className="font-black text-[#1a1a1a]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2.5rem, 6vw, 6rem)", marginBottom: "clamp(1.5rem, 3vw, 3rem)", textAlign: "right" }}>
            Selected Work
          </h2>
        </div>
        <div style={{ paddingLeft: "5vw", paddingRight: "5vw" }}>
          {cards(2, "2vw", "clamp(0.75rem, 2vw, 2vw)")}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOOTER — SUNRISE
───────────────────────────────────────────────────────────── */
function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sunProgress, setSunProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.65)));
      setSunProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // At progress 0 → fully below (translateY 150%); at 1 → top half visible (translateY 50%)
  const sunY = `${150 - sunProgress * 100}%`;

  return (
    <section ref={sectionRef} id="get-in-touch" className="relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #060a1e 0%, #0e1235 18%, #281050 36%, #5a1858 54%, #aa3828 72%, #e08020 88%, #f0a828 100%)",
        paddingTop: "clamp(4rem, 7vw, 7rem)", paddingBottom: "clamp(3rem, 5vw, 5rem)",
        paddingLeft: "clamp(1.5rem, 5vw, 5vw)", paddingRight: "clamp(1.5rem, 5vw, 5vw)",
      }}>
      {/* Midday-sky wash — fades in over the sunrise as you scroll through the section */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #0e3d6a 0%, #1a6ea8 35%, #3a96c8 70%, #78c0e0 100%)",
          opacity: sunProgress * 0.82,
          zIndex: 1,
        }} />

      {/* Large rising sun */}
      <div aria-hidden className="absolute pointer-events-none"
        style={{
          bottom: 0, left: "50%",
          width: "min(58vw, 540px)", height: "min(58vw, 540px)",
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, #fff8e8 0%, #ffe098 22%, #f09828 45%, #c05830 70%, transparent 92%)",
          transform: `translateX(-50%) translateY(${sunY})`,
          opacity: 0.72, filter: "blur(1.5px)",
          zIndex: 1,
        }} />
      <div aria-hidden className="absolute pointer-events-none left-0 right-0 bottom-0"
        style={{ height: "40%", background: "linear-gradient(to top, rgba(232,160,32,0.22), transparent)", zIndex: 1 }} />
      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-0">
        <div>
          <p className="text-white/50 uppercase tracking-widest" style={{ fontSize: "clamp(0.65rem, 0.85vw, 0.8rem)", marginBottom: "1.5vw" }}>
            Let&apos;s work together
          </p>
          <h2 className="font-black text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2.5rem, 6vw, 6rem)", lineHeight: 0.9, marginBottom: "2.5vw" }}>
            Get in<br />touch.
          </h2>
          <a href="mailto:katrina.mrzljak@gmail.com"
            className="inline-flex items-center gap-2 bg-[#e8a020] text-white font-semibold rounded-full hover:bg-[#d4911c] transition-colors"
            style={{ fontSize: "clamp(0.8rem, 1.1vw, 1rem)", padding: "clamp(0.5rem, 0.75vw, 0.85rem) clamp(1.2rem, 1.8vw, 1.8rem)" }}>
            katrina.mrzljak@gmail.com
          </a>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-2 mb-4">
            <Star className="w-4 h-4 text-[#e8a020]" />
            <span className="font-bold text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)" }}>
              Katrina Mrzljak
            </span>
          </div>
          <p className="text-white/30" style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)" }}>© 2024 — All rights reserved</p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FIREFLY CONSTANTS
   14 fireflies: one tight leader + 13 with varying orbit offsets.
   Per-firefly wander amplitudes give each one a unique lazy float
   even when the cursor is perfectly still.
───────────────────────────────────────────────────────────── */
const FIREFLY_COUNT = 22;

/* Lags are tiered: fast inner core → slow drifting tail.
   Reduced ~20% across the board so the whole cloud moves a bit
   more languidly without adding artificial reaction delay. */
const FIREFLY_LAGS = [
  /* inner core  */ 0.144, 0.124, 0.105, 0.090, 0.076, 0.064, 0.054,
  /* mid cloud   */ 0.045, 0.038, 0.031, 0.026, 0.022, 0.018, 0.015,
  /* outer tail  */ 0.014, 0.011, 0.010, 0.013, 0.009, 0.012, 0.008, 0.010,
];

/* Tiny base offsets only — the wander radii do the real spreading.
   Keeping these near-zero lets the cloud shape emerge organically
   rather than from a rigid fixed formation. */
const FIREFLY_OFFSETS = [
  { x:  0, y:  0 }, { x:  2, y: -1 }, { x: -1, y:  2 }, { x:  2, y:  1 },
  { x: -2, y: -1 }, { x:  1, y:  2 }, { x: -2, y:  1 }, { x:  1, y: -2 },
  { x: -1, y: -2 }, { x:  2, y: -2 }, { x: -2, y:  2 }, { x:  1, y:  2 },
  { x: -1, y:  1 }, { x:  2, y: -1 }, { x: -2, y: -2 }, { x:  1, y:  2 },
  { x: -1, y: -1 }, { x:  2, y:  1 }, { x: -2, y:  1 }, { x:  1, y: -1 },
  { x:  1, y:  1 }, { x: -1, y:  0 },
];

/* Wander radii grow linearly with index: the innermost firefly
   barely moves (r≈4px) while the outermost drifts in wide lazy
   arcs (r≈84px). Combined with the tiered lags this produces a
   cloud that's dense at the cursor and tapers off into a tail. */
const FIREFLY_WANDER = Array.from({ length: FIREFLY_COUNT }, (_, i) => ({
  ax: 0.22 + (i * 0.041) % 0.30,  // x oscillation speed (rad/s)
  ay: 0.17 + (i * 0.053) % 0.25,  // y oscillation speed (rad/s)
  rx: 4  + i * 3.8,                // x radius: 4 → ~84 px
  ry: 3  + i * 3.0,                // y radius: 3 → ~66 px
  px: (i * 1.37) % (Math.PI * 2), // x phase
  py: (i * 2.11) % (Math.PI * 2), // y phase
}));

/* ─────────────────────────────────────────────────────────────
   ROOT
───────────────────────────────────────────────────────────── */
export default function Home() {
  const [pastHero,  setPastHero]  = useState(false);
  const [inHero,    setInHero]    = useState(true);
  const [jarTipped, setJarTipped] = useState(false);
  const [fireflyPositions, setFireflyPositions] = useState(
    Array.from({ length: FIREFLY_COUNT }, () => ({ x: -200, y: -200 }))
  );

  const heroRef  = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const posRef   = useRef(Array.from({ length: FIREFLY_COUNT }, () => ({ x: -200, y: -200 })));
  const rafRef   = useRef<number>(undefined);

  /* IntersectionObserver for navbar colour + firefly hero-mode */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setPastHero(!entry.isIntersecting); setInHero(entry.isIntersecting); },
      { threshold: 0.05 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  /* Global cursor tracking */
  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* RAF loop — wander keeps fireflies drifting even when cursor is still */
  useEffect(() => {
    if (!jarTipped) return;
    const animate = () => {
      const { x: mx, y: my } = mouseRef.current;
      const t = Date.now() * 0.001;

      /* ── Step 1: move each firefly toward its wandering target ── */
      posRef.current = posRef.current.map((p, i) => {
        const w = FIREFLY_WANDER[i];

        /* Primary slow wander — radius breathes so the cloud expands and contracts */
        const pulse = 0.68 + 0.32 * Math.sin(t * 0.22 + i * 0.85);
        const wx = Math.sin(t * w.ax + w.px) * w.rx * pulse;
        const wy = Math.cos(t * w.ay + w.py) * w.ry * pulse;

        /* Secondary turbulence layer — faster, non-harmonic, adds organic jitter */
        const tx2 = Math.sin(t * w.ax * 4.3 + w.px * 1.9) * w.rx * 0.22;
        const ty2 = Math.cos(t * w.ay * 3.8 + w.py * 2.3) * w.ry * 0.18;

        const targetX = mx + FIREFLY_OFFSETS[i].x + wx + tx2;
        const targetY = my + FIREFLY_OFFSETS[i].y + wy + ty2;

        /* Occasional dart — simulates the sudden jink of a real insect */
        const dart = Math.sin(t * 1.4 + i * 0.97) > 0.82 ? 2.6 : 1.0;

        return {
          x: p.x + (targetX - p.x) * FIREFLY_LAGS[i] * dart,
          y: p.y + (targetY - p.y) * FIREFLY_LAGS[i] * dart,
        };
      });

      /* ── Step 2: separation — gentle repulsion so they spread into a cloud ── */
      const MIN_SEP = 24;
      posRef.current = posRef.current.map((p, i) => {
        let fx = 0, fy = 0;
        for (let j = 0; j < FIREFLY_COUNT; j++) {
          if (i === j) continue;
          const q = posRef.current[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MIN_SEP * MIN_SEP && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const strength = ((MIN_SEP - d) / MIN_SEP) * 0.9;
            fx += (dx / d) * strength;
            fy += (dy / d) * strength;
          }
        }
        return { x: p.x + fx, y: p.y + fy };
      });

      setFireflyPositions(posRef.current.map(p => ({ ...p })));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [jarTipped]);

  const handleJarClick = () => {
    if (jarTipped) return;
    setJarTipped(true);
    const sx = window.innerWidth  * 0.62;
    const sy = window.innerHeight * 0.82;
    mouseRef.current = { x: sx, y: sy };
    posRef.current = Array.from({ length: FIREFLY_COUNT }, () => ({ x: sx, y: sy }));
  };

  return (
    <>
      <Navbar light={pastHero} />

      {/* Firefly overlay — position:fixed so they float above everything */}
      {jarTipped && fireflyPositions.map((pos, i) => (
        <div key={i} aria-hidden className="firefly pointer-events-none"
          style={{
            position: "fixed",
            left: pos.x - 2.5,
            top:  pos.y - 2.5,
            width: 5, height: 5,
            zIndex: 9999,
            opacity: 1,
            animationDelay: `${i * 0.17}s`,
          }}
        />
      ))}

      <div ref={heroRef}>
        <HeroSection onJarClick={handleJarClick} jarTipped={jarTipped} />
      </div>
      <AboutSection />
      <ResumeSection />
      <WorkSection />
      <FooterSection />
    </>
  );
}
