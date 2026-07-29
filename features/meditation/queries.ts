import db from "@/db";
import { MeditationTechnique, TechniqueCategory } from "./types";

const withRelations = {
  category: true,
  shader: true,
  chakras: true,
} as const;

const mapTechnique = (technique: {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
  contraindications: string[];
  instructions: string[];
  totalRounds: number;
  segments: MeditationTechnique["segments"];
  category: { name: string } | null;
  shader: MeditationTechnique["shader"] | null;
  chakras: { name: string }[];
}): MeditationTechnique => ({
  slug: technique.slug,
  name: technique.name,
  description: technique.description,
  category: technique.category!.name as TechniqueCategory,
  associatedChakras: technique.chakras.map((chakra) => chakra.name),
  keywords: technique.keywords,
  contraindications: technique.contraindications,
  instructions: technique.instructions,
  totalRounds: technique.totalRounds,
  segments: technique.segments,
  shader: technique.shader!,
});

export const getMeditationTechniques = async (): Promise<
  MeditationTechnique[]
> => {
  const techniques = await db.query.meditationTechnique.findMany({
    with: withRelations,
  });
  return techniques.map(mapTechnique);
};

export const getMeditationTechniqueBySlug = async (
  slug: string,
): Promise<MeditationTechnique | undefined> => {
  const technique = await db.query.meditationTechnique.findFirst({
    where: { slug },
    with: withRelations,
  });
  return technique ? mapTechnique(technique) : undefined;
};

export const getRandomMeditationTechnique =
  async (): Promise<MeditationTechnique> => {
    const techniques = await getMeditationTechniques();
    return techniques[Math.floor(Math.random() * techniques.length)];
  };
