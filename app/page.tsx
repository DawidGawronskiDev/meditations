import React from "react";
import Link from "next/link";

import { MeditationShowcase } from "@/features/meditation/components/meditation-showcase";
import {
  getMeditationTechniques,
  getRandomMeditationTechnique,
} from "@/features/meditation/queries";
import { MeditationGallery } from "@/features/meditation/components/meditation-gallery";
import { MeditationStats } from "@/features/meditation/components/meditation-stats";
import { MeditationCTA } from "@/features/meditation/components/meditation-cta";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { ChakraGallery } from "@/features/chakra/components/chakra-gallery";

export default async function Page() {
  const techniques = await getMeditationTechniques();

  return (
    <React.Fragment>
      <section>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-light tracking-tighter md:text-6xl lg:text-7xl">
              Meditation Orbs
            </h1>
            <p className="text-muted-foreground text-pretty tracking-tight leading-loose mt-4">
              {techniques.length} guided meditation techniques, each led by a
              living, breathing orb. Pick one to calm down, find balance, or
              build energy.
            </p>
            <Button asChild className="mt-6">
              <Link href="/meditations">
                <Search /> Explore Techniques
              </Link>
            </Button>
          </div>
          <MeditationShowcase techniques={techniques} />
        </div>
      </section>
      <MeditationGallery techniques={techniques} />
      <MeditationStats techniques={techniques} />
      <ChakraGallery techniques={techniques} />
      <MeditationCTA technique={await getRandomMeditationTechnique()} />
    </React.Fragment>
  );
}
