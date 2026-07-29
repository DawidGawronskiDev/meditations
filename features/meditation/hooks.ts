import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const useMeditationAnimation = ({
  containerRef,
  tlRef,
  meditationPhases,
  onStart,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  tlRef: React.RefObject<gsap.core.Timeline | null>;
  meditationPhases: any[];
  onStart: (index: number) => void;
}) => {
  return useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1 });
      tlRef.current = tl;

      meditationPhases.forEach((phase, i) => {
        tl.to("#meditation-blob", {
          ease: "sine.inOut",
          scale:
            phase.action === "inhale"
              ? 1.2
              : phase.action === "exhale"
                ? 1
                : "+=0",
          duration: phase.duration,
          onStart: () => onStart(i),
        });

        tl.fromTo(
          "#meditation-progress-circle",
          { "--progress": "0%" },
          {
            "--progress": "100%",
            scale:
              phase.action === "inhale"
                ? 1.2
                : phase.action === "exhale"
                  ? 1
                  : "+=0",
            duration: phase.duration,
            ease: "sine.inOut",
          },
          "<",
        );
      });
    },
    { scope: containerRef, dependencies: [] },
  );
};
