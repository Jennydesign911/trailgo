export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-card border border-dashed border-mist bg-white/50 px-6 py-16 text-center">
      <p className="font-display text-xl text-ink">
        No adventures match these filters.
      </p>
      <p className="mt-2 text-sm text-ink/60">
        Try widening your budget or loosening a filter to see more results.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-pill bg-clay px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-clay-dark"
      >
        Reset filters
      </button>
    </div>
  );
}
