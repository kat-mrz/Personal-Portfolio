"use client";
import { useState } from "react";

const LIME   = "#C5E84A";
const INK    = "#080f1c";
const CARD   = "#1C1C1C";
const MUTED  = "rgba(255,255,255,0.4)";

const INITIAL_MEALS = [
  { id: 1, name: "Overnight Oats",       cal: 380, prot: 18 },
  { id: 2, name: "Protein Smoothie",      cal: 290, prot: 35 },
  { id: 3, name: "Chicken Caesar Salad",  cal: 520, prot: 41 },
  { id: 4, name: "Greek Yogurt Bowl",     cal: 210, prot: 22 },
];

export function SwipeDemo() {
  const [revealed, setReveal]  = useState<number | null>(null);
  const [leaving, setLeaving]  = useState<number[]>([]);
  const [meals, setMeals]      = useState(INITIAL_MEALS);

  const tap = (id: number) =>
    setReveal(prev => (prev === id ? null : id));

  const del = (id: number) => {
    setLeaving(prev => [...prev, id]);
    setTimeout(() => {
      setMeals(prev => prev.filter(m => m.id !== id));
      setLeaving(prev => prev.filter(x => x !== id));
      setReveal(null);
    }, 280);
  };

  const reset = () => setMeals(INITIAL_MEALS);

  return (
    <div style={{
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
      fontFamily: "var(--font-inter), sans-serif",
    }}>
      {/* Header strip */}
      <div style={{
        backgroundColor: CARD,
        padding: "0.75rem 1.1rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <p style={{ color: "#fff", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
          Today's Meals
        </p>
        <span style={{
          backgroundColor: "rgba(197,232,74,0.15)", color: LIME,
          fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em",
          padding: "0.2rem 0.65rem", borderRadius: 999,
          textTransform: "uppercase",
        }}>
          tap to swipe ←
        </span>
      </div>

      {/* Meal rows */}
      {meals.map(meal => (
        <div
          key={meal.id}
          style={{
            position: "relative",
            overflow: "hidden",
            maxHeight: leaving.includes(meal.id) ? 0 : 62,
            opacity:   leaving.includes(meal.id) ? 0 : 1,
            transition: "max-height 0.28s ease, opacity 0.28s ease",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Red delete bg */}
          <div
            onClick={() => del(meal.id)}
            style={{
              position: "absolute", right: 0, top: 0, bottom: 0,
              backgroundColor: "#FF5C5C",
              display: "flex", alignItems: "center", paddingRight: "1.1rem", paddingLeft: "1.5rem",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <span style={{ color: "#fff", fontSize: "0.72rem", fontWeight: 700 }}>Delete</span>
          </div>

          {/* Sliding row */}
          <div
            onClick={() => tap(meal.id)}
            style={{
              backgroundColor: CARD,
              padding: "0 1.1rem",
              height: 62,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              transform: revealed === meal.id ? "translateX(-76px)" : "translateX(0)",
              transition: "transform 0.22s cubic-bezier(0.25,0.46,0.45,0.94)",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <p style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}>{meal.name}</p>
            <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
              <span style={{
                backgroundColor: "rgba(197,232,74,0.12)", color: LIME,
                fontSize: "0.62rem", fontWeight: 700,
                padding: "0.2rem 0.55rem", borderRadius: 999,
              }}>{meal.cal} kcal</span>
              <span style={{
                backgroundColor: "rgba(197,232,74,0.12)", color: LIME,
                fontSize: "0.62rem", fontWeight: 700,
                padding: "0.2rem 0.55rem", borderRadius: 999,
              }}>{meal.prot}g</span>
            </div>
          </div>
        </div>
      ))}

      {/* Empty state */}
      {meals.length === 0 && (
        <div style={{
          backgroundColor: CARD, padding: "1.5rem",
          textAlign: "center",
        }}>
          <p style={{ color: MUTED, fontSize: "0.78rem", marginBottom: "0.75rem" }}>All cleared!</p>
          <button
            onClick={reset}
            style={{
              backgroundColor: "rgba(197,232,74,0.15)", color: LIME,
              border: "none", borderRadius: 8,
              fontSize: "0.72rem", fontWeight: 700, padding: "0.45rem 1.2rem",
              cursor: "pointer", letterSpacing: "0.06em",
            }}
          >
            Reset ↺
          </button>
        </div>
      )}
    </div>
  );
}
