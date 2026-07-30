import { Shader } from "@/features/meditation/shaders/blob";

type BackgroundPattern = React.ComponentProps<"section"> & {
  colors: Shader["colors"];
};

export function Background({ colors, className }: BackgroundPattern) {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background: `radial-gradient(ellipse 80% 60% at 50% 0%, oklch(from ${colors.secondary} calc(l - 0.1) c h / 0.20), transparent 70%)`,
      }}
    />
  );
}
