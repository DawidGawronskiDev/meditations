import type { MeditationTechnique, Phase } from "./types";

export const flattenTechnique = (technique: MeditationTechnique): Phase[] => {
  const phases: Phase[] = [];

  for (const segment of technique.segments) {
    for (let i = 0; i < segment.repeat; i++) {
      phases.push(...segment.phases);
    }
  }

  return phases;
};
