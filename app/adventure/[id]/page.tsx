import Link from "next/link";
import { discoverDestinations } from "@/lib/discover-destinations";

/**
 * Placeholder detail route. Phase 2 only needs somewhere valid for
 * "View Adventure" to link to — the full adventure detail experience
 * (itinerary, weather, lodging, etc.) is a later phase.
 */
export default function AdventureDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const destination = discoverDestinations.find((d) => d.id === params.id);

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-16">
      <Link href="/discover" className="text-sm text-moss hover:text-clay">
        ← Back to results
      </Link>

      <h1 className="mt-6 font-display text-3xl text-ink">
        {destination ? destination.name : "Adventure not found"}
      </h1>
      <p className="mt-2 max-w-md text-ink/60">
        {destination
          ? "The full adventure detail page (trail info, lodging, weather, itinerary) isn't built yet — this is a placeholder so \u201cView Adventure\u201d has somewhere to go."
          : "We couldn't find a mock destination with that id."}
      </p>

      {destination && (
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 rounded-card border border-mist bg-white/60 p-6 text-sm">
          <dt className="text-ink/50">Region</dt>
          <dd className="text-ink">{destination.region}</dd>
          <dt className="text-ink/50">Difficulty</dt>
          <dd className="text-ink">{destination.difficulty}</dd>
          <dt className="text-ink/50">Adventure Match</dt>
          <dd className="text-ink">{destination.adventureMatchScore}%</dd>
          <dt className="text-ink/50">Estimated cost</dt>
          <dd className="text-ink">${destination.estimatedTripCost}</dd>
        </dl>
      )}
    </main>
  );
}
