"use client";

interface DateRangeInputProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

export function DateRangeInput({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangeInputProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label
          htmlFor="start-date"
          className="mb-2 block text-sm font-medium text-ink/70"
        >
          Start date
        </label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(event) => onStartDateChange(event.target.value)}
          max={endDate || undefined}
          className="w-full rounded-2xl border border-mist bg-white/60 px-4 py-3 text-ink focus:border-clay"
        />
      </div>
      <div>
        <label
          htmlFor="end-date"
          className="mb-2 block text-sm font-medium text-ink/70"
        >
          End date
        </label>
        <input
          id="end-date"
          type="date"
          value={endDate}
          onChange={(event) => onEndDateChange(event.target.value)}
          min={startDate || undefined}
          className="w-full rounded-2xl border border-mist bg-white/60 px-4 py-3 text-ink focus:border-clay"
        />
      </div>
    </div>
  );
}
