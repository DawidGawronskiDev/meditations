"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MeditationTechnique, Phase } from "../types";
import { flattenTechnique } from "../utils";
import { useMeditationAnimation } from "../hooks";
import { MeditationVisuals } from "./meditation-visuals";
import { MeditationProgressCircle } from "./meditation-progress-circle";
import { MeditationPhaseIndicator } from "./meditation-phase-indicator";
import { MeditationSphere } from "./meditation-sphere";
import { Background } from "@/features/background/components/background";

const MEDITATION_PHASES: Phase[] = [
  {
    action: "inhale",
    duration: 4,
    description: "Inhale",
  },
  {
    action: "hold",
    duration: 7,
    description: "Hold",
  },
  {
    action: "exhale",
    duration: 8,
    description: "Exhale",
  },
];

type MeditationProps = React.ComponentProps<"section"> & {
  techniques: MeditationTechnique[];
};

export function MeditationShowcase({ techniques }: MeditationProps) {
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const [currentPhase, setCurrentPhase] = React.useState<number>(0);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const tlRef = React.useRef<gsap.core.Timeline | null>(null);

  useMeditationAnimation({
    containerRef,
    tlRef,
    meditationPhases: MEDITATION_PHASES,
    onStart: (index: number) => setCurrentPhase(index),
  });

  React.useEffect(() => {
    tlRef.current?.paused(isPaused);
  }, [isPaused]);

  return (
    <React.Fragment>
      <Background colors={techniques[currentPhase].shader.colors} />
      <section className="flex flex-col items-center justify-center min-h-screen container mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={techniques[currentPhase].slug}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-foreground text-center tracking-tight text-xl font-light"
          >
            {techniques[currentPhase].name}
          </motion.p>
        </AnimatePresence>
        <div
          ref={containerRef}
          className="relative w-full max-w-xs aspect-square mt-16"
        >
          <MeditationProgressCircle
            colors={techniques[currentPhase].shader.colors}
          />
          <MeditationVisuals
            onClick={() => setIsPaused(!isPaused)}
            className="absolute inset-0"
          >
            <MeditationSphere
              shaderSettings={techniques[currentPhase].shader}
            />
          </MeditationVisuals>
        </div>
        <MeditationPhaseIndicator
          currentPhase={currentPhase}
          meditationPhases={MEDITATION_PHASES}
        />
      </section>
    </React.Fragment>
  );
}
