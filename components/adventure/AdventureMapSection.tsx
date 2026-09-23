import { TopoPattern } from "@/components/layout/TopoPattern";

const markers = [
  { label: "Trailhead", dot: "bg-clay" },
  { label: "Campground", dot: "bg-moss" },
  { label: "Transit stop", dot: "bg-gold" },
];

export function AdventureMapSection() {
  return (
    <section>
      <h2 className="font-display text-2xl text-ink">How It Fits Together</h2>
      <div className="relative mt-4 flex h-64 items-center justify-center overflow-hidden rounded-card border border-mist bg-pine sm:h-80">
        <TopoPattern className="pointer-events-none absolute inset-0 h-full w-full" />
        <div className="relative flex flex-col items-center gap-3 px-6 text-center">
          <p className="font-display text-lg text-paper">
            Interactive map coming soon
          </p>
          <p className="max-w-xs text-sm text-paper/60">
            You&apos;ll see the trailhead, stay options and transit stop
            plotted here once real map data is connected.
          </p>
          <div className="mt-1 flex flex-wrap justify-center gap-3">
            {markers.map((marker) => (
              <span
                key={marker.label}
                className="flex items-center gap-1.5 rounded-pill bg-paper/10 px-3 py-1 text-xs text-paper/80"
              >
                <span className={`h-2 w-2 rounded-full ${marker.dot}`} />
                {marker.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
