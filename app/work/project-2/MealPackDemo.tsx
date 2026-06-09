"use client";
import { useState } from "react";

const AMBER  = "#e8a020";
const INK    = "#080f1c";
const LIME   = "#C5E84A";
const MID    = "#0d1b3e";

const PACK = {
  name: "Lean Bulk Pack",
  goal: "High protein · 2800 kcal target",
  author: "by @katrina",
  meals: [
    { name: "Overnight Oats",         cal: 380, prot: 28 },
    { name: "Chicken Rice Bowl",      cal: 610, prot: 52 },
    { name: "Greek Yogurt & Berries", cal: 220, prot: 18 },
    { name: "Protein Smoothie",       cal: 295, prot: 36 },
    { name: "Salmon + Veg",           cal: 480, prot: 44 },
  ],
};

type Phase = "idle" | "importing" | "done";

export function MealPackDemo() {
  const [phase, setPhase]   = useState<Phase>("idle");
  const [ticked, setTicked] = useState<number[]>([]);

  const startImport = () => {
    if (phase !== "idle") { setPhase("idle"); setTicked([]); return; }
    setPhase("importing");
    PACK.meals.forEach((_, i) => {
      setTimeout(() => {
        setTicked(prev => [...prev, i]);
        if (i === PACK.meals.length - 1) {
          setTimeout(() => setPhase("done"), 320);
        }
      }, i * 200 + 80);
    });
  };

  const isDone = phase === "done";

  return (
    <div style={{
      borderRadius: 14, overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.08)",
      fontFamily: "var(--font-inter), sans-serif",
      boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
    }}>
      {/* Pack header */}
      <div style={{
        backgroundColor: "rgba(232,160,32,0.1)",
        borderBottom: "1px solid rgba(232,160,32,0.2)",
        padding: "1.1rem 1.4rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.88rem", marginBottom: "0.15rem" }}>
            {PACK.name}
          </p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem" }}>{PACK.goal}</p>
        </div>
        <span style={{
          fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em",
          color: AMBER, backgroundColor: "rgba(232,160,32,0.12)",
          padding: "0.2rem 0.7rem", borderRadius: 999, textTransform: "uppercase" as const,
        }}>
          {PACK.meals.length} meals
        </span>
      </div>

      {/* Meal list */}
      {PACK.meals.map((meal, i) => (
        <div key={meal.name} style={{
          backgroundColor: ticked.includes(i) ? "rgba(197,232,74,0.06)" : "rgba(255,255,255,0.02)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          padding: "0.75rem 1.4rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          transition: "background 0.25s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* tick circle */}
            <div style={{
              width: 18, height: 18, borderRadius: "50%",
              border: `1.5px solid ${ticked.includes(i) ? LIME : "rgba(255,255,255,0.18)"}`,
              backgroundColor: ticked.includes(i) ? LIME : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.2s ease",
            }}>
              {ticked.includes(i) && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path d="M1 3.5L3.5 6L8 1" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <p style={{ fontSize: "0.82rem", color: ticked.includes(i) ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)", fontWeight: 500, transition: "color 0.2s" }}>
              {meal.name}
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)" }}>{meal.cal} kcal</span>
            <span style={{ fontSize: "0.6rem", color: ticked.includes(i) ? LIME : "rgba(255,255,255,0.25)" }}>· {meal.prot}g</span>
          </div>
        </div>
      ))}

      {/* CTA */}
      <div style={{
        padding: "1rem 1.4rem",
        backgroundColor: "rgba(255,255,255,0.02)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
      }}>
        {isDone ? (
          <p style={{ fontSize: "0.78rem", color: LIME, fontWeight: 600 }}>
            ✓ 5 meals added to your Playbook
          </p>
        ) : (
          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>{PACK.author}</p>
        )}
        <button
          onClick={startImport}
          style={{
            backgroundColor: isDone ? "rgba(197,232,74,0.12)" : AMBER,
            color: isDone ? LIME : INK,
            border: "none", borderRadius: 8, cursor: "pointer",
            fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em",
            padding: "0.55rem 1.3rem",
            transition: "all 0.2s ease",
            flexShrink: 0,
          }}
        >
          {isDone ? "Reset ↺" : phase === "importing" ? "Importing…" : "Import Pack"}
        </button>
      </div>
    </div>
  );
}
