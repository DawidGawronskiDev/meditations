import React, { Suspense } from "react";

import { notFound } from "next/navigation";
import {
  getChakraBySlug,
  getMeditationTechniquesByChakra,
  getShaderForChakra,
} from "@/features/chakra/queries";
import { Chakra } from "@/features/chakra/components/chakra";
import { MeditationCard } from "@/features/meditation/components/meditation-card";
import { Breadcrumbs } from "@/features/breadcrumbs/components/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import Loading from "./loading";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <ChakraContent params={params} />
    </Suspense>
  );
}

async function ChakraContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chakra = await getChakraBySlug(slug);

  if (!chakra) {
    notFound();
  }

  const [shader, techniques] = await Promise.all([
    getShaderForChakra(slug),
    getMeditationTechniquesByChakra(slug),
  ]);

  return (
    <React.Fragment>
      <section>
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/chakras", label: "Chakras" },
              { href: `/chakras/${chakra.slug}`, label: chakra.name },
            ]}
          />
        </div>
      </section>
      <Chakra chakra={chakra} shader={shader} />
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-light tracking-tighter md:text-3xl">
            Description
          </h2>
          <p className="text-muted-foreground text-pretty tracking-tight leading-loose mt-4">
            {chakra.description}
          </p>
        </div>
      </section>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-light tracking-tighter md:text-3xl">
            Key Facts
          </h2>
          <dl className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
            {[
              { label: "Element", value: chakra.element },
              { label: "Sense", value: chakra.sense },
              { label: "Seed Mantra", value: chakra.seedMantra },
              { label: "Location", value: chakra.location },
              { label: "Petals", value: chakra.petals },
              { label: "Meaning", value: chakra.meaning },
            ].map((fact) => (
              <div key={fact.label}>
                <dt className="text-sm text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="tracking-tight">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-light tracking-tighter md:text-3xl">
            When Balanced
          </h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {chakra.qualitiesBalanced.map((quality) => (
              <Badge key={quality} variant="secondary">
                {quality}
              </Badge>
            ))}
          </div>
        </div>
      </section>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-light tracking-tighter md:text-3xl">
            When Imbalanced
          </h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {chakra.qualitiesImbalanced.map((quality) => (
              <Badge key={quality} variant="destructive">
                {quality}
              </Badge>
            ))}
          </div>
        </div>
      </section>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-light tracking-tighter md:text-3xl">
            Healing Practices
          </h2>
          <p className="text-muted-foreground text-pretty tracking-tight leading-loose mt-4">
            {chakra.healingPractices.map((practice, index) => (
              <span key={index}>
                {practice}
                <br />
              </span>
            ))}
          </p>
        </div>
      </section>
      {techniques.length > 0 && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-light tracking-tighter md:text-3xl">
              Meditations for {chakra.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {techniques.map((technique) => (
                <MeditationCard key={technique.slug} technique={technique} />
              ))}
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
}
