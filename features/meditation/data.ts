import meditationTechniquesData from "@/data/meditation-techniques.json";
import { vertexShader, fragmentShader } from "./shaders/blob";
import type { MeditationTechnique } from "./types";

export const meditationTechniques: MeditationTechnique[] =
  meditationTechniquesData.map((technique) => ({
    ...technique,
    shader: { ...technique.shader, vertexShader, fragmentShader },
  })) as MeditationTechnique[];
