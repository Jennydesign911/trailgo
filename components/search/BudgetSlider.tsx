"use client";

const MIN_BUDGET = 50;
const MAX_BUDGET = 500;

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function BudgetSlider({ value, onChange }: BudgetSliderProps) {
  const fillPercent =
    ((value - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100;

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor="max-budget" className="text-sm font-medium text-ink/70">
          Maximum budget
        </label>
        <span className="font-display text-lg text-clay-dark">
          ${value}
        </span>
      </div>
      <input
        id="max-budget"
        type="range"
        min={MIN_BUDGET}
        max={MAX_BUDGET}
        step={10}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="budget-slider"
        style={{ ["--fill" as string]: `${fillPercent}%` }}
      />
      <div className="mt-1 flex justify-between text-xs text-ink/40">
        <span>$50</span>
        <span>$500</span>
      </div>
    </div>
  );
}
