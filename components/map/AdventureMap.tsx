"use client";

import { useEffect, useRef, useState } from "react";
import type mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Coordinates } from "@/lib/types";
import {
  MapMarkerKind,
  TrailMarker,
  createMarkerElement,
  markerKindColor,
  markerKindLabel,
  setMarkerHighlighted,
} from "./TrailMarker";
import { useRoutePreview, RoutePreviewNote } from "./RoutePreview";

export interface AdventureMapPoint {
  id: string;
  kind: MapMarkerKind;
  label: string;
  coordinates: Coordinates;
  /** Popup content shown when this marker is clicked or tapped. */
  popupHtml?: string;
}

// Legend text, shown for every marker type so the colors are always explained.
const legendKinds: MapMarkerKind[] = ["destination", "trailhead", "campground"];
const legendColorWord: Record<MapMarkerKind, string> = {
  destination: "Red",
  trailhead: "Gold",
  campground: "Green",
};

interface AdventureMapProps {
  points: AdventureMapPoint[];
  /** Highlights the marker for this point id (e.g. from a hovered card). */
  highlightedId?: string | null;
  onMarkerClick?: (id: string) => void;
  onMarkerHoverStart?: (id: string) => void;
  onMarkerHoverEnd?: (id: string) => void;
  /** Client-side pages can build popup HTML here. Server pages should use `point.popupHtml`. */
  getPopupHtml?: (id: string) => string | null;
  /** Ordered points to connect with a dashed "conceptual route" line. */
  routePoints?: Coordinates[];
  heightClassName?: string;
  /** Shown under the map when there's more than one marker kind present. */
  showLegend?: boolean;
}

/**
 * The one place TrailGo talks to a map provider (currently Mapbox GL).
 * Every page that needs a map goes through this component's `points`/
 * `onMarkerClick`/`highlightedId` props rather than importing mapbox-gl
 * directly — swapping providers later means rewriting this file only.
 */
export function AdventureMap({
  points,
  highlightedId = null,
  onMarkerClick,
  onMarkerHoverStart,
  onMarkerHoverEnd,
  getPopupHtml,
  routePoints,
  heightClassName = "h-80",
  showLegend = false,
}: AdventureMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // Create the map once.
  useEffect(() => {
    if (!token) return;
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;

    import("mapbox-gl")
      .then((mod) => {
        if (cancelled || !containerRef.current) return;
        const mapboxgl = mod.default;
        mapboxgl.accessToken = token;

        const map = new mapboxgl.Map({
          container: containerRef.current,
          style: "mapbox://styles/mapbox/outdoors-v12",
          center: [-74.0, 41.5],
          zoom: 7,
          attributionControl: true,
        });
        map.addControl(new mapboxgl.NavigationControl(), "top-right");

        mapRef.current = map;
        setMapInstance(map);
      })
      .catch(() => {
        if (!cancelled) setError("Map failed to load.");
      });

    return () => {
      cancelled = true;
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current.clear();
      mapRef.current?.remove();
      mapRef.current = null;
      setMapInstance(null);
    };
  }, [token]);

  // Keep markers in sync with `points`, and fit the map to show all of them.
  useEffect(() => {
    const map = mapInstance;
    if (!map) return;

    const existingIds = new Set(markersRef.current.keys());
    const nextIds = new Set(points.map((p) => p.id));

    // Remove markers no longer present (e.g. filtered out on Discover).
    existingIds.forEach((id) => {
      if (!nextIds.has(id)) {
        markersRef.current.get(id)?.remove();
        markersRef.current.delete(id);
      }
    });

    function placeMarkers(activeMap: mapboxgl.Map) {
      import("mapbox-gl").then((mod) => {
        const mapboxgl = mod.default;

        points.forEach((point) => {
          const existing = markersRef.current.get(point.id);
          if (existing) {
            existing.setLngLat([point.coordinates.lng, point.coordinates.lat]);
            return;
          }

          const el = createMarkerElement({
            kind: point.kind,
            highlighted: point.id === highlightedId,
          });

          if (onMarkerHoverStart) {
            el.addEventListener("mouseenter", () => onMarkerHoverStart(point.id));
          }
          if (onMarkerHoverEnd) {
            el.addEventListener("mouseleave", () => onMarkerHoverEnd(point.id));
          }
          if (onMarkerClick) {
            el.addEventListener("click", () => onMarkerClick(point.id));
          }

          const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
            .setLngLat([point.coordinates.lng, point.coordinates.lat])
            .addTo(activeMap);

          const popupHtml = point.popupHtml ?? getPopupHtml?.(point.id);
          if (popupHtml) {
            marker.setPopup(
              new mapboxgl.Popup({ offset: 30, maxWidth: "260px", closeButton: true }).setHTML(popupHtml)
            );
          }

          marker
            .getElement()
            .setAttribute("aria-label", `${markerKindLabel[point.kind]}: ${point.label}`);

          markersRef.current.set(point.id, marker);
        });

        if (points.length > 0) {
          const bounds = new mapboxgl.LngLatBounds();
          points.forEach((p) => bounds.extend([p.coordinates.lng, p.coordinates.lat]));
          activeMap.fitBounds(bounds, { padding: 60, maxZoom: 13, duration: 400 });
        }
      });
    }

    if (map.isStyleLoaded()) {
      placeMarkers(map);
    } else {
      map.once("load", () => placeMarkers(map));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapInstance, JSON.stringify(points.map((p) => [p.id, p.coordinates]))]);

  // Keep the highlighted marker visually in sync.
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const el = marker.getElement() as HTMLDivElement;
      setMarkerHighlighted(el, id === highlightedId);
    });
  }, [highlightedId]);

  useRoutePreview(mapInstance, routePoints ?? []);

  if (!token) {
    return (
      <div
        className={`flex ${heightClassName} flex-col items-center justify-center gap-2 rounded-card border border-mist bg-pine px-6 text-center`}
      >
        <p className="font-display text-lg text-paper">Map unavailable</p>
        <p className="max-w-xs text-sm text-paper/60">
          Add a NEXT_PUBLIC_MAPBOX_TOKEN to your environment to enable the
          interactive map. See .env.example.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex ${heightClassName} flex-col items-center justify-center gap-2 rounded-card border border-mist bg-pine px-6 text-center`}
      >
        <p className="font-display text-lg text-paper">Map unavailable</p>
        <p className="max-w-xs text-sm text-paper/60">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div
        ref={containerRef}
        className={`${heightClassName} w-full overflow-hidden rounded-card border border-mist`}
      />
      {showLegend && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            {legendKinds.map((kind) => (
              <span
                key={kind}
                className="flex items-center gap-1.5 text-xs text-ink/70"
              >
                <TrailMarker kind={kind} size={14} />
                {legendColorWord[kind]} = {markerKindLabel[kind]}
              </span>
            ))}
          </div>
          {points.some((p) => p.popupHtml) && (
            <p className="mt-1.5 text-xs text-ink/50">
              Tap or click a marker for details.
            </p>
          )}
        </div>
      )}
      {routePoints && routePoints.length > 1 && <RoutePreviewNote />}
    </div>
  );
}

// Re-exported so callers can use TrailGo's marker colors elsewhere (e.g. a
// static legend outside the map) without importing from TrailMarker.tsx.
export { markerKindColor };
