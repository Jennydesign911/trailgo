import { TrailDayPlan } from "@/lib/types";

const difficultyLabel: Record<TrailDayPlan["difficulty"], string> = {
  easy: "Easy",
  moderate: "Moderate",
  hard: "Hard",
};

export function TrailDayPlanSection({ plan }: { plan: TrailDayPlan }) {
  return (
    <section>
      <h2 className="font-display text-2xl text-ink">Trail Day Plan</h2>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_260px]">
        <div className="rounded-card border border-mist bg-white/70 p-5 shadow-soft sm:p-6">
          <h3 className="font-display text-lg text-ink">{plan.trailName}</h3>

          <dl className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-ink/80 sm:grid-cols-3">
            <div>
              <dt className="text-ink/50">Distance</dt>
              <dd>{plan.trailDistanceMiles} mi</dd>
            </div>
            <div>
              <dt className="text-ink/50">Duration</dt>
              <dd>{Math.round(plan.estimatedDurationMinutes / 60 * 10) / 10} hr</dd>
            </div>
            <div>
              <dt className="text-ink/50">Difficulty</dt>
              <dd>{difficultyLabel[plan.difficulty]}</dd>
            </div>
            {plan.elevationGainFeet !== undefined && (
              <div>
                <dt className="text-ink/50">Elevation gain</dt>
                <dd>{plan.elevationGainFeet.toLocaleString()} ft</dd>
              </div>
            )}
            <div>
              <dt className="text-ink/50">Start</dt>
              <dd>{plan.suggestedStartTime}</dd>
            </div>
            <div>
              <dt className="text-ink/50">Finish</dt>
              <dd>{plan.suggestedFinishTime}</dd>
            </div>
          </dl>

          <p className="mt-4 border-t border-mist pt-3 text-sm text-ink/70">
            Lunch / rest window: {plan.lunchWindow}
          </p>
        </div>

        <div className="rounded-card border border-mist bg-white/70 p-5 shadow-soft sm:p-6">
          <h3 className="font-display text-lg text-ink">Before You Go</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink/80">
            {plan.checklist.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
