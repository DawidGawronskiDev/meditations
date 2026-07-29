import type { Shader } from "./shaders/blob";

export type PhaseAction = "inhale" | "exhale" | "hold";

export type TechniqueCategory =
  | "Heating & Energising"
  | "Balancing & Harmonising"
  | "Cooling & Calming";

export type Phase = {
  action: PhaseAction;
  duration: number;
  description?: string;
};

export type Segment = {
  phases: Phase[];
  repeat: number;
};

export type MeditationTechnique = {
  slug: string;
  name: string;
  description: string;
  category: TechniqueCategory;
  associatedChakras: string[];
  keywords: string[];
  contraindications: string[];
  instructions: string[];
  totalRounds: number;
  segments: Segment[];
  shader: Shader;
};
