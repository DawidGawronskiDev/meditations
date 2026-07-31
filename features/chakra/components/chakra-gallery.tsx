"use client";

import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { MeditationTechnique } from "@/features/meditation/types";
import { MeditationVisuals } from "@/features/meditation/components/meditation-visuals";
import { MeditationSphere } from "@/features/meditation/components/meditation-sphere";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ChakraGalleryProps {
  className?: string;
  techniques: MeditationTechnique[];
}

const positionClasses = [
  "aspect-square size-47 rotate-7 md:rotate-0 z-1 absolute md:-left-10 md:bottom-1/4 lg:left-0 md:size-61",
  "aspect-square size-47 -rotate-7 md:rotate-0 z-1 md:left-1/5 absolute md:-top-10 md:size-42",
  "aspect-square size-45 z-1 md:right-2/5 absolute md:-top-40 md:size-51",
  "hidden md:block aspect-square z-1 absolute md:-top-42 md:-right-10 md:size-51",
  "hidden md:block aspect-square z-1 top-1/5 absolute -right-10 lg:right-28 md:size-60",
  "hidden md:block aspect-square z-1 absolute -bottom-5 -right-40 md:size-64",
  "hidden md:block aspect-square z-1 right-1/5 absolute -bottom-1/4 md:size-54",
  "hidden md:block aspect-square z-1 right-3/5 -bottom-1/6 absolute md:size-54",
];

const ChakraGallery = ({ techniques, className }: ChakraGalleryProps) => {
  const orbs = positionClasses.map((className, index) => ({
    technique: techniques[index % techniques.length],
    className,
    delay: Math.random() * 0.4,
  }));

  return (
    <section
      className={cn(
        "hidden md:block relative min-h-[600px] overflow-hidden py-32 md:h-svh md:max-h-[1200px]",
        className,
      )}
    >
      <div className="relative container flex h-full w-full flex-col items-center justify-center mx-auto px-4">
        <div className="relative z-10 flex flex-col items-center justify-center gap-5">
          <h1 className="max-w-xl text-center text-4xl font-light tracking-tighter lg:text-6xl text-pretty">
            Seven Centers of Energy
          </h1>
          <p className="max-w-md text-center text-sm text-muted-foreground/70 lg:text-base">
            From the root at the base of your spine to the crown just above your
            head, each chakra carries its own element, color, and place in the
            body. Drag an orb to see which is which.
          </p>
          <Link href="/chakras">
            <Button>Explore Chakras</Button>
          </Link>
        </div>
        <div className="mt-30 flex items-center justify-center border">
          {orbs.map((orb, index) => (
            <motion.div
              key={`${orb.technique.slug}-${index}`}
              className={cn(orb.className, "z-20")}
              drag
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.4,
                type: "spring",
                bounce: 0.2,
                delay: orb.delay,
              }}
            >
              <MeditationVisuals className="pointer-events-none h-full w-full cursor-grab active:cursor-grabbing">
                <MeditationSphere shaderSettings={orb.technique.shader} />
              </MeditationVisuals>
            </motion.div>
          ))}
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-30 h-full w-full bg-linear-to-b from-background/0 to-background/80"
        style={{
          background:
            "linear-gradient(to bottom, var(--background), transparent 10%, transparent 90%, var(--background))",
        }}
      />
    </section>
  );
};
export { ChakraGallery };
