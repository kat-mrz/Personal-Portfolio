"use client";

import { useEffect, useRef, useState } from "react";

/* ── tiny SVG pieces ─────────────────────────────────────── */
function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" className={className} aria-hidden>
      <path d="M20 0 L22.5 17.5 L40 20 L22.5 22.5 L20 40 L17.5 22.5 L0 20 L17.5 17.5 Z" />
    </svg>
  );
}

/* ── navbar ───────────────────────────────────────────────── */
function Navbar({ light }: { light?: boolean }) {
  const textColor = light ? "text-[#2d4a2d]" : "text-white";
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-colors duration-300 ${light ? "bg-[#f5f0e8] shadow-sm" : "bg-transparent"}`}>
      <div className={`flex items-center gap-2 font-bold text-lg tracking-tight ${textColor}`}>
        <Star className="w-5 h-5 text-[#e8a020]" />
        <span style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Katrina Mrzljak</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {["About me", "Resume", "Work"].map((link) => (
          <a key={link} href={`#${link.toLowerCase().replace(" ", "")}`}
            className={`text-sm font-medium hover:opacity-60 transition-opacity ${textColor}`}>{link}</a>
        ))}
        <a href="#contact" className="bg-[#e8a020] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#d4911c] transition-colors">
          Get in touch!
        </a>
      </div>
      <button className={`md:hidden flex flex-col gap-1.5 ${textColor}`} aria-label="menu">
        <span className="block w-6 h-0.5 bg-current" />
        <span className="block w-6 h-0.5 bg-current" />
        <span className="block w-4 h-0.5 bg-current" />
      </button>
    </nav>
  );
}

/* ── hero section ─────────────────────────────────────────── */
const PORTFOLIO_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-playfair), Georgia, serif",
  fontSize: "clamp(4rem, 11vw, 10rem)",
  letterSpacing: "-0.02em",
};

function HeroSection() {
  return (
    <section id="hero" className="relative bg-[#2d4a2d] min-h-screen">

      {/* ── Mobile hero ── */}
      <div className="md:hidden flex flex-col justify-between min-h-screen px-6 pt-24 pb-12 overflow-hidden">
        <div className="text-center">
          <h1 className="text-white font-black leading-[0.88] mb-6"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(3.5rem, 18vw, 5.5rem)", letterSpacing: "-0.02em" }}>
            PORTFOLIO
          </h1>
          <p className="text-white/70 text-sm leading-relaxed max-w-xs mx-auto">
            I&apos;m a product designer passionate about creating elevated experiences through engaging consumer journeys.
          </p>
        </div>
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <span className="text-white/50 tracking-widest uppercase text-xs block mb-2">Find me</span>
            {[
              { label: "LI: /katrina-mrzljak", href: "https://ca.linkedin.com/in/katrina-mrzljak" },
              { label: "IG: @yourhandle", href: "#" },
              { label: "BE: /yourhandle", href: "#" },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="block text-white font-medium hover:text-[#e8a020] transition-colors text-sm leading-relaxed">{label}</a>
            ))}
          </div>
          <a href="#about" className="rounded-full bg-[#e8a020] text-white font-semibold flex items-center justify-center text-center text-sm leading-snug hover:bg-[#d4911c] transition-colors w-24 h-24">
            Scroll<br />down
          </a>
        </div>
      </div>

      {/* ── Desktop hero ── */}
      <div className="hidden md:block relative h-screen overflow-visible">
        <Star className="absolute top-28 left-[34%] w-6 h-6 text-[#e8a020] z-10" />
        <Star className="absolute top-[58%] left-[34%] w-3 h-3 text-[#e8a020] opacity-40 z-10" />
        <Star className="absolute bottom-24 right-12 w-7 h-7 text-[#e8a020] z-10" />

        <div className="absolute inset-x-0 z-10 select-none pointer-events-none" style={{ top: "14%" }}>
          <div aria-hidden className="font-black leading-[0.88] invisible" style={PORTFOLIO_STYLE}>PORTFOLIO</div>
          {[{ stroke: 0.18, opacity: 1 }, { stroke: 0.13, opacity: 0.75 }, { stroke: 0.09, opacity: 0.5 }].map(({ stroke, opacity }, i) => (
            <span key={i} aria-hidden className="block text-center font-black leading-[0.88]"
              style={{ ...PORTFOLIO_STYLE, WebkitTextStroke: `1.5px rgba(255,255,255,${stroke})`, color: "transparent", opacity }}>
              PORTFOLIO
            </span>
          ))}
        </div>

        <div className="absolute z-20" style={{ left: "12%", top: "calc(14vh + clamp(1.76rem, 4.84vw, 4.4rem) + min(36vh, 27vw))", transform: "translateY(-50%)", height: "min(65vh, 49vw)", aspectRatio: "3/4" }}>
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-[#e8a020]" style={{ transform: "translate(-1.1vw, 1.1vw)" }} />
            <div className="absolute inset-0 bg-[#1c321c] overflow-hidden flex items-center justify-center">
              <span className="text-white/20 text-xs text-center px-4 leading-relaxed">Your photo here<br />(use Next.js &lt;Image&gt;)</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 z-30 select-none pointer-events-none" style={{ top: "14%" }}>
          <h1 className="text-white font-black text-center leading-[0.88]" style={PORTFOLIO_STYLE}>PORTFOLIO</h1>
        </div>

        <div className="absolute z-40 bg-[#2d4a2d] flex flex-col justify-end"
          style={{ right: "8%", bottom: "calc(86vh - 19.36vw + 0.75vw - 15px)", width: "16vw", padding: "1.2vw 1.25vw" }}>
          <span className="text-white/50 tracking-widest uppercase mb-2 block" style={{ fontSize: "clamp(8px, 0.8vw, 11px)" }}>Find me</span>
          {[
            { label: "LI: /katrina-mrzljak", href: "https://ca.linkedin.com/in/katrina-mrzljak" },
            { label: "IG: @yourhandle", href: "#" },
            { label: "BE: /yourhandle", href: "#" },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="block text-white font-medium hover:text-[#e8a020] transition-colors leading-relaxed" style={{ fontSize: "clamp(10px, 1.1vw, 15px)" }}>{label}</a>
          ))}
        </div>

        <div className="absolute z-40" style={{ right: "8%", top: "calc(14vh + 19.36vw + 5px)", width: "16vw", height: "1.5px", backgroundColor: "#e8a020" }} />

        <div className="absolute z-40 bg-[#2d4a2d]" style={{ right: "8%", top: "calc(14vh + 19.36vw + 0.75vw)", width: "16vw", padding: "1.2vw 1.25vw" }}>
          <p className="text-white font-bold leading-relaxed" style={{ fontSize: "clamp(10px, 1vw, 14px)", textAlign: "left" }}>
            I&apos;m a product designer passionate about creating elevated experiences through engaging consumer journeys.
          </p>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-40">
          <a href="#about" className="rounded-full bg-[#e8a020] text-white font-semibold flex items-center justify-center text-center leading-snug hover:bg-[#d4911c] transition-colors"
            style={{ width: "clamp(80px, 10vw, 128px)", height: "clamp(80px, 10vw, 128px)", fontSize: "clamp(10px, 1vw, 14px)" }}>
            Scroll<br />down
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── about section ────────────────────────────────────────── */
function AboutSection() {
  return (
    <section id="about" className="relative bg-[#f5f0e8] overflow-visible" style={{ position: "relative", zIndex: 2 }}>
      {/* anchor so #contact nav link lands here on all viewports */}
      <div id="contact" className="absolute top-0 pointer-events-none" aria-hidden />

      {/* ── Mobile ── */}
      <div className="md:hidden px-6 pb-10" style={{ paddingTop: "clamp(4rem, 12vw, 6rem)" }}>
        <h2 className="text-[#1a1a1a] leading-tight font-black mb-4"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2.2rem, 10vw, 4rem)" }}>
          Hello,<br />I&apos;m Kat!
        </h2>
        <p className="text-[#444] leading-relaxed mb-6" style={{ fontSize: "clamp(0.875rem, 4vw, 1rem)" }}>
          I&apos;m a 4th year BUCS student at UBC Sauder building experience-focused products. I&apos;m excited about creating immersive experiences through storytelling, whether it&apos;s through mindfully designed user-journeys or a well-crafted marketing campaign.
        </p>
        <a href="https://ca.linkedin.com/in/katrina-mrzljak" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-[#e8a020] text-white font-medium rounded-full hover:bg-[#d4911c] transition-colors mb-8"
          style={{ fontSize: "clamp(0.8rem, 3.5vw, 0.95rem)", padding: "0.6rem 1.25rem" }}>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 w-4 h-4">
            <circle cx="8.5" cy="8.5" r="5.5" /><line x1="13" y1="13" x2="18" y2="18" strokeLinecap="round" />
          </svg>
          linkedin.com/in/katrina-mrzljak
        </a>
        <div className="w-full max-w-sm mx-auto">
          <div className="w-full bg-[#2d4a2d] rounded-[2px] overflow-hidden flex items-center justify-center" style={{ aspectRatio: "3/4" }}>
            <span className="text-white/25 text-xs text-center px-4">Your photo here</span>
          </div>
          <div className="bg-[#1a1a1a] text-white w-full p-5">
            <h4 className="font-bold mb-3" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1.1rem" }}>Contact</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#e8a020] w-4 h-4">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Vancouver, BC (open to relocation)
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#e8a020] w-4 h-4">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                katrina.mrzljak@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:block" style={{ paddingTop: "clamp(6rem, 10vw, 10rem)", paddingLeft: "10.5vw", paddingRight: "5vw", paddingBottom: "6vw" }}>
        {/* Left column */}
        <div style={{ width: "46vw" }}>
          <h2 className="text-[#1a1a1a] leading-tight font-black"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", marginBottom: "1.5vw" }}>
            Hello,<br />I&apos;m Kat!
          </h2>
          <p className="text-[#444] leading-relaxed"
            style={{ fontSize: "clamp(0.85rem, 1.15vw, 1rem)", maxWidth: "32vw", marginBottom: "2.5vw" }}>
            I&apos;m a 4th year BUCS student at UBC Sauder building experience-focused products. I&apos;m excited about creating immersive experiences through storytelling, whether it&apos;s through mindfully designed user-journeys or a well-crafted marketing campaign.
          </p>
          <a href="https://ca.linkedin.com/in/katrina-mrzljak" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#e8a020] text-white font-medium rounded-full hover:bg-[#d4911c] transition-colors"
            style={{ fontSize: "clamp(0.8rem, 1.1vw, 1rem)", padding: "clamp(0.5rem, 0.75vw, 0.85rem) clamp(1rem, 1.6vw, 1.6rem)", marginBottom: "3vw", display: "inline-flex" }}>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"
              style={{ width: "clamp(14px, 1.1vw, 18px)", height: "clamp(14px, 1.1vw, 18px)" }}>
              <circle cx="8.5" cy="8.5" r="5.5" /><line x1="13" y1="13" x2="18" y2="18" strokeLinecap="round" />
            </svg>
            linkedin.com/in/katrina-mrzljak
          </a>
        </div>

        {/* Photo + Contact group — centred at 75vw */}
        <div style={{ position: "absolute", left: "calc(75vw - 14.5vw)", top: "clamp(2rem, 4vw, 4rem)", width: "29vw", zIndex: 2 }}>
          <div className="w-full bg-[#2d4a2d] rounded-[2px] overflow-hidden flex items-center justify-center" style={{ aspectRatio: "3/4" }}>
            <span className="text-white/25 text-xs text-center px-4">Your photo here</span>
          </div>
          <div className="bg-[#1a1a1a] text-white w-full"
            style={{ position: "absolute", top: "100%", left: 0, padding: "clamp(1rem, 1.5vw, 1.5rem) clamp(1.2rem, 1.75vw, 1.75rem)", zIndex: 3 }}>
            <h4 className="font-bold" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1rem, 1.4vw, 1.25rem)", marginBottom: "1vw" }}>Contact</h4>
            <ul style={{ fontSize: "clamp(0.7rem, 0.95vw, 0.875rem)", display: "flex", flexDirection: "column", gap: "0.8vw" }}>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#e8a020]" style={{ width: "clamp(12px, 1vw, 16px)", height: "clamp(12px, 1vw, 16px)" }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Vancouver, BC (open to relocation)
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#e8a020]" style={{ width: "clamp(12px, 1vw, 16px)", height: "clamp(12px, 1vw, 16px)" }}>
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                katrina.mrzljak@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Ghost RESUME text */}
        <div aria-hidden className="select-none pointer-events-none"
          style={{ position: "absolute", left: "52.5vw", width: "45vw", bottom: "-18vw", zIndex: 1 }}>
          {[
            { stroke: 0.42, opacity: 1 }, { stroke: 0.29, opacity: 0.82 },
            { stroke: 0.18, opacity: 0.6 }, { stroke: 0.10, opacity: 0.4 },
          ].map(({ stroke, opacity }, i) => (
            <span key={i} className="block font-black leading-[0.88]"
              style={{ ...RESUME_STYLE, fontSize: "clamp(2.8rem, 7.7vw, 7.7rem)", WebkitTextStroke: `2px rgba(232,160,32,${stroke})`, color: "transparent", opacity, textAlign: "center" }}>
              RESUME
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── resume section ───────────────────────────────────────── */
const RESUME_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-playfair), Georgia, serif",
  fontSize: "clamp(3rem, 7.5vw, 7.5rem)",
  letterSpacing: "-0.02em",
};

function ResumeSection() {
  const tools = ["Figma", "Adobe XD", "Illustrator", "Photoshop", "After Effects", "Webflow", "Framer", "Notion"];
  const skills = ["UX Research", "Wireframing", "Prototyping", "Brand Strategy", "Visual Design", "User Testing"];
  const experiences = [
    { dates: "2024 – Present", role: "Product Designer", org: "Company Name", desc: "Brief description of role and key contributions." },
    { dates: "2023 – 2024", role: "UX Research Intern", org: "Company Name", desc: "Brief description of role and key contributions." },
  ];

  return (
    <section id="resume" className="relative bg-[#2d4a2d] overflow-visible" style={{ position: "relative", zIndex: 1 }}>

      {/* ── Mobile ── */}
      <div className="md:hidden px-6 py-10 flex flex-col gap-8">
        {/* Education */}
        <div>
          <h3 className="text-[#e8a020] font-black mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.8rem, 8vw, 2.5rem)" }}>
            Education
          </h3>
          <div className="flex items-start gap-3">
            <div className="text-[#e8a020] shrink-0 mt-1 w-3 h-3"><Star className="w-full h-full" /></div>
            <div>
              <p className="text-[#e8a020] font-semibold text-sm">2023 – Present</p>
              <p className="text-white font-bold">University of British Columbia</p>
              <p className="text-white/60 text-sm">Business and Computer Science Dual Major</p>
            </div>
          </div>
        </div>

        {/* Experiences */}
        <div className="bg-[#e8a020] p-6">
          <h3 className="text-white font-black mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.8rem, 8vw, 2.5rem)" }}>
            Experiences
          </h3>
          {experiences.map((exp, i) => (
            <div key={i} className="flex items-start gap-3" style={{ marginBottom: i < experiences.length - 1 ? "1.5rem" : 0 }}>
              <div className="text-white shrink-0 mt-1 w-3 h-3"><Star className="w-full h-full" /></div>
              <div>
                <p className="text-white/70 font-semibold text-xs">{exp.dates}</p>
                <p className="text-white font-bold text-sm">{exp.role} — {exp.org}</p>
                <p className="text-white/80 text-xs">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-white font-black mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.8rem, 8vw, 2.5rem)" }}>
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => <span key={s} className="border border-white/30 text-white/80 text-sm px-3 py-1">{s}</span>)}
          </div>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-white font-black mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1.8rem, 8vw, 2.5rem)" }}>
            Tools
          </h3>
          <div className="flex flex-wrap gap-2">
            {tools.map(t => <span key={t} className="bg-white/10 text-white/80 text-sm px-3 py-1">{t}</span>)}
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:flex items-start"
        style={{ paddingTop: "clamp(2rem, 4vw, 4rem)", paddingLeft: "5vw", paddingRight: "5vw", paddingBottom: "clamp(2rem, 3vw, 3rem)", gap: "4vw" }}>

        {/* Spacer — keeps Skills+Tools horizontally where Education used to be */}
        <div style={{ width: "36vw", flexShrink: 0 }} aria-hidden />

        {/* Skills + Tools */}
        <div style={{ flex: 1 }}>
          <h3 className="text-white font-black"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "2vw" }}>
            Skills
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75vw", marginBottom: "3vw" }}>
            {skills.map(s => <span key={s} className="border border-white/30 text-white/80" style={{ fontSize: "clamp(0.75rem, 1vw, 0.9rem)", padding: "0.4vw 1vw" }}>{s}</span>)}
          </div>
          <h3 className="text-white font-black"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "2vw" }}>
            Tools
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75vw" }}>
            {tools.map(t => <span key={t} className="bg-white/10 text-white/80" style={{ fontSize: "clamp(0.75rem, 1vw, 0.9rem)", padding: "0.4vw 1vw" }}>{t}</span>)}
          </div>
        </div>

        {/* Education — absolute, heading aligned with Skills heading */}
        <div className="bg-[#2d4a2d]"
          style={{ position: "absolute", top: "clamp(1rem, 2vw, 2rem)", left: "5vw", width: "36vw", zIndex: 2,
            padding: "clamp(1rem, 2vw, 2rem) clamp(1.2rem, 2.5vw, 2.5rem)" }}>
          <h3 className="text-[#e8a020] font-black"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "1.5vw" }}>
            Education
          </h3>
          <div className="flex items-start" style={{ gap: "1.2vw" }}>
            <div className="text-[#e8a020] shrink-0 mt-1" style={{ width: "clamp(10px, 1.1vw, 14px)", height: "clamp(10px, 1.1vw, 14px)" }}>
              <Star className="w-full h-full" />
            </div>
            <div>
              <p className="text-[#e8a020] font-semibold" style={{ fontSize: "clamp(0.7rem, 0.95vw, 0.85rem)" }}>2023 – Present</p>
              <p className="text-white font-bold" style={{ fontSize: "clamp(0.85rem, 1.15vw, 1rem)" }}>University of British Columbia</p>
              <p className="text-white/60" style={{ fontSize: "clamp(0.7rem, 0.9vw, 0.8rem)" }}>Business and Computer Science Dual Major</p>
            </div>
          </div>
        </div>

        {/* Experiences — absolute, top aligned with Tools heading, overflows below section */}
        <div className="bg-[#e8a020]"
          style={{ position: "absolute", top: "18vw", left: "5vw", width: "36vw", zIndex: 2,
            padding: "clamp(1.5rem, 2.5vw, 2.5rem)" }}>
          <h3 className="text-white font-black"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "2vw" }}>
            Experiences
          </h3>
          {experiences.map((exp, i) => (
            <div key={i} className="flex items-start" style={{ gap: "1.2vw", marginBottom: i < experiences.length - 1 ? "2vw" : 0 }}>
              <div className="text-white shrink-0 mt-1" style={{ width: "clamp(10px, 1.1vw, 14px)", height: "clamp(10px, 1.1vw, 14px)" }}>
                <Star className="w-full h-full" />
              </div>
              <div>
                <p className="text-white/70 font-semibold" style={{ fontSize: "clamp(0.7rem, 0.95vw, 0.85rem)" }}>{exp.dates}</p>
                <p className="text-white font-bold" style={{ fontSize: "clamp(0.85rem, 1.15vw, 1rem)" }}>{exp.role} — {exp.org}</p>
                <p className="text-white/80" style={{ fontSize: "clamp(0.7rem, 0.9vw, 0.8rem)" }}>{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── work section ────────────────────────────────────────── */
function WorkSection() {
  const projects = [
    { title: "Project Title", tag: "UX Design · 2024" },
    { title: "Project Title", tag: "Brand Identity · 2024" },
    { title: "Project Title", tag: "Product Design · 2023" },
    { title: "Project Title", tag: "UX Research · 2023" },
  ];

  const cards = (cols: number, gap: string, pad: string) => (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap }}>
      {projects.map((p, i) => (
        <div key={i} className="bg-[#2d4a2d] flex flex-col justify-end cursor-pointer group relative overflow-hidden"
          style={{ aspectRatio: "16/10", padding: pad }}>
          <div className="absolute inset-0 bg-[#e8a020] opacity-0 group-hover:opacity-10 transition-opacity" />
          <span className="text-white/30 block" style={{ fontSize: "clamp(0.65rem, 0.9vw, 0.8rem)", marginBottom: "0.4vw" }}>{p.tag}</span>
          <span className="text-white font-bold" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(1rem, 1.6vw, 1.5rem)" }}>{p.title}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section id="work" className="bg-[#f5f0e8]" style={{ paddingBottom: "clamp(4rem, 8vw, 8rem)" }}>

      {/* ── Mobile ── */}
      <div className="md:hidden" style={{ paddingTop: "clamp(4rem, 12vw, 12rem)", paddingLeft: "clamp(1.5rem, 5vw, 5vw)", paddingRight: "clamp(1.5rem, 5vw, 5vw)" }}>
        <h2 className="font-black text-[#1a1a1a]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2.5rem, 6vw, 6rem)", marginBottom: "clamp(2rem, 4vw, 4rem)", textAlign: "right" }}>
          Selected Work
        </h2>
        {cards(1, "0.75rem", "1rem")}
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:block" style={{ paddingTop: "clamp(1rem, 2vw, 2rem)" }}>
        {/* Title stays hugged to the right of the Experiences overlap */}
        <div style={{ paddingLeft: "43vw", paddingRight: "5vw" }}>
          <h2 className="font-black text-[#1a1a1a]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2.5rem, 6vw, 6rem)", marginBottom: "clamp(1.5rem, 3vw, 3rem)", textAlign: "right" }}>
            Selected Work
          </h2>
        </div>
        {/* Cards span full width for larger size */}
        <div style={{ paddingLeft: "5vw", paddingRight: "5vw" }}>
          {cards(2, "2vw", "clamp(0.75rem, 2vw, 2vw)")}
        </div>
      </div>

    </section>
  );
}

/* ── footer ───────────────────────────────────────────────── */
function FooterSection() {
  return (
    <section className="bg-[#1a1a1a] text-white"
      style={{ paddingTop: "clamp(4rem, 7vw, 7rem)", paddingBottom: "clamp(3rem, 5vw, 5rem)", paddingLeft: "clamp(1.5rem, 5vw, 5vw)", paddingRight: "clamp(1.5rem, 5vw, 5vw)" }}>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-0">
        <div>
          <p className="text-white/50 uppercase tracking-widest" style={{ fontSize: "clamp(0.65rem, 0.85vw, 0.8rem)", marginBottom: "1.5vw" }}>
            Let&apos;s work together
          </p>
          <h2 className="font-black" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2.5rem, 6vw, 6rem)", lineHeight: 0.9, marginBottom: "2.5vw" }}>
            Get in<br />touch.
          </h2>
          <a href="mailto:katrina.mrzljak@gmail.com"
            className="inline-flex items-center gap-2 bg-[#e8a020] text-white font-semibold rounded-full hover:bg-[#d4911c] transition-colors"
            style={{ fontSize: "clamp(0.8rem, 1.1vw, 1rem)", padding: "clamp(0.5rem, 0.75vw, 0.85rem) clamp(1.2rem, 1.8vw, 1.8rem)" }}>
            katrina.mrzljak@gmail.com
          </a>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-2 mb-4">
            <Star className="w-4 h-4 text-[#e8a020]" />
            <span className="font-bold" style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)" }}>
              Katrina Mrzljak
            </span>
          </div>
          <p className="text-white/30" style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)" }}>© 2024 — All rights reserved</p>
        </div>
      </div>
    </section>
  );
}

/* ── root ─────────────────────────────────────────────────── */
export default function Home() {
  const [pastHero, setPastHero] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0.05 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar light={pastHero} />
      <div ref={heroRef}>
        <HeroSection />
      </div>
      <AboutSection />
      <ResumeSection />
      <WorkSection />
      <FooterSection />
    </>
  );
}
