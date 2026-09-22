import { TopoPattern } from "@/components/layout/TopoPattern";

export function MapPlaceholder() {
  return (
    <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-card border border-mist bg-pine lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
      <TopoPattern className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="relative flex flex-col items-center gap-2 px-6 text-center">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="text-paper/70"
        >
          <path
            d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.7" />
        </svg>
        <p className="font-display text-lg text-paper">
          Interactive map coming soon
        </p>
        <p className="max-w-xs text-sm text-paper/60">
          You&apos;ll be able to see every result plotted here once trail and
          location data comes from a real map.
        </p>
      </div>
    </div>
  );
}
