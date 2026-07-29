"use client";

import { cn } from "@/lib/utils";
import { Canvas } from "@react-three/fiber";
import type { Shader } from "../shaders/blob";
import { MeditationSphere } from "./meditation-sphere";

type MeditationVisualsProps = React.ComponentProps<"div"> & {
  onClick?: () => void;
  shader: Shader;
};

export function MeditationVisuals({
  onClick,
  shader,
  className,
  ...props
}: MeditationVisualsProps) {
  return (
    <div
      onClick={onClick}
      id="meditation-blob"
      className={cn(
        "w-full aspect-square rounded-full overflow-hidden",
        className,
      )}
      {...props}
    >
      <Canvas>
        <ambientLight intensity={2.0} />
        <directionalLight position={[0, 0, 5]} intensity={5.0} />
        <MeditationSphere shaderSettings={shader} />
      </Canvas>
    </div>
  );
}
