import { sql } from "drizzle-orm";
import db from "@/db";
import {
  chakra,
  meditationTechnique,
  shader,
  techniqueCategory,
  techniqueChakra,
} from "./schema";
import { chakras } from "@/features/meditation/chakras";
import { meditationTechniques } from "@/features/meditation/data";
import type { TechniqueCategory } from "@/features/meditation/types";

const categorySlugs: Record<TechniqueCategory, string> = {
  "Heating & Energising": "heating-energising",
  "Balancing & Harmonising": "balancing-harmonising",
  "Cooling & Calming": "cooling-calming",
};

const shouldReset = process.argv.includes("--reset");

async function main() {
  if (shouldReset) {
    await db.execute(
      sql`TRUNCATE TABLE ${meditationTechnique}, ${shader}, ${techniqueCategory}, ${chakra}, ${techniqueChakra} RESTART IDENTITY CASCADE`,
    );
  }

  const insertedChakras = await db
    .insert(chakra)
    .values(chakras)
    .returning({ id: chakra.id, sanskrit: chakra.sanskrit });

  const categoryIds = new Map<TechniqueCategory, number>();
  for (const [name, slug] of Object.entries(categorySlugs) as [
    TechniqueCategory,
    string,
  ][]) {
    const [inserted] = await db
      .insert(techniqueCategory)
      .values({ slug, name })
      .returning({ id: techniqueCategory.id });
    categoryIds.set(name, inserted.id);
  }

  for (const technique of meditationTechniques) {
    const [insertedShader] = await db
      .insert(shader)
      .values(technique.shader)
      .returning({ id: shader.id });

    const [insertedTechnique] = await db
      .insert(meditationTechnique)
      .values({
        slug: technique.slug,
        name: technique.name,
        description: technique.description,
        categoryId: categoryIds.get(technique.category)!,
        keywords: technique.keywords,
        contraindications: technique.contraindications,
        instructions: technique.instructions,
        totalRounds: technique.totalRounds,
        segments: technique.segments,
        shaderId: insertedShader.id,
      })
      .returning({ id: meditationTechnique.id });

    const chakraIds = technique.associatedChakras.map((associated) => {
      const match = insertedChakras.find((c) =>
        associated.startsWith(c.sanskrit),
      );
      if (!match) {
        throw new Error(`No chakra found matching "${associated}"`);
      }
      return match.id;
    });

    await db.insert(techniqueChakra).values(
      chakraIds.map((chakraId) => ({
        techniqueId: insertedTechnique.id,
        chakraId,
      })),
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
