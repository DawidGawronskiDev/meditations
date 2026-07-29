import {
  integer,
  pgTable,
  varchar,
  real,
  jsonb,
  primaryKey,
} from "drizzle-orm/pg-core";
import type { WarpSettings } from "@/features/meditation/shaders/blob";
import type { Segment } from "@/features/meditation/types";
import { defineRelations } from "drizzle-orm";

export const techniqueCategory = pgTable("technique_category", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const chakra = pgTable("chakra", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  sanskrit: varchar("sanskrit", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  color: varchar("color", { length: 7 }).notNull(),
  element: varchar("element", { length: 255 }).notNull(),
});

export const shader = pgTable("shader", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  vertexShader: varchar("vertex_shader", { length: 10000 }).notNull(),
  fragmentShader: varchar("fragment_shader", { length: 10000 }).notNull(),
  colors: jsonb("colors")
    .$type<{ primary: string; secondary: string }>()
    .notNull(),
  positionFrequency: real("position_frequency").notNull(),
  timeFrequency: real("time_frequency").notNull(),
  strength: real("strength").notNull(),
  warpSettings: jsonb("warp_settings").$type<WarpSettings>().notNull(),
});

export const meditationTechnique = pgTable("meditation_technique", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 1000 }).notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => techniqueCategory.id),
  keywords: jsonb("keywords").$type<string[]>().notNull(),
  contraindications: jsonb("contraindications").$type<string[]>().notNull(),
  instructions: jsonb("instructions").$type<string[]>().notNull(),
  totalRounds: integer("total_rounds").notNull(),
  segments: jsonb("segments").$type<Segment[]>().notNull(),
  shaderId: integer("shader_id")
    .notNull()
    .references(() => shader.id),
});

export const techniqueChakra = pgTable(
  "technique_chakra",
  {
    techniqueId: integer("technique_id")
      .notNull()
      .references(() => meditationTechnique.id),
    chakraId: integer("chakra_id")
      .notNull()
      .references(() => chakra.id),
  },
  (t) => [primaryKey({ columns: [t.techniqueId, t.chakraId] })],
);

export const relations = defineRelations(
  { techniqueCategory, chakra, shader, meditationTechnique, techniqueChakra },
  (r) => ({
    meditationTechnique: {
      category: r.one.techniqueCategory({
        from: r.meditationTechnique.categoryId,
        to: r.techniqueCategory.id,
      }),
      shader: r.one.shader({
        from: r.meditationTechnique.shaderId,
        to: r.shader.id,
      }),
      chakras: r.many.chakra({
        from: r.meditationTechnique.id.through(r.techniqueChakra.techniqueId),
        to: r.chakra.id.through(r.techniqueChakra.chakraId),
      }),
    },
    techniqueCategory: {
      techniques: r.many.meditationTechnique(),
    },
    shader: {
      techniques: r.many.meditationTechnique(),
    },
    chakra: {
      techniques: r.many.meditationTechnique({
        from: r.chakra.id.through(r.techniqueChakra.chakraId),
        to: r.meditationTechnique.id.through(r.techniqueChakra.techniqueId),
      }),
    },
  }),
);
