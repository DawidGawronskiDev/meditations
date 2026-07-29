import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <React.Fragment>
      <section>
        <div className="container mx-auto px-4">
          <Skeleton className="w-full max-w-xs h-8" />
        </div>
      </section>
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <Skeleton className="w-full max-w-xs h-8" />
            <Skeleton className="w-full aspect-square max-w-xs rounded-full" />
            <Skeleton className="w-full max-w-xs h-8" />
            <Skeleton className="w-full max-w-xs h-8" />
            <Skeleton className="w-full max-w-xs h-8" />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
