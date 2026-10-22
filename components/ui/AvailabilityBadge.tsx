import { AvailabilityStatus } from "@/lib/types";
import { AVAILABILITY_LABEL } from "@/lib/status-labels";

// Tailwind class names must live in components/ or app/ to be generated.
const lightTone: Record<AvailabilityStatus, string> = {
  open: "bg-moss/10 text-moss",
  temporarily_unavailable: "bg-clay/10 text-clay-dark",
  closed: "bg-ink/10 text-ink",
  unknown: "bg-mist text-ink/70",
};

const darkTone: Record<AvailabilityStatus, string> = {
  open: "bg-paper/20 text-paper",
  temporarily_unavailable: "bg-clay text-paper",
  closed: "bg-ink text-paper",
  unknown: "bg-paper/20 text-paper",
};

/**
 * Shows whether a real-world place can be used right now. A verified location
 * does NOT imply "open", so the default wording is "Current availability not
 * confirmed" unless a source says otherwise.
 */
export function AvailabilityBadge({
  status = "unknown",
  variant = "light",
  className = "",
}: {
  status?: AvailabilityStatus;
  variant?: "light" | "dark";
  className?: string;
}) {
  const tone = variant === "dark" ? darkTone[status] : lightTone[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill px-2.5 py-0.5 text-xs font-medium ${tone} ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      {AVAILABILITY_LABEL[status]}
    </span>
  );
}
