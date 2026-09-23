import { discoverDestinations } from "@/lib/discover-destinations";
import { getTripPlan } from "@/lib/trip-plans";
import { TripHero } from "@/components/trip/TripHero";
import { TripSummaryCard } from "@/components/trip/TripSummaryCard";
import { TripTimelineSection } from "@/components/trip/TripTimelineSection";
import { TransportationLegsSection } from "@/components/trip/TransportationLegsSection";
import { TrailDayPlanSection } from "@/components/trip/TrailDayPlanSection";
import { TripCostSection } from "@/components/trip/TripCostSection";
import { TripWeatherSection } from "@/components/trip/TripWeatherSection";
import { TripStatusCTA } from "@/components/trip/TripStatusCTA";
import { TripPlanNotFound } from "@/components/trip/TripPlanNotFound";

/**
 * Door-to-Trail trip planner. Looks up the destination and its trip plan
 * by route id from the existing datasets (discoverDestinations from
 * Phase 2/3, tripPlans from Phase 4) — no duplicate destination records.
 */
export default function TripPlanPage({ params }: { params: { id: string } }) {
  const destination = discoverDestinations.find((d) => d.id === params.id);
  const plan = getTripPlan(params.id);

  if (!destination || !plan) {
    return <TripPlanNotFound id={params.id} />;
  }

  return (
    <main className="min-h-screen bg-paper">
      <TripHero destination={destination} plan={plan} />

      <div className="mx-auto max-w-4xl space-y-10 px-6 py-10 sm:py-14">
        <TripSummaryCard
          plan={plan}
          estimatedTripCost={destination.estimatedTripCost}
        />

        <TripTimelineSection steps={plan.timeline} />

        <TransportationLegsSection legs={plan.transportationLegs} />

        <TrailDayPlanSection plan={plan.trailDayPlan} />

        <TripCostSection
          items={plan.costBreakdown}
          total={destination.estimatedTripCost}
        />

        <TripWeatherSection
          windows={plan.weatherWindows}
          recommendation={plan.weatherRecommendation}
        />

        <TripStatusCTA destination={destination} plan={plan} />
      </div>
    </main>
  );
}
