import { meditationTechniques } from "./data";
import { chakras } from "./chakras";
import type { MeditationTechnique, TechniqueCategory } from "./types";

const categorySlugs: Record<TechniqueCategory, string> = {
  "Heating & Energising": "heating-energising",
  "Balancing & Harmonising": "balancing-harmonising",
  "Cooling & Calming": "cooling-calming",
};

export const getMeditationTechniques = async (filters?: {
  chakraSlug?: string;
  categorySlug?: string;
}): Promise<MeditationTechnique[]> => {
  return meditationTechniques.filter((technique) => {
    if (
      filters?.categorySlug &&
      categorySlugs[technique.category] !== filters.categorySlug
    ) {
      return false;
    }
    if (
      filters?.chakraSlug &&
      !technique.associatedChakras.includes(filters.chakraSlug)
    ) {
      return false;
    }
    return true;
  });
};

export const getMeditationTechniqueBySlug = async (
  slug: string,
): Promise<MeditationTechnique | undefined> =>
  meditationTechniques.find((technique) => technique.slug === slug);

export const getRandomMeditationTechnique =
  async (): Promise<MeditationTechnique> =>
    meditationTechniques[
      Math.floor(Math.random() * meditationTechniques.length)
    ];

export const getChakrasWithNameAndSlug = async (): Promise<
  { name: string; slug: string }[]
> => chakras.map(({ name, slug }) => ({ name, slug }));

export const getCategoryWithNameAndSlug = async (): Promise<
  { name: string; slug: string }[]
> => Object.entries(categorySlugs).map(([name, slug]) => ({ name, slug }));
