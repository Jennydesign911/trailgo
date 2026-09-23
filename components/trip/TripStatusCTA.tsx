"use client";

import { useState } from "react";
import Link from "next/link";
import { DiscoverDestination, TripPlan } from "@/lib/types";

export function TripStatusCTA({
  destination,
  plan,
}: {
  destination: DiscoverDestination;
  plan: TripPlan;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <section className="flex flex-col items-center gap-4 rounded-card border border-mist bg-pine px-6 py-10 text-center text-paper shadow-soft sm:px-10">
      <h2 className="font-display text-2xl">Your trip is ready</h2>

      <div className="text-sm text-paper/80">
        <p className="font-display text-lg text-paper">{destination.name}</p>
        <p>{plan.tripDate}</p>
        <p>
          {plan.departure} – {plan.estimatedArrivalHome}
        </p>
        <p>Estimated total: ${destination.estimatedTripCost}</p>
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setSaved(true)}
          disabled={saved}
          className={
            saved
              ? "cursor-default rounded-pill bg-gold px-6 py-3 font-medium text-ink"
              : "rounded-pill bg-clay px-6 py-3 font-medium text-paper transition-colors hover:bg-clay-dark"
          }
        >
          {saved ? "Trip Saved ✓" : "Save This Trip"}
        </button>

        <Link
          href={`/adventure/${destination.id}`}
          className="rounded-pill border border-paper/30 px-6 py-3 font-medium text-paper transition-colors hover:bg-paper/10"
        >
          Back to Adventure
        </Link>
      </div>

      {saved && (
        <p className="text-xs text-paper/60">
          Saved for this session only — accounts and syncing come later.
        </p>
      )}
    </section>
  );
}
