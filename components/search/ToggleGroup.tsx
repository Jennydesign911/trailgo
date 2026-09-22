"use client";

interface ToggleOption<T extends string> {
  value: T;
  label: string;
  description?: string;
}

interface ToggleGroupProps<T extends string> {
  legend: string;
  options: ToggleOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** "cards" gives each option more room (used for Transportation), "pills" is compact (Activity, Difficulty) */
  variant?: "cards" | "pills";
}

export function ToggleGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
  variant = "pills",
}: ToggleGroupProps<T>) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-ink/70">
        {legend}
      </legend>
      <div
        className={
          variant === "cards"
            ? "grid grid-cols-1 gap-2 sm:grid-cols-2"
            : "flex flex-wrap gap-2"
        }
      >
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
              className={[
                "text-left transition-colors",
                variant === "cards"
                  ? "rounded-2xl border px-4 py-3"
                  : "rounded-pill border px-4 py-2 text-sm",
                selected
                  ? "border-clay bg-clay/10 text-clay-dark"
                  : "border-mist bg-white/60 text-ink/80 hover:border-moss",
              ].join(" ")}
            >
              <span className="block font-medium">{option.label}</span>
              {option.description && (
                <span className="mt-0.5 block text-xs text-ink/50">
                  {option.description}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
