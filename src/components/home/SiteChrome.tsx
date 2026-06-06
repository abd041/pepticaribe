"use client";

import { useRef } from "react";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Header } from "@/components/home/Header";
import { useSiteChromeHeight } from "@/hooks/useSiteChromeHeight";

/** Fixed announcement bar + header — height published as --site-chrome-h */
export function SiteChrome() {
  const chromeRef = useRef<HTMLDivElement>(null);
  useSiteChromeHeight(chromeRef);

  return (
    <div ref={chromeRef} className="concept-site-chrome site-chrome lux-floating-chrome">
      <AnnouncementBar />
      <Header />
    </div>
  );
}
