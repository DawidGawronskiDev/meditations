"use client";

import { RadialBar, RadialBarChart } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { MeditationTechnique } from "../types";

type StatItem = {
  title: string;
  description: string;
};

function groupByCategory(techniques: MeditationTechnique[]) {
  const counts = new Map<
    string,
    { count: number; colors: MeditationTechnique["shader"]["colors"] }
  >();

  for (const technique of techniques) {
    const existing = counts.get(technique.category);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(technique.category, {
        count: 1,
        colors: technique.shader.colors,
      });
    }
  }

  return Array.from(counts, ([category, value], index) => ({
    category,
    count: value.count,
    colors: value.colors,
    fill: `url(#stats-gradient-${index})`,
  }));
}

function countUniqueChakras(techniques: MeditationTechnique[]) {
  return new Set(techniques.flatMap((technique) => technique.associatedChakras))
    .size;
}

const chartConfig = {
  count: {
    label: "Techniques",
  },
} satisfies ChartConfig;

type MeditationStatsProps = React.ComponentProps<"section"> & {
  techniques: MeditationTechnique[];
};

export function MeditationStats({
  techniques,
  className,
  ...props
}: MeditationStatsProps) {
  const categories = groupByCategory(techniques);
  const statsData: StatItem[] = [
    {
      title: `${techniques.length}`,
      description: "Guided Techniques",
    },
    {
      title: `${categories.length}`,
      description: "Energetic Categories",
    },
    {
      title: `${countUniqueChakras(techniques)}`,
      description: "Chakras Addressed",
    },
  ];

  return (
    <section className={cn("overflow-hidden py-32", className)} {...props}>
      <div className="container flex w-full flex-col items-center justify-center px-4 mx-auto">
        <h2 className="relative py-2 text-center font-light tracking-tighter text-4xl lg:text-5xl">
          Built Around the Breath
        </h2>
        <p className="mx-auto max-w-xl px-5 text-center text-sm text-muted-foreground lg:text-base">
          Every technique is timed down to the second, not left to a guess —
          grouped by the effect it has on your energy.
        </p>

        <div className="mt-18 grid w-full max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
          <div className="h-full w-full">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-75"
            >
              <RadialBarChart
                data={categories}
                innerRadius={30}
                outerRadius={150}
              >
                <defs>
                  {categories.map((entry, index) => (
                    <linearGradient
                      key={entry.category}
                      id={`stats-gradient-${index}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={entry.colors.secondary} />
                      <stop offset="100%" stopColor={entry.colors.primary} />
                    </linearGradient>
                  ))}
                </defs>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel nameKey="category" />}
                />
                <RadialBar dataKey="count" background />
              </RadialBarChart>
            </ChartContainer>
            <div className="mt-2 w-full flex-col items-center justify-center text-center text-sm">
              <div className="leading-none font-medium">
                {techniques.length} techniques, three categories
              </div>
              <div className="mt-2 leading-none text-muted-foreground">
                Heating & Energising, Balancing & Harmonising, Cooling & Calming
              </div>
            </div>
          </div>
          <div className="mt-10 flex w-full flex-row items-center justify-between gap-4 md:mt-0 md:flex-col">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="flex w-25 flex-col items-center justify-center gap-2 text-center"
              >
                <h3 className="text-3xl font-light tracking-tighter md:text-4xl">
                  {stat.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
