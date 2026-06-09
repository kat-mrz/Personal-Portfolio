"use client";
import dynamic from "next/dynamic";

/* Thin client shell that lazy-loads ConceptSlideshow (contains two large
   next/image assets) only when needed, keeping the initial bundle smaller. */
const ConceptSlideshowDynamic = dynamic(
  () => import("./ConceptSlideshow").then(m => ({ default: m.ConceptSlideshow })),
  { ssr: false }
);

export function LazyConceptSlideshow() {
  return <ConceptSlideshowDynamic />;
}
