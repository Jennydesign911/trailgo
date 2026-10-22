import { SAMPLE_LABEL } from "@/lib/status-labels";

/**
 * Marks hand-written placeholder content. Use it next to anything that has
 * not been checked against a real source, so it is never read as a confirmed
 * recommendation. "dark" is for use on the dark hero photos.
 */
export function SampleDataBadge({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const tone =
    variant === "dark"
      ? "border-paper/50 bg-paper/10 text-paper"
      : "border-ink/30 bg-white/60 text-ink/70";
  return (
    <span
      title="Hand-written placeholder data that has not been checked against a real source"
      className={`inline-flex items-center whitespace-nowrap rounded-pill border border-dashed px-2.5 py-0.5 text-xs font-medium ${tone} ${className}`}
    >
      {SAMPLE_LABEL}
    </span>
  );
}
