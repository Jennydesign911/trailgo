import { TripCostItem } from "@/lib/types";

export function TripCostSection({
  items,
  total,
}: {
  items: TripCostItem[];
  total: number;
}) {
  const sum = items.reduce((acc, item) => acc + item.amount, 0);

  return (
    <section className="rounded-card border border-mist bg-white/70 p-6 shadow-soft sm:p-8">
      <h2 className="font-display text-2xl text-ink">Cost Breakdown</h2>
      <p className="mt-1 text-sm text-ink/60">
        Rough per-person estimate for this specific plan.
      </p>

      <dl className="mt-5 divide-y divide-mist">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between py-2.5 text-sm"
          >
            <dt className="text-ink/70">{item.label}</dt>
            <dd className="text-ink">${item.amount}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between pt-3 text-base">
          <dt className="font-medium text-ink">Estimated total</dt>
          <dd className="font-display text-xl text-clay-dark">${sum || total}</dd>
        </div>
      </dl>
    </section>
  );
}
