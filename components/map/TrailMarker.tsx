export type MapMarkerKind = "destination" | "trailhead" | "campground";

/** Hex colors (matching the TrailGo palette) keyed by marker kind. */
export const markerKindColor: Record<MapMarkerKind, string> = {
  destination: "#BC5B2E", // clay
  trailhead: "#D9A441", // gold
  campground: "#4A6B4F", // moss
};

export const markerKindLabel: Record<MapMarkerKind, string> = {
  destination: "Destination",
  trailhead: "Trailhead",
  campground: "Campground",
};

const PIN_PATH =
  "M12 22s7.5-7.05 7.5-12.5S16.14 2 12 2 4.5 4.55 4.5 9.5 12 22 12 22Z";

/**
 * The pin's visual, as a React component — used outside the map (e.g. a
 * legend). The map itself uses `createMarkerElement` below, which renders
 * the same shape as a plain DOM node (Mapbox markers need a real
 * `HTMLElement`, not JSX).
 */
export function TrailMarker({
  kind,
  highlighted = false,
  size = 22,
}: {
  kind: MapMarkerKind;
  highlighted?: boolean;
  size?: number;
}) {
  const color = markerKindColor[kind];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{
        filter: highlighted
          ? "drop-shadow(0 2px 6px rgba(22,36,28,0.45))"
          : "drop-shadow(0 1px 3px rgba(22,36,28,0.3))",
        transform: highlighted ? "scale(1.15)" : "scale(1)",
        transition: "transform 120ms ease",
      }}
    >
      <path d={PIN_PATH} fill={color} stroke="#F3F1E8" strokeWidth="1.5" />
      <circle cx="12" cy="9.5" r="2.6" fill="#F3F1E8" />
    </svg>
  );
}

/**
 * Builds a plain DOM element with the same pin visual as `TrailMarker`,
 * for use with `new mapboxgl.Marker({ element })`. Kept in this file so
 * the two stay visually in sync — one source of truth for the marker's
 * look, in whichever form (JSX vs. imperative DOM) the caller needs.
 */
export function createMarkerElement({
  kind,
  highlighted = false,
}: {
  kind: MapMarkerKind;
  highlighted?: boolean;
}): HTMLDivElement {
  const color = markerKindColor[kind];
  const wrapper = document.createElement("div");
  wrapper.style.cursor = "pointer";
  wrapper.style.lineHeight = "0";
  wrapper.setAttribute("data-marker-kind", kind);
  setMarkerHighlighted(wrapper, highlighted, color);
  return wrapper;
}

/** Updates an existing marker element's visual highlight state in place. */
export function setMarkerHighlighted(
  el: HTMLDivElement,
  highlighted: boolean,
  color?: string
) {
  const resolvedColor =
    color ?? markerKindColor[(el.getAttribute("data-marker-kind") as MapMarkerKind) || "destination"];
  const size = highlighted ? 30 : 24;
  el.style.transform = highlighted ? "scale(1.15)" : "scale(1)";
  el.style.transition = "transform 120ms ease";
  el.innerHTML = `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" style="filter: drop-shadow(0 ${
    highlighted ? "2px 6px" : "1px 3px"
  } rgba(22,36,28,${highlighted ? "0.45" : "0.3"}))">
      <path d="${PIN_PATH}" fill="${resolvedColor}" stroke="#F3F1E8" stroke-width="1.5" />
      <circle cx="12" cy="9.5" r="2.6" fill="#F3F1E8" />
    </svg>
  `;
}
