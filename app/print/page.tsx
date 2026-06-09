"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import listings from "@/data/listings.json";
import stories from "@/data/stories.json";
import { Listing, Category, CATEGORY_COLORS } from "@/types";

const ZineMap = dynamic(() => import("@/components/Map"), { ssr: false });

const ALL_CATEGORIES: Category[] = [
  "Free Food", "Tenant Defense", "Public Space", "Repair Skills",
  "Local Makers", "Gathering Places", "Mutual Aid", "Co-op Leads",
];

const MISSING = [
  "A permanently affordable gathering space in Port Perry",
  "A tenant organizing network for rural rent increases",
  "A community land trust for North Durham",
  "A care co-op for isolated rural residents",
  "A bulk food buying co-op accessible without a car",
  "Expanded community broadband beyond Port Perry Wifi's current coverage",
];

// Torn paper edge — SVG wave divider
function TornEdge({ flip = false, color = "#F6F1E8" }: { flip?: boolean; color?: string }) {
  return (
    <div style={{ lineHeight: 0, transform: flip ? "scaleY(-1)" : "none", marginBottom: -1 }}>
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 40 }}>
        <path
          d="M0,20 C50,5 100,35 150,20 C200,5 250,32 300,18 C350,4 400,30 450,20 C500,8 550,34 600,20 C650,6 700,33 750,19 C800,5 850,31 900,20 C950,9 1000,35 1050,18 C1100,3 1150,28 1200,20 L1200,40 L0,40 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

// Large pull quote
function PullQuote({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <div className="my-8 px-6 py-6 border-l-4" style={{ borderLeftColor: "#E3A24C", background: "rgba(227,162,76,0.07)" }}>
      <p className="text-2xl sm:text-3xl font-bold leading-snug mb-3" style={{ fontFamily: "'Lora', serif", color: "#3F352C" }}>
        &ldquo;{text}&rdquo;
      </p>
      {attribution && <p className="text-sm font-medium" style={{ color: "#2F6F73" }}>— {attribution}</p>}
    </div>
  );
}

// Photo placeholder — swap src for a real image anytime
function PhotoBlock({ caption, tall = false }: { caption: string; tall?: boolean }) {
  return (
    <div
      className="rounded-lg overflow-hidden flex flex-col items-center justify-end"
      style={{
        height: tall ? 320 : 220,
        background: "linear-gradient(160deg, #2F5D50 0%, #2F6F73 100%)",
        position: "relative",
      }}
    >
      {/* Replace this div with <img src="..." className="w-full h-full object-cover absolute inset-0" /> */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
      <div className="relative w-full px-4 pb-4 pt-8" style={{ background: "linear-gradient(to top, rgba(47,93,80,0.95), transparent)" }}>
        <p className="text-xs italic" style={{ color: "#C2D1DB" }}>{caption}</p>
      </div>
    </div>
  );
}

export default function ZinePage() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [expandedStory, setExpandedStory] = useState<string | null>(null);
  const typedListings = listings as Listing[];

  const displayListings = activeCategory
    ? typedListings.filter((l) => l.category === activeCategory)
    : typedListings;

  return (
    <div style={{ background: "#F6F1E8" }}>

      {/* ── PRINT TOOLBAR ── */}
      <div className="no-print sticky top-0 z-50 px-6 py-3 flex items-center justify-between border-b" style={{ background: "#2F5D50", borderColor: "#2F6F73" }}>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-semibold" style={{ color: "#C2D1DB" }}>← Back to atlas</Link>
          <span className="text-xs" style={{ color: "#7A9E7E" }}>Issue No. 1 · North Durham Community Atlas</span>
        </div>
        <button
          onClick={() => window.print()}
          className="px-5 py-1.5 rounded text-sm font-semibold"
          style={{ background: "#C65A1E", color: "white", fontFamily: "'Lora', serif" }}
        >
          Print / Save PDF
        </button>
      </div>

      {/* ══════════════════════════════════════════════════
          SPREAD 1 — COVER
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-between px-8 pt-16 pb-0 overflow-hidden" style={{ background: "#2F5D50" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #F6F1E8 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="relative max-w-4xl mx-auto w-full">
          {/* Masthead */}
          <div className="flex items-start justify-between mb-12">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#7A9E7E" }}>North Durham · Scugog · Uxbridge · Brock</p>
              <p className="text-xs" style={{ color: "#C2D1DB" }}>Issue No. 1 · 2025–2026 · Community-authored & independent</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold" style={{ color: "#E3A24C" }}>{typedListings.length} verified resources</p>
              <p className="text-xs" style={{ color: "#C2D1DB" }}>Updated monthly</p>
            </div>
          </div>

          {/* Cover title */}
          <div className="mb-10">
            <h1 className="font-bold leading-none mb-4" style={{ fontFamily: "'Lora', serif", color: "#F6F1E8", fontSize: "clamp(3rem, 10vw, 7rem)", letterSpacing: "-0.03em" }}>
              North<br />
              <span style={{ color: "#E3A24C" }}>Durham</span><br />
              Atlas
            </h1>
            <p className="text-xl max-w-lg leading-relaxed" style={{ color: "#C2D1DB" }}>
              Make hidden abundance impossible to ignore.
            </p>
          </div>

          {/* Cover photo grid */}
          <div className="grid grid-cols-3 gap-3 mb-0">
            <PhotoBlock caption="Port Perry Repair Café, April 2025" tall />
            <PhotoBlock caption="Farmers Market, Scugog" tall />
            <PhotoBlock caption="Durham Forest trails, Uxbridge" tall />
          </div>
        </div>

        <TornEdge color="#F6F1E8" />
      </section>

      {/* ══════════════════════════════════════════════════
          SPREAD 2 — MANIFESTO
      ══════════════════════════════════════════════════ */}
      <section className="px-8 py-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#2F6F73" }}>Why this atlas exists</p>
            <h2 className="text-4xl font-bold leading-tight mb-6" style={{ fontFamily: "'Lora', serif", color: "#3F352C" }}>
              This atlas is a<br />counter-spell.
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#3F352C" }}>
              Many communities are taught to see only scarcity while real resources remain fragmented and invisible. The Community Atlas Drop is built to make that invisibility impossible to maintain — starting in North Durham.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#3F352C" }}>
              North Durham is full of hidden abundance: the repair café volunteer, the farmer selling below-market, the Legion hall available for free, the mutual aid network helping neighbours through winter. Most residents have no idea these things exist.
            </p>
          </div>
          <div>
            <PullQuote
              text="Conventional advocacy says, look what we lack. This atlas says, look what we already have."
            />
            <p className="text-sm leading-relaxed mt-6" style={{ color: "#3F352C" }}>
              Once people use the map to solve daily problems, they become more available for deeper work: housing advocacy, public-space protection, and cooperative enterprise rooted in a place they can see themselves in.
            </p>
            <p className="text-sm font-semibold mt-4" style={{ fontFamily: "'Lora', serif", color: "#2F6F73" }}>
              The map is not the destination. It is the opening move.
            </p>
          </div>
        </div>
      </section>

      <div style={{ background: "#2F6F73" }}>
        <TornEdge flip color="#F6F1E8" />

        {/* ══════════════════════════════════════════════════
            SPREAD 3 — LIVE MAP
        ══════════════════════════════════════════════════ */}
        <section className="px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#C2D1DB" }}>Interactive</p>
                <h2 className="text-3xl font-bold" style={{ fontFamily: "'Lora', serif", color: "#F6F1E8" }}>The Atlas Map</h2>
              </div>
              <Link href="/atlas" className="no-print text-sm font-semibold px-4 py-2 rounded" style={{ background: "#C65A1E", color: "white", fontFamily: "'Lora', serif" }}>
                Full screen →
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ height: 420, boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
              <ZineMap
                listings={typedListings}
                selected={null}
                onSelect={() => {}}
              />
            </div>
            <p className="text-xs mt-3 text-center" style={{ color: "#C2D1DB" }}>
              {typedListings.length} verified resources across Scugog, Uxbridge, and Brock · Trails, parks and services from OpenStreetMap
            </p>
          </div>
        </section>

        <TornEdge color="#F6F1E8" />
      </div>

      {/* ══════════════════════════════════════════════════
          SPREAD 4 — STORIES
      ══════════════════════════════════════════════════ */}
      <section className="px-8 py-16 max-w-4xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#7A9E7E" }}>Reported & witnessed</p>
        <h2 className="text-3xl font-bold mb-10" style={{ fontFamily: "'Lora', serif", color: "#3F352C" }}>Stories of Solidarity</h2>

        <div className="space-y-0">
          {stories.map((story, i) => (
            <div key={story.id} className="border-t" style={{ borderColor: "#C2D1DB" }}>
              <button
                className="w-full text-left py-6 flex items-start justify-between gap-4"
                onClick={() => setExpandedStory(expandedStory === story.id ? null : story.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: "rgba(47,111,115,0.12)", color: "#2F6F73" }}>{story.source}</span>
                    <span className="text-xs" style={{ color: "#3F352C" }}>{story.date}</span>
                  </div>
                  <p className="text-base font-semibold leading-snug" style={{ fontFamily: "'Lora', serif", color: "#3F352C" }}>{story.title}</p>
                </div>
                <span className="text-xl shrink-0 mt-1" style={{ color: "#2F6F73", transition: "transform 0.2s", display: "inline-block", transform: expandedStory === story.id ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {expandedStory === story.id && (
                <div className="pb-8 grid sm:grid-cols-2 gap-8 items-start">
                  <div>
                    <p className="text-sm leading-relaxed" style={{ color: "#3F352C" }}>{story.excerpt}</p>
                  </div>
                  <PhotoBlock caption={`${story.source} · ${story.date}`} />
                </div>
              )}
            </div>
          ))}
          <div className="border-t" style={{ borderColor: "#C2D1DB" }} />
        </div>

        <p className="text-xs mt-8 text-center" style={{ color: "#3F352C" }}>
          Know a story that belongs here?{" "}
          <Link href="/submit" className="underline font-semibold" style={{ color: "#2F6F73" }}>Submit it.</Link>
        </p>
      </section>

      {/* ══════════════════════════════════════════════════
          SPREAD 5 — DIRECTORY
      ══════════════════════════════════════════════════ */}
      <div style={{ background: "#C2D1DB" }}>
        <TornEdge flip color="#F6F1E8" />

        <section className="px-8 py-14">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#2F5D50" }}>The full directory</p>
            <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Lora', serif", color: "#3F352C" }}>
              {typedListings.length} Resources, 3 Townships
            </h2>

            {/* Category filter */}
            <div className="no-print flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveCategory(null)}
                className="px-3 py-1 rounded-full text-xs font-semibold border"
                style={{
                  background: activeCategory === null ? "#2F5D50" : "transparent",
                  color: activeCategory === null ? "#F6F1E8" : "#3F352C",
                  borderColor: "#2F5D50",
                }}
              >
                All ({typedListings.length})
              </button>
              {ALL_CATEGORIES.map((cat) => {
                const count = typedListings.filter((l) => l.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                    className="px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{
                      background: activeCategory === cat ? CATEGORY_COLORS[cat] : "transparent",
                      color: activeCategory === cat ? "white" : "#3F352C",
                      borderColor: CATEGORY_COLORS[cat],
                    }}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Listings grid */}
            {ALL_CATEGORIES.filter((cat) => !activeCategory || cat === activeCategory).map((cat) => {
              const catListings = displayListings.filter((l) => l.category === cat);
              if (catListings.length === 0) return null;
              return (
                <div key={cat} className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: CATEGORY_COLORS[cat] }} />
                    <h3 className="text-sm font-bold uppercase tracking-wider" style={{ fontFamily: "'Lora', serif", color: "#2F5D50" }}>{cat}</h3>
                    <div className="flex-1 border-b" style={{ borderColor: "#2F5D50", opacity: 0.2 }} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {catListings.map((listing) => (
                      <Link
                        key={listing.id}
                        href={`/atlas?id=${listing.id}`}
                        className="no-print p-4 rounded-lg block transition-all hover:shadow-md"
                        style={{ background: "white" }}
                      >
                        <p className="font-semibold text-sm mb-0.5" style={{ fontFamily: "'Lora', serif", color: "#3F352C" }}>{listing.name}</p>
                        <p className="text-xs mb-1" style={{ color: "#2F6F73" }}>{listing.hours}</p>
                        <p className="text-xs leading-snug" style={{ color: "#3F352C" }}>{listing.description}</p>
                        {listing.contact && <p className="text-xs mt-1 italic" style={{ color: "#7A9E7E" }}>{listing.contact}</p>}
                      </Link>
                    ))}
                    {/* Print-only layout (no hover/link styles) */}
                    {catListings.map((listing) => (
                      <div key={`print-${listing.id}`} className="print-only p-3 break-inside-avoid" style={{ display: "none" }}>
                        <p className="font-semibold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2F5D50" }}>{listing.name}</p>
                        <p className="text-xs" style={{ color: "#3F352C" }}>{listing.address}</p>
                        <p className="text-xs font-medium" style={{ color: "#2F6F73" }}>{listing.hours}</p>
                        <p className="text-xs mt-0.5 leading-snug" style={{ color: "#3F352C" }}>{listing.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <TornEdge color="#E3A24C" />
      </div>

      {/* ══════════════════════════════════════════════════
          SPREAD 6 — WHAT'S MISSING
      ══════════════════════════════════════════════════ */}
      <section className="px-8 py-16" style={{ background: "#E3A24C" }}>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#2F5D50" }}>Named, not forgotten</p>
            <h2 className="text-4xl font-bold leading-tight mb-6" style={{ fontFamily: "'Lora', serif", color: "#3F352C" }}>
              What&apos;s still<br />missing.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "#3F352C" }}>
              The atlas doesn&apos;t pretend North Durham has everything it needs. Naming what&apos;s absent is part of the work — not as complaint, but as coordinate.
            </p>
          </div>
          <ul className="space-y-4 mt-2">
            {MISSING.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full" style={{ background: "#C65A1E" }} />
                <p className="text-sm leading-snug font-medium" style={{ color: "#3F352C" }}>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SPREAD 7 — BACK COVER / CTA
      ══════════════════════════════════════════════════ */}
      <div style={{ background: "#2F5D50" }}>
        <TornEdge flip color="#E3A24C" />

        <section className="px-8 py-20 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#7A9E7E" }}>North Durham · Scugog · Uxbridge · Brock</p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: "'Lora', serif", color: "#F6F1E8" }}>
              What would happen<br />if North Durham stopped<br />
              <span style={{ color: "#E3A24C" }}>introducing itself<br />through problems?</span>
            </h2>
            <p className="text-base mb-10 leading-relaxed" style={{ color: "#C2D1DB" }}>
              Know a resource we missed? A story worth telling? A gap worth naming? The atlas grows with the community that builds it.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/submit" className="no-print px-8 py-3.5 rounded-lg font-semibold text-base" style={{ fontFamily: "'Lora', serif", background: "#C65A1E", color: "white" }}>
                Add what you know →
              </Link>
              <Link href="/atlas" className="no-print px-8 py-3.5 rounded-lg font-semibold text-base border" style={{ fontFamily: "'Lora', serif", borderColor: "#7A9E7E", color: "#F6F1E8" }}>
                Explore the atlas
              </Link>
            </div>
            <p className="text-xs mt-16" style={{ color: "#7A9E7E" }}>
              Community-authored and independent · Updated monthly · North Durham Community Atlas · Issue No. 1
            </p>
          </div>
        </section>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white; }
          section { break-inside: avoid; }
        }
      `}</style>
    </div>
  );
}
