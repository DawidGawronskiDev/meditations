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
      <Card className={cn("pt-0 relative", className)} {...props}>
        <div className="w-full aspect-square flex items-center justify-center">
          <MeditationVisuals
            shader={technique.shader}
            className="absolute inset-0"
          />
        </div>
        <CardHeader>
          <CardTitle>{technique.name}</CardTitle>
          <CardDescription>
            {technique.description.slice(0, 100)}...
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
