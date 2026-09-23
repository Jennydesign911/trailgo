import { StayOption } from "@/lib/types";

export function StaySection({ options }: { options: StayOption[] }) {
  return (
    <section>
      <h2 className="font-display text-2xl text-ink">Where to Stay</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <article
            key={option.id}
            className="rounded-card border border-mist bg-white/70 p-5 shadow-soft"
          >
            <span className="rounded-pill bg-pine/10 px-3 py-1 text-xs font-medium text-pine">
              {option.type}
            </span>
            <h3 className="mt-3 font-display text-lg text-ink">
              {option.name}
            </h3>
            <p className="mt-2 text-sm text-ink/70">{option.description}</p>
            <div className="mt-4 flex items-baseline justify-between border-t border-mist pt-3 text-sm">
              <span className="text-ink/60">
                {option.distanceFromTrailMiles} mi from trail
              </span>
              <span className="font-display text-lg text-clay-dark">
                ${option.nightlyCost}
                <span className="text-sm text-ink/50">/night</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
