import { TransportationDetails } from "@/lib/types";
import { formatTravelTime } from "@/lib/format";

function CarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 13l1.5-5A2 2 0 0 1 6.4 6.5h11.2A2 2 0 0 1 19.5 8l1.5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="2.5" y="13" width="19" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="7" cy="18.5" r="1.4" fill="currentColor" />
      <circle cx="17" cy="18.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

function TransitIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="3.5" width="16" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 11.5h16" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 20l2-3.5M17 20l-2-3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="8" cy="14" r="0.9" fill="currentColor" />
      <circle cx="16" cy="14" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function GettingThereSection({
  details,
  carFreeFriendly,
}: {
  details: TransportationDetails;
  carFreeFriendly: boolean;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl text-ink">Getting There</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-card border border-mist bg-white/70 p-5 shadow-soft">
          <div className="flex items-center gap-2 text-moss">
            <CarIcon />
            <h3 className="font-display text-lg text-ink">Driving</h3>
          </div>
          <p className="mt-3 text-sm text-ink/80">
            {formatTravelTime(details.driving.travelTimeMinutes)} from New York
          </p>
          <p className="mt-1 text-sm text-ink/60">{details.driving.parkingInfo}</p>
        </div>

        <div className="rounded-card border border-mist bg-white/70 p-5 shadow-soft">
          <div className="flex items-center gap-2 text-moss">
            <TransitIcon />
            <h3 className="font-display text-lg text-ink">Public transportation</h3>
          </div>

          {details.publicTransit ? (
            <>
              {carFreeFriendly && (
                <span className="mt-2 inline-block rounded-pill bg-moss/10 px-3 py-1 text-xs font-medium text-moss">
                  Car-free friendly
                </span>
              )}
              <ol className="mt-3 space-y-1.5 text-sm text-ink/80">
                {details.publicTransit.steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-2">
                    {index > 0 && <span className="text-ink/40">↓</span>}
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-sm text-ink/80">
                About {formatTravelTime(details.publicTransit.travelTimeMinutes)}{" "}
                door to trailhead
              </p>
              <p className="mt-1 text-sm text-ink/60">
                {details.publicTransit.lastMileInfo}
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm text-ink/60">
              No practical car-free route yet — a car is the best way to reach
              this trailhead.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
