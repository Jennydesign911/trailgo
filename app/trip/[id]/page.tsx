import Link from "next/link";
import { discoverDestinations } from "@/lib/discover-destinations";

/**
 * Placeholder trip-planning route. Phase 3 only needs somewhere valid for
 * "Plan This Trip" to link to — the real Door-to-Trail itinerary builder
 * is Phase 4.
 */
export default function TripPlanPage({ params }: { params: { id: string } }) {
  const destination = discoverDestinations.find((d) => d.id === params.id);

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-display text-3xl text-ink">
        {destination ? `Planning ${destination.name}` : "Trip planning"}
      </p>
      <p className="mt-3 text-ink/60">
        The door-to-trail itinerary builder isn&apos;t built yet — this is a
        placeholder so &ldquo;Plan This Trip&rdquo; has somewhere to go.
      </p>
      {destination && (
        <Link
          href={`/adventure/${destination.id}`}
          className="mt-6 rounded-pill border border-mist bg-white/70 px-5 py-2.5 text-sm text-ink/80 hover:border-moss"
        >
          ← Back to {destination.name}
        </Link>
      )}
    </main>
  );
}
