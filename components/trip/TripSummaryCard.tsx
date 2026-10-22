import { TrailDayPlan, TripPlan } from "@/lib/types";
import { SampleDataBadge } from "@/components/ui/SampleDataBadge";

const difficultyLabel: Record<TrailDayPlan["difficulty"], string> = {
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

export function TripSummaryCard({
  plan,
  estimatedTripCost,
}: {
  plan: TripPlan;
  estimatedTripCost: number;
}) {
  const rows: { label: string; value: string }[] = [
    { label: "Departure", value: plan.departure },
    { label: "Arrival at trail", value: plan.arrivalAtTrail },
    { label: "Hike starts", value: plan.trailStartTime },
    { label: "Return time", value: plan.returnTime },
    { label: "Estimated arrival home", value: plan.estimatedArrivalHome },
  ];

  return (
    <section className="rounded-card border border-mist bg-white/70 p-6 shadow-soft sm:p-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h2 className="font-display text-2xl text-ink">A Sample Day at a Glance</h2>
        <SampleDataBadge />
      </div>
      <p className="mt-1 text-sm text-ink/60">
        Clock times, durations and costs are illustrative placeholders.
      </p>

      <dl className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between border-b border-mist pb-2 text-sm">
            <dt className="text-ink/60">{row.label}</dt>
            <dd className="font-medium text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-mist pt-5 sm:grid-cols-4">
        <div>
          <p className="text-xs text-ink/50">Total travel time</p>
          <p className="mt-1 font-display text-lg text-ink">
            {formatDuration(plan.totalTravelTimeMinutes)}
          </p>
        </div>
        <div>
          <p className="text-xs text-ink/50">Hiking duration</p>
          <p className="mt-1 font-display text-lg text-ink">
            {formatDuration(plan.trailDayPlan.estimatedDurationMinutes)}
          </p>
        </div>
        <div>
          <p className="text-xs text-ink/50">Difficulty</p>
          <p className="mt-1 font-display text-lg text-ink">
            {difficultyLabel[plan.trailDayPlan.difficulty]}
          </p>
        </div>
        <div>
          <p className="text-xs text-ink/50">Sample estimate</p>
          <p className="mt-1 font-display text-lg text-clay-dark">
            ${estimatedTripCost}
          </p>
        </div>
      </div>
    </section>
  );
}
