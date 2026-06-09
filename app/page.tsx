import Link from "next/link";
import listings from "@/data/listings.json";
import stories from "@/data/stories.json";
import { Category, CATEGORY_COLORS } from "@/types";

const STATS = [
  { value: listings.length.toString(), label: "resources mapped" },
  { value: "8", label: "categories of care" },
  { value: "3", label: "townships" },
];

const CATEGORIES: Category[] = [
  "Free Food", "Tenant Defense", "Public Space", "Repair Skills",
  "Local Makers", "Gathering Places", "Mutual Aid", "Co-op Leads",
];

export default function HomePage() {
  return (
    <div>

      {/* ── HERO — forest green ──────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pt-20 pb-24 sm:pt-32 sm:pb-36" style={{ background: "#0A3D5C" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #F5DEB3 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-block text-xs font-bold tracking-widest uppercase mb-6 px-3 py-1 rounded" style={{ background: "rgba(200,224,236,0.2)", color: "#C8E0EC" }}>
            North Durham · Scugog · Uxbridge · Brock
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold leading-none tracking-tight mb-5" style={{ fontFamily: "'Lora', serif", color: "#F5DEB3", letterSpacing: "-0.02em" }}>
            Hidden abundance.<br />
            <span style={{ color: "#FFA07A" }}>Right here. All of us.</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-4" style={{ color: "#C8E0EC" }}>
            North Durham is full of people giving, fixing, growing, sharing, and showing up for each other — and most residents have no idea it&apos;s happening.
          </p>
          <p className="text-base max-w-xl mx-auto leading-relaxed mb-10" style={{ color: "#C8E0EC" }}>
            This atlas maps our community&apos;s generosity, cooperation, and care across Scugog, Uxbridge, and Brock — making the invisible impossible to ignore.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/atlas" className="px-8 py-3.5 rounded-lg font-semibold text-base transition-all hover:opacity-90" style={{ fontFamily: "'Lora', serif", background: "#FF6B6B", color: "white" }}>
              Welcome to the Community Atlas
            </Link>
            <Link href="/submit" className="px-8 py-3.5 rounded-lg font-semibold text-base border transition-all hover:bg-white/5" style={{ fontFamily: "'Lora', serif", borderColor: "#5BAEC9", color: "#F5DEB3" }}>
              Add what you know
            </Link>
          </div>
        </div>
      </section>

      {/* ── BY THE NUMBERS — teal ────────────────────────────── */}
      <div className="px-6 py-10" style={{ background: "#1A6B8A" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#C8E0EC" }}>The economy of care — quantified</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-5xl font-bold" style={{ fontFamily: "'Lora', serif", color: "#F5DEB3" }}>{value}</p>
                <p className="text-xs mt-1 uppercase tracking-wider" style={{ color: "#C8E0EC" }}>{label}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-6 italic" style={{ color: "#C8E0EC" }}>
            Most of the work that holds North Durham together goes uncounted. This atlas counts some of it.
          </p>
        </div>
      </div>

      {/* ── WHAT'S IN THE ATLAS — blue-grey cards on cream ──── */}
      <section className="px-6 py-16" style={{ background: "#F5DEB3" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#1A6B8A" }}>Mapping our common treasures</p>
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>What&apos;s in the Atlas</h2>
          <p className="text-sm mb-8 max-w-xl" style={{ color: "#0D2B3E" }}>
            Eight categories of latent community power across three townships. Explore one or see them all — the pattern that emerges is the point.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => {
              const count = listings.filter((l) => l.category === cat).length;
              return (
                <Link key={cat} href={`/atlas?category=${encodeURIComponent(cat)}`} className="p-4 rounded-lg border transition-all hover:scale-[1.02] hover:shadow-sm" style={{ background: "#C8E0EC", borderColor: "#C8E0EC" }}>
                  <div className="w-3 h-3 rounded-full mb-3" style={{ background: CATEGORY_COLORS[cat] }} />
                  <p className="text-sm font-semibold leading-tight" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>{cat}</p>
                  <p className="text-xs mt-1" style={{ color: "#0D2B3E" }}>{count} {count === 1 ? "listing" : "listings"}</p>
                </Link>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <Link href="/atlas" className="text-sm font-semibold" style={{ color: "#1A6B8A" }}>Open the full atlas → all {listings.length} resources</Link>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY STRIP — teal background ───────────────── */}
      <section className="px-6 py-16" style={{ background: "#1A6B8A" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl sm:text-3xl font-semibold leading-snug mb-4" style={{ fontFamily: "'Lora', serif", color: "#F5DEB3" }}>
            &ldquo;Conventional advocacy says, <em>look what we lack.</em><br />
            <span style={{ color: "#FFA07A" }}>This atlas says, look what we already have.</span>&rdquo;
          </p>
          <p className="text-sm max-w-xl mx-auto leading-relaxed mb-6" style={{ color: "#C8E0EC" }}>
            North Durham is full of skills, generosity, and care that go unrecognized and unconnected. Once people see it, they can&apos;t un-see it — and they start to join it.
          </p>
          <Link href="/about" className="text-sm font-semibold underline" style={{ color: "#C8E0EC" }}>Read the full story of this project →</Link>
        </div>
      </section>

      {/* ── STORIES OF SOLIDARITY — blue-grey background ─────── */}
      <section className="px-6 py-16" style={{ background: "#C8E0EC" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#0A3D5C" }}>Caring in action</p>
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>Stories of Solidarity</h2>
          <p className="text-sm mb-8 max-w-xl" style={{ color: "#0D2B3E" }}>
            What&apos;s already happening here — reported, witnessed, passed on. Neighbours helping neighbours, quietly and without fanfare.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {stories.map((story) => (
              <div key={story.id} className="p-5 rounded-lg flex flex-col" style={{ background: "#F5DEB3" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: "rgba(10,61,92,0.15)", color: "#0A3D5C" }}>{story.source}</span>
                  <span className="text-xs" style={{ color: "#0D2B3E" }}>{story.date}</span>
                </div>
                <h3 className="text-sm font-semibold leading-snug mb-3 flex-1" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>{story.title}</h3>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "#0D2B3E" }}>{story.excerpt}</p>
                {story.url ? (
                  <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold" style={{ color: "#1A6B8A" }}>Read the full story →</a>
                ) : (
                  <span className="text-xs italic" style={{ color: "#0D2B3E" }}>Community-submitted</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs mt-6 text-center" style={{ color: "#0D2B3E" }}>
            Know of a story that belongs here?{" "}
            <Link href="/submit" className="underline font-semibold" style={{ color: "#0A3D5C" }}>Submit it.</Link>
          </p>
        </div>
      </section>

      {/* ── A FEW PLACES TO START — cream ───────────────────── */}
      <section className="px-6 py-14" style={{ background: "#F5DEB3" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>A few places to start</h2>
            <Link href="/atlas" className="text-sm" style={{ color: "#1A6B8A" }}>See all {listings.length} →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {listings.slice(0, 3).map((listing) => (
              <Link key={listing.id} href={`/atlas?id=${listing.id}`} className="p-4 rounded-lg border transition-all hover:shadow-sm" style={{ background: "white", borderColor: "#C8E0EC" }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: CATEGORY_COLORS[listing.category as Category] }} />
                  <span className="text-xs" style={{ color: "#0D2B3E" }}>{listing.category}</span>
                </div>
                <p className="font-semibold text-sm" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>{listing.name}</p>
                <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: "#0D2B3E" }}>{listing.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS TEASER — amber ───────────────────── */}
      <section className="px-6 py-14" style={{ background: "#FFA07A" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#0A3D5C" }}>What&apos;s on</p>
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>Community Events</h2>
            <p className="text-sm max-w-md" style={{ color: "#0D2B3E" }}>Repair cafés, seed swaps, tenant nights, market days — what&apos;s coming up across North Durham this month.</p>
          </div>
          <Link href="/events" className="shrink-0 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90" style={{ fontFamily: "'Lora', serif", background: "#0A3D5C", color: "#F5DEB3" }}>
            See all events →
          </Link>
        </div>
      </section>

      {/* ── PRINT CTA BANNER — burnt orange ──────────────────── */}
      <section className="px-6 py-12" style={{ background: "#FF6B6B" }}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-base font-semibold" style={{ fontFamily: "'Lora', serif", color: "#F5DEB3" }}>Print your own North Durham Atlas zine</p>
            <p className="text-sm mt-1" style={{ color: "#F5DEB3" }}>Take this offline — print and share in your café, library, or community board.</p>
          </div>
          <Link href="/print" className="shrink-0 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 border-2" style={{ fontFamily: "'Lora', serif", background: "transparent", borderColor: "#F5DEB3", color: "#F5DEB3" }}>
            Print the Atlas →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="px-6 py-10 text-center" style={{ background: "#0A3D5C" }}>
        <p className="text-sm" style={{ color: "#C8E0EC" }}>North Durham Community Atlas · Scugog · Uxbridge · Brock · Updated monthly · Community-authored and independent</p>
        <p className="text-xs mt-2" style={{ color: "#5BAEC9" }}>Know something we don&apos;t? <Link href="/submit" className="underline" style={{ color: "#C8E0EC" }}>Submit it.</Link></p>
      </footer>

    </div>
  );
}
