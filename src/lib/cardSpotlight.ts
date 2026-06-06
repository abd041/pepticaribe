import type { MouseEvent } from "react";

export function setCardSpotlight(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  el.style.setProperty("--spot-x", `${x}%`);
  el.style.setProperty("--spot-y", `${y}%`);
}

export function resetCardSpotlight(e: MouseEvent<HTMLElement>) {
  e.currentTarget.style.setProperty("--spot-x", "50%");
  e.currentTarget.style.setProperty("--spot-y", "50%");
}
