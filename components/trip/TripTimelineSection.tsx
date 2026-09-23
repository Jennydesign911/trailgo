import { TripTimelineStep } from "@/lib/types";

const kindDot: Record<TripTimelineStep["kind"], string> = {
  depart: "bg-ink",
  arrive: "bg-moss",
  transit: "bg-clay",
  activity: "bg-gold",
  return: "bg-clay",
};

function TransitIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="3.5" width="16" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 11.5h16" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function HikeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 20l5-14 3 6 2-3 6 11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function stepIcon(kind: TripTimelineStep["kind"]) {
  if (kind === "transit") return <TransitIcon />;
  if (kind === "activity") return <HikeIcon />;
  return <PinIcon />;
}

export function TripTimelineSection({ steps }: { steps: TripTimelineStep[] }) {
  return (
    <section>
      <h2 className="font-display text-2xl text-ink">Door-to-Trail Timeline</h2>

      <ol className="mt-5 border-l border-mist pl-6 sm:pl-8">
        {steps.map((step) => (
          <li key={step.id} className="relative pb-8 last:pb-0">
            <span
              className={`absolute -left-[calc(1.5rem+5px)] top-1 h-2.5 w-2.5 rounded-full sm:-left-[calc(2rem+5px)] ${kindDot[step.kind]}`}
              aria-hidden="true"
            />

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <span className="font-display text-lg text-ink">{step.time}</span>
              <span className="flex items-center gap-1.5 text-sm text-ink/60">
                {stepIcon(step.kind)}
                {step.title}
              </span>
            </div>

            {(step.detail || step.location) && (
              <p className="mt-1 text-sm text-ink/70">
                {step.detail ?? step.location}
              </p>
            )}

            {step.durationMinutes && (
              <p className="mt-0.5 text-xs text-ink/50">
                ~{step.durationMinutes} min
              </p>
            )}

            {step.note && (
              <p className="mt-1 text-sm text-moss">{step.note}</p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
