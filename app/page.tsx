import { Meditation } from "@/features/meditation/components/meditation";
import { bhastrikaPranayama } from "@/features/meditation/data";

export default function Page() {
  return (
    <main>
      <Meditation meditationTechnique={bhastrikaPranayama} />
    </main>
  );
}
