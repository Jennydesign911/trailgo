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

  return (
    <main className="min-h-screen bg-paper">
      <AdventureHero destination={destination} />

      <div className="mx-auto max-w-5xl space-y-10 px-6 py-10 sm:py-14">
        <MatchBreakdownSection
          score={destination.adventureMatchScore}
          breakdown={detail.matchBreakdown}
          summary={detail.matchSummary}
        />

        <TrailsSection trails={detail.trails} />

        <GettingThereSection
          details={detail.transportationDetails}
          carFreeFriendly={destination.carFreeFriendly}
        />

        <StaySection options={detail.stayOptions} />

        <CostBreakdownSection
          items={detail.costBreakdown}
          total={destination.estimatedTripCost}
        />

        <WeatherSection days={detail.weatherPreview} />

        <AdventureMapSection />

        <section className="flex flex-col items-center gap-3 rounded-card border border-mist bg-white/70 px-6 py-10 text-center shadow-soft">
          <h2 className="font-display text-2xl text-ink">
            Ready to lock in the details?
          </h2>
          <p className="max-w-md text-ink/60">
            Build a door-to-trail itinerary for {destination.name} — timing,
            packing and the full route in one place.
          </p>
          <Link
            href={`/trip/${destination.id}`}
            className="mt-2 rounded-pill bg-clay px-6 py-3 font-medium text-paper transition-colors hover:bg-clay-dark"
          >
            Plan This Trip
          </Link>
        </section>
      </div>
    </main>
  );
}
