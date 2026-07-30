"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { MeditationTechnique } from "../types";
import { MeditationVisuals } from "./meditation-visuals";
import { MeditationSphere } from "./meditation-sphere";

type MeditationGalleryProps = React.ComponentProps<"section"> & {
  techniques: MeditationTechnique[];
};

export function MeditationGallery({
  techniques,
  className,
  ...props
}: MeditationGalleryProps) {
  return (
    <section className={cn("py-32", className)} {...props}>
      <div className="container mx-auto px-4">
        <h1 className="text-6xl font-light tracking-tighter">
          A Technique for Every Kind of Day
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          From bellows breath to alternate-nostril breathing, each practice
          has its own rhythm, sound, and effect — pick the one that matches
          how you want to feel.
        </p>
        <Carousel
          opts={{
            active: true,
            align: "start",
            loop: true,
          }}
          plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
          className="relative w-full pt-15"
        >
          <div className="absolute top-0 right-0 flex h-12 w-20 items-center justify-end gap-2">
            <CarouselPrevious variant="default" className="absolute left-0" />
            <CarouselNext variant="default" className="absolute right-0" />
          </div>
          <CarouselContent>
            {techniques.map((technique, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <div className="group">
                  <div
                    className="w-full aspect-square flex items-center justify-center rounded-2xl"
                    style={{
                      background: `linear-gradient(to top, transparent,${technique.shader.colors.primary}, ${technique.shader.colors.secondary})`,
                    }}
                  >
                    <MeditationVisuals>
                      <MeditationSphere shaderSettings={technique.shader} />
                    </MeditationVisuals>
                  </div>
                  <h3 className="mt-4 text-2xl font-light tracking-tighter">
                    {technique.name}
                  </h3>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
