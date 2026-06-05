import Link from "next/link";
import listings from "@/data/listings.json";
import { Category, CATEGORY_COLORS } from "@/types";

const STATS = [
  { label: "Resources Mapped", value: listings.length.toString() },
  { label: "Categories", value: "8" },
  { label: "Township", value: "Scugog" },
];

const CATEGORIES: Category[] = [
  "Free Food", "Tenant Defense", "Public Space", "Repair Skills",
  "Local Makers", "Gathering Places", "Mutual Aid", "Co-op Leads",
];

export default function HomePage() {
  return (
    <div style={{ background: "#1A2433", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-24 sm:pt-32 sm:pb-36">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #F0F4F0 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-block text-xs font-bold tracking-widest uppercase mb-6 px-3 py-1 rounded" style={{ background: "rgba(27,117,188,0.18)", color: "#6BB8F0" }}>
            Scugog Township · Issue No. 1
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold leading-none tracking-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0", letterSpacing: "-0.03em" }}>
            Make hidden abundance<br />
            <span style={{ color: "#6BB8F0" }}>impossible to ignore.</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10" style={{ color: "#8AA0A8" }}>
            Scugog Township is full of people, places, and resources that go unnoticed.
            This atlas makes them visible — and makes cooperation possible.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/atlas" className="px-8 py-3.5 rounded-lg font-semibold text-base transition-all hover:opacity-90" style={{ fontFamily: "'Space Grotesk', sans-serif", background: "#1B75BC", color: "white" }}>Open the Atlas</Link>
            <Link href="/submit" className="px-8 py-3.5 rounded-lg font-semibold text-base border transition-all hover:bg-white/5" style={{ fontFamily: "'Space Grotesk', sans-serif", borderColor: "#2D3F52", color: "#F0F4F0" }}>Submit a Resource</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="border-t border-b px-6 py-6" style={{ borderColor: "#243040" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {STATS.map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#6BB8F0" }}>{value}</p>
              <p className="text-xs mt-0.5 uppercase tracking-wider" style={{ color: "#5A7080" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Category grid */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>What&apos;s in the Atlas</h2>
          <p className="text-sm mb-8" style={{ color: "#5A7080" }}>Eight categories of latent community power.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => {
              const count = listings.filter((l) => l.category === cat).length;
              return (
                <Link key={cat} href={`/atlas?category=${encodeURIComponent(cat)}`} className="p-4 rounded-lg border transition-all hover:scale-[1.02]" style={{ background: "#1E2E3E", borderColor: "#243040" }}>
                  <div className="w-3 h-3 rounded-full mb-3" style={{ background: CATEGORY_COLORS[cat] }} />
                  <p className="text-sm font-semibold leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>{cat}</p>
                  <p className="text-xs mt-1" style={{ color: "#5A7080" }}>{count} {count === 1 ? "listing" : "listings"}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="px-6 py-14 border-t" style={{ borderColor: "#243040" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl sm:text-3xl font-semibold leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>
            &ldquo;Conventional advocacy says, look what we lack.<br />
            <span style={{ color: "#6BB8F0" }}>This atlas says, look what we already have.</span>&rdquo;
          </p>
          <Link href="/about" className="inline-block mt-6 text-sm underline" style={{ color: "#5A7080" }}>Read the full story →</Link>
        </div>
      </section>

      {/* Preview listings */}
      <section className="px-6 py-14 border-t" style={{ borderColor: "#243040" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>A few places to start</h2>
            <Link href="/atlas" className="text-sm" style={{ color: "#6BB8F0" }}>See all {listings.length} →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {listings.slice(0, 3).map((listing) => (
              <Link key={listing.id} href={`/atlas?id=${listing.id}`} className="p-4 rounded-lg border transition-all" style={{ background: "#1E2E3E", borderColor: "#243040" }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: CATEGORY_COLORS[listing.category as Category] }} />
                  <span className="text-xs" style={{ color: "#5A7080" }}>{listing.category}</span>
                </div>
                <p className="font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>{listing.name}</p>
                <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: "#5A7080" }}>{listing.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 py-10 border-t text-center" style={{ borderColor: "#243040" }}>
        <p className="text-sm" style={{ color: "#5A7080" }}>Community Atlas Drop · Scugog Township · Updated monthly · Community-authored and independent</p>
        <p className="text-xs mt-2" style={{ color: "#2D3F52" }}>Know something we don&apos;t? <Link href="/submit" className="underline" style={{ color: "#5A7080" }}>Submit it.</Link></p>
      </footer>
    </div>
  );
}
