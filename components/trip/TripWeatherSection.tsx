import { TripWeatherWindow } from "@/lib/types";

const conditionIcon: Record<string, string> = {
  Sunny: "☀️",
  "Partly cloudy": "⛅",
  Cloudy: "☁️",
  "Light rain": "🌦️",
  Rain: "🌧️",
  Windy: "🌬️",
  Breezy: "🌬️",
  Clear: "🌤️",
};

export function TripWeatherSection({
  windows,
  recommendation,
}: {
  windows: TripWeatherWindow[];
  recommendation: string;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl text-ink">Weather + Plan Notes</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {windows.map((entry) => (
          <div
            key={entry.label}
            className="flex items-center gap-4 rounded-card border border-mist bg-white/70 p-5 shadow-soft"
          >
            <span className="text-3xl" aria-hidden="true">
              {conditionIcon[entry.condition] ?? "🌤️"}
            </span>
            <div>
              <p className="text-sm text-ink/60">{entry.label}</p>
              <p className="font-display text-xl text-ink">{entry.tempF}°F</p>
              <p className="text-xs text-ink/60">{entry.condition}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-card border border-mist bg-moss/10 p-5">
        <p className="text-sm font-medium text-moss">Recommendation</p>
        <p className="mt-1 text-sm text-ink/80">{recommendation}</p>
      </div>

      <p className="mt-3 text-xs text-ink/50">
        Mock forecast — live weather integration coming later.
      </p>
    </section>
  );
}
