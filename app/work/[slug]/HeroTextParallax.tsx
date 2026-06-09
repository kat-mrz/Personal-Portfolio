"use client";
import { useEffect, useRef } from "react";

/*
  Wraps hero text content with a scroll-driven translateY at a slower rate
  than the bottle (0.12 vs 0.45), creating a multi-plane parallax depth effect.
  Children are server-rendered and passed in — no hydration issues.

  Uses a DOM ref instead of useState so scroll events write directly to the
  element's style without triggering any React re-render.
*/
export function HeroTextParallax({ children, rate = 0.12 }: { children: React.ReactNode; rate?: number }) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<ReturnType<typeof requestAnimationFrame>>(0);
  const aliveRef = useRef(false);

  useEffect(() => {
    aliveRef.current = true;
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (aliveRef.current && wrapRef.current) {
          wrapRef.current.style.transform = `translateY(${(-window.scrollY * rate).toFixed(1)}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      aliveRef.current = false;
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [rate]);

  return (
    <div ref={wrapRef} style={{
      position: "relative",
      zIndex: 1,
      willChange: "transform",
    }}>
      {children}
    </div>
  );
}
