import { AdventureMatchBreakdown } from "@/lib/types";
import { SampleDataBadge } from "@/components/ui/SampleDataBadge";

const categoryLabel: Record<keyof AdventureMatchBreakdown, string> = {
  accessibility: "Accessibility",
  budgetFit: "Budget Fit",
  activityMatch: "Activity Match",
  difficultyMatch: "Difficulty Match",
  travelTime: "Travel Time",
};

function barTone(score: number) {
  if (score >= 85) return "bg-gold";
  if (score >= 70) return "bg-clay";
  return "bg-moss";
}

export function MatchBreakdownSection({
  score,
  breakdown,
  summary,
}: {
  score: number;
  breakdown: AdventureMatchBreakdown;
  summary: string;
}) {
  const categories = Object.entries(breakdown) as [
    keyof AdventureMatchBreakdown,
    number
  ][];

  return (
    <section className="rounded-card border border-mist bg-white/70 p-6 shadow-soft sm:p-8">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-2xl text-ink">Adventure Match</h2>
        <span className="font-display text-3xl text-clay-dark">{score}%</span>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        <SampleDataBadge />
        <span className="text-xs text-ink/60">
          A fixed sample score, not personalized to your search.
        </span>
      </div>

      <p className="mt-3 max-w-xl text-ink/70">{summary}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {categories.map(([key, value]) => (
          <div key={key}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-ink/70">{categoryLabel[key]}</span>
              <span className="font-medium text-ink">{value}%</span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-pill bg-mist">
              <div
                className={`h-full rounded-pill ${barTone(value)}`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
