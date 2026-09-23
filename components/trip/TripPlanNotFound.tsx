import Link from "next/link";

export function TripPlanNotFound({ id }: { id: string }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-display text-3xl text-ink">Trip plan not found</p>
      <p className="mt-3 text-ink/60">
        We don&apos;t have a door-to-trail plan for &ldquo;{id}&rdquo; yet.
      </p>
      <Link
        href="/discover"
        className="mt-6 rounded-pill bg-clay px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-clay-dark"
      >
        Back to results
      </Link>
    </main>
  );
}
