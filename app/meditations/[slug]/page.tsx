import React, { Suspense } from "react";

import { notFound } from "next/navigation";
import { getMeditationTechniqueBySlug } from "@/features/meditation/queries";
import { Meditation } from "@/features/meditation/components/meditation";
import { Breadcrumbs } from "@/features/breadcrumbs/components/breadcrumbs";
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
    </React.Fragment>
  );
}
