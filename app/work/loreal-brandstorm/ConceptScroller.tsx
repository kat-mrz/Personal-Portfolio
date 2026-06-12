"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import Image from "next/image";

const AMBER = "#e8a020";

const STAGES = [
  { src: "/dualite-accord-venn.avif", numeral: "I", label: "The Signature Accord" },
  { src: "/dualite-scent-jeune-elan.avif", numeral: "II", label: "Jeune Élan" },
  { src: "/dualite-scent-balcon-velours.avif", numeral: "III", label: "Balcon en Velours" },
  { src: "/dualite-scent-nouvelle-soie.avif", numeral: "IV", label: "Nouvelle Soie" },
];

export function ConceptScroller({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setStage(Math.min(STAGES.length - 1, Math.floor(progress * STAGES.length)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToStage = (i: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const top = wrap.getBoundingClientRect().top + window.scrollY;
    const scrollable = wrap.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + scrollable * ((i + 0.5) / STAGES.length), behavior: "smooth" });
  };

  return (
    <div ref={wrapRef} style={{ height: `${STAGES.length * 90}vh` }}>
      <div className="lb-cols-2" style={{
        position: "sticky", top: 0, height: "100vh",
        display: "grid",
        gap: "clamp(2rem, 6vw, 8rem)", alignItems: "center", alignContent: "center",
      }}>
        {children}

        <div>
          {/* Media — stages stacked, crossfading as the page scrolls */}
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/10" }}>
            <div style={{
              position: "absolute", inset: "-12%",
              background: "radial-gradient(ellipse at 50% 50%, rgba(232,160,32,0.13) 0%, rgba(232,160,32,0.05) 45%, transparent 70%)",
              filter: "blur(26px)", pointerEvents: "none",
            }} />
            {STAGES.map((s, i) => (
              <Image
                key={s.src}
                src={s.src}
                alt={s.label}
                fill
                unoptimized
                style={{
                  objectFit: "contain",
                  opacity: i === stage ? 1 : 0,
                  transform: i === stage ? "translateY(0) scale(1)" : "translateY(20px) scale(0.965)",
                  transition: "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                  filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.4))",
                }}
              />
            ))}
          </div>

          {/* Stage rail */}
          <div style={{
            display: "flex", justifyContent: "center", gap: "clamp(1.25rem, 2.5vw, 2.5rem)",
            paddingTop: "2rem",
          }}>
            {STAGES.map((s, i) => (
              <button
                key={s.numeral}
                onClick={() => scrollToStage(i)}
                aria-label={`Go to ${s.label}`}
                style={{
                  background: "none", border: "none", padding: 0, cursor: "pointer",
                  display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "0.45rem",
                }}
              >
                <span style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "0.85rem", letterSpacing: "0.1em",
                  color: i === stage ? AMBER : "rgba(255,255,255,0.25)",
                  transition: "color 0.4s ease",
                }}>{s.numeral}</span>
                <span style={{
                  width: i === stage ? 26 : 12, height: 1,
                  backgroundColor: i === stage ? AMBER : "rgba(255,255,255,0.15)",
                  transition: "all 0.4s ease",
                }} />
              </button>
            ))}
          </div>

          {/* Stage label */}
          <p key={stage} style={{
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase" as const, color: AMBER,
            textAlign: "center" as const, marginTop: "1.1rem", marginBottom: 0,
            animation: "concept-label-in 0.5s ease both",
          }}>
            {STAGES[stage].label}
          </p>
          <style>{`@keyframes concept-label-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
      </div>
    </div>
  );
}
