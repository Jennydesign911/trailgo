import Link from "next/link";
import { DiscoverDestination, TripPlan } from "@/lib/types";

const gradientClass: Record<DiscoverDestination["imageGradient"], string> = {
  "trail-1": "bg-trail-1",
  "trail-2": "bg-trail-2",
  "trail-3": "bg-trail-3",
};

export function TripHero({
  destination,
  plan,
}: {
  destination: DiscoverDestination;
  plan: TripPlan;
}) {
  return (
    <section
      className={`relative overflow-hidden ${gradientClass[destination.imageGradient]}`}
    >
      <div className="mx-auto max-w-4xl px-6 py-10 sm:py-14">
        <Link
          href={`/adventure/${destination.id}`}
          className="text-sm text-paper/80 hover:text-paper"
        >
          ← Back to adventure
        </Link>

        <h1 className="mt-6 font-display text-3xl text-paper sm:text-4xl">
          {destination.name}
        </h1>
        <p className="mt-1 text-paper/75">{destination.region}</p>

        <div className="mt-6 rounded-card border border-paper/20 bg-paper/10 p-5 backdrop-blur-sm sm:p-6">
          <p className="text-sm text-paper/60">Your Door-to-Trail Plan</p>
          <p className="mt-1 font-display text-xl text-paper">{plan.tripDate}</p>
          <p className="mt-2 text-sm text-paper/80">{plan.summary}</p>

          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/90">
            <div>
              <dt className="sr-only">Transportation</dt>
              <dd>{plan.transportationModeLabel}</dd>
            </div>
            <div>
              <dt className="sr-only">Adventure Match</dt>
              <dd>{destination.adventureMatchScore}% match</dd>
            </div>
            <div>
              <dt className="sr-only">Estimated total</dt>
              <dd>Estimated total: ${destination.estimatedTripCost}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
