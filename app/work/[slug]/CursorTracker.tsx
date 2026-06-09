"use client";
import { useEffect } from "react";

/* Tracks cursor position and writes --cx / --cy to :root.
   The dots background in T.dots uses var(--cx, 78%) var(--cy, 18%)
   so the radial glow follows the cursor across every dark section.  */
export function CursorTracker() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = ((e.clientX / window.innerWidth)  * 100).toFixed(1);
      const y = ((e.clientY / window.innerHeight) * 100).toFixed(1);
      document.documentElement.style.setProperty("--cx", x + "%");
      document.documentElement.style.setProperty("--cy", y + "%");
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return null;
}
