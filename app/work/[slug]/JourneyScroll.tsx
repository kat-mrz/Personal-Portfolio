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
  const wrapRef    = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  const [pathLen,    setPathLen]    = useState(9999);
  const [dashOffset, setDashOffset] = useState(9999);
  const [tipPct,     setTipPct]     = useState<{ x: number; y: number } | null>(null);

  /* Per-card visibility — each card animates in as you scroll to it */
  const [cardVisible, setCardVisible] = useState<boolean[]>(() =>
    new Array(stages.length).fill(false)
  );

  /* Measure path once mounted */
  useEffect(() => {
    const p = svgPathRef.current;
    if (!p) return;
    const len = p.getTotalLength();
    setPathLen(len);
    setDashOffset(len);
  }, []);

  /* Per-card IntersectionObserver — triggers each card individually */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCardVisible(prev => {
              if (prev[i]) return prev;
              const next = [...prev];
              next[i] = true;
              return next;
            });
            obs.disconnect();
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(obs => obs.disconnect());
  }, [stages.length]);

  /* Section-level fallback — if cards haven't triggered (fast scroll / small viewport),
     force all visible after a short delay once the section is in view */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => {
            setCardVisible(new Array(stages.length).fill(true));
          }, 1200);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => { obs.disconnect(); clearTimeout(timer); };
  }, [stages.length]);

  /* Scroll → draw path + update traveling-dot position */
  useEffect(() => {
    if (pathLen === 9999) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const onScroll = () => {
      const { top, height } = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - top) / (height + vh * 0.35)));
      const drawnFrac = Math.min(progress * 1.2, 1);

      setDashOffset(pathLen * (1 - drawnFrac));

      const svgP = svgPathRef.current;
      if (svgP && drawnFrac > 0) {
        const pt = svgP.getPointAtLength(drawnFrac * pathLen);
        setTipPct({ x: pt.x, y: pt.y });
      } else {
        setTipPct(null);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathLen]);

  /* Active dot */
  const [activeDot, setActiveDot] = useState<number>(-1);
  useEffect(() => {
    if (!tipPct) { setActiveDot(-1); return; }
    const closest = WY.reduce((best, wy, i) =>
      Math.abs(wy - tipPct.y) < Math.abs(WY[best] - tipPct.y) ? i : best, 0);
    setActiveDot(tipPct.y > WY[closest] - 8 ? closest : -1);
  }, [tipPct]);

  return (
    <div ref={sectionRef} style={{ position: "relative" }}>
      <div ref={wrapRef} style={{ position: "relative" }}>

        {/* SVG path */}
        <svg
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
            strokeDasharray={pathLen} strokeDashoffset={dashOffset}
            vectorEffect="non-scaling-stroke"
            filter="url(#jglow)"
            style={{ transition: "stroke-dashoffset 0.06s linear" }}
          />
        </svg>

        {/* Traveling dot */}
        {tipPct && (
          <div aria-hidden style={{
            position: "absolute",
            left: `${tipPct.x}%`, top: `${tipPct.y}%`,
            transform: "translate(-50%, -50%)",
            width: 12, height: 12, borderRadius: "50%",
            backgroundColor: AMBER,
            boxShadow: `0 0 0 3px rgba(232,160,32,0.25), 0 0 16px 6px rgba(232,160,32,0.55)`,
            zIndex: 4, pointerEvents: "none",
          }} />
        )}

        {/* Waypoint dots */}
        {WY.map((y, i) => {
          const active = activeDot >= i;
          return (
            <div key={i} aria-hidden style={{
              position: "absolute",
              left: `50%`, top: `${y}%`,
              transform: "translate(-50%, -50%)",
              width: 10, height: 10, borderRadius: "50%",
              backgroundColor: active ? AMBER : "rgba(232,160,32,0.12)",
              border: `2px solid ${active ? AMBER : "rgba(232,160,32,0.2)"}`,
              boxShadow: active ? `0 0 12px 4px rgba(232,160,32,0.5)` : "none",
              transition: "background-color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
              zIndex: 3, pointerEvents: "none",
            }} />
          );
        })}

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
                style={{
                  width: "clamp(280px, 43%, 520px)",
                  position: "relative",
                  overflow: "hidden",
                  backgroundColor: "rgba(232,160,32,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRight: isLeft  ? `2px solid ${AMBER}` : "1px solid rgba(255,255,255,0.07)",
                  borderLeft:  !isLeft ? `2px solid ${AMBER}` : "1px solid rgba(255,255,255,0.07)",
                  padding: "1.75rem 2rem",
                  opacity: cardVisible[i] ? 1 : 0,
                  transform: cardVisible[i]
                    ? "none"
                    : `translateX(${isLeft ? "-2.5rem" : "2.5rem"})`,
                  transition: `opacity 0.6s ease, transform 0.6s ease`,
                }}>

                {/* Step watermark */}
                <div aria-hidden style={{
                  position: "absolute",
                  bottom: "-0.75rem",
                  [isLeft ? "right" : "left"]: "-0.4rem",
                  fontFamily: SERIF, fontSize: "6rem", fontWeight: 400,
                  lineHeight: 1, userSelect: "none", pointerEvents: "none",
                  color: "rgba(232,160,32,0.06)",
                }}>{step}</div>

                {/* Header */}
                <div style={{
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.25rem",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                    <span style={{ fontSize: "1.15rem", color: AMBER, lineHeight: 1 }}>{s.icon}</span>
                    <p style={{
                      fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.16em",
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
                  backgroundColor: "rgba(255,255,255,0.06)",
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
