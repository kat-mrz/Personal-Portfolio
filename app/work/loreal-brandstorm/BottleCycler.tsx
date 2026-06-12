"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const BOTTLES = [
  { src: "/dualite-bottle-0.avif", label: "Original Dualité" },
  { src: "/dualite-bottle-1.avif", label: "After 1st Refill" },
  { src: "/dualite-bottle-2.avif", label: "After 2nd Refill" },
];

const T_AMBER = "#e8a020";

export function BottleCycler() {
  const [idx, setIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const bottleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bottleRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.parentElement!.getBoundingClientRect();
      // -1 when section bottom enters viewport, +1 when top leaves
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / (window.innerHeight / 2 + rect.height / 2);
      el.style.transform = `translateY(${(-progress * 34).toFixed(1)}px)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const next = () => setIdx((i) => (i + 1) % BOTTLES.length);
  const prev = () => setIdx((i) => (i - 1 + BOTTLES.length) % BOTTLES.length);
  const goTo = (i: number) => setIdx(i);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 30) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div
      onClick={next}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        cursor: "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
        position: "relative",
      }}
      title="Click to see next refill stage"
    >
      {/* Amber glow behind the bottle */}
      <div style={{
        position: "absolute",
        top: "18%", left: "8%", right: "8%", bottom: "2%",
        background: "radial-gradient(ellipse at 50% 60%, rgba(232,160,32,0.22) 0%, rgba(232,160,32,0.08) 45%, transparent 72%)",
        filter: "blur(24px)",
        pointerEvents: "none",
      }} />

      {/* Bottle — all states stacked, crossfading in place */}
      <div ref={bottleRef} style={{
        position: "relative", aspectRatio: "430/861",
        width: "min(100%, clamp(240px, 24vw, 330px))",
        marginLeft: "auto", marginRight: "auto",
        marginTop: "-2.5rem",
        willChange: "transform",
      }}>
        {BOTTLES.map((b, i) => (
          <Image
            key={b.src}
            src={b.src}
            alt={b.label}
            fill
            unoptimized
            style={{
              objectFit: "contain",
              opacity: i === idx ? 1 : 0,
              transform: i === idx ? "scale(1)" : "scale(0.985)",
              transition: "opacity 0.55s ease, transform 0.55s ease",
              filter: "drop-shadow(0 18px 36px rgba(0,0,0,0.45))",
            }}
          />
        ))}
      </div>

      {/* Label + dots */}
      <div style={{
        display: "flex", flexDirection: "column" as const, alignItems: "center",
        gap: "0.7rem", paddingTop: "1.4rem",
      }}>
        <span style={{
          fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em",
          textTransform: "uppercase" as const, color: T_AMBER,
        }}>
          {BOTTLES[idx].label}
        </span>

        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
          {BOTTLES.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i); }}
              aria-label={`Show ${BOTTLES[i].label}`}
              style={{
                width: i === idx ? 16 : 6,
                height: 6,
                borderRadius: 999,
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: i === idx ? T_AMBER : "rgba(232,160,32,0.25)",
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
