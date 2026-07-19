/**
 * SceneBridge — smooth gradient transition between scenes of contrasting colors.
 * Place between scenes where the background color changes significantly
 * (e.g. cream → navy or navy → cream).
 *
 * Usage:
 *   <SceneBridge from="cream" to="navy" />
 *   <SceneBridge from="navy" to="cream" />
 */
export function SceneBridge({
  from = "cream",
  to = "navy",
}: {
  from?: "cream" | "navy";
  to?: "cream" | "navy";
}) {
  const fromColor = from === "navy" ? "var(--color-navy)" : "var(--color-cream)";
  const toColor = to === "navy" ? "var(--color-navy)" : "var(--color-cream)";

  return (
    <div
      className="relative h-24 w-full md:h-32"
      style={{
        background: `linear-gradient(to bottom, ${fromColor} 0%, ${toColor} 100%)`,
      }}
      aria-hidden="true"
    />
  );
}
