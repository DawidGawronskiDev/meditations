import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MeditationVisuals } from "@/features/meditation/components/meditation-visuals";
import { MeditationSphere } from "@/features/meditation/components/meditation-sphere";
import type { Chakra } from "../types";
import type { Shader } from "@/features/meditation/shaders/blob";

type ChakraCardProps = React.ComponentProps<typeof Card> & {
  chakra: Chakra;
  shader: Shader;
};

export function ChakraCard({
  chakra,
  shader,
  className,
  ...props
}: ChakraCardProps) {
  return (
    <Link href={`/chakras/${chakra.slug}`} className="block">
      <Card
        className={cn("relative ring-0", className)}
        style={{
          background: `linear-gradient(to top, ${chakra.color} 0%, ${chakra.color}, transparent)`,
        }}
        {...props}
      >
        <div className="relative w-1/2 aspect-square flex items-center justify-center mx-auto">
          <MeditationVisuals className="absolute inset-0">
            <MeditationSphere shaderSettings={shader} />
          </MeditationVisuals>
        </div>
        <CardHeader>
          <CardTitle className="text-white">
            {chakra.name} &middot; {chakra.sanskrit}
          </CardTitle>
          <CardDescription className="text-white/80">
            {chakra.description.slice(0, 100)}...
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
