import {
  AvailabilityStatus,
  DiscoverDestination,
  VerifiedLocation,
} from "./types";

/**
 * One place for the wording and colors of "sample data" and availability
 * labels, so the React badges and the map popups (plain HTML strings) can
 * never drift apart.
 *
 * NOTE: Tailwind only scans app/ and components/, so Tailwind class names live
 * in the badge components. This file holds only text and hex colors.
 */

/** The exact wording used everywhere unverified content appears. */
export const SAMPLE_LABEL = "Sample data — not verified";

export const AVAILABILITY_LABEL: Record<AvailabilityStatus, string> = {
  open: "Open",
  temporarily_unavailable: "Temporarily unavailable",
  closed: "Closed",
  unknown: "Current availability not confirmed",
};

/** Hex colors for HTML-string popups, matching the TrailGo palette. */
export const AVAILABILITY_HEX: Record<AvailabilityStatus, { bg: string; fg: string }> = {
  open: { bg: "#E3EAE3", fg: "#4A6B4F" },
  temporarily_unavailable: { bg: "#F6E7DF", fg: "#9A4A23" },
  closed: { bg: "#E4E2D5", fg: "#16241C" },
  unknown: { bg: "#E4E2D5", fg: "#55615A" },
};

/** True when a source says the place is not usable right now. */
export function isClosure(status?: AvailabilityStatus): boolean {
  return status === "temporarily_unavailable" || status === "closed";
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * "2026-10-14" -> "Oct 14, 2026". Done by hand (not with Date/Intl) so the
 * server and the browser always print exactly the same text.
 */
export function formatCheckedDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const month = MONTHS[Number(match[2]) - 1];
  if (!month) return iso;
  return `${month} ${Number(match[3])}, ${match[1]}`;
}

/** Escapes text before it goes into a popup's HTML string. */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** A small status pill as an HTML string, for map popups. */
export function availabilityPillHtml(status: AvailabilityStatus): string {
  const { bg, fg } = AVAILABILITY_HEX[status];
  return `<span style="display:inline-block; padding:3px 10px; border-radius:999px; background:${bg}; color:${fg}; font-size:11px; font-weight:600;">${escapeHtml(
    AVAILABILITY_LABEL[status]
  )}</span>`;
}

/** Status block for a verified location's popup: pill, last-checked date, and the source's note. */
export function availabilityPopupHtml(location: VerifiedLocation): string {
  const status: AvailabilityStatus = location.availability ?? "unknown";
  const note =
    isClosure(status) && location.availabilityNote
      ? `<p style="margin:6px 0 0; font-size:12px; line-height:1.4; color:#9A4A23;">${escapeHtml(location.availabilityNote)}</p>`
      : "";
  return `
      <p style="margin:8px 0 0;">${availabilityPillHtml(status)}</p>
      <p style="margin:4px 0 0; font-size:11px; color:rgba(22,36,28,0.55);">Last checked ${escapeHtml(formatCheckedDate(location.lastChecked))}</p>
      ${note}`;
}

export interface AvailabilityNotice {
  status: AvailabilityStatus;
  label: string;
  note: string;
  locationLabel: string;
  lastChecked: string;
  source: string;
  sourceUrl: string;
}

/**
 * A destination-level warning, shown when the destination's own map point or
 * its trailhead is reported closed or temporarily unavailable. Campground
 * closures are NOT included — they are shown on the stay card and the map.
 */
export function getAvailabilityNotice(
  destination: DiscoverDestination
): AvailabilityNotice | null {
  const candidates = [
    destination.coordinates,
    destination.detail?.mapMarkers.trailhead,
  ];
  for (const location of candidates) {
    if (location && isClosure(location.availability)) {
      const status = location.availability as AvailabilityStatus;
      return {
        status,
        label: AVAILABILITY_LABEL[status],
        note:
          location.availabilityNote ??
          location.note ??
          "Check with the managing agency before you go.",
        locationLabel: location.label,
        lastChecked: location.lastChecked,
        source: location.source,
        sourceUrl: location.sourceUrl,
      };
    }
  }
  return null;
}
