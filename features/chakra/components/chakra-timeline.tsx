"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { Chakra } from "../types";
import { MeditationVisuals } from "@/features/meditation/components/meditation-visuals";
import { MeditationSphere } from "@/features/meditation/components/meditation-sphere";
import type { Shader } from "@/features/meditation/shaders/blob";

type ChakraTimelineProps = React.ComponentProps<"section"> & {
  chakras: Chakra[];
  shaders: Shader[];
};

export const ChakraTimeline = ({ chakras, shaders }: ChakraTimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-light tracking-tighter md:text-5xl">
          The Seven Chakras
        </h1>
        <p className="text-muted-foreground text-pretty tracking-tight leading-loose mt-4 max-w-2xl">
          From the root at the base of your spine to the crown above your head,
          each chakra carries its own element, color, and role in the
          body&apos;s energy system. Pick one to explore what it governs and how
          to bring it back into balance.
        </p>
      </div>

      <div
        ref={ref}
        className="relative container border-x pb-40 lg:pt-20 [&>*:last-child]:pb-20 [&>div>div:first-child]:pt-20!"
      >
        <div className="pointer-events-none absolute top-0 z-0 h-full w-[3px] translate-x-5 lg:left-1/2 lg:-translate-x-1/2">
          <div className="h-4 w-[3px] bg-linear-to-b from-transparent to-foreground/10"></div>
          <div className="relative h-[calc(100%-1rem)] w-full bg-linear-to-b from-foreground/10 via-foreground/10 to-transparent">
            <motion.div
              className="absolute top-0 left-0 z-10 w-[3px] rounded-full bg-linear-to-b from-transparent via-foreground to-transparent"
              style={{ height }}
            />
          </div>
        </div>
        {chakras.map((chakra, index) => {
          const reverse = index % 2 === 1;
          return (
            <div key={chakra.slug} className="relative flex">
              <div
                className={`flex w-full justify-center px-8 py-10 text-end md:gap-6 lg:gap-10 ${reverse ? "lg:flex-row-reverse lg:text-start" : ""} `}
              >
                <div className="flex-1 max-lg:hidden">
                  <h3 className="text-2xl tracking-[-0.96px]">
                    {chakra.name} &middot; {chakra.sanskrit}
                  </h3>
                  <p
                    className={`mt-2.5 max-w-[300px] tracking-[-0.32px] text-balance text-muted-foreground ${reverse ? "" : "ml-auto"}`}
                  >
                    {chakra.description}
                  </p>
                </div>
                <div className="z-[-1] size-fit -translate-y-5 bg-background p-4 max-lg:-translate-x-4" />
                <div className="flex-1 max-lg:-translate-x-4">
                  <div className="text-start lg:pointer-events-none lg:hidden">
                    <h3 className="text-2xl tracking-[-0.96px]">
                      {chakra.name} &middot; {chakra.sanskrit}
                    </h3>
                    <p className="mt-2.5 mb-10 max-w-[300px] tracking-[-0.32px] text-balance text-muted-foreground">
                      {chakra.description}
                    </p>
                  </div>
                  <div className="flex items-start justify-start">
                    <div className={` ${reverse ? "lg:ml-auto" : ""}`}>
                      <Link
                        href={`/chakras/${chakra.slug}`}
                        className="relative grid aspect-square w-40 grid-cols-[auto_1fr_auto] items-stretch overflow-hidden rounded-full lg:w-56"
                        style={{
                          background: `radial-gradient(circle, ${chakra.color}33, transparent 70%)`,
                        }}
                      >
                        <MeditationVisuals className="w-full aspect-square">
                          <MeditationSphere shaderSettings={shaders[index]} />
                        </MeditationVisuals>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
