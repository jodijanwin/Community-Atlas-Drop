"use client";

import listings from "@/data/listings.json";
import { Listing, Category, CATEGORY_COLORS } from "@/types";

const ALL_CATEGORIES: Category[] = [
  "Free Food",
  "Tenant Defense",
  "Public Space",
  "Repair Skills",
  "Local Makers",
  "Gathering Places",
  "Mutual Aid",
  "Co-op Leads",
];

const MISSING = [
  "A permanently affordable community space",
  "A tenant organizing committee with full capacity",
  "A community land trust with capital to take land off the market",
  "A bulk food buying co-op with a physical home",
  "A care co-op for elders and young children",
];

export default function PrintPage() {
  const typedListings = listings as Listing[];

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      {/* Print controls — hidden on actual print */}
      <div
        className="no-print sticky top-0 z-10 px-6 py-3 border-b flex items-center justify-between"
        style={{ background: "#1A1A18", borderColor: "#2A2922" }}
      >
        <p className="text-sm font-semibold" style={{ color: "#F5F0E8", fontFamily: "'Space Grotesk', sans-serif" }}>
          Print View
        </p>
        <button
          onClick={() => window.print()}
          className="px-4 py-1.5 rounded text-sm font-semibold"
          style={{ background: "#C4870A", color: "#1A1A18", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Print / Save PDF
        </button>
      </div>

      {/* Zine layout */}
      <div className="max-w-4xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="text-center border-b-2 pb-6 mb-8" style={{ borderColor: "#1A1A18" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#C4870A" }}>
            Eastside Commons · Issue No. 1
          </p>
          <h1
            className="text-5xl font-bold leading-none mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1A1A18" }}
          >
            Community Atlas Drop
          </h1>
          <p className="text-sm italic" style={{ color: "#6B6355" }}>
            Make hidden abundance impossible to ignore.
          </p>
          <p className="text-xs mt-2" style={{ color: "#A0998E" }}>
            {typedListings.length} verified resources · Updated monthly · Community-authored and independent
          </p>
        </div>

        {/* Listings by category */}
        {ALL_CATEGORIES.map((cat) => {
          const catListings = typedListings.filter((l) => l.category === cat);
          if (catListings.length === 0) return null;
          const color = CATEGORY_COLORS[cat];

          return (
            <div key={cat} className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: color }} />
                <h2
                  className="text-sm font-bold uppercase tracking-wider"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1A1A18" }}
                >
                  {cat}
                </h2>
                <div className="flex-1 border-b" style={{ borderColor: "#E5DDD0" }} />
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {catListings.map((listing) => (
                  <div key={listing.id} className="break-inside-avoid">
                    <p
                      className="font-semibold text-sm"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1A1A18" }}
                    >
                      {listing.name}
                    </p>
                    <p className="text-xs" style={{ color: "#6B6355" }}>
                      {listing.address}
                    </p>
                    <p className="text-xs font-medium" style={{ color: "#C4870A" }}>
                      {listing.hours}
                    </p>
                    <p className="text-xs mt-0.5 leading-snug" style={{ color: "#4A4540" }}>
                      {listing.description}
                    </p>
                    {listing.contact && (
                      <p className="text-xs mt-0.5 italic" style={{ color: "#A0998E" }}>
                        {listing.contact}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* What's Missing */}
        <div
          className="mt-10 pt-6 border-t-2"
          style={{ borderColor: "#8B1A1A" }}
        >
          <h2
            className="text-sm font-bold uppercase tracking-wider mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#8B1A1A" }}
          >
            What&apos;s Still Missing
          </h2>
          <ul className="grid grid-cols-2 gap-2">
            {MISSING.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs leading-snug" style={{ color: "#4A4540" }}>
                <span className="shrink-0 mt-1 w-1 h-1 rounded-full" style={{ background: "#8B1A1A" }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t flex items-center justify-between" style={{ borderColor: "#E5DDD0" }}>
          <p className="text-xs" style={{ color: "#A0998E" }}>
            Community Atlas Drop · Eastside Commons
          </p>
          <p className="text-xs italic" style={{ color: "#A0998E" }}>
            Know something we don&apos;t? Submit at communityatlas.drop/submit
          </p>
        </div>
      </div>
    </div>
  );
}
