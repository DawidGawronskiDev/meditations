import { MeditationVisuals } from "@/features/meditation/components/meditation-visuals";
import { getRandomMeditationTechnique } from "@/features/meditation/queries";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Meditations", href: "/meditations" },
];

export function Footer() {
  return (
    <footer className="relative">
      <div className="container mx-auto px-4 py-32">
        <nav className="flex flex-col items-center justify-center gap-4">
          <ul className="flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground">
            {navigationLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <FooterVisuals />
    </footer>
  );
}

export async function FooterVisuals() {
  const { shader } = await getRandomMeditationTechnique();

  return (
    <div className="flex items-center justify-center h-64 overflow-hidden relative inset-x-0 bottom-0">
      <MeditationVisuals
        shader={shader}
        className="max-w-xl absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
      />
    </div>
  );
}
