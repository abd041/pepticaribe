"use client";

import dynamic from "next/dynamic";

const ScrollNarrative = dynamic(
  () => import("@/components/ui/ScrollNarrative").then((m) => m.ScrollNarrative),
  { ssr: false },
);

const CursorAtmosphere = dynamic(
  () => import("@/components/ui/CursorAtmosphere").then((m) => m.CursorAtmosphere),
  { ssr: false },
);

const BiotechAtmosphere = dynamic(
  () => import("@/components/home/BiotechAtmosphere").then((m) => m.BiotechAtmosphere),
  { ssr: false },
);

export const LuxuryMotion = dynamic(
  () => import("@/components/home/LuxuryMotion").then((m) => m.LuxuryMotion),
  { ssr: false },
);

/** Lazy-loaded visual effects — keeps initial JS bundle smaller */
export function HomePageEffects() {
  return (
    <>
      <ScrollNarrative />
      <CursorAtmosphere />
      <BiotechAtmosphere />
    </>
  );
}
