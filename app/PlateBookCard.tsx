"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const WORD    = "PlateBook";
const STAGGER = 80;   // ms between letters
const LETTERS_DONE = STAGGER * WORD.length + 320;   // ~1040 ms
const SLIDE_START  = LETTERS_DONE + 180;             // ~1220 ms
const PHONE_START  = SLIDE_START  + 300;             // ~1520 ms
const CYCLE        = 4800;                           // ms between full restarts

/* ── per-letter spring entrance ── */
const LETTER_KF = `
@keyframes pb-letter {
  0%   { opacity:0; transform:translateY(28px)  scale(0.65); }
  55%  { opacity:1; transform:translateY(-8px)  scale(1.08); }
  75%  {            transform:translateY(2px)   scale(0.97); }
  100% { opacity:1; transform:translateY(0)     scale(1);    }
}`;

/* ── phone rise ── */
const PHONE_KF = `
@keyframes pb-phone {
  from { transform:translateY(130%); }
  to   { transform:translateY(-54%); }
}`;

export default function PlateBookCard({ href, tag, pad }: {
  href: string; tag: string; pad: string;
}) {
  const cardRef     = useRef<HTMLAnchorElement>(null);
  const wordRef     = useRef<HTMLDivElement>(null);
  const phoneRef    = useRef<HTMLDivElement>(null);
  /* cycle key forces React to remount the animated subtree */
  const [cycle, setCycle] = useState(0);

  /* inject keyframes once */
  useEffect(() => {
    const id = "pb-kf";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = LETTER_KF + PHONE_KF;
      document.head.appendChild(s);
    }
  }, []);

  const runCycle = useCallback(() => {
    const card  = cardRef.current;
    const word  = wordRef.current;
    const phone = phoneRef.current;
    if (!card || !word || !phone) return;

    /* 1 — slide wordmark left after letters land */
    const slideTimer = setTimeout(() => {
      const cardW = card.offsetWidth;
      const padL  = parseFloat(getComputedStyle(card).paddingLeft) || 16;
      const wordW = word.offsetWidth;
      if (!wordW) return;
      /* shift so left-edge of word aligns with label padding */
      const shiftPct = ((padL + 4 - cardW / 2 + wordW / 2) / wordW) * 100;
      word.style.setProperty("--shift", `${shiftPct.toFixed(2)}%`);
      word.style.transform = `translate(calc(-50% + var(--shift, 0%)), -50%)`;
      word.style.transition = "transform 0.55s cubic-bezier(0.4,0,0.2,1)";
    }, SLIDE_START);

    /* 2 — phone rises */
    const phoneTimer = setTimeout(() => {
      phone.style.animation = `pb-phone 0.65s cubic-bezier(0.22,1,0.36,1) both`;
    }, PHONE_START);

    return () => { clearTimeout(slideTimer); clearTimeout(phoneTimer); };
  }, []);

  /* kick off each cycle */
  useEffect(() => {
    const cleanup = runCycle();
    const loop = setInterval(() => setCycle(c => c + 1), CYCLE);
    return () => { cleanup?.(); clearInterval(loop); };
  }, [cycle, runCycle]);

  /* reset phone transform on remount so it starts off-screen */
  useEffect(() => {
    if (phoneRef.current) {
      phoneRef.current.style.animation = "none";
      phoneRef.current.style.transform = "translateY(130%)";
    }
  }, [cycle]);

  return (
    <a
      ref={cardRef}
      href={href}
      className="flex flex-col justify-end cursor-pointer group relative overflow-hidden no-underline transition-transform duration-300 hover:scale-[1.012]"
      style={{ aspectRatio: "16/10", padding: pad, backgroundColor: "#C5E84A" }}
    >
      {/* ── Phone mockup — rises from below, sits under the scrim ── */}
      <div
        ref={phoneRef}
        aria-hidden
        style={{
          position: "absolute",
          right: "7%", top: "50%",
          width: "clamp(100px, 18%, 160px)",
          aspectRatio: "9/19.5",
          transform: "translateY(130%)",
          pointerEvents: "none",
        }}
      >
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "clamp(12px, 2.5vw, 22px)",
          border: "2px solid rgba(255,255,255,0.18)",
          boxShadow: "0 0 0 3px rgba(0,0,0,0.22), 0 18px 50px rgba(0,0,0,0.3)",
          overflow: "hidden", background: "#111",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/pb-home.avif" alt="" loading="lazy" decoding="async"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
          {/* Dynamic Island */}
          <div style={{
            position: "absolute", top: "1.4%", left: "50%",
            transform: "translateX(-50%)",
            width: "32%", height: "4.3%",
            background: "#000", borderRadius: 999, zIndex: 10,
          }} />
        </div>
      </div>

      {/* Bottom scrim — rendered after phone so it naturally stacks above it */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to top, rgba(13,27,62,0.98) 0%, rgba(13,27,62,0.97) 15%, rgba(13,27,62,0.70) 28%, rgba(13,27,62,0.15) 40%, transparent 52%)",
      }} />

      {/* ── Wordmark — centred, then slides to label-left on cue ── */}
      <div
        ref={wordRef}
        aria-hidden
        key={cycle}
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex", alignItems: "baseline",
          whiteSpace: "nowrap", pointerEvents: "none",
        }}
      >
        {WORD.split("").map((ch, i) => (
          <span key={i} style={{
            fontFamily: "var(--font-milker), sans-serif",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            color: "#080f1c",
            lineHeight: 1,
            display: "inline-block",
            opacity: 0,
            animation: `pb-letter 0.55s cubic-bezier(0.34,1.56,0.64,1) ${i * STAGGER}ms both`,
          }}>
            {ch}
          </span>
        ))}
      </div>

      {/* Hover tint */}
      <div aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300"
        style={{ backgroundColor: "#fff8e8" }} />

      {/* Card label */}
      <div className="relative z-10 flex flex-col gap-1">
        <span style={{ fontSize: "clamp(0.65rem, 0.9vw, 0.8rem)", color: "rgba(255,255,255,0.5)", display: "block" }}>
          {tag}
        </span>
        <span style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(1rem, 1.6vw, 1.5rem)",
          color: "#fff", fontWeight: 700, lineHeight: 1.2,
        }}>
          PlateBook
        </span>
      </div>
    </a>
  );
}
