"use client";
import React, { useState } from "react";

const AMBER = "#e8a020";

export function Carousel({
  children,
  cols = 2,
  dark = false,
}: {
  children: React.ReactNode;
  cols?: number;
  dark?: boolean;
}) {
  const cards = React.Children.toArray(children);
  const max = Math.max(0, cards.length - cols);
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);

  const go = (n: number) => {
    setFading(true);
    setTimeout(() => { setIdx(n); setFading(false); }, 120);
  };

  const divider = dark ? "rgba(255,255,255,0.07)" : "rgba(13,27,62,0.08)";

  const arrowStyle = (disabled: boolean): React.CSSProperties => ({
    width: 34, height: 34, borderRadius: "50%",
    border: `1px solid ${dark ? "rgba(255,255,255,0.14)" : "rgba(13,27,62,0.14)"}`,
    backgroundColor: "transparent",
    cursor: disabled ? "default" : "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: disabled
      ? (dark ? "rgba(255,255,255,0.14)" : "rgba(13,27,62,0.14)")
      : (dark ? "#fff" : "#0d1b3e"),
    fontSize: "0.85rem",
    transition: "opacity 0.15s",
  });

  return (
    <div>
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: "1px",
        backgroundColor: divider,
        opacity: fading ? 0 : 1,
        transition: "opacity 0.12s ease",
      }}>
        {cards.slice(idx, idx + cols)}
      </div>

      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", marginTop: "1.1rem",
      }}>
        {/* Pills */}
        <div style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
          {cards.map((_, i) => {
            const active = i >= idx && i < idx + cols;
            return (
              <button key={i} onClick={() => go(Math.min(i, max))}
                aria-label={`Card ${i + 1}`}
                style={{
                  width: active ? 18 : 5, height: 5, borderRadius: 3,
                  border: "none", cursor: "pointer", padding: 0,
                  backgroundColor: active
                    ? AMBER
                    : (dark ? "rgba(255,255,255,0.1)" : "rgba(13,27,62,0.1)"),
                  transition: "width 0.22s ease, background-color 0.15s",
                }}
              />
            );
          })}
        </div>
        {/* Arrows */}
        <div style={{ display: "flex", gap: "0.4rem" }}>
          <button onClick={() => go(Math.max(0, idx - 1))} disabled={idx === 0}
            aria-label="Previous" style={arrowStyle(idx === 0)}>‹</button>
          <button onClick={() => go(Math.min(max, idx + 1))} disabled={idx >= max}
            aria-label="Next" style={arrowStyle(idx >= max)}>›</button>
        </div>
      </div>
    </div>
  );
}
