"use client";

import { useEffect } from "react";
import type mapboxgl from "mapbox-gl";
import { Coordinates } from "@/lib/types";

const SOURCE_ID = "trailgo-route-preview";
const LAYER_ID = "trailgo-route-preview-line";

/**
 * Draws a dashed straight-line "conceptual" path connecting a sequence of
 * points (e.g. destination → trailhead → campground) on an existing
 * Mapbox map instance. This is explicitly NOT real routing/directions —
 * just a visual thread tying the markers together, styled dashed so it
 * reads as illustrative rather than a driving/walking route.
 *
 * Isolated here (rather than inlined in AdventureMap) so the "no real
 * routing yet" concern has one obvious place to grow into a real
 * directions API later, without touching the map wrapper itself.
 */
export function useRoutePreview(
  map: mapboxgl.Map | null,
  points: Coordinates[]
) {
  useEffect(() => {
    if (!map || points.length < 2) return;

    const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: points.map((p) => [p.lng, p.lat]),
      },
    };

    function draw() {
      if (!map) return;
      const existingSource = map.getSource(SOURCE_ID) as
        | mapboxgl.GeoJSONSource
        | undefined;

      if (existingSource) {
        existingSource.setData(geojson);
        return;
      }

      map.addSource(SOURCE_ID, { type: "geojson", data: geojson });
      map.addLayer({
        id: LAYER_ID,
        type: "line",
        source: SOURCE_ID,
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#4A6B4F",
          "line-width": 2.5,
          "line-dasharray": [1.5, 1.5],
          "line-opacity": 0.85,
        },
      });
    }

    if (map.isStyleLoaded()) {
      draw();
    } else {
      map.once("load", draw);
    }

    return () => {
      if (!map) return;
      if (!map.getStyle) return;
      try {
        if (map.getLayer(LAYER_ID)) map.removeLayer(LAYER_ID);
        if (map.getSource(SOURCE_ID)) map.removeSource(SOURCE_ID);
      } catch {
        // Map may already be torn down — nothing to clean up.
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, JSON.stringify(points)]);
}

/** Small caption clarifying the dashed line is illustrative, not a real route. */
export function RoutePreviewNote() {
  return (
    <p className="mt-2 text-xs text-ink/50">
      Dashed line is a conceptual route — not real turn-by-turn directions.
    </p>
  );
}
