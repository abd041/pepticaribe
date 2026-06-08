"use client";

import { createContext, useContext, type ReactNode } from "react";

const MarketingCanvasContext = createContext(false);

export function MarketingCanvasProvider({ children }: { children: ReactNode }) {
  return (
    <MarketingCanvasContext.Provider value={true}>
      {children}
    </MarketingCanvasContext.Provider>
  );
}

export function useMarketingCanvasBackdrop(): boolean {
  return useContext(MarketingCanvasContext);
}
