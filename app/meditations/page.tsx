import { MeditationCard } from "@/features/meditation/components/meditation-card";
import { getMeditationTechniques } from "@/features/meditation/queries";

export default function Page() {
  return (
    <main>
      <MeditationList />
    </main>
  );
}

export async function MeditationList() {
  const meditationTechniques = await getMeditationTechniques();

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {meditationTechniques.map((technique) => (
            <MeditationCard key={technique.name} technique={technique} />
          ))}
        </div>
      </div>
    </section>
  );
}
