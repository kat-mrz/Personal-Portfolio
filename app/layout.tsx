import type { Metadata } from "next";
import localFont from "next/font/local";
import { Instrument_Serif, Instrument_Sans, Manrope } from "next/font/google";
import "./globals.css";

/* Ruigslay — "Portfolio" display text only */
const display = localFont({
  src: [{ path: "./fonts/Ruigslay.ttf", weight: "400", style: "normal" }],
  variable: "--font-display",
  adjustFontFallback: false,
});

/* Milker — PlateBook brand display font */
const milker = localFont({
  src: [{ path: "../public/Milker.otf", weight: "400", style: "normal" }],
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

/* Instrument Sans — UI text / bio copy */
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
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
    <html lang="en" className={`${display.variable} ${playfair.variable} ${instrumentSans.variable} ${inter.variable} ${milker.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
