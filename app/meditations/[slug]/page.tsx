import React, { Suspense } from "react";

import { notFound } from "next/navigation";
import { getMeditationTechniqueBySlug } from "@/features/meditation/queries";
import { Meditation } from "@/features/meditation/components/meditation";
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
      <MeditationContent params={params} />
    </Suspense>
  );
}

async function MeditationContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const technique = await getMeditationTechniqueBySlug(slug);

  if (!technique) {
    notFound();
  }

  return (
    <React.Fragment>
      <section>
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/meditations", label: "Meditations" },
              { href: `/meditations/${technique.slug}`, label: technique.name },
            ]}
          />
        </div>
      </section>
      <Meditation meditationTechnique={technique} />
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-light tracking-tighter md:text-3xl">Description</h2>
          <p className="text-muted-foreground text-pretty tracking-tight leading-loose mt-4">
            {technique.description}
          </p>
        </div>
      </section>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-light tracking-tighter md:text-3xl">Instructions</h2>
          <p className="text-muted-foreground text-pretty tracking-tight leading-loose mt-4">
            {technique.instructions.map((instruction, index) => (
              <span key={index}>
                {instruction}
                <br />
              </span>
            ))}
          </p>
        </div>
      </section>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-light tracking-tighter md:text-3xl">Keywords</h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {technique.keywords.map((keyword) => (
              <Badge key={keyword} variant="secondary">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      </section>
      {technique.contraindications.length > 0 && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-light tracking-tighter md:text-3xl">
              Contraindications
            </h2>
            <ul className="flex flex-wrap gap-2 mt-4">
              {technique.contraindications.map((contraindication) => (
                <li key={contraindication}>
                  <Badge variant="destructive">{contraindication}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </React.Fragment>
  );
}
