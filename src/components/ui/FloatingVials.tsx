"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/** Featured exhibit images — static paths avoid pulling the full catalog into client bundles */
const FLOATING_VIAL_IMAGES = [
  "/products/exhibit/glp-3-rt.png",
  "/products/exhibit/glp-2-t.png",
  "/products/exhibit/bpc-157.png",
  "/products/exhibit/ghk-cu.png",
] as const;

const FLOAT_CONFIG = [
  { className: "absolute -left-4 top-1/4 w-20 opacity-60 md:w-28", scale: 1, duration: 8, delay: 0 },
  { className: "absolute right-4 top-1/3 w-24 opacity-70 md:right-12 md:w-32", scale: 1.1, duration: 10, delay: 1 },
  { className: "absolute bottom-1/4 left-1/4 hidden w-16 opacity-40 sm:block md:w-20", scale: 0.85, duration: 12, delay: 2 },
  { className: "absolute bottom-1/3 right-1/4 hidden w-14 opacity-35 md:block md:w-[4.5rem]", scale: 0.75, duration: 9, delay: 0.5 },
];

export function FloatingVials() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {FLOATING_VIAL_IMAGES.map((src, i) => {
        const config = FLOAT_CONFIG[i];
        if (!config) return null;

        return (
          <motion.div
            key={src}
            className={config.className}
            style={{ scale: config.scale }}
            animate={{ y: [0, -20, 0], rotate: [-3, 3, -3] }}
            transition={{
              duration: config.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: config.delay,
            }}
          >
            <Image
              src={src}
              alt=""
              width={200}
              height={300}
              className="h-auto w-full object-contain drop-shadow-lg"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
