"use client";
import { useRef, useState, useCallback } from "react";

export function PhoneTiltWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Normalise cursor to -1 … +1 within the element
    const nx = ((e.clientX - rect.left) / rect.width)  * 2 - 1;
    const ny = ((e.clientY - rect.top)  / rect.height) * 2 - 1;
    // rotateY: positive = tilt right face away; rotateX: positive = tilt top away
    setTilt({ x: ny * -10, y: nx * 7 });
    setActive(true);
  }, []);

  const onLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setActive(false);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${active ? 1.025 : 1})`,
        transition: active
          ? "transform 0.08s linear"
          : "transform 0.55s cubic-bezier(0.34,1.56,0.64,1)",
        willChange: "transform",
        filter: active
          ? "drop-shadow(0 24px 48px rgba(0,0,0,0.5))"
          : "drop-shadow(0 8px 24px rgba(0,0,0,0.3))",
      }}
    >
      {children}
    </div>
  );
}
