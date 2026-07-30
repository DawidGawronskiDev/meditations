import { cn } from "@/lib/utils";
import { MeditationTechnique } from "../types";
import { MeditationVisuals } from "./meditation-visuals";
import { MeditationSphere } from "./meditation-sphere";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type MeditaitonCTAProps = React.ComponentProps<"section"> & {
  technique: MeditationTechnique;
};

export function MeditationCTA({
  technique,
  className,
  ...props
}: MeditaitonCTAProps) {
  return (
    <section className={cn("py-32", className)} {...props}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto">
          <div>
            <h2 className="text-4xl font-light tracking-tighter">
              Not sure which technique to choose?
            </h2>
            <p className="text-muted-foreground mt-2 mb-4">
              Explore our meditation techniques to find the one that suits you
              best.
            </p>
            <Button>
              <Search /> Explore
            </Button>
          </div>
          <div
            className="hidden md:flex max-w-xs aspect-square items-center justify-center rounded-xl"
            style={{
              background: `radial-gradient(circle at center, ${technique.shader.colors.primary} 0%, ${technique.shader.colors.secondary} 100%)`,
            }}
          >
            <MeditationVisuals>
              <MeditationSphere shaderSettings={technique.shader} />
            </MeditationVisuals>
          </div>
        </div>
      </div>
    </section>
  );
}
