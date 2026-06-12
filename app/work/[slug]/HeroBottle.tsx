"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

/*
  objectFit "cover" fills the container by height so the bottle renders at full
  section height. Only the transparent left/right PNG margins are cropped.

  Filter is defined in a CSS class (.hero-bottle-img) so the two edge-trace
  drop-shadows can reference the --hero-hover CSS variable (set by HeroGlow) and
  transition smoothly via `transition: filter`. Inline style transitions don't
  react to CSS variable changes; a stylesheet rule does.

  Uses a DOM ref instead of useState so scroll events write directly to the
  element's style without triggering any React re-render.
*/
export function HeroBottle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<ReturnType<typeof requestAnimationFrame>>(0);
  const aliveRef     = useRef(false);

  useEffect(() => {
    aliveRef.current = true;
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!aliveRef.current || !containerRef.current) return;
        const sy = window.scrollY;
        containerRef.current.style.transform = `translateY(${(-sy * 0.45).toFixed(1)}px)`;
        containerRef.current.style.opacity   = Math.max(0, 1 - sy / 900).toFixed(3);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      aliveRef.current = false;
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Scoped CSS: filter with CSS-variable-driven white edge glow + transition */}
      <style>{`
        .hero-bottle-img {
          object-fit: cover;
          object-position: center center;
          transform: scale(0.95);
          filter:
            drop-shadow(0 0  60px rgba(232,160,32,0.55))
            drop-shadow(0 0 140px rgba(232,160,32,0.30))
            drop-shadow(0 0 300px rgba(110,80,220,0.18));
        }
        /* Narrow screens: the text column spans the full width, so push the
           bottle toward the edge and dim it to a backdrop */
        @media (max-width: 880px) {
          .hero-bottle-wrap { width: 78% !important; right: -32% !important; }
          .hero-bottle-img  { opacity: 0.45; }
        }
      `}</style>

      <div
        ref={containerRef}
        className="hero-bottle-wrap"
        aria-hidden
        style={{
          position: "absolute",
          right: "-4%",
          top: "3vh",
          bottom: "-5vh",
          width: "50%",
          transform: "translateY(0px)",
          opacity: 1,
          pointerEvents: "none",
          zIndex: 0,
          willChange: "transform, opacity",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 10%, black 26%, black 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 10%, black 26%, black 100%)",
        }}
      >
        <Image
          src="/dualite-bottle-transparent.avif"
          alt=""
          fill
          sizes="50vw"
          priority
          className="hero-bottle-img"
        />
      </div>
    </>
  );
}
