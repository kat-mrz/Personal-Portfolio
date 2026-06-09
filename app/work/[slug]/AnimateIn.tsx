"use client";
import React, { useEffect, useRef, useState } from "react";

interface AnimateInProps {
  children: React.ReactNode;
  delay?: number;        // seconds
  distance?: string;    // translateY amount, default "1.5rem"
  style?: React.CSSProperties;
  className?: string;
}

/* Fades + slides the child up when it enters the viewport.
   One-way (stays visible once triggered). Wraps in a plain div
   so it's safe to use around any server-rendered children.        */
export function AnimateIn({ children, delay = 0, distance = "1.5rem", style, className }: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `translateY(${distance})`,
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
