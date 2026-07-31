import { MeditationVisuals } from "@/features/meditation/components/meditation-visuals";
import { MeditationSphere } from "@/features/meditation/components/meditation-sphere";
import type { Shader } from "@/features/meditation/shaders/blob";
import type { Chakra as ChakraType } from "../types";

type ChakraProps = React.ComponentProps<"section"> & {
  chakra: ChakraType;
  shader: Shader;
};

export function Chakra({ chakra, shader }: ChakraProps) {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen container mx-auto px-4">
      <p className="text-foreground text-center tracking-tight text-xl font-light">
        {chakra.name} &middot; {chakra.sanskrit}
      </p>
      <div className="relative w-full max-w-xs aspect-square mt-16">
        <MeditationVisuals className="absolute inset-0">
          <MeditationSphere shaderSettings={shader} />
        </MeditationVisuals>
      </div>
      <p className="mt-8 max-w-md text-center text-muted-foreground italic">
        &ldquo;{chakra.affirmation}&rdquo;
      </p>
    </section>
  );
}
