"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const LIME = "#C5E84A";
const INK  = "#080f1c";
const WORD = "PlateBook";
/* letter delay: each letter staggers by 80ms */
const LETTER_STAGGER = 80;    // ms per letter
const LETTERS_DONE   = LETTER_STAGGER * WORD.length + 300; // all letters in + settle
const SLIDE_START    = LETTERS_DONE + 200; // ms: when logo slides left
const PHONE_START    = SLIDE_START + 350;  // ms: phone begins rising

export default function PlateBookCard({ href, tag, pad }: {
  href: string; tag: string; pad: string;
}) {
  const [tick, setTick] = useState(0); // increments to restart animation cycle
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Auto-restart the animation every ~4.8s */
  useEffect(() => {
    const CYCLE = 4800;
    const schedule = () => {
      timerRef.current = setTimeout(() => {
        setTick(t => t + 1);
        schedule();
      }, CYCLE);
    };
    schedule();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const logoSlid  = tick > 0; // after first cycle, always slid (re-triggers via key)
  const phoneUp   = tick > 0;

  return (
    <>
      <style>{`
        @keyframes pb-letter {
          0%   { opacity: 0; transform: translateY(28px) scale(0.7); }
          55%  { opacity: 1; transform: translateY(-8px) scale(1.08); }
          75%  { transform: translateY(3px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pb-logo-slide {
          from { transform: translateX(0); }
          to   { transform: translateX(-28%); }
        }
        @keyframes pb-phone-rise {
          from { transform: translateY(105%); }
          to   { transform: translateY(8%); }
        }
        @keyframes pb-tag-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <a
        href={href}
        key={tick}   /* remount on each cycle to reset CSS animations */
        className="flex flex-col justify-end cursor-pointer group relative overflow-hidden no-underline transition-transform duration-300 hover:scale-[1.012]"
        style={{ aspectRatio: "16/10", padding: pad, backgroundColor: LIME }}
      >
        {/* Subtle ink hover tint */}
        <div aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300"
          style={{ backgroundColor: INK }} />

        {/* ── Wordmark centred initially, then slides left ── */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "baseline",
            gap: 0,
            animation: `pb-logo-slide 0.55s cubic-bezier(0.4,0,0.2,1) ${SLIDE_START}ms both`,
          }}
        >
          {WORD.split("").map((ch, i) => (
            <span
              key={`${tick}-${i}`}
              style={{
                fontFamily: "var(--font-milker), sans-serif",
                fontSize: "clamp(2rem, 5.5vw, 4.2rem)",
                color: INK,
                lineHeight: 1,
                display: "inline-block",
                opacity: 0,
                animation: `pb-letter 0.55s cubic-bezier(0.34,1.56,0.64,1) ${i * LETTER_STAGGER}ms both`,
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* ── Phone mockup slides up ── */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: "8%",
            bottom: 0,
            width: "clamp(120px, 22%, 190px)",
            aspectRatio: "9/19.5",
            animation: `pb-phone-rise 0.65s cubic-bezier(0.22,1,0.36,1) ${PHONE_START}ms both`,
            transform: "translateY(105%)", /* start hidden below */
          }}
        >
          {/* Phone shell */}
          <div style={{
            position: "relative", width: "100%", height: "100%",
            borderRadius: "clamp(16px, 3vw, 26px)",
            border: "2px solid rgba(255,255,255,0.18)",
            boxShadow: "0 0 0 4px rgba(0,0,0,0.25), 0 24px 60px rgba(0,0,0,0.35)",
            overflow: "hidden",
            backgroundColor: "#111",
          }}>
            <Image
              src="/pb-home.png"
              alt="PlateBook home screen"
              fill
              style={{ objectFit: "cover", objectPosition: "top center" }}
              sizes="190px"
            />
            {/* Dynamic Island */}
            <div aria-hidden style={{
              position: "absolute", top: "1.4%", left: "50%",
              transform: "translateX(-50%)",
              width: "32%", height: "4.3%",
              backgroundColor: "#000", borderRadius: 999, zIndex: 10,
            }} />
          </div>
        </div>

        {/* ── Card label (bottom-left, fades in with phone) ── */}
        <div className="relative z-10 flex flex-col gap-1"
          style={{
            opacity: 0,
            animation: `pb-tag-fade 0.4s ease ${PHONE_START + 200}ms both`,
          }}
        >
          <span style={{
            fontSize: "clamp(0.65rem, 0.9vw, 0.8rem)",
            color: "rgba(8,15,28,0.45)",
          }}>{tag}</span>
          <span style={{
            fontFamily: "var(--font-milker), sans-serif",
            fontSize: "clamp(1rem, 1.6vw, 1.4rem)",
            color: INK,
            lineHeight: 1,
          }}>PlateBook</span>
        </div>
      </a>
    </>
  );
}
