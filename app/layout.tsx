import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif, Manrope, Lexend_Giga } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

/* Ruigslay — "Portfolio" display text only */
const display = localFont({
  src: [{ path: "./fonts/Ruigslay.ttf", weight: "400", style: "normal" }],
  variable: "--font-display",
  adjustFontFallback: false,
});

/* Milker — PlateBook brand display font */
const milker = localFont({
  src: [{ path: "./fonts/Milker.otf", weight: "400", style: "normal" }],
  variable: "--font-milker",
  adjustFontFallback: false,
});

/* Instrument Serif — all headings */
const playfair = Instrument_Serif({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

/* Lexend Giga — Grayne brand display font */
const lexendGiga = Lexend_Giga({
  variable: "--font-lexend-giga",
  subsets: ["latin"],
  weight: ["400"],
});

/* Manrope — body copy */
const inter = Manrope({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Katrina Mrzljak",
  description: "Portfolio of Katrina Mrzljak — product designer and design engineer crafting elevated, immersive digital experiences.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${playfair.variable} ${inter.variable} ${milker.variable} ${lexendGiga.variable}`}>
      <body className="antialiased">{children}<Analytics /></body>
    </html>
  );
}
