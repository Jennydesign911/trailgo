import { Trail } from "@/lib/types";
import { SampleDataBadge } from "@/components/ui/SampleDataBadge";

const difficultyLabel: Record<Trail["difficulty"], string> = {
  easy: "Easy",
  moderate: "Moderate",
  hard: "Hard",
};

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (hours === 0) return `${remaining} min`;
  if (remaining === 0) return `${hours} hr`;
  return `${hours} hr ${remaining} min`;
}

export function TrailsSection({ trails }: { trails: Trail[] }) {
  // One badge for the section when every trail is sample data; per-trail
  // badges only if some trails are verified and others are not.
  const allSample = trails.every((trail) => trail.dataStatus !== "verified");

  return (
    <section>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h2 className="font-display text-2xl text-ink">Trails</h2>
        {allSample && <SampleDataBadge />}
      </div>
      {allSample && (
        <p className="mt-1 text-sm text-ink/60">
          Distances, durations and elevation are sample values, not measured data.
        </p>
      )}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trails.map((trail) => (
          <article
            key={trail.id}
            className="rounded-card border border-mist bg-white/70 p-5 shadow-soft"
          >
            <h3 className="font-display text-lg text-ink">{trail.name}</h3>
            <p className="mt-2 text-sm text-ink/70">{trail.description}</p>

            <ul className="mt-4 grid grid-cols-2 gap-y-1.5 text-sm text-ink/80">
              <li>{trail.distanceMiles} mi</li>
              <li>{formatDuration(trail.durationMinutes)}</li>
              <li>{difficultyLabel[trail.difficulty]}</li>
              <li>{trail.routeType}</li>
              <li className="col-span-2 text-ink/60">
                {trail.elevationGainFeet.toLocaleString()} ft elevation gain
              </li>
            </ul>
            {!allSample && trail.dataStatus !== "verified" && (
              <div className="mt-3">
                <SampleDataBadge />
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
