import { StayOption } from "@/lib/types";
import { formatCheckedDate, isClosure } from "@/lib/status-labels";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { SampleDataBadge } from "@/components/ui/SampleDataBadge";

export function StaySection({ options }: { options: StayOption[] }) {
  return (
    <section>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h2 className="font-display text-2xl text-ink">Where to Stay</h2>
        <SampleDataBadge />
      </div>
      <p className="mt-1 max-w-2xl text-sm text-ink/60">
        Prices, distances and descriptions are sample values. Where a place
        shows a source link, that source confirms it exists, not its current
        price or availability.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => {
          const hasSource = !!option.location || !!option.existenceSource;
          const status = option.location?.availability ?? "unknown";
          return (
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

            {option.existenceSource && (
              <p className="mt-2 text-xs text-ink/60">
                Place confirmed by{" "}
                <a
                  href={option.existenceSource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-clay"
                >
                  {option.existenceSource.name}
                </a>{" "}
                (checked {formatCheckedDate(option.existenceSource.lastChecked)}).
              </p>
            )}

            {hasSource && (
              <div className="mt-2">
                <AvailabilityBadge status={status} />
                {isClosure(status) && option.location?.availabilityNote && (
                  <p className="mt-1.5 text-xs text-clay-dark">
                    {option.location.availabilityNote}
                  </p>
                )}
              </div>
            )}
            <div className="mt-4 flex items-baseline justify-between border-t border-mist pt-3 text-sm">
              {option.distanceFromTrailMiles !== undefined && (
                <span className="text-ink/60">
                  {option.distanceFromTrailMiles} mi from trail
                </span>
              )}
              <span className="ml-auto font-display text-lg text-clay-dark">
                ${option.nightlyCost}
                <span className="text-sm text-ink/50">/night</span>
              </span>
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}
