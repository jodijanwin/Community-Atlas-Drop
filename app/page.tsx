import Link from "next/link";
import listings from "@/data/listings.json";
import stories from "@/data/stories.json";
import weeklyEntries from "@/data/weekly.json";
import { Category, CATEGORY_COLORS } from "@/types";
import WeeklyGrid from "@/components/WeeklyGrid";

const STATS = [
  { value: listings.length.toString(), label: "resources mapped" },
  { value: "8", label: "categories of care" },
  { value: "4", label: "corners of Scugog" },
];

const CATEGORIES: Category[] = [
  "Free Food", "Tenant Defense", "Public Space", "Repair Skills",
  "Local Makers", "Gathering Places", "Mutual Aid", "Co-op Leads",
];

export default function HomePage() {
  return (
    <div style={{ background: "#1A2433" }}>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pt-20 pb-24 sm:pt-32 sm:pb-36">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #F0F4F0 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-block text-xs font-bold tracking-widest uppercase mb-6 px-3 py-1 rounded" style={{ background: "rgba(107,180,240,0.15)", color: "#6BB8F0" }}>
            Scugog Township · Issue No. 1
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold leading-none tracking-tight mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0", letterSpacing: "-0.03em" }}>
            Hidden abundance.<br />
            <span style={{ color: "#6BB8F0" }}>Right here. All of us.</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-4" style={{ color: "#8AA0A8" }}>
            Scugog Township is full of people giving, fixing, growing, sharing, and showing up for each other — and most residents have no idea it's happening.
          </p>
          <p className="text-base max-w-xl mx-auto leading-relaxed mb-10" style={{ color: "#5A7080" }}>
            This atlas maps our community's generosity, cooperation, and care — making the invisible impossible to ignore.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/atlas" className="px-8 py-3.5 rounded-lg font-semibold text-base transition-all hover:opacity-90" style={{ fontFamily: "'Space Grotesk', sans-serif", background: "#1B75BC", color: "white" }}>
              Welcome to the Community Atlas
            </Link>
            <Link href="/submit" className="px-8 py-3.5 rounded-lg font-semibold text-base border transition-all hover:bg-white/5" style={{ fontFamily: "'Space Grotesk', sans-serif", borderColor: "#2D3F52", color: "#F0F4F0" }}>
              Add what you know
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABUNDANCE BY THE NUMBERS ────────────────────────── */}
      <div className="border-t border-b px-6 py-8" style={{ borderColor: "#243040" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#5A7080" }}>The economy of care — quantified</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-4xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#6BB8F0" }}>{value}</p>
                <p className="text-xs mt-1 uppercase tracking-wider" style={{ color: "#5A7080" }}>{label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-6 italic" style={{ color: "#3D4E5C" }}>
            Most of the work that holds this community together goes uncounted. This atlas counts some of it.
          </p>
        </div>
      </div>

      {/* ── WHAT'S IN THE ATLAS ──────────────────────────────── */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#1B75BC" }}>Mapping our common treasures</p>
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>What's in the Atlas</h2>
          <p className="text-sm mb-8 max-w-xl" style={{ color: "#5A7080" }}>
            Eight categories of latent community power. Explore one or see them all — the pattern that emerges is the point.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => {
              const count = listings.filter((l) => l.category === cat).length;
              return (
                <Link key={cat} href={`/atlas?category=${encodeURIComponent(cat)}`} className="p-4 rounded-lg border transition-all hover:scale-[1.02] hover:border-blue-700/40" style={{ background: "#1E2E3E", borderColor: "#243040" }}>
                  <div className="w-3 h-3 rounded-full mb-3" style={{ background: CATEGORY_COLORS[cat] }} />
                  <p className="text-sm font-semibold leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>{cat}</p>
                  <p className="text-xs mt-1" style={{ color: "#5A7080" }}>{count} {count === 1 ? "listing" : "listings"}</p>
                </Link>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <Link href="/atlas" className="text-sm font-semibold" style={{ color: "#1B75BC" }}>Open the full atlas → all {listings.length} resources</Link>
          </div>
        </div>
      </section>

      {/* ── STORIES OF SOLIDARITY ───────────────────────────── */}
      <section className="px-6 py-16 border-t" style={{ borderColor: "#243040" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#6B9433" }}>Caring in action</p>
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>Stories of Solidarity</h2>
          <p className="text-sm mb-8 max-w-xl" style={{ color: "#5A7080" }}>
            What's already happening here — reported, witnessed, passed on. Neighbours helping neighbours, quietly and without fanfare.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {stories.map((story) => (
              <div key={story.id} className="p-5 rounded-lg border flex flex-col" style={{ background: "#1E2E3E", borderColor: "#243040" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: "rgba(107,148,51,0.15)", color: "#6B9433" }}>{story.source}</span>
                  <span className="text-xs" style={{ color: "#3D4E5C" }}>{story.date}</span>
                </div>
                <h3 className="text-sm font-semibold leading-snug mb-3 flex-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>{story.title}</h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "#5A7080" }}>{story.excerpt}</p>
                {story.url ? (
                  <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold" style={{ color: "#1B75BC" }}>Read the full story →</a>
                ) : (
                  <span className="text-xs italic" style={{ color: "#3D4E5C" }}>Community-submitted</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs mt-6 text-center" style={{ color: "#3D4E5C" }}>
            Know of a story that belongs here?{" "}
            <Link href="/submit" className="underline" style={{ color: "#5A7080" }}>Submit it.</Link>
          </p>
        </div>
      </section>

      {/* ── PHILOSOPHY STRIP ────────────────────────────────── */}
      <section className="px-6 py-14 border-t" style={{ borderColor: "#243040" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl sm:text-3xl font-semibold leading-snug mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>
            &ldquo;Conventional advocacy says, <em>look what we lack.</em><br />
            <span style={{ color: "#6BB8F0" }}>This atlas says, look what we already have.</span>&rdquo;
          </p>
          <p className="text-sm max-w-xl mx-auto leading-relaxed mb-6" style={{ color: "#5A7080" }}>
            Scugog Township is full of skills, generosity, and care that go unrecognized and unconnected. Once people see it, they can't un-see it — and they start to join it.
          </p>
          <Link href="/about" className="text-sm font-semibold underline" style={{ color: "#5A7080" }}>Read the full story of this project →</Link>
        </div>
      </section>

      {/* ── 52 WEEKS IN SCUGOG ──────────────────────────────── */}
      <section className="px-6 py-14 border-t" style={{ borderColor: "#243040" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#5A7080" }}>This year</p>
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>52 Weeks in Scugog</h2>
          <p className="text-sm mb-8 max-w-xl" style={{ color: "#5A7080" }}>
            Each square is a week. Marked weeks have something attached — an event, a news story, an atlas update. The empty ones ahead are possibility.
          </p>
          <WeeklyGrid entries={weeklyEntries as any} />
          <p className="text-xs mt-6" style={{ color: "#3D4E5C" }}>
            Want to add something to a week?{" "}
            <Link href="/submit" className="underline" style={{ color: "#5A7080" }}>Submit it.</Link>
          </p>
        </div>
      </section>

      {/* ── A FEW PLACES TO START ────────────────────────────── */}
      <section className="px-6 py-14 border-t" style={{ borderColor: "#243040" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>A few places to start</h2>
            <Link href="/atlas" className="text-sm" style={{ color: "#6BB8F0" }}>See all {listings.length} →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {listings.slice(0, 3).map((listing) => (
              <Link key={listing.id} href={`/atlas?id=${listing.id}`} className="p-4 rounded-lg border transition-all hover:border-blue-700/40" style={{ background: "#1E2E3E", borderColor: "#243040" }}>
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

      {/* ── PRINT CTA BANNER ─────────────────────────────────── */}
      <section className="px-6 py-10 border-t" style={{ borderColor: "#243040", background: "rgba(27,117,188,0.06)" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-base font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>Print your own Community Atlas zine</p>
            <p className="text-sm mt-1" style={{ color: "#5A7080" }}>Take this offline — print and share in your café, library, or community board.</p>
          </div>
          <Link href="/print" className="shrink-0 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90" style={{ fontFamily: "'Space Grotesk', sans-serif", background: "#1B75BC", color: "white" }}>
            Print the Atlas →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="px-6 py-10 border-t text-center" style={{ borderColor: "#243040" }}>
        <p className="text-sm" style={{ color: "#5A7080" }}>Community Atlas Drop · Scugog Township · Updated monthly · Community-authored and independent</p>
        <p className="text-xs mt-2" style={{ color: "#2D3F52" }}>Know something we don&apos;t? <Link href="/submit" className="underline" style={{ color: "#5A7080" }}>Submit it.</Link></p>
      </footer>

    </div>
  );
}
