"use client";
import { useState } from "react";

/*
  Hover detection zone matches the bottle's actual on-screen position.

  Bottle container: right: -4%, width: 50%
  → visible portion on screen: right 0..46% of viewport (left edge at ~54%)
  → hover zone: right: 0, width: 46%

  The gradient overlay covers the full hero width so the ambient glow
  reads naturally, but fades to transparent at the bottom (maskImage)
  to eliminate the visible cutoff on scroll.

  Intensity is kept low — opacity 0.55 max, glow centred high so it
  doesn't pool at section edges.
*/
export function HeroGlow() {
  const [hovered, setHovered] = useState(false);

  const handleEnter = () => {
    setHovered(true);
    document.documentElement.style.setProperty("--hero-hover", "1");
  };
  const handleLeave = () => {
    setHovered(false);
    document.documentElement.style.setProperty("--hero-hover", "0");
  };

  return (
    <div
      aria-hidden
      style={{
        position: "absolute", inset: 0,
        pointerEvents: "none", zIndex: 0,
        /* fade to transparent in the bottom 25% — kills the hard cutoff */
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
        maskImage:        "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)",
      }}
    >
      {/* Hitbox — matches bottle's visible area (right 46% of viewport) */}
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          position: "absolute",
          right: 0, top: 0, bottom: 0,
          width: "46%",
          pointerEvents: "auto",
        }}
      />

      {/* Purple bloom */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 60% 55% at 76% 38%, rgba(75,55,185,0.22) 0%, transparent 60%)",
        opacity: hovered ? 0.55 : 0,
        transition: "opacity 0.7s ease",
        pointerEvents: "none",
      }} />
    </div>
  );
}
