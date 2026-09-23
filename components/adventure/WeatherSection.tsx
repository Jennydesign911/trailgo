import { WeatherDayPreview } from "@/lib/types";

const conditionIcon: Record<string, string> = {
  Sunny: "☀️",
  "Partly cloudy": "⛅",
  Cloudy: "☁️",
  "Light rain": "🌦️",
  Rain: "🌧️",
  Windy: "🌬️",
  Breezy: "🌬️",
};

export function WeatherSection({ days }: { days: WeatherDayPreview[] }) {
  return (
    <section>
      <h2 className="font-display text-2xl text-ink">Weather Preview</h2>
      <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
        {days.map((day) => (
          <div
            key={day.day}
            className="rounded-card border border-mist bg-white/70 p-4 text-center shadow-soft sm:p-5"
          >
            <p className="text-sm text-ink/60">{day.day}</p>
            <p className="mt-2 text-2xl" aria-hidden="true">
              {conditionIcon[day.condition] ?? "🌤️"}
            </p>
            <p className="mt-1 font-display text-xl text-ink">{day.tempF}°F</p>
            <p className="mt-0.5 text-xs text-ink/60">{day.condition}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-ink/50">
        Mock forecast — live weather integration coming later.
      </p>
    </section>
  );
}
