import { Destination } from "@/lib/types";

const difficultyLabel: Record<Destination["difficulty"], string> = {
  easy: "Easy",
  moderate: "Moderate",
  hard: "Hard",
};

const gradientClass: Record<Destination["imageGradient"], string> = {
  "trail-1": "bg-trail-1",
  "trail-2": "bg-trail-2",
  "trail-3": "bg-trail-3",
};

function CarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 13l1.5-5A2 2 0 0 1 6.4 6.5h11.2A2 2 0 0 1 19.5 8l1.5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="2.5" y="13" width="19" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="7" cy="18.5" r="1.4" fill="currentColor" />
      <circle cx="17" cy="18.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

function TransitIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="3.5" width="16" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 11.5h16" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 20l2-3.5M17 20l-2-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="8" cy="14" r="0.9" fill="currentColor" />
      <circle cx="16" cy="14" r="0.9" fill="currentColor" />
    </svg>
  );
}

function formatTravelTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (hours === 0) return `${remaining} min`;
  if (remaining === 0) return `${hours} hr`;
  return `${hours} hr ${remaining} min`;
}

export function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="overflow-hidden rounded-card border border-mist bg-white/70 shadow-soft">
      <div
        className={`h-40 w-full ${gradientClass[destination.imageGradient]}`}
        role="img"
        aria-label={`Illustrative scene for ${destination.name}`}
      />
      <div className="p-5">
        <h3 className="font-display text-xl text-ink">{destination.name}</h3>
        <p className="mt-0.5 text-sm text-ink/60">{destination.location}</p>

        <dl className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-ink/80">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Difficulty</dt>
            <dd>{difficultyLabel[destination.difficulty]}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Hiking distance</dt>
            <dd>{destination.hikingDistanceMiles} mi</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Travel time</dt>
            <dd>{formatTravelTime(destination.travelTimeMinutes)}</dd>
          </div>
          <div className="flex items-center gap-1.5 text-moss" title={
            destination.reachableBy.includes("no-car")
              ? "Reachable with or without a car"
              : "Car required"
          }>
            <dt className="sr-only">Transportation</dt>
            <dd className="flex items-center gap-1.5">
              {destination.reachableBy.includes("no-car") ? (
                <TransitIcon />
              ) : (
                <CarIcon />
              )}
              <span className="text-ink/80">
                {destination.reachableBy.includes("no-car")
                  ? "No car needed"
                  : "Car required"}
              </span>
            </dd>
          </div>
        </dl>

        <div className="mt-4 flex items-baseline justify-between border-t border-mist pt-3">
          <span className="text-sm text-ink/50">Est. trip cost</span>
          <span className="font-display text-lg text-clay-dark">
            ${destination.estimatedCost}
          </span>
        </div>
      </div>
    </article>
  );
}
