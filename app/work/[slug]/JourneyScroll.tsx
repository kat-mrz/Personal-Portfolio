"use client";
import React, { useEffect, useRef, useState } from "react";

const AMBER = "#e8a020";
const SERIF = "var(--font-playfair), Georgia, serif";

export interface JourneyStage {
  stage: string;
  icon:  string;
  goal:  string;
  touch: string;
  biz:   string;
}

const WY = [9, 25, 41, 57, 73, 90];
const CARD_EDGE = { left: 43, right: 57 };
const PATH_D = "M 50 0 L 50 100";

export function JourneyScroll({ stages }: { stages: JourneyStage[] }) {
  const wrapRef      = useRef<HTMLDivElement>(null);
  const svgPathRef   = useRef<SVGPathElement>(null);
  const sectionRef   = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const dotRef       = useRef<HTMLDivElement>(null);
  const diamondRefs  = useRef<(HTMLDivElement | null)[]>([]);

  /* Per-card visibility — driven by IntersectionObserver, OK as state */
  const [cardVisible, setCardVisible] = useState<boolean[]>(() =>
    new Array(stages.length).fill(false)
  );
  const [hovered, setHovered] = useState<number>(-1);

  /* Per-card IntersectionObserver — cards fade in near center, fade out when leaving */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          setCardVisible(prev => {
            if (prev[i] === entry.isIntersecting) return prev;
            const next = [...prev];
            next[i] = entry.isIntersecting;
            return next;
          });
        },
        { threshold: 0.1, rootMargin: "-18% 0px -18% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(obs => obs.disconnect());
  }, [stages.length]);

  /* All scroll-driven visuals via direct DOM — no React state, no re-renders */
  useEffect(() => {
    const svgP = svgPathRef.current;
    const wrap = wrapRef.current;
    const dot  = dotRef.current;
    if (!svgP || !wrap || !dot) return;

    const pathLen = svgP.getTotalLength();

    /* Initialise SVG dash */
    svgP.setAttribute("stroke-dasharray",  String(pathLen));
    svgP.setAttribute("stroke-dashoffset", String(pathLen));

    const onScroll = () => {
      const { top, height } = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress  = Math.max(0, Math.min(1, (vh - top) / (height + vh * 0.35)));
      const drawnFrac = Math.min(progress * 1.2, 1);

      /* Draw path */
      svgP.setAttribute("stroke-dashoffset", String(pathLen * (1 - drawnFrac)));

      /* Glowing dot at viewport centre intersection */
      const centerFrac = Math.max(0, Math.min(1, (vh * 0.5 - top) / height));
      const activeFrac = (centerFrac > 0 && centerFrac <= drawnFrac)
        ? centerFrac
        : drawnFrac;

      if (activeFrac > 0) {
        const pt = svgP.getPointAtLength(activeFrac * pathLen);
        dot.style.left    = `${pt.x}%`;
        dot.style.top     = `${pt.y}%`;
        dot.style.opacity = "1";
      } else {
        dot.style.opacity = "0";
      }

      /* Waypoint diamonds — light up as path draws past each one */
      const tipY = drawnFrac * 100;
      diamondRefs.current.forEach((d, i) => {
        if (!d) return;
        const active = tipY >= WY[i] - 4;
        d.style.backgroundColor = active ? AMBER : "rgba(8,15,28,1)";
        d.style.borderColor     = active ? AMBER : "rgba(232,160,32,0.35)";
        d.style.boxShadow       = active ? "0 0 14px 3px rgba(232,160,32,0.45)" : "none";
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={sectionRef} style={{ position: "relative" }}>
      {/* Narrow screens: cards span the full width, so the centre spine
          (path, diamonds, dot) would cut through card text — hide it */}
      <style>{`
        @media (max-width: 880px) {
          .js-spine { display: none; }
          .js-card  { width: 100% !important; }
        }
      `}</style>
      <div ref={wrapRef} style={{ position: "relative" }}>

        {/* SVG path */}
        <svg
          className="js-spine"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            pointerEvents: "none", overflow: "visible",
          }}
        >
          <defs>
            <filter id="jglow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <path d={PATH_D} fill="none" stroke="rgba(232,160,32,0.1)" strokeWidth="1.5"
            vectorEffect="non-scaling-stroke" />
          {WY.map((y, i) => {
            const isLeft = i % 2 === 0;
            const x0 = isLeft ? CARD_EDGE.left : 50;
            const x1 = isLeft ? 50 : CARD_EDGE.right;
            return (
              <line key={i} x1={x0} y1={y} x2={x1} y2={y}
                stroke="rgba(232,160,32,0.1)" strokeWidth="1.5"
                vectorEffect="non-scaling-stroke" />
            );
          })}

          <path
            ref={svgPathRef}
            d={PATH_D} fill="none"
            stroke={AMBER} strokeWidth="2" strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            filter="url(#jglow)"
            style={{ transition: "stroke-dashoffset 0.06s linear" }}
          />
        </svg>

        {/* Traveling glow dot — all positioning via ref, zero React state */}
        <div ref={dotRef} className="js-spine" aria-hidden style={{
          position: "absolute",
          left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          width: 10, height: 10, borderRadius: "50%",
          backgroundColor: AMBER,
          boxShadow: "0 0 0 3px rgba(232,160,32,0.25), 0 0 18px 6px rgba(232,160,32,0.55), 0 0 40px 12px rgba(232,160,32,0.2)",
          zIndex: 4, pointerEvents: "none",
          /* opacity intentionally omitted — scroll handler sets it */
        }} />

        {/* Waypoint diamonds */}
        {WY.map((y, i) => (
          <div
            key={i}
            ref={(el) => { diamondRefs.current[i] = el; }}
            className="js-spine"
            aria-hidden
            style={{
              position: "absolute",
              left: "50%", top: `${y}%`,
              transform: "translate(-50%, -50%) rotate(45deg)",
              width: 8, height: 8, borderRadius: 1,
              backgroundColor: "rgba(8,15,28,1)",
              border: "1px solid rgba(232,160,32,0.35)",
              transition: "background-color 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease",
              zIndex: 3, pointerEvents: "none",
            }}
          />
        ))}

        {/* Stage cards */}
        {stages.map((s, i) => {
          const isLeft = i % 2 === 0;
          const step   = String(i + 1).padStart(2, "0");

          return (
            <div
              key={s.stage}
              style={{
                display: "flex",
                justifyContent: isLeft ? "flex-start" : "flex-end",
                padding: "clamp(0.9rem, 2vw, 1.6rem) 0",
                position: "relative",
              }}
            >
              <div
                ref={(el) => { cardRefs.current[i] = el; }}
                className="js-card"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(-1)}
                style={{
                  width: "clamp(280px, 43%, 520px)",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 4,
                  background: `linear-gradient(${isLeft ? "200deg" : "160deg"}, rgba(232,160,32,0.08) 0%, rgba(232,160,32,0.025) 45%, rgba(255,255,255,0.015) 100%)`,
                  border: `1px solid ${hovered === i ? "rgba(232,160,32,0.4)" : "rgba(255,255,255,0.08)"}`,
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  boxShadow: hovered === i
                    ? "0 16px 44px rgba(0,0,0,0.4), 0 0 28px rgba(232,160,32,0.12)"
                    : "0 8px 28px rgba(0,0,0,0.25)",
                  padding: "2rem 2.25rem",
                  opacity: cardVisible[i] ? 1 : 0,
                  transform: cardVisible[i]
                    ? (hovered === i ? "translateY(-4px)" : "none")
                    : `translateX(${isLeft ? "-2.5rem" : "2.5rem"}) scale(0.97)`,
                  transition: "opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1), transform 0.75s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease, box-shadow 0.35s ease",
                }}>

                {/* Step watermark */}
                <div aria-hidden style={{
                  position: "absolute",
                  bottom: "-1.4rem",
                  [isLeft ? "right" : "left"]: "-0.3rem",
                  fontFamily: SERIF, fontSize: "7rem", fontWeight: 400,
                  fontStyle: "italic" as const,
                  lineHeight: 1, userSelect: "none", pointerEvents: "none",
                  color: "rgba(232,160,32,0.07)",
                }}>{i + 1}</div>

                {/* Header */}
                <div style={{
                  display: "flex", alignItems: "baseline",
                  justifyContent: "space-between",
                  marginBottom: "1.25rem",
                }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.85rem" }}>
                    <span style={{
                      fontFamily: SERIF, fontStyle: "italic" as const,
                      fontSize: "1.05rem", color: AMBER, lineHeight: 1,
                    }}>{i + 1}</span>
                    <p style={{
                      fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.18em",
                      textTransform: "uppercase" as const, color: AMBER, margin: 0,
                    }}>{s.stage}</p>
                  </div>
                  <span style={{
                    fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
                    color: "rgba(232,160,32,0.4)",
                  }}>{step} / {String(stages.length).padStart(2, "0")}</span>
                </div>

                <div style={{
                  width: "100%", height: 1,
                  background: `linear-gradient(to ${isLeft ? "left" : "right"}, rgba(232,160,32,0.4), rgba(255,255,255,0.05))`,
                  marginBottom: "1.25rem",
                }} />

                {([
                  ["Goal",       s.goal],
                  ["Touchpoint", s.touch],
                  ["Business",   s.biz],
                ] as [string, string][]).map(([k, v]) => (
                  <div key={k} style={{ marginBottom: "0.85rem" }}>
                    <p style={{
                      fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.13em",
                      textTransform: "uppercase" as const,
                      color: "rgba(255,255,255,0.38)", marginBottom: "0.25rem",
                    }}>{k}</p>
                    <p style={{
                      fontSize: "clamp(0.9rem, 0.95vw, 1rem)",
                      color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0,
                    }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
