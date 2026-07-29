"use client";

import React from "react";
import { MeditationTechnique } from "../types";
import { flattenTechnique } from "../utils";
import { useMeditationAnimation } from "../hooks";
import { MeditationVisuals } from "./meditation-visuals";
import { MeditationProgressCircle } from "./meditation-progress-circle";
import { MeditationPhaseIndicator } from "./meditation-phase-indicator";

type MeditationProps = React.ComponentProps<"section"> & {
  meditationTechnique: MeditationTechnique;
};

export function Meditation({ meditationTechnique }: MeditationProps) {
  const [isPaused, setIsPaused] = React.useState<boolean>(true);
  const [currentPhase, setCurrentPhase] = React.useState<number>(0);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const tlRef = React.useRef<gsap.core.Timeline | null>(null);

  useMeditationAnimation({
    containerRef,
    tlRef,
    meditationPhases: flattenTechnique(meditationTechnique),
    onStart: (index: number) => setCurrentPhase(index),
  });

  React.useEffect(() => {
    tlRef.current?.paused(isPaused);
  }, [isPaused]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen container mx-auto px-4">
      <p className="text-foreground text-center tracking-tight text-xl font-light">
        {meditationTechnique.name}
      </p>
      <div
        ref={containerRef}
        className="relative w-full max-w-xs aspect-square mt-16"
      >
        <MeditationProgressCircle colors={meditationTechnique.shader.colors} />
        <MeditationVisuals
          onClick={() => setIsPaused(!isPaused)}
          shader={meditationTechnique.shader}
          className="absolute inset-0 m-auto"
        />
      </div>
      <MeditationPhaseIndicator
        currentPhase={currentPhase}
        meditationPhases={flattenTechnique(meditationTechnique)}
      />
    </section>
  );
}
