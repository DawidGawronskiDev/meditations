import chakrasData from "@/data/chakras.json";
import { meditationTechniques } from "@/features/meditation/data";
import { vertexShader, fragmentShader, type Shader } from "@/features/meditation/shaders/blob";
import type { MeditationTechnique } from "@/features/meditation/types";
import type { Chakra } from "./types";

const chakras: Chakra[] = chakrasData;

export const getChakras = async (): Promise<Chakra[]> => chakras;

export const getChakraBySlug = async (
  slug: string,
): Promise<Chakra | undefined> =>
  chakras.find((chakra) => chakra.slug === slug);

export const getMeditationTechniquesByChakra = async (
  slug: string,
): Promise<MeditationTechnique[]> =>
  meditationTechniques.filter((technique) =>
    technique.associatedChakras.includes(slug),
  );

/** Chakras without a directly associated technique (e.g. Crown) fall back to a still orb in their own color. */
export const getShaderForChakra = async (slug: string): Promise<Shader> => {
  const techniques = await getMeditationTechniquesByChakra(slug);
  if (techniques.length > 0) return techniques[0].shader;

  const chakra = await getChakraBySlug(slug);
  const color = chakra?.color ?? "#8A6CFB";

  return {
    name: `${chakra?.name ?? "Chakra"} Shader`,
    vertexShader,
    fragmentShader,
    colors: { primary: color, secondary: color },
    positionFrequency: 0.5,
    timeFrequency: 0.4,
    strength: 0.3,
    warpSettings: {
      warpPositionFrequency: 0.38,
      warpTimeFrequency: 0.12,
      warpStrength: 1.7,
    },
  };
};
