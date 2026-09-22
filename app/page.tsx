import { SearchCard } from "@/components/search/SearchCard";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { TopoPattern } from "@/components/layout/TopoPattern";
import { weekendEscapes } from "@/lib/mock-destinations";

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-pine pb-20 pt-10 sm:pb-28 sm:pt-14">
        <TopoPattern className="pointer-events-none absolute inset-0 h-full w-full" />

        <div className="relative mx-auto max-w-5xl px-6">
          <span className="font-display text-lg text-paper/90">TrailGo</span>

          <h1 className="mt-8 max-w-xl font-display text-5xl leading-[1.05] text-paper sm:text-6xl">
            Find your
            <br />
            next escape.
          </h1>

          <p className="mt-5 max-w-md text-lg text-paper/70">
            Discover hiking and camping trips you can actually reach — with
            or without a car.
          </p>
        </div>
      </section>

      {/* Sits as a sibling (not inside the hero's overflow-hidden box) so it
          can overlap the hero/content seam without being clipped. */}
      <div className="relative z-10 mx-auto -mt-16 max-w-2xl px-6 sm:-mt-24">
        <SearchCard />
      </div>

      <section className="mx-auto max-w-5xl px-6 pb-24 pt-16 sm:pb-32 sm:pt-20">
        <h2 className="font-display text-3xl text-ink">
          Weekend escapes near you
        </h2>
        <p className="mt-2 max-w-md text-ink/60">
          A few reachable trips worth a Saturday, picked from the trails
          closest to New York.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {weekendEscapes.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>
    </main>
  );
}
