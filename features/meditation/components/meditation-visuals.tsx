"use client";

import { cn } from "@/lib/utils";
import { Canvas } from "@react-three/fiber";
import type { Shader } from "../shaders/blob";
import { MeditationSphere } from "./meditation-sphere";

type MeditationVisualsProps = React.ComponentProps<"div">;

export function MeditationVisuals({
  children,
  className,
  ...props
}: MeditationVisualsProps) {
  return (
    <div
      id="meditation-blob"
      className={cn("rounded-full overflow-hidden", className)}
      {...props}
    >
      <Canvas resize={{ scroll: false }}>
        <ambientLight intensity={2.0} />
        <directionalLight position={[0, 0, 5]} intensity={5.0} />
        {children}
      </Canvas>
    </div>
  );
}
