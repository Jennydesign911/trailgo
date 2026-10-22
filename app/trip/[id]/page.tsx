import Link from "next/link";
import { discoverDestinations } from "@/lib/discover-destinations";
import { AdventureHero } from "@/components/adventure/AdventureHero";
import { MatchBreakdownSection } from "@/components/adventure/MatchBreakdownSection";
import { TrailsSection } from "@/components/adventure/TrailsSection";
import { GettingThereSection } from "@/components/adventure/GettingThereSection";
import { StaySection } from "@/components/adventure/StaySection";
import { CostBreakdownSection } from "@/components/adventure/CostBreakdownSection";
import { WeatherSection } from "@/components/adventure/WeatherSection";
import { AdventureMapSection } from "@/components/adventure/AdventureMapSection";
import { AdventureNotFound } from "@/components/adventure/AdventureNotFound";
import { AvailabilityBadge } from "@/components/ui/AvailabilityBadge";
import { formatCheckedDate, getAvailabilityNotice } from "@/lib/status-labels";

/**
 * Adventure detail page. Looks up the destination by route id from the
 * same `discoverDestinations` dataset Phase 2 uses, so there's one
 * destination record per id rather than a second copy of the data.
 */
export default function AdventureDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const destination = discoverDestinations.find((d) => d.id === params.id);

  if (!destination || !destination.detail) {
    return <AdventureNotFound id={params.id} />;
  }

  const { detail } = destination;
  const notice = getAvailabilityNotice(destination);

  return (
    <main className="min-h-screen bg-paper">
      <AdventureHero destination={destination} />

      <div className="mx-auto max-w-5xl space-y-10 px-6 py-10 sm:py-14">
        {notice && (
          <section
            role="note"
            className="rounded-card border border-clay/40 bg-clay/10 p-5 sm:p-6"
          >
            <AvailabilityBadge status={notice.status} />
            <p className="mt-3 font-display text-lg text-ink">{notice.locationLabel}</p>
            <p className="mt-1 text-sm text-clay-dark">{notice.note}</p>
            <p className="mt-2 text-xs text-ink/60">
              Last checked {formatCheckedDate(notice.lastChecked)} ·{" "}
              <a
                href={notice.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-clay"
              >
                {notice.source}
              </a>
            </p>
          </section>
        )}

        <MatchBreakdownSection
          score={destination.adventureMatchScore}
          breakdown={detail.matchBreakdown}
          summary={detail.matchSummary}
        />

        <TrailsSection trails={detail.trails} />

        <GettingThereSection
          details={detail.transportationDetails}
          carFreeFriendly={destination.carFreeFriendly}
          hasClosureNotice={notice !== null}
        />

        <StaySection options={detail.stayOptions} />

        <CostBreakdownSection
          items={detail.costBreakdown}
          total={destination.estimatedTripCost}
        />

        <WeatherSection days={detail.weatherPreview} />

        <AdventureMapSection destination={destination} />

        <section className="flex flex-col items-center gap-3 rounded-card border border-mist bg-white/70 px-6 py-10 text-center shadow-soft">
          <h2 className="font-display text-2xl text-ink">
            Want to see a sample itinerary?
          </h2>
          <p className="max-w-md text-ink/60">
            See what a door-to-trail day could look like for {destination.name}.
            Times, fares and costs in the itinerary are illustrative sample
            data, not real schedules.
          </p>
          <Link
            href={`/trip/${destination.id}`}
            className="mt-2 rounded-pill bg-clay px-6 py-3 font-medium text-paper transition-colors hover:bg-clay-dark"
          >
            View Sample Itinerary
          </Link>
        </section>
      </div>
    </main>
  );
}
