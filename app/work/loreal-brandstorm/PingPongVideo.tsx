"use client";

import { useRef, useEffect, type CSSProperties } from "react";

// Plays forward, scrubs back to the start, then plays forward again.
// <video> has no native reverse playback, so the rewind steps currentTime
// backwards on requestAnimationFrame.
export function PingPongVideo({ src, style }: { src: string; style?: CSSProperties }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let raf = 0;
    let last = 0;

    /* Defer fetching the video until it's near the viewport */
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        void v.play().catch(() => {});
        io.disconnect();
      }
    }, { rootMargin: "200px" });
    io.observe(v);

    const stepBack = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      const next = v.currentTime - dt;
      if (next <= 0.04) {
        v.currentTime = 0;
        v.play().catch(() => {});
        return;
      }
      v.currentTime = next;
      raf = requestAnimationFrame(stepBack);
    };

    const onEnded = () => {
      last = performance.now();
      raf = requestAnimationFrame(stepBack);
    };

    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("ended", onEnded);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return <video ref={ref} src={src} muted playsInline preload="metadata" style={style} />;
}
