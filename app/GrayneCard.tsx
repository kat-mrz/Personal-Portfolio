"use client";

export default function GrayneCard({ href, tag, badge, pad }: {
  href: string; tag: string; badge?: string; pad: string;
}) {
  return (
    <a
      href={href}
      className="flex flex-col justify-end cursor-pointer group relative overflow-hidden no-underline transition-transform duration-300 hover:scale-[1.012]"
      style={{ aspectRatio: "16/10", padding: pad }}
    >
      {/* Warm sandy background */}
      <div aria-hidden className="absolute inset-0" style={{
        background:
          "radial-gradient(ellipse at 58% 38%, #f0d898 0%, #d48a42 22%, #b05a28 46%, #782e10 72%, #341208 100%)",
      }} />

      {/* Gradient scrim — Dualité convention */}
      <div aria-hidden className="absolute inset-0" style={{
        background:
          "linear-gradient(to top, rgba(13,27,62,0.98) 0%, rgba(13,27,62,0.97) 15%, rgba(13,27,62,0.70) 28%, rgba(13,27,62,0.15) 40%, transparent 52%)",
        pointerEvents: "none",
      }} />

      {/* "Grayne" — stationary in the centre, above the scrim zone */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        paddingBottom: "14%",
      }}>
        <span style={{
          fontFamily: "var(--font-lexend-giga), sans-serif",
          fontSize: "clamp(1.8rem, 4vw, 3.8rem)",
          color: "#ffffff",
          fontWeight: 700,
          letterSpacing: "0.04em",
          textShadow: "0 2px 24px rgba(40,16,4,0.55), 0 1px 4px rgba(0,0,0,0.4)",
        }}>
          Grayne
        </span>
      </div>

      {/* Hover tint */}
      <div aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300"
        style={{ backgroundColor: "#fff8e8" }} />

      {/* Card label — Dualité convention */}
      <div className="relative z-10 flex flex-col gap-1">
        {badge && (
          <span className="self-start text-white font-semibold rounded-full"
            style={{ fontSize: "clamp(0.6rem, 0.72vw, 0.68rem)", padding: "0.3em 0.9em", backgroundColor: "#e8a020", letterSpacing: "0.02em" }}>
            {badge}
          </span>
        )}
        <span style={{ fontSize: "clamp(0.65rem, 0.9vw, 0.8rem)", color: "rgba(255,255,255,0.5)", display: "block" }}>
          {tag}
        </span>
        <span style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "clamp(1rem, 1.6vw, 1.5rem)",
          color: "#fff",
          fontWeight: 700,
          lineHeight: 1.2,
        }}>
          Grayne
        </span>
      </div>
    </a>
  );
}
