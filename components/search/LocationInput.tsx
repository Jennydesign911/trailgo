"use client";

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function LocationInput({ value, onChange }: LocationInputProps) {
  return (
    <div>
      <label
        htmlFor="starting-location"
        className="mb-2 block text-sm font-medium text-ink/70"
      >
        Starting location
      </label>
      <div className="relative">
        <input
          id="starting-location"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="New York, NY"
          className="w-full rounded-2xl border border-mist bg-white/60 py-3 pl-4 pr-11 text-ink placeholder:text-ink/40 focus:border-clay"
        />
        <button
          type="button"
          aria-label="Use current location"
          title="Use current location (coming soon)"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-moss hover:text-clay"
          onClick={() => {
            // Geolocation isn't implemented yet — this is a visual affordance only.
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="12"
              cy="12"
              r="3"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M12 2v3M12 19v3M22 12h-3M5 12H2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
