import { Trail } from "@/lib/types";

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
  return (
    <section>
      <h2 className="font-display text-2xl text-ink">Trails</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trails.map((trail) => (
          <article
            key={trail.id}
            className="rounded-card border border-mist bg-white/70 p-5 shadow-soft"
          >
            <h3 className="font-display text-lg text-ink">{trail.name}</h3>
            <p className="mt-2 text-sm text-ink/70">{trail.description}</p>

            <dl className="mt-4 grid grid-cols-2 gap-y-1.5 text-sm text-ink/80">
              <dd>{trail.distanceMiles} mi</dd>
              <dd>{formatDuration(trail.durationMinutes)}</dd>
              <dd>{difficultyLabel[trail.difficulty]}</dd>
              <dd>{trail.routeType}</dd>
              <dd className="col-span-2 text-ink/60">
                {trail.elevationGainFeet.toLocaleString()} ft elevation gain
              </dd>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
