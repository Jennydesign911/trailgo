import { DiscoverDestination, VerifiedLocation } from "@/lib/types";
import { AdventureMap, AdventureMapPoint } from "@/components/map/AdventureMap";
import {
  MapMarkerKind,
  markerKindColor,
  markerKindLabel,
} from "@/components/map/TrailMarker";
import {
  availabilityPopupHtml,
  escapeHtml,
  formatCheckedDate,
  isClosure,
} from "@/lib/status-labels";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";

/** Popup shown when a marker is clicked or tapped: name, type, official source link. */
function buildPopupHtml(kind: MapMarkerKind, location: VerifiedLocation): string {
  const hasLink = /^https?:\/\//.test(location.sourceUrl);
  // Closure text comes from the structured availability fields; `note` is only
  // shown here for general caveats, so the same warning never appears twice.
  const note = location.note && !location.availabilityNote
    ? `<p style="margin:8px 0 0; font-size:12px; line-height:1.4; color:#9A4A23;">${escapeHtml(location.note)}</p>`
    : "";
  const link = hasLink
    ? `<a href="${escapeHtml(location.sourceUrl)}" target="_blank" rel="noopener noreferrer" style="display:inline-block; margin-top:10px; padding:9px 14px; background:#1F3626; color:#F3F1E8; font-size:12px; font-weight:500; border-radius:999px; text-decoration:none;">View official source</a>`
    : "";
  return `
    <div style="font-family: var(--font-public-sans), system-ui, sans-serif; padding: 2px 2px 4px; min-width: 180px;">
      <p style="margin:0 0 4px; font-family: var(--font-fraunces), serif; font-size:16px; line-height:1.25; color:#16241C;">${escapeHtml(location.label)}</p>
      <p style="margin:0; font-size:12px; color:rgba(22,36,28,0.7);">
        <span style="display:inline-block; width:9px; height:9px; border-radius:50%; background:${markerKindColor[kind]}; margin-right:6px;"></span>${markerKindLabel[kind]}
      </p>
      <p style="margin:6px 0 0; font-size:12px; color:rgba(22,36,28,0.55);">Source: ${escapeHtml(location.source)}</p>
      ${availabilityPopupHtml(location)}
      ${note}
      ${link}
    </div>
  `;
}

/**
 * Detail-page map. It only ever draws locations that carry a named source
 * (see `VerifiedLocation` in lib/types.ts). Anything without one is left
 * off the map and listed below it as "location not verified" — we never
 * guess a position.
 *
 * A dashed "conceptual" line joins the markers that ARE shown. It is not a
 * real route.
 */
export function AdventureMapSection({
  destination,
}: {
  destination: DiscoverDestination;
}) {
  const detail = destination.detail;
  if (!detail) return null;

  const { trailhead, campground } = detail.mapMarkers;

  const shown: { id: string; kind: MapMarkerKind; location: VerifiedLocation }[] = [];

  // If the destination point and the trailhead are the exact same place
  // (e.g. Breakneck Ridge), draw only the more specific trailhead marker.
  const destinationIsTrailhead =
    !!destination.coordinates &&
    !!trailhead &&
    destination.coordinates.lat === trailhead.lat &&
    destination.coordinates.lng === trailhead.lng;

  if (destination.coordinates && !destinationIsTrailhead) {
    shown.push({
      id: `${destination.id}-destination`,
      kind: "destination",
      location: destination.coordinates,
    });
  }
  if (trailhead) {
    shown.push({
      id: `${destination.id}-trailhead`,
      kind: "trailhead",
      location: trailhead,
    });
  }
  if (campground) {
    shown.push({
      id: `${destination.id}-campground`,
      kind: "campground",
      location: campground,
    });
  }

  // What is missing because it is NOT VERIFIED (as opposed to not existing).
  const unverified: string[] = [];
  if (!destination.coordinates) unverified.push("Destination");
  if (!trailhead) unverified.push("Trailhead");
  const hasCampgroundStay = detail.stayOptions.some((o) => o.type === "Campground");
  if (hasCampgroundStay && !campground) unverified.push("Campground");

  const points: AdventureMapPoint[] = shown.map((entry) => ({
    id: entry.id,
    kind: entry.kind,
    label: entry.location.label,
    coordinates: entry.location,
    popupHtml: buildPopupHtml(entry.kind, entry.location),
  }));

  const routePoints = points.map((p) => p.coordinates);
  // Closures come from the structured availability fields; free-text notes are
  // only for other caveats (e.g. "this marks one area, not the whole seashore").
  const closures = shown.filter((entry) => isClosure(entry.location.availability));
  const caveats = shown.filter(
    (entry) => entry.location.note && !entry.location.availabilityNote
  );

  return (
    <section>
      <h2 className="font-display text-2xl text-ink">How It Fits Together</h2>

      <div className="mt-4">
        {points.length > 0 ? (
          <AdventureMap
            points={points}
            routePoints={routePoints}
            showLegend
            heightClassName="h-64 sm:h-80"
          />
        ) : (
          <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-card border border-mist bg-pine px-6 text-center">
            <p className="font-display text-lg text-paper">Map not available yet</p>
            <p className="max-w-sm text-sm text-paper/60">
              We haven&apos;t verified any map locations for this adventure, so
              we&apos;re not showing a map rather than guessing.
            </p>
          </div>
        )}
      </div>

      {unverified.length > 0 && (
        <p className="mt-3 text-sm text-ink/70">
          Location not verified, so not shown on the map:{" "}
          {unverified.join(", ")}.
        </p>
      )}

      {closures.length > 0 && (
        <ul className="mt-3 space-y-3">
          {closures.map((entry) => (
            <li
              key={entry.id}
              className="rounded-card border border-clay/40 bg-clay/10 p-4 text-sm"
            >
              <AvailabilityBadge status={entry.location.availability} />
              <p className="mt-2 font-medium text-ink">{entry.location.label}</p>
              <p className="mt-1 text-clay-dark">{entry.location.availabilityNote}</p>
              <p className="mt-1 text-xs text-ink/60">
                Last checked {formatCheckedDate(entry.location.lastChecked)}
              </p>
            </li>
          ))}
        </ul>
      )}

      {caveats.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-clay-dark">
          {caveats.map((entry) => (
            <li key={entry.id}>
              <span className="font-medium">{entry.location.label}:</span>{" "}
              {entry.location.note}
            </li>
          ))}
        </ul>
      )}

      {shown.length > 0 && (
        <p className="mt-3 text-xs text-ink/60">
          A map point confirms where a place is, not that it is open. Check
          current availability before you go.
        </p>
      )}

      {shown.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-medium text-ink/60">Where these map points come from</p>
          <ul className="mt-1 space-y-0.5 text-xs text-ink/50">
            {shown.map((entry) => (
              <li key={entry.id}>
                {markerKindLabel[entry.kind]}: {entry.location.label} —{" "}
                <a
                  href={entry.location.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-clay"
                >
                  {entry.location.source}
                </a>{" "}
                (checked {formatCheckedDate(entry.location.lastChecked)})
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
