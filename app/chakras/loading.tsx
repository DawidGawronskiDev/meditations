import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="block">
              <Card
                className={"relative ring-0"}
                style={{
                  background: `linear-gradient(to top, var(--muted-foreground) 0%, var(--muted-foreground), transparent)`,
                }}
              >
                <div className="relative w-1/2 aspect-square flex items-center justify-center mx-auto">
                  <Skeleton className="w-full h-full rounded-full" />
                </div>
                <CardHeader>
                  <CardTitle className="text-white">
                    <Skeleton className="w-1/2 h-6" />
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    <Skeleton className="w-full h-16 mt-1" />
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
