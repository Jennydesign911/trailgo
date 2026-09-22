import Link from "next/link";

/**
 * Placeholder route. Phase 1 only needs somewhere valid for the landing
 * page's CTA to navigate to, with the search params preserved in the URL.
 * The actual results experience is a later phase — not implemented here.
 */
export default function DiscoverPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">
      <Link href="/" className="text-sm text-moss hover:text-clay">
        ← Back to search
      </Link>

      <h1 className="mt-6 font-display text-3xl text-ink">
        Your search is on its way
      </h1>
      <p className="mt-2 max-w-md text-ink/60">
        The results page isn&apos;t built yet — this is a placeholder so the
        search card has somewhere to send you. Here&apos;s what it received:
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 rounded-card border border-mist bg-white/60 p-6 text-sm">
        {Object.entries(searchParams).map(([key, value]) => (
          <div key={key} className="contents">
            <dt className="text-ink/50">{key}</dt>
            <dd className="text-ink">{String(value ?? "—")}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
