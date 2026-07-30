import { Shader } from "../shaders/blob";

type MeditationProgressCircleProps = React.ComponentProps<"div"> & {
  colors: Shader["colors"];
};

export function MeditationProgressCircle({
  colors,
}: MeditationProgressCircleProps) {
  return (
    <div
      id="meditation-progress-circle"
      className="absolute inset-0 rounded-full pointer-events-none"
      style={
        {
          "--progress": "0%",
          background: `conic-gradient(from 0deg, transparent, color-mix(in oklch, ${colors.primary}, transparent), ${colors.secondary} var(--progress), transparent var(--progress))`,
          WebkitMaskImage:
            "radial-gradient(closest-side, transparent calc(100% - 1px), #000 calc(100% - 1px))",
          maskImage:
            "radial-gradient(closest-side, transparent calc(100% - 1px), #000 calc(100% - 1px))",
        } as React.CSSProperties
      }
    />
  );
}
