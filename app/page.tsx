"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image          from "next/image";
import PlateBookCard from "./PlateBookCard";
import GrayneCard    from "./GrayneCard";

/* ─────────────────────────────────────────────────────────────
   SCROLL-REVEAL HOOK
   Returns a ref to attach to any element. On first intersection
   the element fades up from 18px below. `delay` staggers siblings.
───────────────────────────────────────────────────────────── */
function useScrollReveal(delay = 0) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";
    el.style.transition = `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref as React.RefObject<any>;
}

/* Slide-in from a horizontal offset — used for Resume cards */
function useScrollRevealX(dx: number, delay = 0) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = `translateX(${dx}px)`;
    el.style.transition = `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateX(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [dx, delay]);
  return ref as React.RefObject<any>;
}

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

/* Full moon — soft white disc with faint mare (dark patch) texture. */
function Moon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden style={style}>
      <circle cx="12" cy="12" r="10" fill="rgba(232,242,255,0.93)" />
      {/* Subtle mare patches for a touch of realism */}
      <circle cx="9"  cy="9"  r="2.2" fill="rgba(170,195,235,0.18)" />
      <circle cx="14" cy="7"  r="1.6" fill="rgba(170,195,235,0.14)" />
      <circle cx="10" cy="15" r="2.8" fill="rgba(170,195,235,0.13)" />
      <circle cx="15" cy="13" r="1.4" fill="rgba(170,195,235,0.12)" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   MASON JAR
   — Glass-only (transparent body so flies show through)
   — Click → shake (0.44 s) → lid pops off → onRelease() fires
───────────────────────────────────────────────────────────── */
function MasonJar({ tipped, onClick }: { tipped: boolean; onClick: () => void }) {
  const [shaking,   setShaking]   = useState(false);
  const [lidPopped, setLidPopped] = useState(false);

  const handleClick = () => {
    if (tipped || shaking) return;
    setShaking(true);
    setTimeout(() => {
      setShaking(false);
      setLidPopped(true);
      onClick();           // trigger fly release after shake finishes
    }, 440);
  };

  return (
    <div
      role="button"
      data-jar
      aria-label={tipped ? "Fireflies released!" : "Click to release fireflies"}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      className={`cursor-pointer select-none outline-none${shaking ? " jar-shaking" : ""}`}
      style={{ filter: "drop-shadow(0 0 12px rgba(232,160,32,0.5))" }}
    >
      <svg width="80" height="104" viewBox="0 0 80 104" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Lid — pops off on click */}
        <g className={`lid-group${lidPopped ? " lid-flying" : ""}`}>
          <rect x="13" y="2"  width="54" height="8"  rx="4"   fill="#c8a040" />
          <rect x="17" y="10" width="46" height="7"  rx="1.5" fill="#9a7824" />
        </g>
        {/* Neck */}
        <path d="M20 17 L60 17 L62 27 L18 27 Z"
          fill="rgba(180,220,255,0.05)" stroke="rgba(180,220,255,0.28)" strokeWidth="1.2" />
        {/* Body — nearly transparent so flies are visible through the glass */}
        <rect x="9" y="27" width="62" height="72" rx="7"
          fill="rgba(180,220,255,0.03)" stroke="rgba(180,220,255,0.25)" strokeWidth="1.5" />
        {/* Shine highlight */}
        <rect x="15" y="33" width="8" height="48" rx="4" fill="rgba(255,255,255,0.05)" />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────── */
function Navbar({ light }: { light?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const textColor = light ? "text-[#0d1b3e]" : "text-white";
  const navLinks = [
    { label: "About me", href: "#about"  },
    { label: "Resume",   href: "#resume" },
    { label: "Work",     href: "#work"   },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4 transition-colors duration-300 ${light ? "bg-[#f0f4ff]" : "bg-transparent"}`}>
        <div className={`flex items-center gap-2 font-bold text-lg tracking-tight ${textColor}`}>
          <Star className="w-5 h-5 text-[#e8a020]" />
          <span style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Katrina Mrzljak</span>
        </div>
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href}
              className={`text-sm font-medium transition-opacity duration-200 ${textColor} hover:opacity-60`}>
              {label}
            </a>
          ))}
          <a href="#get-in-touch" className="bg-[#e8a020] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#d4911c] transition-colors">
            Get in touch!
          </a>
        </div>
        <button
          className={`lg:hidden flex flex-col gap-1.5 ${textColor} p-1`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span className={`block w-6 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-6 h-0.5 bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-4 h-0.5 bg-current transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45 w-6" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu drawer */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-[#080f1c]/95" onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-16 left-0 right-0 flex flex-col px-6 pb-8 gap-1 transition-transform duration-300 ${menuOpen ? "translate-y-0" : "-translate-y-4"}`}>
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}
              className="text-white text-2xl py-4 border-b border-white/10 hover:text-[#e8a020] transition-colors"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              {label}
            </a>
          ))}
          <a href="#get-in-touch" onClick={() => setMenuOpen(false)}
            className="mt-6 bg-[#e8a020] text-white font-semibold px-6 py-3 rounded-full text-center hover:bg-[#d4911c] transition-colors">
            Get in touch!
          </a>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO SECTION — STARS
   Each star has:
     depth  — parallax factor (higher = scrolls away faster = closer to viewer)
     glow   — drop-shadow radius in px (applied to outer wrapper so it fades with scale)
───────────────────────────────────────────────────────────── */
const RESUME_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-playfair), Georgia, serif",
  fontSize: "clamp(3rem, 7.5vw, 7.5rem)",
  letterSpacing: "-0.02em",
};

const PORTFOLIO_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-display), Georgia, serif",
  fontSize: "clamp(4rem, 11vw, 10rem)",
  fontWeight: 400,
  letterSpacing: "-0.02em",
  fontFeatureSettings: '"liga" 1, "calt" 1, "clig" 1, "kern" 1',
  fontVariantLigatures: "common-ligatures contextual",
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

/* Four simple stars for the mobile hero — no parallax, just twinkle */
const MOBILE_STARS = [
  { top: "12%", right: "8%",  size: 8,  color: "#e8a020", opacity: 0.9, delay: 0.3  },
  { top: "6%",  right: "22%", size: 5,  color: "#ffffff", opacity: 0.7, delay: 1.4  },
  { top: "22%", left:  "6%",  size: 6,  color: "#ffffff", opacity: 0.6, delay: 2.1  },
  { top: "35%", right: "14%", size: 4,  color: "#e8c060", opacity: 0.8, delay: 0.8  },
];

function HeroSection({ onJarClick, jarTipped }: { onJarClick: () => void; jarTipped: boolean }) {
  /* Refs for direct DOM parallax — avoids React re-renders on every scroll tick */
  const starWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let heroVisible = true;
    const section = document.getElementById("hero");
    const visObs = new IntersectionObserver(
      ([e]) => { heroVisible = e.isIntersecting; },
      { threshold: 0 }
    );
    if (section) visObs.observe(section);

    const onScroll = () => {
      if (!heroVisible) return;
      const sy = window.scrollY;
      starWrapperRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = HERO_STARS[i]?.depth ?? 0.1;
        el.style.transform = `translateY(${sy * d * 0.35}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      visObs.disconnect();
    };
  }, []);

  return (
    <section id="hero" className="relative hero-bg min-h-screen">

      {/* ── Mobile hero (< 1024 px — phones + tablets) ── */}
      <div className="lg:hidden relative flex flex-col min-h-screen px-6 pt-24 pb-16 overflow-hidden">
        {/* Mobile stars */}
        {MOBILE_STARS.map((s, i) => (
          <div key={i} aria-hidden className="absolute pointer-events-none"
            style={{ top: s.top, left: s.left, right: s.right,
              width: s.size, height: s.size, opacity: s.opacity,
              filter: `drop-shadow(0 0 ${s.size * 0.8}px ${s.color})` }}>
            <span className="block w-full h-full" style={{ color: s.color,
              animation: `twinkle ${2.2 + i * 0.7}s ease-in-out ${s.delay}s infinite` }}>
              <Star className="w-full h-full" />
            </span>
          </div>
        ))}

        {/* Top: title + photo + bio */}
        <div className="flex-1 flex flex-col justify-center gap-6">
          <h1 className="text-white leading-[0.88]"
            style={{ ...PORTFOLIO_STYLE, fontSize: "clamp(3.8rem, 19vw, 6rem)",
              textShadow: "0 6px 30px rgba(4,9,24,0.65), 0 2px 10px rgba(4,9,24,0.5)",
              animation: "slideUp 1.05s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}>
            PORT<br />FOLiO
          </h1>

          {/* Headshot — same gallery frame as desktop */}
          <div className="relative self-start" style={{ height: "min(36vh, 90vw)", aspectRatio: "3/4", margin: "0.5rem 0 0.25rem 0.25rem" }}>
            <div className="absolute inset-0 overflow-hidden" style={{
              border: "1px solid rgba(232,160,32,0.75)",
              boxShadow: "0 24px 70px rgba(4,9,24,0.55), 0 6px 22px rgba(4,9,24,0.35), 0 0 40px rgba(232,160,32,0.08)",
            }}>
              <Image src="/hero-headshot-bg.avif" alt="Kat Mrzljak" fill unoptimized priority
                style={{ objectFit: "cover", objectPosition: "center 18%" }} />
              <div aria-hidden className="absolute pointer-events-none" style={{
                inset: "8px", border: "1px solid rgba(255,255,255,0.35)", mixBlendMode: "overlay",
              }} />
              <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
                boxShadow: "inset 0 0 60px rgba(4,9,24,0.35)",
              }} />
            </div>
            {[
              { top: "-6px", left: "-6px", borderWidth: "1px 0 0 1px" },
              { top: "-6px", right: "-6px", borderWidth: "1px 1px 0 0" },
              { bottom: "-6px", left: "-6px", borderWidth: "0 0 1px 1px" },
              { bottom: "-6px", right: "-6px", borderWidth: "0 1px 1px 0" },
            ].map((pos, i) => (
              <div key={i} aria-hidden className="absolute pointer-events-none" style={{
                ...pos, width: "14px", height: "14px",
                borderStyle: "solid", borderColor: "rgba(232,160,32,0.9)",
              }} />
            ))}
          </div>

          {/* Bio — same glass-morphism card as desktop */}
          <div className="self-end" style={{
            maxWidth: 300,
            padding: "1.2rem 1.4rem",
            background: "rgba(9, 18, 44, 0.55)",
            backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 2,
          }}>
            <p className="text-white"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(0.9rem, 4vw, 1rem)", textAlign: "justify", lineHeight: 1.75 }}>
              I&apos;m a product designer passionate about creating{" "}
              <span style={{ color: "#e8a020", fontStyle: "italic" }}>immersive experiences</span>
              {" "}through engaging consumer journeys.
            </p>
          </div>
        </div>

        {/* Bottom row: jar (left) + scroll button (right) */}
        <div className="flex items-end justify-between">
          <MasonJar tipped={jarTipped} onClick={onJarClick} />
          <a href="#about" className="rounded-full bg-[#e8a020] text-white font-semibold flex items-center justify-center text-center leading-snug hover:bg-[#d4911c] transition-colors w-20 h-20"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "0.8rem", letterSpacing: "0.06em" }}>
            Scroll<br />down
          </a>
        </div>
      </div>

      {/* ── Desktop hero (≥ 1024 px) ── */}
      <div className="hidden lg:block relative h-screen overflow-visible">

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

        {/* Ghost PORTFOLIO lines — sit behind the photo */}
        <div className="absolute inset-x-0 z-[3] select-none pointer-events-none" style={{ top: "14%" }}>
          <div aria-hidden className="font-black leading-[0.88] invisible" style={{ ...PORTFOLIO_STYLE, paddingTop: "0.65rem" }}>Portfolio</div>
          {[{ stroke: 0.18, opacity: 1 }, { stroke: 0.13, opacity: 0.75 }, { stroke: 0.09, opacity: 0.5 }].map(({ stroke, opacity }, i) => (
            <div key={i} style={{ overflow: "hidden", paddingTop: "0.65em", marginTop: "-0.65em" }}>
              <span aria-hidden className="block text-center font-black leading-[0.88]"
                style={{ ...PORTFOLIO_STYLE, WebkitTextStroke: `1.5px rgba(255,255,255,${stroke})`, color: "transparent", opacity,
                  animation: `slideUp 1.0s cubic-bezier(0.16,1,0.3,1) ${0.35 + i * 0.1}s both` }}>
                PORTFOLiO
              </span>
            </div>
          ))}
        </div>

        {/* Photo block */}
        <div className="absolute z-[5]"
          style={{ left: "11%", top: "calc(8.5vh + clamp(1.76rem, 4.84vw, 4.4rem) + min(36vh, 27vw))", transform: "translateY(-50%)", height: "min(62vh, 47vw)", aspectRatio: "3/4" }}>
          <div className="relative w-full h-full">
            {/* Headshot — gallery frame */}
            <div className="absolute inset-0 overflow-hidden" style={{
              border: "1px solid rgba(232,160,32,0.75)",
              boxShadow: "0 24px 70px rgba(4,9,24,0.55), 0 6px 22px rgba(4,9,24,0.35), 0 0 40px rgba(232,160,32,0.08)",
            }}>
              <Image src="/hero-headshot-bg.avif" alt="Kat Mrzljak" fill unoptimized priority
                style={{ objectFit: "cover", objectPosition: "center 18%" }} />
              {/* Inner mat hairline — floats over the photo like a fine-art mount */}
              <div aria-hidden className="absolute pointer-events-none" style={{
                inset: "clamp(8px, 1vw, 14px)",
                border: "1px solid rgba(255,255,255,0.35)",
                mixBlendMode: "overlay",
              }} />
              {/* Subtle vignette to seat the photo in the frame */}
              <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
                boxShadow: "inset 0 0 60px rgba(4,9,24,0.35)",
              }} />
            </div>
            {/* Corner ticks — outside the photo edge */}
            {[
              { top: "-7px", left: "-7px", borderWidth: "1px 0 0 1px" },
              { top: "-7px", right: "-7px", borderWidth: "1px 1px 0 0" },
              { bottom: "-7px", left: "-7px", borderWidth: "0 0 1px 1px" },
              { bottom: "-7px", right: "-7px", borderWidth: "0 1px 1px 0" },
            ].map((pos, i) => (
              <div key={i} aria-hidden className="absolute pointer-events-none" style={{
                ...pos,
                width: "clamp(14px, 1.6vw, 22px)", height: "clamp(14px, 1.6vw, 22px)",
                borderStyle: "solid", borderColor: "rgba(232,160,32,0.9)",
              }} />
            ))}
          </div>
        </div>

        {/* PORTFOLIO heading — whole word floats up from below */}
        <div className="absolute inset-x-0 select-none pointer-events-none" style={{ top: "14%", zIndex: 40 }}>
          <div style={{ overflow: "hidden", paddingTop: "0.65em", textAlign: "center" }}>
            <h1 className="text-white font-black" aria-label="PORTFOLiO"
              style={{ ...PORTFOLIO_STYLE, lineHeight: 0.88, display: "inline-block",
                textShadow: "0 6px 30px rgba(4,9,24,0.65), 0 2px 10px rgba(4,9,24,0.5), 0 18px 60px rgba(4,9,24,0.4)",
                animation: "slideUp 1.05s cubic-bezier(0.16,1,0.3,1) 0.1s both" }}>
              PORTFOLiO
            </h1>
          </div>
        </div>

        {/* Bio card — vertically centred in the hero, glass-morphism so it blends with the shifting gradient */}
        <div className="absolute z-40"
          style={{
            right: "clamp(2%, 6vw, 8%)", top: "50%", transform: "translateY(-50%)",
            width: "clamp(220px, 24vw, 340px)", padding: "clamp(1.4rem, 2.5vw, 3rem) clamp(1.5rem, 2.75vw, 3.25rem)",
            background: "rgba(9, 18, 44, 0.55)",
            backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "clamp(2px, 0.25vw, 4px)",
          }}>
          <p className="text-white"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(15px, 1.6vw, 22px)", textAlign: "justify", lineHeight: 1.8 }}>
            I&apos;m a product designer passionate about creating{" "}
            <span style={{ color: "#e8a020", fontStyle: "italic" }}>immersive experiences</span>
            {" "}through engaging consumer journeys.
          </p>
        </div>

        {/* Mason jar — resting on the bottom edge of the hero section */}
        <div className="absolute z-40" style={{ left: "60%", bottom: "0" }}>
          <MasonJar tipped={jarTipped} onClick={onJarClick} />
        </div>

        {/* Scroll down circle */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-40">
          <a href="#about" className="rounded-full bg-[#e8a020] text-white font-semibold flex items-center justify-center text-center leading-snug hover:bg-[#d4911c] transition-colors"
            style={{ width: "clamp(80px, 10vw, 128px)", height: "clamp(80px, 10vw, 128px)", fontSize: "clamp(14px, 1.6vw, 19px)", letterSpacing: "0.06em", fontFamily: "var(--font-playfair), Georgia, serif" }}>
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
/* 4-point star path helper — outer radius r, inner ≈ 0.28r */
function s4(cx: number, cy: number, r: number): string {
  const ir = r * 0.28;
  const pts: string[] = [];
  for (let k = 0; k < 8; k++) {
    const a = (k * Math.PI) / 4 - Math.PI / 2;
    const rad = k % 2 === 0 ? r : ir;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

/* Constellations + moon — scroll-driven curtain swing.
   Self-contained so it can render in both the mobile and desktop about layouts;
   each instance registers its own scroll handler keyed to the #about section. */
function ConstellationSky({ svgStyle, moonStyle }: {
  svgStyle?: React.CSSProperties; moonStyle?: React.CSSProperties;
}) {
  const constRef  = useRef<SVGSVGElement>(null);
  const constRefL = useRef<SVGGElement>(null);
  const constRefR = useRef<SVGGElement>(null);

  useEffect(() => {
    const section = document.getElementById("about");
    const svg = constRef.current;
    const gL  = constRefL.current;
    const gR  = constRefR.current;
    if (!section || !svg || !gL || !gR) return;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh   = window.innerHeight;
      /* progress=0: scroll-down circle at viewport centre (about-top ≈ vh/2)
         progress=1: about section top at viewport top (content centred) */
      const progress = Math.max(0, Math.min(1, (vh * 0.5 - rect.top) / (vh * 0.5)));
      const rem = 1 - progress;
      svg.style.opacity = Math.min(1, progress * 1.6).toFixed(2);
      /* Big Dipper swings in from the left, Cassiopeia from the right */
      gL.style.transform = `translate(${(24 - 52 * rem).toFixed(1)}px, -8px) rotate(${(18 * rem).toFixed(2)}deg)`;
      gR.style.transform = `translateX(${( 52 * rem).toFixed(1)}px) rotate(${(-18 * rem).toFixed(2)}deg)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <svg ref={constRef} aria-hidden className="absolute pointer-events-none select-none"
        viewBox="0 0 240 100" preserveAspectRatio="xMidYMid meet"
        style={{ left: "-34%", top: "5%", width: "168%", height: "auto", overflow: "visible", zIndex: 5, opacity: 0, ...svgStyle }}>
        {/* Big Dipper — swings in from the LEFT, pivots around its rightmost star (Alkaid) */}
        <g ref={constRefL} style={{ transform: "translate(24px, -8px)", transformOrigin: "110px 32px" }}>
          <g stroke="rgba(255,255,255,0.28)" strokeWidth="1.1" fill="none">
            <line x1="38" y1="52" x2="38" y2="72" />
            <line x1="38" y1="72" x2="60" y2="74" />
            <line x1="60" y1="74" x2="58" y2="54" />
            <line x1="58" y1="54" x2="38" y2="52" />
            <line x1="58" y1="54" x2="74" y2="47" />
            <line x1="74" y1="47" x2="90" y2="42" />
            <line x1="90" y1="42" x2="110" y2="32" />
          </g>
          <path d={s4(38,  52, 3.2)} fill="rgba(255,255,255,0.96)" style={{ filter: "drop-shadow(0 0 5px rgba(200,220,255,0.9))" }} />
          <path d={s4(38,  72, 2.6)} fill="rgba(255,255,255,0.84)" style={{ filter: "drop-shadow(0 0 4px rgba(200,220,255,0.75))" }} />
          <path d={s4(60,  74, 2.6)} fill="rgba(255,255,255,0.84)" style={{ filter: "drop-shadow(0 0 4px rgba(200,220,255,0.75))" }} />
          <path d={s4(58,  54, 2.2)} fill="rgba(255,255,255,0.7)"  style={{ filter: "drop-shadow(0 0 3px rgba(200,220,255,0.65))" }} />
          <path d={s4(74,  47, 2.9)} fill="rgba(255,255,255,0.9)"  style={{ filter: "drop-shadow(0 0 5px rgba(200,220,255,0.85))" }} />
          <path d={s4(90,  42, 2.4)} fill="rgba(255,255,255,0.8)"  style={{ filter: "drop-shadow(0 0 4px rgba(200,220,255,0.75))" }} />
          <path d={s4(110, 32, 3.1)} fill="rgba(255,255,255,0.98)" style={{ filter: "drop-shadow(0 0 6px rgba(200,220,255,1))" }} />
          {/* left-side background scatter */}
          <path d={s4(20,  38, 1.2)} fill="rgba(255,255,255,0.48)" />
          <path d={s4(8,   68, 1.0)} fill="rgba(255,255,255,0.38)" />
          <path d={s4(50,  15, 0.9)} fill="rgba(255,255,255,0.35)" />
        </g>

        {/* Cassiopeia — swings in from the RIGHT, pivots around its leftmost star */}
        <g ref={constRefR} style={{ transformOrigin: "155px 55px" }}>
          <g stroke="rgba(255,255,255,0.22)" strokeWidth="0.9" fill="none">
            <line x1="155" y1="55" x2="165" y2="41" />
            <line x1="165" y1="41" x2="178" y2="50" />
            <line x1="178" y1="50" x2="191" y2="36" />
            <line x1="191" y1="36" x2="204" y2="45" />
          </g>
          <path d={s4(155, 55, 2.1)} fill="rgba(255,255,255,0.82)" style={{ filter: "drop-shadow(0 0 3.5px rgba(200,220,255,0.75))" }} />
          <path d={s4(165, 41, 2.6)} fill="rgba(255,255,255,0.96)" style={{ filter: "drop-shadow(0 0 5px rgba(200,220,255,0.9))" }} />
          <path d={s4(178, 50, 2.0)} fill="rgba(255,255,255,0.72)" style={{ filter: "drop-shadow(0 0 3px rgba(200,220,255,0.65))" }} />
          <path d={s4(191, 36, 2.8)} fill="rgba(255,255,255,0.98)" style={{ filter: "drop-shadow(0 0 6px rgba(200,220,255,1))" }} />
          <path d={s4(204, 45, 2.2)} fill="rgba(255,255,255,0.84)" style={{ filter: "drop-shadow(0 0 4px rgba(200,220,255,0.8))" }} />
          {/* right-side background scatter */}
          <path d={s4(128, 58, 1.4)} fill="rgba(255,255,255,0.42)" />
          <path d={s4(143, 42, 1.0)} fill="rgba(255,255,255,0.38)" />
          <path d={s4(220, 46, 1.1)} fill="rgba(255,255,255,0.44)" />
          <path d={s4(230, 72, 1.1)} fill="rgba(255,255,255,0.36)" />
        </g>

        {/* Standalone 4-point stars — scattered between the constellations */}
        <g>
          <path d={s4(124, 12, 2.4)} fill="rgba(255,255,255,0.88)" style={{ filter: "drop-shadow(0 0 5px rgba(200,220,255,0.8))" }} />
          <path d={s4(100, 68, 1.9)} fill="rgba(255,255,255,0.7)"  style={{ filter: "drop-shadow(0 0 4px rgba(200,220,255,0.65))" }} />
          <path d={s4(140, 88, 2.2)} fill="rgba(255,255,255,0.8)"  style={{ filter: "drop-shadow(0 0 5px rgba(200,220,255,0.7))" }} />
          <path d={s4(196, 78, 1.7)} fill="rgba(255,255,255,0.66)" style={{ filter: "drop-shadow(0 0 3.5px rgba(200,220,255,0.6))" }} />
          <path d={s4(28, 90, 1.8)}  fill="rgba(255,255,255,0.68)" style={{ filter: "drop-shadow(0 0 4px rgba(200,220,255,0.6))" }} />
        </g>
      </svg>

      {/* Full moon — just under the constellations, slightly right of centre */}
      <Moon style={{
        position: "absolute", top: "24%", left: "62%",
        transform: "translate(-50%, -50%)",
        width: "clamp(34px, 4vw, 60px)", height: "clamp(34px, 4vw, 60px)",
        zIndex: 6,
        filter: "drop-shadow(0 0 11px rgba(200,225,255,0.65)) drop-shadow(0 0 24px rgba(200,225,255,0.3))",
        ...moonStyle,
      }} />
    </>
  );
}

function AboutSection() {
  const headingRef  = useScrollReveal(0);
  const bodyRef     = useScrollReveal(0.1);
  const linkRef     = useScrollReveal(0.18);
  const photoRef    = useScrollReveal(0.08);
  const sectionRef  = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="about" className="relative bg-[#f0f4ff] overflow-visible" style={{ position: "relative", zIndex: 2 }}>
      <div id="contact" className="absolute top-0 pointer-events-none" aria-hidden />

      {/* ── Mobile / tablet (< 1024 px) ── */}
      <div className="lg:hidden px-6 pb-10 overflow-hidden" style={{ paddingTop: "clamp(4rem, 12vw, 6rem)" }}>
        <h2 className="text-[#1a1a1a] leading-tight mb-4"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400, fontSize: "clamp(2.2rem, 10vw, 4rem)" }}>
          Hello,<br />I&apos;m Kat!
        </h2>
        <p className="text-[#444] mb-6" style={{ fontSize: "clamp(0.875rem, 4vw, 1rem)", textAlign: "justify", lineHeight: 1.75 }}>
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
        <div className="w-full max-w-md mx-auto">
          <div className="relative" style={{ marginTop: "clamp(2.5rem, 10vw, 4rem)" }}>
          {/* Constellations + moon — same scroll-driven sky as desktop */}
          <ConstellationSky
            svgStyle={{ left: "-12%", top: "-2%", width: "124%" }}
            moonStyle={{ top: "20%", width: "clamp(30px, 9vw, 48px)", height: "clamp(30px, 9vw, 48px)" }} />
          <div className="w-full arch-bg overflow-hidden relative"
            style={{
              aspectRatio: "3/4", borderRadius: "50% 50% 0 0 / 37.5% 37.5% 0 0",
              boxShadow: "inset 0 22px 60px -18px rgba(195,218,255,0.22), inset 0 -40px 70px -30px rgba(2,6,18,0.5)",
            }}>
            {/* Moon disc rising behind her */}
            <div aria-hidden style={{
              position: "absolute", bottom: "20%", left: "50%", transform: "translateX(-50%)",
              width: "52%", aspectRatio: "1", borderRadius: "50%",
              background: "radial-gradient(closest-side, rgba(222,232,255,0.15) 0%, rgba(212,226,255,0.11) 70%, rgba(212,226,255,0.07) 96%, transparent 100%)",
              boxShadow: "0 0 70px 24px rgba(195,218,255,0.09)",
              pointerEvents: "none",
            }} />
            {/* Floor horizon line behind her seat */}
            <div aria-hidden style={{
              position: "absolute", bottom: "11%", left: "50%", transform: "translateX(-50%)",
              width: "84%", height: 1,
              background: "linear-gradient(to right, transparent, rgba(190,215,255,0.18) 35%, rgba(190,215,255,0.18) 65%, transparent)",
              boxShadow: "0 0 10px 1px rgba(190,215,255,0.14)",
              pointerEvents: "none",
            }} />
            {/* Moonlight pool on the floor */}
            <div aria-hidden style={{
              position: "absolute", bottom: "-4%", left: "50%", transform: "translateX(-50%)",
              width: "78%", height: "52%",
              background: "radial-gradient(55% 85% at 50% 100%, rgba(190,215,255,0.10) 0%, rgba(190,215,255,0.04) 45%, transparent 72%)",
              pointerEvents: "none",
            }} />
            {/* Contact shadow under the figure */}
            <div aria-hidden style={{
              position: "absolute", bottom: "-1.5%", left: "50%", transform: "translateX(-50%)",
              width: "48%", height: "7%",
              background: "radial-gradient(50% 50% at 50% 50%, rgba(2,6,18,0.55) 0%, rgba(2,6,18,0.25) 55%, transparent 75%)",
              filter: "blur(4px)",
              pointerEvents: "none",
            }} />
            <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", height: "54%", aspectRatio: "492/566" }}>
              <Image src="/about-sitting.avif" alt="Kat Mrzljak" fill unoptimized
                style={{
                  objectFit: "contain", objectPosition: "center bottom",
                  /* cool grade + directional rims: moonlight from upper-left, faint firefly warmth from lower-right */
                  filter: "brightness(0.97) saturate(0.88) drop-shadow(-4px -6px 8px rgba(195,220,255,0.42)) drop-shadow(3px 5px 10px rgba(232,170,60,0.16)) drop-shadow(0 0 30px rgba(170,200,255,0.14))",
                }} />
            </div>
            {/* Fireflies drifting around her */}
            {[
              { left: "21%", bottom: "44%", size: 5, dur: 2.8, delay: 0.4 },
              { left: "76%", bottom: "30%", size: 4, dur: 3.4, delay: 1.3 },
              { left: "32%", bottom: "9%",  size: 4, dur: 2.4, delay: 2.1 },
            ].map((f, i) => (
              <div key={i} aria-hidden style={{
                position: "absolute", left: f.left, bottom: f.bottom,
                width: f.size, height: f.size, borderRadius: "50%",
                backgroundColor: "#ffd479",
                boxShadow: "0 0 8px 2px rgba(232,170,60,0.55)",
                animation: `twinkle ${f.dur}s ease-in-out ${f.delay}s infinite`,
                pointerEvents: "none",
              }} />
            ))}
          </div>
          </div>
          <div className="bg-[#1a1a1a] text-white w-full p-5">
            <h4 className="mb-3" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.1rem" }}>Contact</h4>
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

      {/* ── Desktop (≥ 1024 px) ── */}
      <div className="hidden lg:block" style={{ paddingTop: "clamp(6rem, 10vw, 10rem)", paddingLeft: "10.5vw", paddingRight: "5vw", paddingBottom: "6vw" }}>
        <div style={{ width: "46vw" }}>
          <h2 ref={headingRef} className="text-[#1a1a1a] leading-tight"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400, fontSize: "clamp(2.5rem, 5vw, 5rem)", marginBottom: "1.5vw" }}>
            Hello,<br />I&apos;m Kat!
          </h2>
          <p ref={bodyRef} className="text-[#444]"
            style={{ fontSize: "clamp(0.85rem, 1.15vw, 1rem)", maxWidth: "32vw", marginBottom: "2.5vw", textAlign: "justify", lineHeight: 1.75 }}>
            I&apos;m a 4th year BUCS student at UBC Sauder building experience-focused products. I&apos;m excited about creating immersive experiences through storytelling, whether it&apos;s through mindfully designed user-journeys or a well-crafted marketing campaign.
          </p>
          <a ref={linkRef} href="https://ca.linkedin.com/in/katrina-mrzljak" target="_blank" rel="noopener noreferrer"
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
        <div ref={photoRef} style={{ position: "absolute", left: "calc(75vw - 14.5vw)", top: "clamp(2rem, 4vw, 4rem)", width: "29vw", zIndex: 2 }}>

          {/* ── Constellations + moon — scroll-driven curtain swing ── */}
          <ConstellationSky />

          <div className="w-full arch-bg overflow-hidden relative"
            style={{
              aspectRatio: "3/4", borderRadius: "50% 50% 0 0 / 37.5% 37.5% 0 0",
              /* moonlight catching the inside of the arch — same rim vocabulary as the figure */
              boxShadow: "inset 0 22px 60px -18px rgba(195,218,255,0.22), inset 0 -40px 70px -30px rgba(2,6,18,0.5)",
            }}>
            {/* Moon disc rising behind her */}
            <div aria-hidden style={{
              position: "absolute", bottom: "20%", left: "50%", transform: "translateX(-50%)",
              width: "52%", aspectRatio: "1", borderRadius: "50%",
              background: "radial-gradient(closest-side, rgba(222,232,255,0.15) 0%, rgba(212,226,255,0.11) 70%, rgba(212,226,255,0.07) 96%, transparent 100%)",
              boxShadow: "0 0 70px 24px rgba(195,218,255,0.09)",
              pointerEvents: "none",
            }} />
            {/* Floor horizon line behind her seat */}
            <div aria-hidden style={{
              position: "absolute", bottom: "11%", left: "50%", transform: "translateX(-50%)",
              width: "84%", height: 1,
              background: "linear-gradient(to right, transparent, rgba(190,215,255,0.18) 35%, rgba(190,215,255,0.18) 65%, transparent)",
              boxShadow: "0 0 10px 1px rgba(190,215,255,0.14)",
              pointerEvents: "none",
            }} />
            {/* Moonlight pool on the floor */}
            <div aria-hidden style={{
              position: "absolute", bottom: "-4%", left: "50%", transform: "translateX(-50%)",
              width: "78%", height: "52%",
              background: "radial-gradient(55% 85% at 50% 100%, rgba(190,215,255,0.10) 0%, rgba(190,215,255,0.04) 45%, transparent 72%)",
              pointerEvents: "none",
            }} />
            {/* Contact shadow under the figure */}
            <div aria-hidden style={{
              position: "absolute", bottom: "-1.5%", left: "50%", transform: "translateX(-50%)",
              width: "48%", height: "7%",
              background: "radial-gradient(50% 50% at 50% 50%, rgba(2,6,18,0.55) 0%, rgba(2,6,18,0.25) 55%, transparent 75%)",
              filter: "blur(4px)",
              pointerEvents: "none",
            }} />
            <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", height: "54%", aspectRatio: "492/566" }}>
              <Image src="/about-sitting.avif" alt="Kat Mrzljak" fill unoptimized
                style={{
                  objectFit: "contain", objectPosition: "center bottom",
                  /* cool grade + directional rims: moonlight from upper-left, faint firefly warmth from lower-right */
                  filter: "brightness(0.97) saturate(0.88) drop-shadow(-4px -6px 8px rgba(195,220,255,0.42)) drop-shadow(3px 5px 10px rgba(232,170,60,0.16)) drop-shadow(0 0 30px rgba(170,200,255,0.14))",
                }} />
            </div>
            {/* Fireflies drifting around her */}
            {[
              { left: "21%", bottom: "44%", size: 5, dur: 2.8, delay: 0.4 },
              { left: "76%", bottom: "30%", size: 4, dur: 3.4, delay: 1.3 },
              { left: "32%", bottom: "9%",  size: 4, dur: 2.4, delay: 2.1 },
            ].map((f, i) => (
              <div key={i} aria-hidden style={{
                position: "absolute", left: f.left, bottom: f.bottom,
                width: f.size, height: f.size, borderRadius: "50%",
                backgroundColor: "#ffd479",
                boxShadow: "0 0 8px 2px rgba(232,170,60,0.55)",
                animation: `twinkle ${f.dur}s ease-in-out ${f.delay}s infinite`,
                pointerEvents: "none",
              }} />
            ))}
          </div>
          <div className="bg-[#1a1a1a] text-white w-full"
            style={{ position: "absolute", top: "100%", left: 0, padding: "clamp(1rem, 1.5vw, 1.5rem) clamp(1.2rem, 1.75vw, 1.75rem)", zIndex: 3 }}>
            <h4 className="" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1rem, 1.4vw, 1.25rem)", marginBottom: "1vw" }}>Contact</h4>
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

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   RESUME SECTION
───────────────────────────────────────────────────────────── */
function ResumeSection() {
  const eduRef   = useScrollReveal(0);
  const expRef   = useScrollReveal(0.1);
  const skillRef = useScrollReveal(0.05);
  const toolRef  = useScrollReveal(0.15);
  const tools = ["Figma", "Claude Code", "Notion", "Canva", "Microsoft Suite", "Microsoft Power BI", "Microsoft Power Apps", "Google Suite", "Final Cut Pro"];
  const skills = ["UX/UI Design", "Wireframing", "Product Management", "Business Analytics", "Brand Strategy", "GTM Strategy", "Product Marketing", "Content Creation", "Vibecoding"];
  const experiences = [
    { dates: "Jan 2026 – Present", role: "Intellectual Property Intern", org: "Seaspan ULC", desc: "Led UX/UI design of internal compliance tools and implemented analytics to track user adoption and effectiveness." },
    { dates: "Mar 2026 – Present", role: "President", org: "UBC Product Management Club", desc: "Leading UBC PMC's 2026/2027 directions, operations, and strategy." },
  ];

  return (
    <section id="resume" className="relative bg-[#0d1b3e] overflow-visible" style={{ position: "relative", zIndex: 1 }}>

      {/* ── Mobile / tablet (< 1024 px) ── */}
      <div className="lg:hidden px-6 py-10 flex flex-col gap-8">
        <div>
          <h3 className="text-[#e8a020] mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.8rem, 8vw, 2.5rem)" }}>Education</h3>
          <div className="flex items-start gap-3">
            <div className="text-[#e8a020] shrink-0 mt-1 w-3 h-3"><Star className="w-full h-full" /></div>
            <div>
              <p className="text-[#e8a020] font-semibold text-sm">2023 – Present</p>
              <p className="text-white font-bold">University of British Columbia</p>
              <p className="text-white/60 text-sm">Business and Computer Science (BUCS) Dual Major</p>
            </div>
          </div>
        </div>
        <div className="bg-[#e8a020] p-6">
          <h3 className="text-white mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.8rem, 8vw, 2.5rem)" }}>Experiences</h3>
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
          <h3 className="text-white mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.8rem, 8vw, 2.5rem)" }}>Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => <span key={s} className="border border-white/30 text-white/80 text-sm px-3 py-1">{s}</span>)}
          </div>
        </div>
        <div>
          <h3 className="text-white mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.8rem, 8vw, 2.5rem)" }}>Tools</h3>
          <div className="flex flex-wrap gap-2">
            {tools.map(t => <span key={t} className="bg-white/10 text-white/80 text-sm px-3 py-1">{t}</span>)}
          </div>
        </div>
      </div>

      {/* ── Desktop (≥ 1024 px) ── */}
      <div className="hidden lg:flex items-start"
        style={{ paddingTop: "clamp(2rem, 4vw, 4rem)", paddingLeft: "5vw", paddingRight: "5vw", paddingBottom: "clamp(2rem, 3vw, 3rem)", gap: "4vw" }}>
        <div style={{ width: "36vw", flexShrink: 0 }} aria-hidden />
        <div style={{ flex: 1 }}>
          <h3 ref={skillRef} className="text-white " style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "2vw" }}>Skills</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75vw", marginBottom: "3vw" }}>
            {skills.map((s) => (
              <span key={s} className="border border-white/30 text-white/80"
                style={{ fontSize: "clamp(0.75rem, 1vw, 0.9rem)", padding: "0.4vw 1vw" }}>
                {s}
              </span>
            ))}
          </div>
          <h3 ref={toolRef} className="text-white " style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "2vw" }}>Tools</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75vw" }}>
            {tools.map((t) => (
              <span key={t} className="bg-white/10 text-white/80"
                style={{ fontSize: "clamp(0.75rem, 1vw, 0.9rem)", padding: "0.4vw 1vw" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div ref={eduRef} className="bg-[#0d1b3e]"
          style={{ position: "absolute", top: "clamp(1rem, 2vw, 2rem)", left: "5vw", width: "36vw", zIndex: 2, padding: "clamp(1rem, 2vw, 2rem) clamp(1.2rem, 2.5vw, 2.5rem)" }}>
          <h3 className="text-[#e8a020] " style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "1.5vw" }}>Education</h3>
          <div className="flex items-start" style={{ gap: "1.2vw" }}>
            <div className="text-[#e8a020] shrink-0 mt-1" style={{ width: "clamp(10px, 1.1vw, 14px)", height: "clamp(10px, 1.1vw, 14px)" }}>
              <Star className="w-full h-full" />
            </div>
            <div>
              <p className="text-[#e8a020] font-semibold" style={{ fontSize: "clamp(0.7rem, 0.95vw, 0.85rem)" }}>2023 – Present</p>
              <p className="text-white font-bold" style={{ fontSize: "clamp(0.85rem, 1.15vw, 1rem)" }}>University of British Columbia</p>
              <p className="text-white/60" style={{ fontSize: "clamp(0.7rem, 0.9vw, 0.8rem)" }}>Business and Computer Science (BUCS) Dual Major</p>
            </div>
          </div>
        </div>
        <div ref={expRef} className="bg-[#e8a020]"
          style={{ position: "absolute", top: "18vw", left: "5vw", width: "36vw", zIndex: 2, padding: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
          <h3 className="text-white " style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "2vw" }}>Experiences</h3>
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
   WORK SECTION — VIDEO CARD
   Plays the bottle video forward, then reverses frame-by-frame
   via RAF so it seamlessly loops back to the start.
───────────────────────────────────────────────────────────── */
function VideoCard({ href, title, tag, badge, pad }: {
  href: string; title: string; tag: string; badge?: string; pad: string;
}) {
  return (
    <a href={href}
      className="bg-[#0d1b3e] flex flex-col justify-end cursor-pointer group relative overflow-hidden no-underline transition-transform duration-300 hover:scale-[1.012]"
      style={{ aspectRatio: "16/10", padding: pad }}>
      <video src="/dualite-bottle-loop.mp4" autoPlay muted playsInline loop preload="none"
        className="absolute inset-x-0 w-full"
        style={{ objectFit: "cover", objectPosition: "center top", top: "-115px", height: "calc(100% + 115px)" }} />
      <div aria-hidden className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(13,27,62,0.98) 0%, rgba(13,27,62,0.97) 15%, rgba(13,27,62,0.70) 28%, rgba(13,27,62,0.15) 40%, transparent 52%)" }} />
      <div className="absolute inset-0 bg-[#e8a020] opacity-0 group-hover:opacity-[0.07] transition-opacity duration-300" />
      <div className="relative z-10 flex flex-col gap-1">
        {badge && (
          <span className="self-start text-white font-semibold rounded-full"
            style={{ fontSize: "clamp(0.6rem, 0.72vw, 0.68rem)", padding: "0.3em 0.9em", backgroundColor: "#e8a020", letterSpacing: "0.02em" }}>
            {badge}
          </span>
        )}
        <span className="text-white/50 block" style={{ fontSize: "clamp(0.65rem, 0.9vw, 0.8rem)" }}>{tag}</span>
        <span className="text-white font-bold" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1rem, 1.6vw, 1.5rem)" }}>{title}</span>
      </div>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────
   PORTFOLIO CARD — self-referential last card
   Uses the same hero-bg gradient and firefly-in-jar dots to
   echo the wonder of the site itself.
───────────────────────────────────────────────────────────── */
function PortfolioCard({ pad }: { pad: string }) {
  const dots = [
    { left: "68%", top: "18%", size: 3,   delay: "0s"    },
    { left: "82%", top: "38%", size: 2.2, delay: "0.9s"  },
    { left: "74%", top: "55%", size: 2.6, delay: "1.6s"  },
    { left: "91%", top: "25%", size: 2,   delay: "2.3s"  },
    { left: "60%", top: "42%", size: 1.8, delay: "0.5s"  },
    { left: "86%", top: "62%", size: 2.4, delay: "1.2s"  },
  ];
  return (
    <a href="/work/portfolio"
      className="hero-bg flex flex-col justify-end cursor-pointer group relative overflow-hidden no-underline transition-transform duration-300 hover:scale-[1.012]"
      style={{ aspectRatio: "16/10", padding: pad }}
    >
      {/* Floating firefly dots — pure CSS glow pulse */}
      {dots.map((d, i) => (
        <div key={i} aria-hidden className="absolute firefly-in-jar pointer-events-none"
          style={{
            left: d.left, top: d.top,
            width: d.size, height: d.size,
            borderRadius: "50%",
            backgroundColor: "#e8c828",
            boxShadow: `0 0 ${d.size * 2}px ${d.size}px rgba(232,200,40,0.55)`,
            animationDelay: d.delay,
          }}
        />
      ))}

      {/* Star accents */}
      {[
        { right: "10%", top: "12%", opacity: 0.55, size: "0.65rem" },
        { right: "25%", top: "28%", opacity: 0.25, size: "0.45rem" },
        { right: "6%",  top: "50%", opacity: 0.35, size: "0.5rem"  },
      ].map((s, i) => (
        <span key={i} aria-hidden className="absolute text-[#e8c828] pointer-events-none select-none"
          style={{ right: s.right, top: s.top, opacity: s.opacity, fontSize: s.size, lineHeight: 1 }}>
          ✦
        </span>
      ))}

      {/* Scrim so text is always readable */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(7,16,31,0.96) 0%, rgba(7,16,31,0.72) 28%, rgba(7,16,31,0.15) 55%, transparent 72%)" }} />

      {/* Card text */}
      <div className="relative z-10 flex flex-col gap-1">
        <span className="self-start text-white font-semibold rounded-full"
          style={{ fontSize: "clamp(0.6rem, 0.72vw, 0.68rem)", padding: "0.3em 0.9em", backgroundColor: "#e8a020", letterSpacing: "0.02em" }}>
          ✦ Easter Eggs Inside
        </span>
        <span className="text-white/30 block" style={{ fontSize: "clamp(0.65rem, 0.9vw, 0.8rem)" }}>
          Design Engineering  ·  Next.js 16  ·  TypeScript  ·  Tailwind CSS
        </span>
        <span className="text-white font-bold"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1rem, 1.6vw, 1.5rem)" }}>
          This Portfolio
        </span>
      </div>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────
   WORK SECTION
───────────────────────────────────────────────────────────── */
function WorkSection() {
  const titleRef = useScrollReveal(0);
  const gridRef  = useScrollReveal(0.08);
  const projects = [
    { title: "L'Oréal Brandstorm Case Competition 2026", tag: "Product Design  |  Brand Strategy  |  GTM Strategy", badge: "🏆 National Finalist — 3rd Place", href: "/work/loreal-brandstorm",
      desc: "A premium Gen-Z beauty ecosystem designed for L'Oréal's global competition — took 3rd place nationally." },
    { title: "PlateBook", tag: "Product Design  |  iOS  |  React Native", href: "/work/platebook",
      desc: "A social recipe and meal-planning app that turns cooking into a shared experience." },
    { title: "Grayne", tag: "Product Design  |  Web App  |  React + Vite", badge: "In Progress", href: "/work/grayne",
      desc: "A journaling app that quietly tracks the sentiment behind your words — without telling you how to write." },
  ];

  const cards = (cols: number, gap: string, pad: string) => (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap }}>
      {projects.map((p, i) => {
        /* First card — Dualité video treatment */
        if (i === 0 && p.href) {
          return <VideoCard key={i} href={p.href} title={p.title} tag={p.tag} badge={p.badge} pad={pad} />;
        }
        /* Second card — PlateBook animated card */
        if (i === 1 && p.href) {
          return <PlateBookCard key={i} href={p.href} tag={p.tag} pad={pad} />;
        }
        /* Third card — Grayne sand-vortex card */
        if (i === 2 && p.href) {
          return <GrayneCard key={i} href={p.href} tag={p.tag} badge={p.badge} pad={pad} />;
        }
        return (
          <a key={i} href={p.href}
            className="bg-[#0d1b3e] flex flex-col justify-end cursor-pointer group relative overflow-hidden no-underline transition-transform duration-300 hover:scale-[1.012]"
            style={{ aspectRatio: "16/10", padding: pad }}>
            <div className="absolute inset-0 bg-[#e8a020] opacity-0 group-hover:opacity-[0.07] transition-opacity duration-300" />
            <div className="relative z-10 flex flex-col gap-1">
              <span className="text-white/30 block" style={{ fontSize: "clamp(0.65rem, 0.9vw, 0.8rem)", marginBottom: "0.2vw" }}>{p.tag}</span>
              <span className="text-white font-bold" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1rem, 1.6vw, 1.5rem)" }}>{p.title}</span>
            </div>
          </a>
        );
      })}
      {/* Portfolio card always last */}
      <PortfolioCard pad={pad} />
    </div>
  );

  return (
    <section id="work" className="bg-[#f0f4ff]" style={{ paddingBottom: "clamp(4rem, 8vw, 8rem)" }}>
      <div className="lg:hidden" style={{ paddingTop: "clamp(4rem, 12vw, 12rem)", paddingLeft: "clamp(1.5rem, 5vw, 5vw)", paddingRight: "clamp(1.5rem, 5vw, 5vw)" }}>
        <h2 className="text-[#1a1a1a]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400, fontSize: "clamp(2.5rem, 6vw, 6rem)", marginBottom: "clamp(2rem, 4vw, 4rem)", textAlign: "right" }}>
          Selected Works
        </h2>
        {cards(1, "0.75rem", "1rem")}
      </div>
      <div className="hidden lg:block" style={{ paddingTop: "clamp(1rem, 2vw, 2rem)" }}>
        <div style={{ paddingLeft: "43vw", paddingRight: "5vw" }}>
          <h2 ref={titleRef} className="text-[#1a1a1a]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400, fontSize: "clamp(2.5rem, 6vw, 6rem)", marginBottom: "clamp(1.5rem, 3vw, 3rem)", textAlign: "right" }}>
            Selected Works
          </h2>
        </div>
        <div ref={gridRef} style={{ paddingLeft: "5vw", paddingRight: "5vw" }}>
          {cards(2, "2vw", "clamp(0.75rem, 2vw, 2vw)")}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOOTER — SUNRISE
───────────────────────────────────────────────────────────── */

/* Pill-cloud keyframes — cld-r drifts left→right; cld-l right→left. */
const CLOUD_KEYFRAMES = `
  @keyframes cld-r { from { transform: translateX(-120vw) } to { transform: translateX(120vw) } }
  @keyframes cld-l { from { transform: translateX(120vw)  } to { transform: translateX(-120vw) } }
`;

/* Clouds are larger, slower, and lower in the section than before.
   Colors warm toward the horizon (high = white/cream, low = dusky rose). */
const CLOUDS = [
  { w: 340, h: 64, top: "48%", dur: 88,  delay: -12, dir: "r", color: "rgba(255,242,225,0.58)", blur: 2.5 },
  { w: 230, h: 46, top: "62%", dur: 112, delay: -38, dir: "l", color: "rgba(255,228,200,0.50)", blur: 2   },
  { w: 450, h: 84, top: "70%", dur: 145, delay: -22, dir: "r", color: "rgba(240,195,165,0.40)", blur: 4   },
  { w: 175, h: 38, top: "54%", dur: 98,  delay: -55, dir: "l", color: "rgba(255,248,238,0.46)", blur: 1.5 },
  { w: 310, h: 60, top: "78%", dur: 128, delay: -46, dir: "r", color: "rgba(200,130,110,0.35)", blur: 3   },
  { w: 280, h: 54, top: "84%", dur: 160, delay: -28, dir: "l", color: "rgba(160,85,100,0.28)",  blur: 2.5 },
  { w: 215, h: 44, top: "66%", dur: 105, delay: -14, dir: "r", color: "rgba(255,235,210,0.38)", blur: 2   },
] as const;

function FooterSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const sunRef      = useRef<HTMLDivElement>(null);
  const skyRef      = useRef<HTMLDivElement>(null);  // daytime-sky overlay — driven by DOM ref
  const labelRef    = useScrollReveal(0);
  const headingRef  = useScrollReveal(0.12);

  /* All scroll-driven values go straight to DOM — no React re-render on every scroll tick */
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      /* On short/narrow viewports the section can be shorter than 0.65·vh, so the
         old denominator never let progress reach 1 — clamp it to the section height
         so the sun always finishes rising by the time the page bottoms out. */
      const denom = Math.min(vh * 0.65, rect.height * 0.85);
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / denom));
      if (skyRef.current) {
        skyRef.current.style.opacity = (progress * 0.82).toFixed(3);
      }
      if (sunRef.current) {
        const scrolledPast = Math.max(0, -rect.top);
        const riseY = 150 - progress * 100;
        const driftY = scrolledPast * 0.04;
        sunRef.current.style.transform = `translateX(-50%) translateY(calc(${riseY}% - ${driftY}px))`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} id="get-in-touch" className="relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #060a1e 0%, #0e1235 18%, #281050 36%, #5a1858 54%, #aa3828 72%, #e08020 88%, #f0a828 100%)",
        paddingTop: "clamp(4rem, 7vw, 7rem)", paddingBottom: "clamp(3rem, 5vw, 5rem)",
        paddingLeft: "clamp(1.5rem, 5vw, 5vw)", paddingRight: "clamp(1.5rem, 5vw, 5vw)",
      }}>
      <style dangerouslySetInnerHTML={{ __html: CLOUD_KEYFRAMES }} />

      {/* Pill clouds — drift across the footer sky */}
      {CLOUDS.map((c, i) => (
        <div key={i} aria-hidden className="absolute pointer-events-none"
          style={{
            top: c.top, left: "50%", zIndex: 2,
            animation: `cld-${c.dir} ${c.dur}s linear ${c.delay}s infinite`,
          }}
        >
          <div style={{
            width: c.w, height: c.h, borderRadius: 999,
            background: `radial-gradient(ellipse 70% 100% at 30% 40%, rgba(255,255,255,0.18) 0%, transparent 60%), ${c.color}`,
            boxShadow: `0 4px 24px rgba(240,155,32,0.18), inset 0 1px 0 rgba(255,255,255,0.25)`,
            filter: `blur(${c.blur}px)`,
          }} />
        </div>
      ))}

      {/* Midday-sky wash — opacity driven by scroll via skyRef (no React re-render) */}
      <div ref={skyRef} aria-hidden className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #0e3d6a 0%, #1a6ea8 35%, #3a96c8 70%, #78c0e0 100%)",
          opacity: 0,
          zIndex: 1,
        }} />

      {/* Large rising sun — transform driven by scroll via sunRef (no React re-render) */}
      <div ref={sunRef} aria-hidden className="absolute pointer-events-none"
        style={{
          bottom: 0, left: "50%",
          width: "clamp(300px, 58vw, 540px)", height: "clamp(300px, 58vw, 540px)",
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 50%, #fff8e8 0%, #ffe098 22%, #f09828 45%, #c05830 70%, transparent 92%)",
          transform: "translateX(-50%) translateY(150%)",
          opacity: 0.72, filter: "blur(1.5px)",
          zIndex: 1,
        }} />
      <div aria-hidden className="absolute pointer-events-none left-0 right-0 bottom-0"
        style={{ height: "40%", background: "linear-gradient(to top, rgba(232,160,32,0.22), transparent)", zIndex: 1 }} />
      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-0">
        <div>
          <p ref={labelRef} className="text-white/50 uppercase tracking-widest" style={{ fontSize: "clamp(0.65rem, 0.85vw, 0.8rem)", marginBottom: "1.5vw" }}>
            ready to seize the day?
          </p>
          <h2 ref={headingRef} className="text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 400, fontSize: "clamp(2.5rem, 6vw, 6rem)", lineHeight: 0.9, marginBottom: "2.5vw" }}>
            Get in<br />touch.
          </h2>
          <a href="mailto:katrina.mrzljak@gmail.com"
            className="inline-flex items-center gap-2 bg-[#e8a020] text-white font-semibold rounded-full hover:bg-[#d4911c] transition-colors"
            style={{ fontSize: "clamp(0.8rem, 1.1vw, 1rem)", padding: "clamp(0.5rem, 0.75vw, 0.85rem) clamp(1.2rem, 1.8vw, 1.8rem)" }}>
            katrina.mrzljak@gmail.com
          </a>
        </div>
        <div className="flex items-center gap-2.5">
          <Star className="w-5 h-5 text-[#e8a020]" />
          <span className="font-bold text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.1rem, 1.5vw, 1.5rem)" }}>
            Katrina Mrzljak
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FIREFLY CONSTANTS — pure-CSS movement
   60 fireflies, each with unique @keyframes for left/top so
   they wander independently with no JavaScript animation loop.
   Long durations (50–90 s) + cubic-bezier give organic curves.
───────────────────────────────────────────────────────────── */
const FIREFLY_COUNT = 60;

const _fr = (s: number) => { const x = Math.sin(s * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

/* Per-fly CSS animation timing — no pre-roll delays; animations start on jar click
   so the 0% keyframe (jar position) is always honored on release. */
const FF_ANIM = Array.from({ length: FIREFLY_COUNT }, (_, i) => ({
  xDur:       (50  + _fr(i * 3.1) * 40).toFixed(1),    // 50–90 s horizontal cycle
  yDur:       (40  + _fr(i * 5.7) * 30).toFixed(1),    // 40–70 s vertical cycle
  blinkDur:   (1.5 + _fr(i * 2.3) *  2).toFixed(2),    // 1.5–3.5 s glow pulse
  blinkDelay: (_fr(i * 4.1) * 3).toFixed(2),
}));

/* Per-fly orbital offsets for cursor attraction — each fly drifts to a unique
   position near the cursor so they form a loose cloud rather than piling up. */
const ATTR_OFFSETS = Array.from({ length: FIREFLY_COUNT }, (_, i) => ({
  x: (_fr(i * 43.1) - 0.5) * 80,   // ±40 px horizontal spread
  y: (_fr(i * 61.7) - 0.5) * 80,   // ±40 px vertical spread
}));

/* Generate unique @keyframes for every fly — runs once, never again.
   0% keyframe for each fly is placed near the jar (≈60% / 82%) so that
   when the animation is started on click the fly visually launches from there. */
/* Split CSS: BASE is injected at mount (slideUp, ff-blink, wander — all needed pre-click).
   FLY is deferred until jar click — the ~15 KB of per-fly path keyframes. */
const [FIREFLY_CSS_BASE, FIREFLY_CSS_FLY] = (() => {
  /* BASE includes the glow pulse, hero text animations, and all wander paths.  */
  /* Jar anchor — desktop jar sits at left:60% bottom:0; mobile jar sits at the
     bottom-left of the hero (px-6 → 24px, pb-16 → 64px). Fly keyframes reference
     these vars so the same CSS works at every breakpoint. */
  let base = `.ff-host{--jar-x:60%;--jar-yoff:0px}`;
  base += `@media (max-width:1023.98px){.ff-host{--jar-x:24px;--jar-yoff:64px}}`;
  base += `@keyframes ff-blink{0%,100%{box-shadow:0 0 3px 1.5px rgba(232,200,40,.52),0 0 11px 3px rgba(232,200,40,.14)}50%{box-shadow:0 0 7px 3.5px rgba(232,200,40,.98),0 0 22px 6px rgba(232,200,40,.32)}}`;
  base += `@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}`;
  base += `@keyframes slideUp{from{transform:translateY(42%);opacity:0}to{transform:translateY(0);opacity:1}}`;
  /* FLY contains the per-fly position keyframes — deferred until jar click. */
  let fly = '';
  for (let i = 0; i < FIREFLY_COUNT; i++) {
    // 0% = pixel-exact inside jar; 10% = just above jar opening; rest = free wander.
    // Jar body interior: SVG x 9–71 px wide, SVG y 27–99 px tall.
    // Jar sits at left:"60%" bottom:"0". fromBottom = (104 − SVG_y) px from hero bottom.
    // 10 px inner padding keeps wander animations inside the glass on all sides.
    const jxPx = 19 + _fr(i * 2.1) * 42;            // 19–61 px from jar's left (padded)
    const jyFB = 15 + _fr(i * 3.3) * 52;            // 15–67 px from hero bottom (padded)
    // Exit: converge to jar mouth centre (SVG x≈32–48, from-bottom≈88–108 px)
    const ePx  = 32 + _fr(i * 5.5) * 16;            // 32–48 px — within mouth opening
    const eFB  = 88 + _fr(i * 7.2) * 20;            // 88–108 px from bottom, just above opening
    const lx = [
      `calc(var(--jar-x, 60%) + ${jxPx.toFixed(1)}px)`,
      `calc(var(--jar-x, 60%) + ${ePx.toFixed(1)}px)`,
      ...Array.from({ length: 5 }, (_, k) => `${(5 + _fr(i * 13.7 + (k + 2) * 6.3) * 83).toFixed(1)}%`),
    ];
    const ly = [
      `calc(100% - var(--jar-yoff, 0px) - ${jyFB.toFixed(1)}px)`,
      `calc(100% - var(--jar-yoff, 0px) - ${eFB.toFixed(1)}px)`,
      ...Array.from({ length: 3 }, (_, k) => `${(5 + _fr(i * 19.3 + (k + 2) * 8.7) * 83).toFixed(1)}%`),
    ];
    fly += `@keyframes ffx${i}{0%{left:${lx[0]}}10%{left:${lx[1]}}27%{left:${lx[2]}}45%{left:${lx[3]}}63%{left:${lx[4]}}82%{left:${lx[5]}}100%{left:${lx[6]}}}`;
    fly += `@keyframes ffy${i}{0%{top:${ly[0]}}10%{top:${ly[1]}}37%{top:${ly[2]}}68%{top:${ly[3]}}100%{top:${ly[4]}}}`;
    // Gentle wander keyframes while flies are trapped in the jar pre-click
    // Wander amplitude ≤ 7 px — stays within 10 px inner padding on all sides
    const wx1 = ((_fr(i * 17.3) - 0.5) * 10).toFixed(1);
    const wy1 = ((_fr(i * 23.1) - 0.5) *  8).toFixed(1);
    const wx2 = ((_fr(i * 31.7) - 0.5) * 10).toFixed(1);
    const wy2 = ((_fr(i * 37.3) - 0.5) *  8).toFixed(1);
    const wx3 = ((_fr(i * 43.9) - 0.5) *  8).toFixed(1);
    const wy3 = ((_fr(i * 53.7) - 0.5) *  6).toFixed(1);
    base += `@keyframes ff-wander${i}{0%,100%{transform:translate(0,0)}25%{transform:translate(${wx1}px,${wy1}px)}50%{transform:translate(${wx2}px,${wy2}px)}75%{transform:translate(${wx3}px,${wy3}px)}}`;
  }
  return [base, fly];
})();

/* ─────────────────────────────────────────────────────────────
   ROOT
───────────────────────────────────────────────────────────── */
export default function Home() {
  const [pastHero,    setPastHero]    = useState(false);
  const [jarTipped,   setJarTipped]   = useState(false);
  /* flyCssReady: inject the ~15 KB per-fly path keyframes only after jar click */
  const [flyCssReady, setFlyCssReady] = useState(false);

  const heroRef     = useRef<HTMLDivElement>(null);
  /* heroInViewRef: skip RAF work when the hero has been scrolled off screen */
  const heroInViewRef = useRef(true);
  /* Firefly DOM refs — animation started and opacity set directly, no React re-renders */
  const ffRefs   = useRef<(HTMLDivElement | null)[]>([]);
  /* Cursor repulsion state per fly (persistent across ticks) */
  const repulRef = useRef(Array.from({ length: FIREFLY_COUNT }, () => ({ tx: 0, ty: 0 })));
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef   = useRef<number | undefined>(undefined);

  /* IntersectionObserver: navbar colour + skip RAF when hero off screen */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting);
        heroInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  /* Pre-release: flies are visible inside the jar from the first SSR paint
     (opacity inlined in JSX). Jar-relative positioning is handled by the
     --jar-x / --jar-yoff CSS vars on .ff-host, so the same coordinates work
     at every breakpoint — just kick off the blink + wander animations. */
  useLayoutEffect(() => {
    ffRefs.current.forEach((el, i) => {
      if (!el) return;
      const blinkDur   = (1.5 + _fr(i * 3.1) * 2).toFixed(1);
      const blinkDelay = (_fr(i * 4.7) * 2).toFixed(1);
      const wanderDur  = (3   + _fr(i * 8.9) * 3).toFixed(1);
      const wanderDel  = (_fr(i * 6.3) * 2).toFixed(1);
      el.style.animation = `ff-blink ${blinkDur}s ease-in-out ${blinkDelay}s infinite, ff-wander${i} ${wanderDur}s ease-in-out ${wanderDel}s infinite`;
    });
  }, []);

  /* Global cursor tracking */
  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* Cursor repulsion + hold-to-attract — thin RAF that nudges nearby flies via transform.
     CSS animations own left/top (wander path); transform is additive on top.
     After 15 s: normal cursor repulsion.
     Hold mousedown inside hero after 15 s: attraction mode — flies gather toward cursor.
     Mouseup anywhere: revert to repulsion. */
  useEffect(() => {
    if (!jarTipped) return;
    const REPEL_R = 90;    // repulsion radius px
    const REPEL_F = 55;    // peak repulsion force px
    const ATTR_R  = 260;   // attraction radius px — wide, gentle net
    const ATTR_F  = 2.0;   // max attraction displacement per frame (very soft)
    const repul = repulRef.current;

    /* earlyProtection: for 15 s after jar-tip, flies that are still hovering
       near the jar are immune to repulsion.  Flies that wander outside the jar
       radius lose protection immediately and can be repelled straight away.
       After 15 s the protection expires and every fly is fair game. */
    let earlyProtection    = true;
    let attractionUnlocked = false;
    let attractionActive   = false;
    const graceTimer = setTimeout(() => {
      earlyProtection    = false;
      attractionUnlocked = true;
    }, 15000);

    const heroEl = heroRef.current;
    const onMouseDown = () => { if (attractionUnlocked) attractionActive = true; };
    const onMouseUp   = () => { attractionActive = false; };
    if (heroEl) heroEl.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const tick = () => {
      const { x: mx, y: my } = mouseRef.current;

      if (attractionActive) {
        /* ── Attraction: each fly drifts lazily toward cursor + its unique offset ──
           Small force + high damping = terminal displacement ≈ 33 px → gentle float. */
        const rects = ffRefs.current.map(el =>
          el && el.style.opacity === '1' ? el.getBoundingClientRect() : null
        );
        for (let i = 0; i < FIREFLY_COUNT; i++) {
          const el = ffRefs.current[i];
          if (!el) continue;
          const rect = rects[i];
          if (rect) {
            const tgtX = mx + ATTR_OFFSETS[i].x;   // cursor + per-fly orbit offset
            const tgtY = my + ATTR_OFFSETS[i].y;
            const dx   = tgtX - (rect.left + 1);
            const dy   = tgtY - (rect.top  + 1);
            const d    = Math.hypot(dx, dy);
            if (d > 4 && d < ATTR_R) {
              // Ramp force up from 0 near target → max force at d≥80 px
              const str = Math.min(d / 80, 1) * ATTR_F;
              repul[i].tx += (dx / d) * str;
              repul[i].ty += (dy / d) * str;
            }
          }
          repul[i].tx *= 0.94;  // high damping → slow, dreamy motion
          repul[i].ty *= 0.94;
          // Clamp so flies stay within a reasonable cloud around cursor
          repul[i].tx = Math.max(-180, Math.min(180, repul[i].tx));
          repul[i].ty = Math.max(-180, Math.min(180, repul[i].ty));
          el.style.transform = `translate(${repul[i].tx.toFixed(1)}px,${repul[i].ty.toFixed(1)}px)`;
        }
      } else if (heroInViewRef.current) {
        /* ── Repulsion: push flies away from cursor (skip when hero off screen) ── */

        // Jar centre in screen coords — measure the visible jar (mobile + desktop differ)
        const jarEl = Array.from(document.querySelectorAll<HTMLElement>("[data-jar]"))
          .find(el => el.offsetParent !== null);
        const jarRect = jarEl?.getBoundingClientRect();
        const jarScrX = jarRect ? jarRect.left + jarRect.width / 2 : window.innerWidth * 0.60 + 40;
        const jarScrY = jarRect ? jarRect.bottom - 41
          : (heroRef.current?.getBoundingClientRect().bottom ?? 0) - 41; // body centre
        const JAR_R   = 110; // px — protection zone around the jar

        const rects = ffRefs.current.map(el =>
          el && el.style.opacity === '1' ? el.getBoundingClientRect() : null
        );
        for (let i = 0; i < FIREFLY_COUNT; i++) {
          const el = ffRefs.current[i];
          if (!el) continue;
          const rect = rects[i];

          // Grace period: flies still hovering near the jar are immune
          if (earlyProtection && rect) {
            const fdx = rect.left - jarScrX;
            const fdy = rect.top  - jarScrY;
            if (Math.hypot(fdx, fdy) < JAR_R) {
              repul[i].tx *= 0.86; repul[i].ty *= 0.86;
              continue;  // skip — fly is still inside jar zone
            }
          }

          if (rect) {
            const cx = rect.left + 1 - mx;
            const cy = rect.top  + 1 - my;
            const d  = Math.hypot(cx, cy);
            if (d < REPEL_R && d > 0.5) {
              const str = (1 - d / REPEL_R) * REPEL_F;
              repul[i].tx += (cx / d) * str;
              repul[i].ty += (cy / d) * str;
            }
          }
          repul[i].tx *= 0.86;
          repul[i].ty *= 0.86;
          if (Math.abs(repul[i].tx) > 0.5 || Math.abs(repul[i].ty) > 0.5) {
            el.style.transform = `translate(${repul[i].tx.toFixed(1)}px,${repul[i].ty.toFixed(1)}px)`;
          } else {
            repul[i].tx = 0; repul[i].ty = 0;
            el.style.transform = '';
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      clearTimeout(graceTimer);
      if (heroEl) heroEl.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [jarTipped]);

  /* Stagger fly reveals over ~4 s, starting each animation on release so
     the 0% keyframe (near the jar) is the genuine starting position. */
  const handleJarClick = () => {
    if (jarTipped) return;
    setFlyCssReady(true);  // inject deferred fly CSS immediately — animations need it
    setJarTipped(true);
    const order = Array.from({ length: FIREFLY_COUNT }, (_, i) => i)
      .sort(() => Math.random() - 0.5);
    order.forEach((flyIdx, seq) => {
      const ms = (seq / FIREFLY_COUNT) * 4000 + Math.random() * 200;
      setTimeout(() => {
        const el = ffRefs.current[flyIdx];
        if (!el) return;
        const a = FF_ANIM[flyIdx];
        // Kick off the CSS wander now — delay 0 so it starts from the jar keyframe
        el.style.animation =
          `ffx${flyIdx} ${a.xDur}s cubic-bezier(0.39,0,0.63,1) 0s infinite,` +
          `ffy${flyIdx} ${a.yDur}s cubic-bezier(0.39,0,0.63,1) 0s infinite,` +
          `ff-blink ${a.blinkDur}s ease-in-out ${a.blinkDelay}s infinite`;
        el.style.opacity = '1';
      }, ms);
    });
  };

  return (
    <>
      {/* Base keyframes: glow, slide-up, wander — needed from mount */}
      <style dangerouslySetInnerHTML={{ __html: FIREFLY_CSS_BASE }} />
      {/* Fly path keyframes: deferred until jar click to keep initial CSS lean */}
      {flyCssReady && <style dangerouslySetInnerHTML={{ __html: FIREFLY_CSS_FLY }} />}

      <Navbar light={pastHero} />

      {/* Hero + fireflies — position:absolute children scroll with the section.
           CSS handles all movement; JS only fades each fly in after jar click. */}
      <div ref={heroRef} className="ff-host" style={{ position: "relative" }}>
        <HeroSection onJarClick={handleJarClick} jarTipped={jarTipped} />
        {Array.from({ length: FIREFLY_COUNT }, (_, i) => {
          // Pre-compute jar position + per-fly glow opacity so the SSR HTML already
          // renders each fly inside the jar at full glow — visible the same frame as
          // the jar itself, before any JS runs.  useLayoutEffect hides them on mobile.
          const jxPx  = 19 + _fr(i * 2.1) * 42;
          const jyFB  = 15 + _fr(i * 3.3) * 52;
          const initOp = parseFloat((0.35 + _fr(i * 2.9) * 0.5).toFixed(2));
          return (
            <div key={i} aria-hidden
              ref={el => { ffRefs.current[i] = el; }}
              className="pointer-events-none"
              style={{
                position: "absolute",
                left: `calc(var(--jar-x, 60%) + ${jxPx.toFixed(1)}px)`,
                top:  `calc(100% - var(--jar-yoff, 0px) - ${jyFB.toFixed(1)}px)`,
                width: 3, height: 3,
                borderRadius: "50%",
                backgroundColor: "#e8c828",
                opacity: initOp,        // desktop: visible from first SSR paint; mobile: zeroed by useLayoutEffect
                willChange: "transform",
                /* Pre-click: z:30 — behind the jar glass (z:40); post-click: z:9999 — above everything */
                zIndex: jarTipped ? 9999 : 30,
              }}
            />
          );
        })}
      </div>
      <AboutSection />
      <ResumeSection />
      <WorkSection />
      <FooterSection />
    </>
  );
}
