"use client";
import { useState } from "react";

const LIME  = "#C5E84A";
const INK   = "#080f1c";
const AMBER = "#e8a020";
const MID   = "#0d1b3e";
const MUTED = "#374151";

const MEAL = { name: "Chicken Quesadilla", baseCal: 520, baseProt: 38 };

export function ServingDemo() {
  const [mult, setMult] = useState(1);

  const cal   = Math.round(MEAL.baseCal  * mult);
  const prot  = Math.round(MEAL.baseProt * mult);
  const ratio = ((prot / cal) * 100).toFixed(1);
  const pct   = (((mult - 0.5) / 2.5) * 100).toFixed(1);

  return (
    <div style={{
      backgroundColor: "#fff",
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "0 4px 24px rgba(13,27,62,0.14)",
      fontFamily: "var(--font-inter), sans-serif",
    }}>
      {/* Top bar */}
      <div style={{
        backgroundColor: INK,
        padding: "0.85rem 1.25rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.82rem" }}>Adjust Serving</p>
        <span style={{
          backgroundColor: "rgba(197,232,74,0.18)", color: LIME,
          fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em",
          padding: "0.2rem 0.65rem", borderRadius: 999, textTransform: "uppercase",
        }}>live demo</span>
      </div>

      {/* Meal name row */}
      <div style={{ padding: "1.1rem 1.25rem 0.5rem", borderBottom: "1px solid #f0f0f0" }}>
        <p style={{ fontSize: "0.95rem", fontWeight: 700, color: MID }}>{MEAL.name}</p>
        <p style={{ fontSize: "0.7rem", color: MUTED, marginTop: "0.15rem" }}>
          Base: {MEAL.baseCal} kcal · {MEAL.baseProt}g protein
        </p>
      </div>

      {/* Slider */}
      <div style={{ padding: "1rem 1.25rem" }}>
        <style>{`
          .pb-slider {
            -webkit-appearance: none; appearance: none;
            width: 100%; height: 5px; border-radius: 999px;
            background: linear-gradient(to right,
              ${LIME} 0%, ${LIME} ${pct}%,
              #e2e8f0 ${pct}%, #e2e8f0 100%);
            outline: none; cursor: pointer;
          }
          .pb-slider::-webkit-slider-thumb {
            -webkit-appearance: none; appearance: none;
            width: 22px; height: 22px; border-radius: 50%;
            background: ${INK}; border: 3px solid ${LIME}; cursor: pointer;
          }
          .pb-slider::-moz-range-thumb {
            width: 22px; height: 22px; border-radius: 50%;
            background: ${INK}; border: 3px solid ${LIME}; cursor: pointer;
          }
        `}</style>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
          <span style={{ fontSize: "0.62rem", color: MUTED }}>0.5×</span>
          <span style={{
            fontSize: "0.88rem", fontWeight: 800, color: MID,
            fontVariantNumeric: "tabular-nums",
          }}>
            {mult % 1 === 0 ? `${mult}.0×` : `${mult}×`} serving
          </span>
          <span style={{ fontSize: "0.62rem", color: MUTED }}>3×</span>
        </div>
        <input
          type="range"
          className="pb-slider"
          min={0.5} max={3} step={0.25}
          value={mult}
          onChange={e => setMult(Number(e.target.value))}
        />
      </div>

      {/* Live macro tiles */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
        gap: 1, backgroundColor: "#e2e8f0",
        margin: "0 1.25rem 1.25rem",
        borderRadius: 10, overflow: "hidden",
      }}>
        {[
          { label: "Calories", value: cal,   unit: "kcal", accent: false },
          { label: "Protein",  value: prot,  unit: "g",    accent: true  },
          { label: "P/C",      value: ratio, unit: "%",    accent: false },
        ].map(({ label, value, unit, accent }) => (
          <div key={label} style={{
            backgroundColor: "#fff",
            padding: "0.85rem 0.5rem",
            textAlign: "center" as const,
          }}>
            <p style={{
              fontSize: "1.25rem", fontWeight: 800, lineHeight: 1,
              color: accent ? INK : MID,
              marginBottom: "0.25rem",
              fontVariantNumeric: "tabular-nums",
            }}>
              {accent && (
                <span style={{
                  display: "inline-block",
                  backgroundColor: LIME,
                  color: INK,
                  borderRadius: 6,
                  padding: "0 0.35rem",
                }}>{value}</span>
              )}
              {!accent && value}
            </p>
            <p style={{
              fontSize: "0.52rem", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase" as const,
              color: MUTED,
            }}>{unit} · {label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
