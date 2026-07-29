import React from "react";

import { MeditationCard } from "@/features/meditation/components/meditation-card";
import {
  getCategoryWithNameAndSlug,
  getChakrasWithNameAndSlug,
  getMeditationTechniques,
} from "@/features/meditation/queries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type MeditationsSearchParams = { chakra?: string; category?: string };

export default function Page({
  searchParams,
}: {
  searchParams: Promise<MeditationsSearchParams>;
}) {
  return (
    <React.Fragment>
      <MeditationList searchParams={searchParams} />
    </React.Fragment>
  );
}

export async function MeditationList({
  searchParams,
}: {
  searchParams: Promise<MeditationsSearchParams>;
}) {
  const { chakra: chakraSlug, category: categorySlug } = await searchParams;
  const chakras = await getChakrasWithNameAndSlug();
  const categories = await getCategoryWithNameAndSlug();
  const meditationTechniques = await getMeditationTechniques({
    chakraSlug,
    categorySlug,
  });

  return (
    <React.Fragment>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <form className="flex gap-2 flex-wrap">
            <Select name="chakra" defaultValue={chakraSlug}>
              <SelectTrigger>
                <SelectValue placeholder="Chakra" className="w-[256px]" />
              </SelectTrigger>
              <SelectContent avoidCollisions={true} align="start">
                <SelectGroup>
                  {chakras.map((chakra) => (
                    <SelectItem key={chakra.id} value={chakra.slug}>
                      {chakra.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select name="category" defaultValue={categorySlug}>
              <SelectTrigger>
                <SelectValue placeholder="Category" className="w-[256px]" />
              </SelectTrigger>
              <SelectContent avoidCollisions={true} align="start">
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button type="submit">Filter</Button>
            {(chakraSlug || categorySlug) && (
              <Button asChild variant="ghost">
                <Link href="/meditations">Clear</Link>
              </Button>
            )}
          </form>
        </div>
      </section>
      <section className="py-8">
        <div className="container mx-auto px-4">
          {meditationTechniques.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {meditationTechniques.map((technique) => (
                <MeditationCard key={technique.name} technique={technique} />
              ))}
            </div>
          ) : (
            <div className="col-span-full text-center text-white/80">
              No meditation techniques found.
            </div>
          )}
        </div>
      </section>
    </React.Fragment>
  );
}
