"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { getFeaturedProducts } from "@/data/products";
import { BrandAtmosphere, DnaHelixAccent } from "@/components/ui/BrandMotifs";

const PRODUCTS = getFeaturedProducts().slice(0, 3);

const PRODUCT_LAYERS = [
  {
    role: "left" as const,
    className: "left-[3%] top-[24%] w-[60px] sm:w-[76px]",
    blur: "blur-[10px]",
    opacity: 0.09,
    floatY: 8,
    floatDuration: 18,
    parallaxFactor: 10,
  },
  {
    role: "center" as const,
    className: "left-1/2 top-[11%] w-[92px] -translate-x-1/2 sm:w-[112px]",
    blur: "",
    opacity: 0.26,
    floatY: 10,
    floatDuration: 15,
    parallaxFactor: 16,
  },
  {
    role: "right" as const,
    className: "right-[3%] top-[28%] w-[60px] sm:w-[76px]",
    blur: "blur-[10px]",
    opacity: 0.09,
    floatY: 9,
    floatDuration: 17,
    parallaxFactor: 10,
  },
];

export function GateBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 22 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className="pointer-events-none fixed inset-0 h-dvh overflow-hidden bg-navy-950"
      aria-hidden
    >
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(45,212,191,0.11),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_70%,rgba(212,167,44,0.04),transparent_55%)]" />

      {/* Soft teal light sweep */}
      <div className="gate-light-sweep absolute inset-0 opacity-[0.045]" />

      {/* DNA + wave brand atmosphere */}
      <BrandAtmosphere
        dnaPositions={[
          { className: "left-[6%] top-[18%] h-36 w-10 text-teal-400/30 sm:h-44 sm:w-12", delay: 0 },
          { className: "right-[7%] bottom-[20%] h-32 w-9 text-teal-400/25 sm:h-40 sm:w-11", delay: 2 },
        ]}
      />
      <DnaHelixAccent className="gate-dna-drift-reverse absolute left-[50%] top-[8%] h-16 w-4 -translate-x-1/2 text-gold-400/15" />

      {PRODUCTS.map((product, i) => {
        const layer = PRODUCT_LAYERS[i];
        if (!layer) return null;
        return (
          <ParallaxProduct
            key={product.id}
            product={product}
            layer={layer}
            springX={springX}
            springY={springY}
          />
        );
      })}
    </div>
  );
}

function ParallaxProduct({
  product,
  layer,
  springX,
  springY,
}: {
  product: (typeof PRODUCTS)[number];
  layer: (typeof PRODUCT_LAYERS)[number];
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(springX, [-1, 1], [-layer.parallaxFactor, layer.parallaxFactor]);
  const y = useTransform(
    springY,
    [-1, 1],
    [-layer.parallaxFactor * 0.5, layer.parallaxFactor * 0.5]
  );

  const isCenter = layer.role === "center";

  return (
    <motion.div
      className={`absolute ${layer.className}`}
      style={{ x, y, opacity: layer.opacity, zIndex: isCenter ? 2 : 1 }}
    >
      <motion.div
        className={layer.blur || undefined}
        animate={{ y: [0, -layer.floatY, 0], rotate: isCenter ? [-0.5, 0.5, -0.5] : [-1, 1, -1] }}
        transition={{
          y: { duration: layer.floatDuration, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: layer.floatDuration * 1.1, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Image
          src={product.image}
          alt=""
          width={isCenter ? 180 : 140}
          height={isCenter ? 270 : 210}
          className={`h-auto w-full object-contain ${
            isCenter
              ? "drop-shadow-[0_12px_40px_rgba(20,184,166,0.15)]"
              : "drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
          }`}
          priority={isCenter}
        />
      </motion.div>
    </motion.div>
  );
}
