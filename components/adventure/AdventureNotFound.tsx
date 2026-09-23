import Link from "next/link";

export function AdventureNotFound({ id }: { id: string }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-display text-3xl text-ink">Adventure not found</p>
      <p className="mt-3 text-ink/60">
        We couldn&apos;t find a destination matching &ldquo;{id}&rdquo;. It may
        have been renamed or removed.
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
