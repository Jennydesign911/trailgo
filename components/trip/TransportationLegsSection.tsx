import { TransportationLeg } from "@/lib/types";

const modeLabel: Record<TransportationLeg["mode"], string> = {
  transit: "Transit",
  driving: "Driving",
  shuttle: "Shuttle",
  walk: "Walk",
  ferry: "Ferry",
};

export function TransportationLegsSection({
  legs,
}: {
  legs: TransportationLeg[];
}) {
  return (
    <section>
      <h2 className="font-display text-2xl text-ink">Transportation Details</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {legs.map((leg) => (
          <article
            key={leg.id}
            className="rounded-card border border-mist bg-white/70 p-5 shadow-soft"
          >
            <span className="rounded-pill bg-pine/10 px-3 py-1 text-xs font-medium text-pine">
              {modeLabel[leg.mode]}
            </span>
            <h3 className="mt-3 font-display text-lg text-ink">{leg.label}</h3>
            <p className="mt-1 text-sm text-ink/70">
              {leg.from} → {leg.to}
            </p>

            {leg.mode === "driving" ? (
              <dl className="mt-3 space-y-1.5 text-sm text-ink/80">
                <div className="flex justify-between">
                  <dt className="text-ink/50">Drive time</dt>
                  <dd>{leg.durationMinutes} min</dd>
                </div>
                {leg.distanceMiles && (
                  <div className="flex justify-between">
                    <dt className="text-ink/50">Distance</dt>
                    <dd>{leg.distanceMiles} mi</dd>
                  </div>
                )}
                {leg.estimatedDriveCost !== undefined && (
                  <div className="flex justify-between">
                    <dt className="text-ink/50">Est. fuel/tolls</dt>
                    <dd>${leg.estimatedDriveCost}</dd>
                  </div>
                )}
                {leg.parkingInfo && (
                  <p className="pt-1 text-ink/60">{leg.parkingInfo}</p>
                )}
              </dl>
            ) : (
              <dl className="mt-3 space-y-1.5 text-sm text-ink/80">
                {leg.departure && leg.arrival && (
                  <div className="flex justify-between">
                    <dt className="text-ink/50">Departs / arrives</dt>
                    <dd>
                      {leg.departure} → {leg.arrival}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-ink/50">Duration</dt>
                  <dd>{leg.durationMinutes} min</dd>
                </div>
                {leg.fare !== undefined && (
                  <div className="flex justify-between">
                    <dt className="text-ink/50">Approx. fare</dt>
                    <dd>${leg.fare}</dd>
                  </div>
                )}
                {leg.transferInfo && (
                  <p className="pt-1 text-ink/60">{leg.transferInfo}</p>
                )}
              </dl>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
