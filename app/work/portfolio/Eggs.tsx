"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   EASTER EGGS — interspersed through the page, no emoji.
   Visual vocabulary: 4-point stars, mare-patch moon, midnight
   navy + amber + moonlight blues.
───────────────────────────────────────────────────────────── */

const AMBER = "#e8a020";
const GOLD  = "#e8c828";
const NAVY  = "#0d1b3e";
const SERIF = "var(--font-playfair), Georgia, serif";

const EGGS: Record<string, string> = {
  moon:          "Moonwatcher",
  wish:          "Make a Wish",
  perfume:       "Sillage",
  camera:        "Golden Hour",
  tea:           "Steeped",
  cat:           "Gentle Hands",
  constellation: "Felis Major",
  vinyl:         "Needle Drop",
  eggs:          "A Literal Easter Egg",
  konami:        "↑↑↓↓←→←→BA",
  saturn:        "Saturn Return",
  bigdipper:     "The Big Dipper",
  littledipper:  "The Little Dipper",
  cassiopeia:    "Cassiopeia",
  orion:         "The Hunter",
  lepus:         "The Hare",
};
const TOTAL  = Object.keys(EGGS).length;
const LS_KEY = "pf-eggs-found";

function readFound(): string[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch { return []; }
}

function markFound(id: string) {
  if (typeof window === "undefined") return;
  const found = readFound();
  if (found.includes(id)) return;
  found.push(id);
  try { localStorage.setItem(LS_KEY, JSON.stringify(found)); } catch {}
  window.dispatchEvent(new CustomEvent("pf-egg-found", { detail: { id } }));
}

/* 4-point star path — same helper as the homepage */
function s4(cx: number, cy: number, r: number): string {
  const ir = r * 0.28;
  const pts: string[] = [];
  for (let k = 0; k < 8; k++) {
    const a = (k * Math.PI) / 4 - Math.PI / 2;
    const rad = k % 2 === 0 ? r : ir;
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

/* ─────────────────────────────────────────────────────────────
   KEYFRAMES + SPOT CLASSES
───────────────────────────────────────────────────────────── */
const KEYFRAMES = `
@keyframes pf-spin       { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
@keyframes pf-spin-slow  { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
@keyframes pf-note-float { 0% { opacity: 0; transform: translate(0, 6px) rotate(-8deg) }
                           20% { opacity: 0.9 }
                           100% { opacity: 0; transform: translate(-14px, -52px) rotate(14deg) } }
@keyframes pf-mist       { 0% { opacity: 0.85; transform: translate(0,0) scale(0.6) }
                           100% { opacity: 0; transform: translate(var(--mx), var(--my)) scale(1.7) } }
@keyframes pf-flash      { 0% { opacity: 0.9 } 100% { opacity: 0 } }
@keyframes pf-pop        { 0% { transform: scale(0.3); opacity: 0 }
                           60% { transform: scale(1.18) }
                           100% { transform: scale(1); opacity: 1 } }
@keyframes pf-zzz        { 0% { opacity: 0; transform: translate(0, 4px) }
                           30% { opacity: 0.7 }
                           100% { opacity: 0; transform: translate(8px, -18px) } }
@keyframes pf-toast      { 0% { opacity: 0; transform: translateY(14px) }
                           10% { opacity: 1; transform: translateY(0) }
                           88% { opacity: 1 }
                           100% { opacity: 0; transform: translateY(-6px) } }
@keyframes pf-wobble     { 0%,100% { transform: rotate(0deg) } 30% { transform: rotate(-9deg) } 65% { transform: rotate(7deg) } }
@keyframes pf-burst      { 0% { opacity: 1; transform: translate(-50%,-50%) translate(0,0) scale(0.4) }
                           100% { opacity: 0; transform: translate(-50%,-50%) translate(var(--bx), var(--by)) scale(1) } }
@keyframes pf-purr       { 0%,100% { transform: scale(1) } 50% { transform: scale(1.05) } }
@keyframes pf-twinkle2   { 0%,100% { opacity: 1 } 50% { opacity: 0.45 } }
@keyframes pf-steam      { 0% { opacity: 0; transform: translateY(5px) scaleY(0.6) }
                           30% { opacity: 0.55 }
                           100% { opacity: 0; transform: translateY(-18px) scaleY(1.15) } }
@keyframes pf-trail      { 0% { transform: rotate(var(--ta)) scaleX(0); opacity: 0.9 }
                           70% { opacity: 0.6 }
                           100% { transform: rotate(var(--ta)) scaleX(1); opacity: 0 } }
@keyframes pf-heart-up   { 0% { opacity: 1; transform: translateX(-50%) translateY(0) scale(0.6) }
                           40% { opacity: 1; transform: translateX(-50%) translateY(-18px) scale(1.1) }
                           100% { opacity: 0; transform: translateX(-50%) translateY(-44px) scale(0.8) } }
@keyframes pf-saturn-spin { from { transform: rotate(-4deg) } to { transform: rotate(4deg) } }
@keyframes pf-ring-shimmer  { 0%,100% { opacity: 0.7 } 50% { opacity: 1 } }
@keyframes pf-confetti-fall { from { transform: translateY(-40px) rotate(0deg); opacity: 1; }
                              to   { transform: translateY(110vh) rotate(var(--cr)); opacity: 0; } }

/* Interspersed object spots — inline in the flow on small screens,
   floated out into the section margins on wide screens */
.pf-spot { display: inline-block; vertical-align: top; margin: 2.4rem 2.2rem 0 0; }
@media (min-width: 1024px) {
  .pf-spot           { position: absolute; margin: 0; z-index: 2; }
  /* Section 2 */
  .pf-spot-camera    { left:  clamp(2.5rem, 7vw, 8rem);  top:    clamp(4.5rem, 8vw, 8rem); }
  .pf-spot-tea       { right: clamp(2.5rem, 7vw, 8rem);  bottom: clamp(4rem, 8vw, 8rem); }
  /* Hero */
  .pf-spot-vinyl     { right: clamp(1.5rem, 7vw, 7rem);  bottom: clamp(1rem, 2.5vh, 2rem); }
  /* Section 3 */
  .pf-spot-const     { left:  clamp(2.5rem, 7vw, 8rem);  top:    clamp(4.5rem, 8vw, 8rem); }
  .pf-spot-cass      { right: clamp(2.5rem, 7vw, 8rem);  top:    clamp(5rem, 10vw, 10rem); }
  .pf-spot-saturn    { left:  clamp(2.5rem, 7vw, 8rem);  top:    clamp(8rem, 16vw, 14rem); }
  .pf-spot-orion     { left:  clamp(2.5rem, 7vw, 8rem);  bottom: clamp(12rem, 22vw, 18rem); }
  .pf-spot-lepus     { right: clamp(2.5rem, 7vw, 8rem);  bottom: clamp(9rem, 16vw, 13rem); }
  .pf-spot-perf      { right: clamp(2.5rem, 7vw, 8rem);  bottom: clamp(3rem, 6vw, 5rem); }
}
`;

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

/* ─────────────────────────────────────────────────────────────
   HUD — secret counter + achievement toasts + Konami listener
───────────────────────────────────────────────────────────── */
export function EggHud() {
  const [count, setCount]     = useState(0);
  const [toasts, setToasts]   = useState<{ key: number; title: string }[]>([]);
  const [confetti, setConfetti] = useState(0);
  const konamiPos = useRef(0);

  useEffect(() => {
    setCount(readFound().length);

    const onFound = (e: Event) => {
      const id = (e as CustomEvent).detail.id as string;
      setCount(readFound().length);
      setToasts(t => [...t, { key: Date.now() + Math.random(), title: EGGS[id] ?? id }]);
    };
    window.addEventListener("pf-egg-found", onFound);

    const onKey = (e: KeyboardEvent) => {
      const expect = KONAMI[konamiPos.current];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === expect) {
        konamiPos.current++;
        if (konamiPos.current === KONAMI.length) {
          konamiPos.current = 0;
          setConfetti(c => c + 1);
          markFound("konami");
        }
      } else {
        konamiPos.current = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pf-egg-found", onFound);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!toasts.length) return;
    const t = setTimeout(() => setToasts(ts => ts.slice(1)), 3000);
    return () => clearTimeout(t);
  }, [toasts]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {confetti > 0 && (() => {
        const COLORS = [AMBER, GOLD, "#fff", "#a8c8ff", "#ffa8a8", "#a8ffcc", "#e8d0ff"];
        return (
          <div key={confetti} aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 95, overflow: "hidden" }}>
            {Array.from({ length: 90 }, (_, i) => {
              const color  = COLORS[i % COLORS.length];
              const w      = 5 + (i % 4) * 2;
              const h      = 7 + (i % 5) * 3;
              const x      = ((i * 39.7) % 100).toFixed(1);
              const delay  = ((i * 0.042) % 1.6).toFixed(2);
              const dur    = (1.6 + (i % 6) * 0.2).toFixed(1);
              const rot    = (i * 53) % 720;
              const isRound = i % 5 === 0;
              return (
                <span key={i} style={{
                  position: "absolute", left: `${x}%`, top: `-${h}px`,
                  width: w, height: h,
                  backgroundColor: color,
                  borderRadius: isRound ? "50%" : 1,
                  ["--cr" as string]: `${rot}deg`,
                  animation: `pf-confetti-fall ${dur}s ease-in ${delay}s forwards`,
                  willChange: "transform",
                }} />
              );
            })}
          </div>
        );
      })()}

      <div style={{
        position: "fixed", right: "1.1rem", bottom: "1.1rem", zIndex: 90,
        display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem",
        pointerEvents: "none",
      }}>
        {toasts.map(t => (
          <div key={t.key} style={{
            backgroundColor: "rgba(8,15,28,0.92)",
            border: "1px solid rgba(232,160,32,0.45)",
            borderRadius: 3,
            padding: "0.6rem 0.95rem",
            animation: "pf-toast 3s ease forwards",
            boxShadow: "0 8px 30px rgba(0,0,0,0.45), 0 0 18px rgba(232,160,32,0.12)",
          }}>
            <p style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: AMBER, margin: 0 }}>
              ✦ Secret found
            </p>
            <p style={{ fontFamily: SERIF, fontSize: "0.95rem", color: "#fff", margin: "0.15rem 0 0" }}>{t.title}</p>
          </div>
        ))}
        {count > 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.3rem", pointerEvents: "auto" }}>
            <div style={{
              backgroundColor: "rgba(8,15,28,0.88)",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 999,
              padding: "0.42rem 0.95rem",
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
              color: count >= TOTAL ? GOLD : "rgba(255,255,255,0.75)",
              boxShadow: "0 6px 22px rgba(0,0,0,0.4)",
            }}>
              {count >= TOTAL ? "✦ ALL SECRETS FOUND ✦" : `✦ ${count} / ${TOTAL} secrets`}
            </div>
            <button
              onClick={() => {
                try { localStorage.removeItem(LS_KEY); } catch {}
                setCount(0);
                window.dispatchEvent(new CustomEvent("pf-egg-reset"));
              }}
              style={{
                background: "none", border: "none", padding: 0, cursor: "pointer",
                fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(232,160,32,0.7)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)"; }}
            >
              reset
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   1 · MOON — click to cycle phases
───────────────────────────────────────────────────────────── */
export function MoonPhases() {
  const [phase, setPhase]   = useState(0);
  const [wobble, setWobble] = useState(0);

  useEffect(() => {
    const onReset = () => { setPhase(0); setWobble(0); };
    window.addEventListener("pf-egg-reset", onReset);
    return () => window.removeEventListener("pf-egg-reset", onReset);
  }, []);

  const OFFSETS = [2.4, -1.5, -1.0, -0.5, 0, 0.5, 1.0, 1.5];
  const R = 22;
  const dx = OFFSETS[phase] * R;

  return (
    <button
      aria-label="The moon. Click it."
      title="the moon"
      onClick={() => { setPhase(p => (p + 1) % OFFSETS.length); setWobble(w => w + 1); markFound("moon"); }}
      style={{
        position: "absolute",
        right: "clamp(1.5rem, 9vw, 9rem)", top: "clamp(5.5rem, 16vh, 9rem)",
        background: "none", border: "none", cursor: "pointer",
        padding: "0.5rem", zIndex: 2,
        filter: "drop-shadow(0 0 14px rgba(200,225,255,0.55)) drop-shadow(0 0 36px rgba(200,220,255,0.22))",
      }}
    >
      <span key={wobble} style={{ display: "inline-block", animation: wobble ? "pf-wobble 0.5s ease" : undefined }}>
        <svg width="52" height="52" viewBox="0 0 48 48" aria-hidden>
          <defs>
            <clipPath id="pf-moonclip"><circle cx="24" cy="24" r={R} /></clipPath>
          </defs>
          <circle cx="24" cy="24" r={R} fill="rgba(232,242,255,0.93)" />
          <circle cx="18" cy="18" r="4.4" fill="rgba(170,195,235,0.18)" />
          <circle cx="28" cy="14" r="3.2" fill="rgba(170,195,235,0.14)" />
          <circle cx="20" cy="30" r="5.6" fill="rgba(170,195,235,0.13)" />
          <circle cx="30" cy="26" r="2.8" fill="rgba(170,195,235,0.12)" />
          <g clipPath="url(#pf-moonclip)">
            <circle cx={24 + dx} cy="24" r={R + 1}
              fill="#0a1228" opacity="0.94"
              style={{ transition: "cx 0.45s cubic-bezier(0.22,1,0.36,1)" }} />
          </g>
        </svg>
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   2 · WISH STAR — grab and fling, positioned near the moon
───────────────────────────────────────────────────────────── */
export function WishStar() {
  const [off, setOff]       = useState({ x: 0, y: 0 });
  const [drag, setDrag]     = useState(false);
  const [flight, setFlight] = useState<{ dx: number; dy: number; angle: number; dist: number; key: number } | null>(null);
  const startRef = useRef({ px: 0, py: 0, ox: 0, oy: 0 });
  const velRef   = useRef({ vx: 0, vy: 0, x: 0, y: 0, t: 0 });

  useEffect(() => {
    const onReset = () => { setOff({ x: 0, y: 0 }); setDrag(false); setFlight(null); };
    window.addEventListener("pf-egg-reset", onReset);
    return () => window.removeEventListener("pf-egg-reset", onReset);
  }, []);

  const onDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (flight) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    startRef.current = { px: e.clientX, py: e.clientY, ox: off.x, oy: off.y };
    velRef.current   = { vx: 0, vy: 0, x: e.clientX, y: e.clientY, t: performance.now() };
    setDrag(true);
  };
  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!drag) return;
    const s = startRef.current;
    setOff({ x: s.ox + e.clientX - s.px, y: s.oy + e.clientY - s.py });
    const v = velRef.current;
    const t = performance.now();
    const dt = Math.max(1, t - v.t);
    velRef.current = { vx: (e.clientX - v.x) / dt, vy: (e.clientY - v.y) / dt, x: e.clientX, y: e.clientY, t };
  };
  const onUp = () => {
    if (!drag) return;
    setDrag(false);
    const { vx, vy } = velRef.current;
    const speed = Math.hypot(vx, vy);
    if (speed > 0.35) {
      const scale = Math.min(520, Math.max(260, speed * 420)) / speed;
      const dx = vx * scale, dy = vy * scale;
      setFlight({ dx, dy, angle: Math.atan2(dy, dx), dist: Math.hypot(dx, dy), key: Date.now() });
      markFound("wish");
      setTimeout(() => { setFlight(null); setOff({ x: 0, y: 0 }); }, 1300);
    } else {
      setOff({ x: 0, y: 0 });
    }
  };

  return (
    <button
      aria-label="A loose star. Grab it and fling it."
      title="this one's loose"
      onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
      style={{
        position: "absolute",
        right: "clamp(4rem, 12vw, 12rem)", top: "clamp(10rem, 24vh, 15rem)",
        background: "none", border: "none", padding: "0.6rem",
        cursor: drag ? "grabbing" : "grab",
        touchAction: "none", zIndex: 2,
      }}
    >
      <span style={{ position: "relative", display: "block" }}>
        {flight && (
          <span key={flight.key} aria-hidden style={{
            position: "absolute", left: "50%", top: "50%",
            width: flight.dist, height: 2,
            transformOrigin: "0 50%",
            ["--ta" as string]: `${flight.angle}rad`,
            transform: `rotate(${flight.angle}rad) scaleX(0)`,
            background: "linear-gradient(90deg, rgba(232,200,40,0.85) 0%, rgba(232,200,40,0.25) 55%, transparent 100%)",
            animation: "pf-trail 0.9s ease-out forwards",
            pointerEvents: "none",
          }} />
        )}
        <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden style={{
          display: "block",
          transform: flight
            ? `translate(${off.x + flight.dx}px, ${off.y + flight.dy}px) scale(0.4)`
            : `translate(${off.x}px, ${off.y}px)`,
          opacity: flight ? 0 : 1,
          transition: flight
            ? "transform 0.9s cubic-bezier(0.2, 0.7, 0.3, 1), opacity 0.9s ease"
            : drag ? "none" : "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
          filter: `drop-shadow(0 0 8px rgba(232,200,40,0.8)) drop-shadow(0 0 20px rgba(232,160,32,0.35))`,
          animation: drag || flight ? undefined : "pf-twinkle2 2.6s ease-in-out infinite",
        }}>
          <path d={s4(15, 15, 11)} fill={GOLD} />
        </svg>
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   3 · PERFUME — click to spritz (section 3 via pf-spot-perf)
───────────────────────────────────────────────────────────── */
const SCENTS = ["amber & cedar", "night jasmine", "vanilla orchid", "fig & sea salt", "midnight air"];

export function PerfumeBottle({ className = "pf-spot pf-spot-perf" }: { className?: string }) {
  const [spritz, setSpritz] = useState(0);

  useEffect(() => {
    const onReset = () => setSpritz(0);
    window.addEventListener("pf-egg-reset", onReset);
    return () => window.removeEventListener("pf-egg-reset", onReset);
  }, []);

  return (
    <span className={className}>
      <button onClick={() => { setSpritz(s => s + 1); markFound("perfume"); }}
        aria-label="Spritz the perfume"
        title="eau de nuit"
        style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", display: "block" }}>
        <span style={{ position: "relative", display: "block" }}>
          {spritz > 0 && (
            <span key={spritz} aria-hidden>
              {Array.from({ length: 7 }, (_, i) => {
                const ang = -0.5 - i * 0.16;
                const dist = 24 + (i % 3) * 13;
                return (
                  <span key={i} style={{
                    position: "absolute", left: 4, top: 10,
                    width: 4 + (i % 3) * 2, height: 4 + (i % 3) * 2, borderRadius: "50%",
                    backgroundColor: "rgba(210,225,255,0.8)",
                    ["--mx" as string]: `${(-Math.cos(ang) * dist).toFixed(0)}px`,
                    ["--my" as string]: `${(Math.sin(ang) * dist - 8).toFixed(0)}px`,
                    animation: `pf-mist ${0.6 + (i % 3) * 0.18}s ease-out forwards`,
                  }} />
                );
              })}
            </span>
          )}
          <span aria-hidden style={{ display: "block", width: 44 }}>
            <span style={{ display: "block", width: 8, height: 6, margin: "0 auto", backgroundColor: "#c8a040", borderRadius: "2px 2px 0 0" }} />
            <span style={{ display: "block", width: 16, height: 10, margin: "0 auto", backgroundColor: "#9a7824", borderRadius: 2 }} />
            <span style={{
              display: "block", width: 44, height: 56, marginTop: 2,
              background: "linear-gradient(160deg, rgba(140,165,220,0.4) 0%, rgba(13,27,62,0.85) 58%, rgba(232,160,32,0.28) 100%)",
              border: "1px solid rgba(220,230,255,0.3)",
              borderRadius: "5px 5px 8px 8px",
              boxShadow: "inset 0 6px 14px rgba(255,255,255,0.14), 0 8px 22px rgba(0,0,0,0.45)",
            }} />
          </span>
        </span>
      </button>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   4 · WALKING CAT — moves along the bottom of section 2
   Click for a floating heart.
───────────────────────────────────────────────────────────── */
function CatSilhouette({ awake }: { awake: boolean }) {
  return (
    <svg width="64" height="44" viewBox="0 0 64 44" aria-hidden style={{ display: "block" }}>
      <path
        d={awake ? "M54 34 Q63 28 58 18" : "M52 36 Q62 38 60 30"}
        fill="none" stroke={NAVY} strokeWidth="3.4" strokeLinecap="round" />
      <ellipse cx="34" cy="33" rx="21" ry="10" fill={NAVY} />
      <circle cx={15} cy={awake ? 18 : 27} r="9.5" fill={NAVY} />
      {awake ? (
        <>
          <path d="M8 13 L9 3 L16 9 Z"  fill={NAVY} />
          <path d="M17 8 L23 2 L24 12 Z" fill={NAVY} />
          <circle cx="12" cy="17" r="1.4" fill={GOLD} />
          <circle cx="19" cy="17" r="1.4" fill={GOLD} />
        </>
      ) : (
        <>
          <path d="M8 22 L9 14 L15 19 Z"  fill={NAVY} />
          <path d="M16 18 L22 13 L23 21 Z" fill={NAVY} />
          <path d="M11 26 Q13 28 15 26" fill="none" stroke="rgba(240,244,255,0.75)" strokeWidth="1.1" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function HeartSvg() {
  return (
    <svg width="18" height="16" viewBox="0 0 18 16" aria-hidden style={{ display: "block" }}>
      <path d="M9 14.5 C9 14.5 1 9 1 4.5 C1 2.2 2.8 0.5 5 0.5 C6.8 0.5 8.1 1.7 9 3 C9.9 1.7 11.2 0.5 13 0.5 C15.2 0.5 17 2.2 17 4.5 C17 9 9 14.5 9 14.5Z"
        fill={AMBER} />
    </svg>
  );
}

export function WalkingCat() {
  const containerRef = useRef<HTMLDivElement>(null);
  const catRef       = useRef<HTMLButtonElement>(null);
  const posRef       = useRef({ x: 0.04, dir: 1 });
  const randRef      = useRef({ elapsed: 0, next: 2500 + Math.random() * 4000 });
  const [hearts, setHearts] = useState<number[]>([]);
  const [awake, setAwake]   = useState(false);

  useEffect(() => {
    const onReset = () => { setHearts([]); setAwake(false); };
    window.addEventListener("pf-egg-reset", onReset);
    return () => window.removeEventListener("pf-egg-reset", onReset);
  }, []);

  useEffect(() => {
    let raf = 0;
    let lastT = 0;
    const SPEED = 0.000018;

    const tick = (t: number) => {
      const dt = lastT ? Math.min(t - lastT, 60) : 0;
      lastT = t;
      const container = containerRef.current;
      const cat = catRef.current;
      if (container && cat) {
        const cW = container.offsetWidth;
        const kW = cat.offsetWidth;
        const maxFrac = cW > 0 ? Math.max(0, (cW - kW) / cW) : 0.9;
        const p = posRef.current;
        const r = randRef.current;

        /* Random mid-walk direction flip */
        r.elapsed += dt;
        if (r.elapsed >= r.next) {
          p.dir *= -1;
          r.elapsed = 0;
          r.next = 2000 + Math.random() * 5000;
        }

        p.x += p.dir * SPEED * dt;
        if (p.x >= maxFrac) { p.x = maxFrac; p.dir = -1; r.elapsed = 0; }
        if (p.x <= 0.02)    { p.x = 0.02;   p.dir =  1; r.elapsed = 0; }
        cat.style.left      = `${(p.x * 100).toFixed(2)}%`;
        cat.style.transform = `scaleX(${p.dir > 0 ? -1 : 1})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const click = () => {
    markFound("cat");
    setAwake(true);
    setHearts(h => [...h, Date.now()]);
    setTimeout(() => setAwake(false), 1800);
  };

  return (
    <div ref={containerRef} style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      height: 80, pointerEvents: "none", overflow: "hidden",
    }}>
      <button
        ref={catRef}
        onClick={click}
        aria-label="A cat"
        title="psst"
        style={{
          position: "absolute", bottom: 4, left: "4%",
          background: "none", border: "none", cursor: "pointer",
          padding: "0.4rem", pointerEvents: "all",
          transformOrigin: "center bottom",
        }}
      >
        {hearts.map(k => (
          <span key={k} aria-hidden style={{
            position: "absolute", left: "50%", bottom: "110%",
            animation: "pf-heart-up 1.4s ease forwards",
          }}>
            <HeartSvg />
          </span>
        ))}
        <span style={{
          display: "block",
          animation: awake ? "pf-purr 1.1s ease-in-out infinite" : undefined,
          filter: "drop-shadow(0 3px 6px rgba(13,27,62,0.2))",
        }}>
          <CatSilhouette awake={awake} />
        </span>
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   5 · TEA — drag the teabag into the cup to steep it
───────────────────────────────────────────────────────────── */
export function TeaCup() {
  const [steeped, setSteeped] = useState(false);
  const [off, setOff]   = useState({ x: 0, y: 0 });
  const [drag, setDrag] = useState(false);
  const startRef = useRef({ px: 0, py: 0, ox: 0, oy: 0 });
  const cupRef   = useRef<SVGEllipseElement>(null);
  const bagRef   = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onReset = () => { setSteeped(false); setOff({ x: 0, y: 0 }); setDrag(false); };
    window.addEventListener("pf-egg-reset", onReset);
    return () => window.removeEventListener("pf-egg-reset", onReset);
  }, []);

  const onDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (steeped) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    startRef.current = { px: e.clientX, py: e.clientY, ox: off.x, oy: off.y };
    setDrag(true);
  };
  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!drag) return;
    const s = startRef.current;
    setOff({ x: s.ox + e.clientX - s.px, y: s.oy + e.clientY - s.py });
  };
  const onUp = () => {
    if (!drag) return;
    setDrag(false);
    const cup = cupRef.current?.getBoundingClientRect();
    const bag = bagRef.current?.getBoundingClientRect();
    if (cup && bag) {
      const bx = bag.left + bag.width / 2, by = bag.top + bag.height / 2;
      if (bx > cup.left - 8 && bx < cup.right + 8 && by > cup.top - 20 && by < cup.bottom + 26) {
        setSteeped(true);
        markFound("tea");
        return;
      }
    }
    setOff({ x: 0, y: 0 });
  };

  return (
    <span className="pf-spot pf-spot-tea" style={{ width: 168 }}>
      <span style={{ position: "relative", display: "block", width: 168 }}>
        <svg width="168" height="120" viewBox="0 0 168 120" aria-hidden style={{ display: "block", overflow: "visible" }}>
          {steeped && [0, 1, 2].map(i => (
            <path key={i}
              d={`M${58 + i * 14} 34 q 3 -6 0 -11 q -3 -5 0 -10`}
              fill="none" stroke="rgba(13,27,62,0.4)" strokeWidth="2" strokeLinecap="round"
              style={{ animation: `pf-steam 2.6s ease-in-out ${i * 0.8}s infinite` }} />
          ))}
          <ellipse cx="72" cy="104" rx="48" ry="9" fill="rgba(13,27,62,0.07)" stroke="rgba(13,27,62,0.55)" strokeWidth="1.4" />
          <path d="M34 52 C34 56 39 92 50 96 C62 100 82 100 94 96 C105 92 110 56 110 52 Z"
            fill="rgba(255,255,255,0.85)" stroke="rgba(13,27,62,0.7)" strokeWidth="1.6" />
          <ellipse ref={cupRef} cx="72" cy="54" rx="34" ry="6.5"
            fill={steeped ? "rgba(190,120,30,0.85)" : "rgba(195,218,255,0.75)"}
            stroke="rgba(13,27,62,0.45)" strokeWidth="1"
            style={{ transition: "fill 1.2s ease" }} />
          <path d="M110 60 Q128 64 112 82" fill="none" stroke="rgba(13,27,62,0.7)" strokeWidth="1.8" />
        </svg>
        {!steeped && (
          <button
            ref={bagRef}
            aria-label="A teabag. Drag it into the cup."
            title="earl grey"
            onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
            style={{
              position: "absolute", right: 0, top: 0,
              background: "none", border: "none", padding: "0.4rem",
              cursor: drag ? "grabbing" : "grab",
              touchAction: "none",
              transform: `translate(${off.x}px, ${off.y}px)`,
              transition: drag ? "none" : "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
              zIndex: 2,
            }}>
            <svg width="26" height="42" viewBox="0 0 26 42" aria-hidden style={{ display: "block" }}>
              <line x1="13" y1="2" x2="13" y2="16" stroke="rgba(13,27,62,0.6)" strokeWidth="1" />
              <rect x="8" y="0" width="10" height="6" rx="1" fill={AMBER} opacity="0.9" />
              <path d="M5 18 L21 18 L23 36 Q13 42 3 36 Z"
                fill="rgba(244,241,232,0.95)" stroke="rgba(13,27,62,0.6)" strokeWidth="1.2" />
              <line x1="7" y1="24" x2="19" y2="24" stroke="rgba(13,27,62,0.25)" strokeWidth="1" />
            </svg>
          </button>
        )}
        {steeped && (
          <svg aria-hidden width="20" height="26" viewBox="0 0 20 26" style={{ position: "absolute", left: 96, top: 40, animation: "pf-pop 0.4s ease" }}>
            <path d="M4 2 Q12 6 10 18" fill="none" stroke="rgba(13,27,62,0.55)" strokeWidth="1" />
            <rect x="8" y="18" width="9" height="6" rx="1" fill={AMBER} opacity="0.9" />
          </svg>
        )}
      </span>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   6 · CAMERA — click for flash + a polaroid with an egg hint
───────────────────────────────────────────────────────────── */
function MiniMoon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden>
      <circle cx="17" cy="17" r="12" fill="rgba(232,242,255,0.92)" />
      <circle cx="13" cy="13" r="2.6" fill="rgba(170,195,235,0.25)" />
      <circle cx="20" cy="11" r="1.8" fill="rgba(170,195,235,0.2)" />
      <circle cx="15" cy="21" r="3.2" fill="rgba(170,195,235,0.18)" />
    </svg>
  );
}
function MiniStar() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden>
      <path d={s4(17, 17, 12)} fill={GOLD} style={{ filter: `drop-shadow(0 0 5px ${GOLD})` }} />
    </svg>
  );
}
function MiniCat() {
  return (
    <svg width="40" height="28" viewBox="0 0 64 44" aria-hidden>
      <path d="M52 36 Q62 38 60 30" fill="none" stroke="rgba(244,241,232,0.9)" strokeWidth="3.4" strokeLinecap="round" />
      <ellipse cx="34" cy="33" rx="21" ry="10" fill="rgba(244,241,232,0.9)" />
      <circle cx="15" cy="27" r="9.5" fill="rgba(244,241,232,0.9)" />
      <path d="M8 22 L9 14 L15 19 Z" fill="rgba(244,241,232,0.9)" />
      <path d="M16 18 L22 13 L23 21 Z" fill="rgba(244,241,232,0.9)" />
    </svg>
  );
}
function MiniCup() {
  return (
    <svg width="36" height="30" viewBox="0 0 60 50" aria-hidden>
      <ellipse cx="28" cy="44" rx="20" ry="3.5" fill="none" stroke="rgba(244,241,232,0.7)" strokeWidth="1.4" />
      <path d="M12 18 C12 20 15 36 20 38 C25 40 33 40 38 38 C43 36 46 20 46 18 Z"
        fill="none" stroke="rgba(244,241,232,0.9)" strokeWidth="1.6" />
      <ellipse cx="29" cy="19" rx="15" ry="3" fill="rgba(232,160,32,0.75)" />
      <path d="M46 22 Q54 24 47 32" fill="none" stroke="rgba(244,241,232,0.9)" strokeWidth="1.5" />
    </svg>
  );
}
function MiniSaturn() {
  return (
    <svg width="38" height="28" viewBox="0 0 38 28" aria-hidden>
      <ellipse cx="19" cy="18" rx="18" ry="5" fill="none" stroke="rgba(232,200,40,0.65)" strokeWidth="1.2" />
      <circle cx="19" cy="13" r="9" fill="rgba(240,220,140,0.88)" />
      <ellipse cx="19" cy="11" rx="7" ry="2.2" fill="rgba(200,160,60,0.3)" />
    </svg>
  );
}
function MiniConst() {
  const pts: [number, number][] = [[6, 26], [13, 12], [22, 8], [30, 14], [32, 26]];
  const lines: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4]];
  return (
    <svg width="38" height="34" viewBox="0 0 38 34" aria-hidden>
      {lines.map(([a, b], i) => (
        <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="rgba(232,200,40,0.7)" strokeWidth="0.9" />
      ))}
      {pts.map(([x, y], i) => (
        <path key={i} d={s4(x, y, 2.6)} fill="rgba(232,242,255,0.9)" />
      ))}
    </svg>
  );
}
function MiniVinyl() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden>
      <circle cx="18" cy="18" r="15" fill="#10141c" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      {[11, 8, 5].map(r => (
        <circle key={r} cx="18" cy="18" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.2" />
      ))}
      <circle cx="18" cy="18" r="3.8" fill={AMBER} />
      <circle cx="18" cy="18" r="1.4" fill="#10141c" />
    </svg>
  );
}
function MiniEgg() {
  return (
    <svg width="24" height="30" viewBox="0 0 24 30" aria-hidden>
      <ellipse cx="12" cy="16" rx="9.5" ry="13" fill="rgba(248,245,236,0.9)" />
    </svg>
  );
}
function MiniArrows() {
  const dim = "rgba(232,242,255,0.8)";
  /* polygon arrow helpers */
  const U = (x: number, y: number) => <polygon points={`${x},${y-4} ${x-3.5},${y+3} ${x+3.5},${y+3}`} fill={dim} />;
  const D = (x: number, y: number) => <polygon points={`${x},${y+4} ${x-3.5},${y-3} ${x+3.5},${y-3}`} fill={dim} />;
  const L = (x: number, y: number) => <polygon points={`${x-4},${y} ${x+3},${y-3.5} ${x+3},${y+3.5}`} fill={dim} />;
  const R = (x: number, y: number) => <polygon points={`${x+4},${y} ${x-3},${y-3.5} ${x-3},${y+3.5}`} fill={dim} />;
  return (
    <svg width="40" height="32" viewBox="0 0 40 32" aria-hidden>
      {/* row 1: ↑ ↑ ↓ ↓ */}
      {U(5,8)}{U(13,8)}{D(22,8)}{D(30,8)}
      {/* row 2: ← → ← → */}
      {L(5,18)}{R(13,18)}{L(22,18)}{R(30,18)}
      {/* B A */}
      <text x="13" y="30" fontSize="6.5" textAnchor="middle" fill={GOLD} fontFamily="Georgia,serif">B</text>
      <text x="27" y="30" fontSize="6.5" textAnchor="middle" fill={GOLD} fontFamily="Georgia,serif">A</text>
    </svg>
  );
}

const SHOTS: { node: React.ReactNode; caption: string }[] = [
  { node: <MiniMoon />,    caption: "it changes if you ask" },
  { node: <MiniStar />,    caption: "grab it. let go fast." },
  { node: <MiniCup />,     caption: "it needs something warm" },
  { node: <MiniCat />,     caption: "follow her" },
  { node: <MiniSaturn />,  caption: "look beyond the moon" },
  { node: <MiniConst />,   caption: "trace every star" },
  { node: <MiniVinyl />,   caption: "let it spin" },
  { node: <MiniEgg />,     caption: "one is different" },
  { node: <MiniArrows />,  caption: "remember the classics" },
];

export function CameraSnap() {
  const [shot, setShot]   = useState(-1);
  const [flash, setFlash] = useState(0);
  const [rot, setRot]     = useState(0);

  useEffect(() => {
    const onReset = () => { setShot(-1); setFlash(0); setRot(0); };
    window.addEventListener("pf-egg-reset", onReset);
    return () => window.removeEventListener("pf-egg-reset", onReset);
  }, []);

  const snap = () => {
    setFlash(f => f + 1);
    setShot(s => (s + 1) % SHOTS.length);
    setRot(Math.random() * 10 - 5);
    markFound("camera");
  };

  return (
    <span className="pf-spot pf-spot-camera">
      <span style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        <button onClick={snap} aria-label="Take a photo" title="35mm, no do-overs"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, position: "relative" }}>
          {flash > 0 && (
            <span key={flash} aria-hidden style={{
              position: "absolute", inset: "-40%",
              background: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 45%, transparent 70%)",
              animation: "pf-flash 0.45s ease-out forwards",
              pointerEvents: "none", zIndex: 3, borderRadius: "50%",
            }} />
          )}
          <span aria-hidden style={{
            display: "block", position: "relative", width: 96, height: 62,
            backgroundColor: NAVY, border: "1px solid rgba(13,27,62,0.4)",
            borderRadius: 7, boxShadow: "0 10px 24px rgba(13,27,62,0.3)",
          }}>
            <span style={{
              position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
              width: 36, height: 36, borderRadius: "50%",
              background: "radial-gradient(circle at 38% 32%, #4a5e88 0%, #0a0f1c 70%)",
              border: "2px solid rgba(240,244,255,0.3)",
            }} />
            <span style={{
              position: "absolute", right: 9, top: -6, width: 20, height: 8,
              backgroundColor: AMBER, borderRadius: "3px 3px 0 0",
            }} />
            <span style={{
              position: "absolute", left: 9, top: 7, width: 11, height: 7,
              backgroundColor: "rgba(240,244,255,0.22)", borderRadius: 2,
            }} />
          </span>
        </button>

        {shot >= 0 && (
          <span key={shot} aria-hidden style={{
            display: "block", width: 82, padding: "5px 5px 0",
            backgroundColor: "#f4f1e8", borderRadius: 2,
            transform: `rotate(${rot.toFixed(1)}deg)`,
            animation: "pf-pop 0.5s cubic-bezier(0.22,1,0.36,1)",
            boxShadow: "0 12px 28px rgba(13,27,62,0.35)",
          }}>
            <span style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              height: 66, backgroundColor: NAVY,
            }}>{SHOTS[shot].node}</span>
            <span style={{
              display: "block", textAlign: "center", padding: "0.3rem 0 0.4rem",
              fontFamily: SERIF, fontStyle: "italic", fontSize: "0.62rem", color: "#3a3630",
            }}>{SHOTS[shot].caption}</span>
          </span>
        )}
      </span>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   7 · SATURN — click to spin
───────────────────────────────────────────────────────────── */
export function Saturn({ className = "pf-spot pf-spot-saturn" }: { className?: string }) {
  const [spins, setSpins] = useState(0);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const onReset = () => { setSpins(0); setFound(false); };
    window.addEventListener("pf-egg-reset", onReset);
    return () => window.removeEventListener("pf-egg-reset", onReset);
  }, []);

  const click = () => {
    setSpins(s => s + 1);
    if (!found) { markFound("saturn"); setFound(true); }
  };

  return (
    <span className={className}>
      <button onClick={click} aria-label="Saturn" title="sixth rock from the sun"
        style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", display: "block" }}>
        <span key={spins} style={{ display: "block", animation: spins ? "pf-wobble 0.6s ease" : undefined }}>
          <svg width="100" height="80" viewBox="0 0 100 80" aria-hidden style={{ display: "block", overflow: "visible" }}>
            <defs>
              <radialGradient id="pf-sg" cx="38%" cy="35%" r="65%">
                <stop offset="0%"   stopColor="#efe0a8" />
                <stop offset="45%"  stopColor="#d4b45c" />
                <stop offset="100%" stopColor="#8a6428" />
              </radialGradient>
              <clipPath id="pf-rfcl">
                <rect x="0" y="38" width="100" height="42" />
              </clipPath>
            </defs>
            {/* Ring — back half (drawn first, behind planet) */}
            <ellipse cx="50" cy="42" rx="46" ry="11"
              fill="rgba(210,170,60,0.22)" stroke="rgba(210,160,50,0.5)" strokeWidth="1.2"
              style={{ animation: "pf-ring-shimmer 3.2s ease-in-out infinite" }} />
            {/* Planet */}
            <circle cx="50" cy="38" r="24" fill="url(#pf-sg)"
              style={{ filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.45))" }} />
            {/* Band details */}
            <ellipse cx="50" cy="34" rx="20" ry="3.5" fill="rgba(180,130,40,0.22)" />
            <ellipse cx="50" cy="40" rx="22" ry="4"   fill="rgba(160,110,28,0.18)" />
            {/* Ring — front half (clipped to below equator, on top of planet) */}
            <ellipse cx="50" cy="42" rx="46" ry="11"
              fill="rgba(210,170,60,0.28)" stroke="rgba(210,160,50,0.6)" strokeWidth="1.2"
              clipPath="url(#pf-rfcl)"
              style={{ animation: "pf-ring-shimmer 3.2s ease-in-out 0.4s infinite" }} />
          </svg>
        </span>
      </button>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   GENERIC CONSTELLATION EGG
   Handles any constellation: hover/click stars to trace edges.
───────────────────────────────────────────────────────────── */
interface ConstellationDef {
  id: string;
  stars: [number, number][];
  edges: [number, number][];
  viewW: number;
  viewH: number;
  svgW: number;
  svgH: number;
  light?: boolean;
  extra?: (done: boolean) => React.ReactNode;
}

function ConstellationEgg({ def, className, style }: { def: ConstellationDef; className?: string; style?: React.CSSProperties }) {
  const [visited, setVisited] = useState<boolean[]>(() => Array(def.stars.length).fill(false));
  const done = visited.every(Boolean);

  useEffect(() => { if (done) markFound(def.id); }, [done, def.id]);

  useEffect(() => {
    const onReset = () => setVisited(Array(def.stars.length).fill(false));
    window.addEventListener("pf-egg-reset", onReset);
    return () => window.removeEventListener("pf-egg-reset", onReset);
  }, [def.stars.length]);

  const visit = (i: number) => setVisited(v => {
    if (v[i]) return v;
    const n = [...v]; n[i] = true; return n;
  });

  const getStarFill = (isVisited: boolean) => {
    if (!isVisited) return def.light ? "rgba(13,27,62,0.3)" : "rgba(255,255,255,0.3)";
    if (done) return def.light ? AMBER : GOLD;
    return def.light ? NAVY : "rgba(255,255,255,0.92)";
  };

  const lineStroke = def.light
    ? (done ? `rgba(232,160,32,0.75)` : `rgba(13,27,62,0.3)`)
    : (done ? `rgba(232,200,40,0.75)` : `rgba(255,255,255,0.3)`);

  const glowColor = def.light ? AMBER : GOLD;

  return (
    <span className={className} style={style}>
      <svg viewBox={`0 0 ${def.viewW} ${def.viewH}`} width={def.svgW} height={def.svgH}
        style={{ overflow: "visible", display: "block" }}>
        {def.edges.map(([a, b], i) => (
          <line key={i}
            x1={def.stars[a][0]} y1={def.stars[a][1]}
            x2={def.stars[b][0]} y2={def.stars[b][1]}
            stroke={lineStroke}
            strokeWidth="1"
            style={{
              opacity: visited[a] && visited[b] ? 1 : 0,
              transition: "opacity 0.5s ease, stroke 0.5s ease",
              filter: done ? `drop-shadow(0 0 4px ${glowColor})` : undefined,
            }}
          />
        ))}
        {def.extra?.(done)}
        {def.stars.map(([x, y], i) => (
          <g key={i} onMouseEnter={() => visit(i)} onClick={() => visit(i)} style={{ cursor: "pointer" }}>
            <circle cx={x} cy={y} r="13" fill="transparent" />
            <path
              d={s4(x, y, visited[i] ? 3.4 : 2.2)}
              fill={getStarFill(visited[i])}
              style={{
                transition: "fill 0.3s ease",
                filter: visited[i] ? `drop-shadow(0 0 5px ${done ? glowColor : (def.light ? NAVY : "rgba(200,220,255,0.9)")})` : undefined,
                animation: visited[i] ? `pf-twinkle2 ${2 + i * 0.3}s ease-in-out infinite` : undefined,
              }}
            />
          </g>
        ))}
      </svg>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   CONSTELLATION DEFINITIONS
───────────────────────────────────────────────────────────── */
const BIGDIPPER_DEF: ConstellationDef = {
  id: "bigdipper",
  // Alkaid, Mizar, Alioth, Megrez, Dubhe, Merak, Phad
  stars: [[22,48],[48,58],[76,62],[104,56],[130,40],[138,72],[108,88]],
  edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]],
  viewW: 165, viewH: 105, svgW: 185, svgH: 118,
};

const LITTLEDIPPER_DEF: ConstellationDef = {
  id: "littledipper",
  // Polaris, Yildun, ..., Kochab, Pherkad, ..., ...
  stars: [[152,20],[128,34],[104,46],[84,58],[68,44],[52,36],[50,56]],
  edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]],
  viewW: 165, viewH: 78, svgW: 185, svgH: 88,
};

const CASSIOPEIA_DEF: ConstellationDef = {
  id: "cassiopeia",
  // W shape: 5 stars
  stars: [[20,58],[52,26],[84,52],[116,20],[148,50]],
  edges: [[0,1],[1,2],[2,3],[3,4]],
  viewW: 168, viewH: 78, svgW: 188, svgH: 88,
};

const ORION_DEF: ConstellationDef = {
  id: "orion",
  // Betelgeuse, Bellatrix, Mintaka, Alnilam, Alnitak, Rigel, Saiph
  stars: [[52,28],[108,32],[58,68],[82,64],[106,62],[120,108],[62,110]],
  edges: [[0,2],[1,4],[0,1],[2,3],[3,4],[4,5],[2,6]],
  viewW: 165, viewH: 128, svgW: 185, svgH: 144,
};

const LEPUS_DEF: ConstellationDef = {
  id: "lepus",
  // Arneb, Nihal, + 4 fainter stars — the hare beneath Orion
  stars: [[48,88],[80,72],[114,78],[122,98],[96,112],[60,110]],
  edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[1,4]],
  viewW: 165, viewH: 128, svgW: 185, svgH: 144,
};

const CATCONST_DEF: ConstellationDef = {
  id: "constellation",
  stars: [[58,104],[50,76],[62,46],[52,26],[80,30],[98,58],[124,70],[146,38],[108,104]],
  edges: [[3,2],[2,4],[2,1],[1,0],[4,5],[5,6],[6,7],[6,8]],
  viewW: 200, viewH: 130, svgW: 216, svgH: 140,
  extra: (done) => done ? (
    <g stroke="rgba(232,200,40,0.5)" strokeWidth="0.7" style={{ animation: "pf-pop 0.6s ease" }}>
      <line x1="56" y1="50" x2="38" y2="46" />
      <line x1="56" y1="54" x2="38" y2="56" />
    </g>
  ) : null,
};

/* ─────────────────────────────────────────────────────────────
   CONSTELLATION EXPORTS — thin wrappers with position
───────────────────────────────────────────────────────────── */
export function BigDipper() {
  return (
    <ConstellationEgg
      def={BIGDIPPER_DEF}
      style={{ position: "absolute", right: "clamp(14rem, 30vw, 36rem)", top: "clamp(4rem, 10vh, 7rem)", zIndex: 2 }}
    />
  );
}

export function LittleDipper() {
  return (
    <ConstellationEgg
      def={LITTLEDIPPER_DEF}
      style={{ position: "absolute", right: "clamp(9rem, 24vw, 30rem)", top: "clamp(14rem, 28vh, 20rem)", zIndex: 2 }}
    />
  );
}

export function CassiopeiaConst() {
  return <ConstellationEgg def={CASSIOPEIA_DEF} className="pf-spot pf-spot-cass" />;
}

export function OrionConst() {
  return <ConstellationEgg def={ORION_DEF} className="pf-spot pf-spot-orion" />;
}

export function LepusConst() {
  return <ConstellationEgg def={LEPUS_DEF} className="pf-spot pf-spot-lepus" />;
}

export function CatConstellation() {
  return <ConstellationEgg def={CATCONST_DEF} className="pf-spot pf-spot-const" />;
}

/* ─────────────────────────────────────────────────────────────
   8 · VINYL — spins + plays Saturn (Instrumental) on loop
───────────────────────────────────────────────────────────── */
export function VinylDisc({ className = "pf-spot pf-spot-vinyl" }: { className?: string }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (!audioRef.current) {
      const audio = new Audio("/saturn-instrumental.mp3");
      audio.loop = true;
      audioRef.current = audio;
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      void audioRef.current.play().catch(() => {});
      setPlaying(true);
      markFound("vinyl");
    }
  };

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  useEffect(() => {
    const onReset = () => { audioRef.current?.pause(); setPlaying(false); };
    window.addEventListener("pf-egg-reset", onReset);
    return () => window.removeEventListener("pf-egg-reset", onReset);
  }, []);

  return (
    <span className={className}>
      <button onClick={toggle} aria-label={playing ? "Stop the record" : "Play the record"}
        title="side b is better"
        style={{ background: "none", border: "none", cursor: "pointer", position: "relative", padding: 0 }}>
        {playing && [0, 1, 2].map(i => (
          <span key={i} aria-hidden style={{
            position: "absolute", right: -6 - i * 10, top: 4,
            color: GOLD, fontSize: "1rem", fontFamily: SERIF,
            animation: `pf-note-float 2.2s ease-out ${i * 0.7}s infinite`,
          }}>{i % 2 ? "♪" : "♫"}</span>
        ))}
        <span aria-hidden style={{
          display: "block", width: 104, height: 104, borderRadius: "50%",
          background: "repeating-radial-gradient(circle at 50% 50%, #10141c 0px, #10141c 3px, #161b26 4px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: playing ? "0 0 26px rgba(232,200,40,0.25)" : "0 8px 24px rgba(0,0,0,0.5)",
          animation: playing ? "pf-spin 1.8s linear infinite" : undefined,
          position: "relative",
          margin: "0 auto",
        }}>
          <span style={{
            position: "absolute", inset: "37%", borderRadius: "50%",
            background: `radial-gradient(circle, ${AMBER} 0%, #b87614 85%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#10141c" }} />
          </span>
        </span>
      </button>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   9 · EGG CARTON — one of them is the real deal
───────────────────────────────────────────────────────────── */
export function EggCarton() {
  const [cracked, setCracked] = useState<boolean[]>(Array(6).fill(false));
  const golden = 3;

  useEffect(() => {
    const onReset = () => setCracked(Array(6).fill(false));
    window.addEventListener("pf-egg-reset", onReset);
    return () => window.removeEventListener("pf-egg-reset", onReset);
  }, []);

  const crack = (i: number) => {
    if (cracked[i]) return;
    setCracked(c => { const n = [...c]; n[i] = true; return n; });
    if (i === golden) markFound("eggs");
  };

  return (
    <span style={{ display: "inline-block", marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
      <span style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem",
        backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 8, padding: "0.7rem", width: "fit-content",
      }}>
        {cracked.map((isCracked, i) => (
          <button key={i} onClick={() => crack(i)} aria-label={isCracked ? "Cracked egg" : "Crack this egg"}
            title={isCracked ? undefined : "crack it"}
            style={{
              background: "rgba(8,15,28,0.6)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "50%", width: 52, height: 52, cursor: isCracked ? "default" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
            }}>
            <span key={String(isCracked)} style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: isCracked ? "pf-pop 0.4s ease" : undefined,
            }}>
              {!isCracked ? (
                <span aria-hidden style={{
                  display: "block", width: 24, height: 31,
                  borderRadius: "50% 50% 50% 50% / 60% 60% 42% 42%",
                  background: "linear-gradient(160deg, #f8f5ec 0%, #e2dccb 80%)",
                  boxShadow: "inset -3px -4px 6px rgba(13,27,62,0.12)",
                }} />
              ) : i === golden ? (
                <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden style={{ filter: `drop-shadow(0 0 9px ${GOLD})` }}>
                  <path d={s4(15, 15, 11)} fill={GOLD} />
                </svg>
              ) : (
                <span aria-hidden style={{
                  display: "block", position: "relative", width: 32, height: 25,
                  borderRadius: "55% 45% 52% 48% / 58% 52% 48% 42%",
                  background: "rgba(248,245,236,0.94)",
                }}>
                  <span style={{
                    position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)",
                    width: 13, height: 13, borderRadius: "50%",
                    background: `radial-gradient(circle at 38% 32%, #f0c050 0%, ${AMBER} 80%)`,
                  }} />
                </span>
              )}
            </span>
          </button>
        ))}
      </span>
    </span>
  );
}
