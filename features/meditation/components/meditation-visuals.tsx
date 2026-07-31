"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Canvas } from "@react-three/fiber";

type MeditationVisualsProps = React.ComponentProps<"div">;

export function MeditationVisuals({
  children,
  className,
  ...props
}: MeditationVisualsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="meditation-blob"
      ref={containerRef}
      className={cn("rounded-full overflow-hidden", className)}
      {...props}
    >
      {isVisible && (
        <Canvas resize={{ scroll: false }}>
          <ambientLight intensity={2.0} />
          <directionalLight position={[0, 0, 5]} intensity={5.0} />
          {children}
        </Canvas>
      )}
    </div>
  );
}
