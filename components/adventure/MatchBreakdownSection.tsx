import { AdventureMatchBreakdown } from "@/lib/types";

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

      <p className="mt-2 max-w-xl text-ink/70">{summary}</p>

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
