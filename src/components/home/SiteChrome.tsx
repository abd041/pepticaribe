"use client";

import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { Header } from "@/components/home/Header";

/** Sticky announcement bar + header — overlays hero atmosphere on homepage */
export function SiteChrome() {
  return (
    <div className="concept-site-chrome site-chrome sticky top-0 z-50">
      <AnnouncementBar />
      <Header />
    </div>
  );
}
