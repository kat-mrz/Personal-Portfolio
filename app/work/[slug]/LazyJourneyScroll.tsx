"use client";
import dynamic from "next/dynamic";
import type { JourneyStage } from "./JourneyScroll";

/* Thin client shell that lazy-loads JourneyScroll only when it enters the
   viewport.  Skipping SSR keeps the heavy SVG + scroll-listener code out of
   the initial JS bundle, cutting first-interaction time on the project page. */
const JourneyScrollDynamic = dynamic(
  () => import("./JourneyScroll").then(m => ({ default: m.JourneyScroll })),
  { ssr: false }
);

export function LazyJourneyScroll({ stages }: { stages: JourneyStage[] }) {
  return <JourneyScrollDynamic stages={stages} />;
}
