"use client";
import React, { useState } from "react";
import Image from "next/image";

const AMBER = "#e8a020";

const SLIDES = [
  {
    src:     "/dualite-signature-accord.avif",
    caption: "Shared Signature Accord: the olfactory thread tying both formulas together",
  },
  {
    src:     "/dualite-core-product-line.avif",
    caption: "Light Formula ↔ Dark Formula: same bottle, different mood",
  },
];

export function ConceptSlideshow() {
  const [active, setActive] = useState(0);

  const go = (dir: 1 | -1) =>
    setActive(prev => (prev + dir + SLIDES.length) % SLIDES.length);

  return (
    <div style={{ display: "flex", flexDirection: "column", userSelect: "none" }}>

      {/* Label */}
      <p style={{
        fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em",
        textTransform: "uppercase" as const, color: "rgba(255,255,255,0.28)",
        marginBottom: "0.75rem",
      }}>Fragrance Architecture</p>

      {/* Image area — fixed aspect ratio, crossfade between slides */}
      <div style={{
        position: "relative", aspectRatio: "900 / 560",
        borderRadius: "3px 3px 0 0", overflow: "hidden",
        backgroundColor: "rgba(255,255,255,0.04)",
      }}>
        {SLIDES.map((s, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            opacity: active === i ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}>
            <Image
              src={s.src}
              alt={s.caption}
              fill
              sizes="50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      {/* Caption bar + controls */}
      <div style={{
        backgroundColor: "rgba(232,160,32,0.06)",
        border: "1px solid rgba(232,160,32,0.15)", borderTop: "none",
        borderRadius: "0 0 3px 3px",
        padding: "0.65rem 0.85rem",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
        minHeight: "2.5rem",
      }}>
        <p style={{
          fontSize: "0.65rem", color: AMBER, letterSpacing: "0.1em",
          margin: 0, lineHeight: 1.5, flex: 1,
          transition: "opacity 0.3s ease",
        }}>
          {SLIDES[active].caption}
        </p>

        {/* Dot indicators */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0 }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: 6, height: 6, borderRadius: "50%", border: "none",
                cursor: "pointer", padding: 0,
                backgroundColor: active === i ? AMBER : "rgba(232,160,32,0.25)",
                transition: "background-color 0.25s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Prev / Next */}
      <div style={{
        display: "flex", justifyContent: "flex-end", gap: "0.4rem", marginTop: "0.6rem",
      }}>
        {(["←", "→"] as const).map((arrow, di) => (
          <button
            key={arrow}
            onClick={() => go(di === 0 ? -1 : 1)}
            aria-label={di === 0 ? "Previous slide" : "Next slide"}
            style={{
              background: "rgba(232,160,32,0.08)",
              border: "1px solid rgba(232,160,32,0.2)",
              color: "rgba(232,160,32,0.7)", borderRadius: 2,
              width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontSize: "0.9rem",
              transition: "background-color 0.2s ease",
            }}
          >
            {arrow}
          </button>
        ))}
      </div>
    </div>
  );
}
