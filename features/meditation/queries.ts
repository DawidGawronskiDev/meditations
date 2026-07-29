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

export const getMeditationTechniques = async (filters?: {
  chakraSlug?: string;
  categorySlug?: string;
}): Promise<MeditationTechnique[]> => {
  const techniques = await db.query.meditationTechnique.findMany({
    where: {
      ...(filters?.categorySlug && {
        category: { slug: filters.categorySlug },
      }),
      ...(filters?.chakraSlug && { chakras: { slug: filters.chakraSlug } }),
    },
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

export const getChakrasWithNameAndSlug = async (): Promise<
  { id: number; name: string; slug: string }[]
> => {
  const chakras = await db.query.chakra.findMany();
  return chakras.map((chakra) => ({
    id: chakra.id,
    name: chakra.name,
    slug: chakra.slug,
  }));
};

export const getCategoryWithNameAndSlug = async (): Promise<
  { id: number; name: string; slug: string }[]
> => {
  const categories = await db.query.techniqueCategory.findMany();
  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
  }));
};
