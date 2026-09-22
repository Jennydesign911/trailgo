export function formatTravelTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (hours === 0) return `${remaining} min`;
  if (remaining === 0) return `${hours} hr`;
  return `${hours} hr ${remaining} min`;
}

export function formatDateRange(startDate: string, endDate: string): string {
  if (!startDate || !endDate) return "Dates not set";

  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "Dates not set";
  }

  const sameMonth = start.getMonth() === end.getMonth();
  const startLabel = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const endLabel = end.toLocaleDateString(
    "en-US",
    sameMonth ? { day: "numeric" } : { month: "short", day: "numeric" }
  );

  return `${startLabel} – ${endLabel}`;
}
