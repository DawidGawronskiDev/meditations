"use client";

import Link from "next/link";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MeditationTechnique } from "../types";
import { cn } from "@/lib/utils";
import { MeditationVisuals } from "./meditation-visuals";

type MeditationCardProps = React.ComponentProps<typeof Card> & {
  technique: MeditationTechnique;
};

export function MeditationCard({
  technique,
  className,
  ...props
}: MeditationCardProps) {
  return (
    <Link href={`/meditations/${technique.slug}`} className="block">
      <Card
        className={cn("relative ring-0", className)}
        style={{
          background: `linear-gradient(to top, ${technique.shader.colors.primary} 0%, ${technique.shader.colors.secondary}, transparent)`,
        }}
        {...props}
      >
        <div className="relative w-1/2 aspect-square flex items-center justify-center mx-auto">
          <MeditationVisuals
            shader={technique.shader}
            className="absolute inset-0"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-white">{technique.name}</CardTitle>
          <CardDescription className="text-white/80">
            {technique.description.slice(0, 100)}...
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
