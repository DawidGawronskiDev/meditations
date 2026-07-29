"use client";

import React from "react";

import { Phase } from "../types";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type MeditationPhaseIndicatorProps = React.ComponentProps<"span"> & {
  meditationPhases: Phase[];
  currentPhase: number;
};

export function MeditationPhaseIndicator({
  meditationPhases,
  currentPhase,
}: MeditationPhaseIndicatorProps) {
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (api) {
      api.scrollTo(currentPhase);
    }
  }, [currentPhase]);

  return (
    <Carousel
      orientation="vertical"
      opts={{
        align: "center",
        loop: true,
      }}
      setApi={setApi}
      className="mt-8 relative"
    >
      <CarouselContent className="h-32">
        {meditationPhases.map((phase, index) => (
          <CarouselItem key={index} className="basis-1/3">
            <p className="text-center text-lg font-light">
              {phase.description}
            </p>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--background), transparent, var(--background))",
        }}
      ></div>
    </Carousel>
  );
}
