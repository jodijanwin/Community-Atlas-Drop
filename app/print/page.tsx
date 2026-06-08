"use client";

import listings from "@/data/listings.json";
import { Listing, Category, CATEGORY_COLORS } from "@/types";

const ALL_CATEGORIES: Category[] = ["Free Food","Tenant Defense","Public Space","Repair Skills","Local Makers","Gathering Places","Mutual Aid","Co-op Leads"];
const MISSING = ["A permanently affordable gathering space in Port Perry","A tenant organizing network for rural rent increases","A community land trust for North Durham","A care co-op for isolated rural residents","A bulk food buying co-op accessible without a car","Expanded community broadband beyond Port Perry Wifi's current coverage"];

export default function PrintPage() {
  const typedListings = listings as Listing[];
  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <div className="no-print sticky top-0 z-10 px-6 py-3 border-b flex items-center justify-between" style={{ background: "#2F5D50", borderColor: "#2F6F73" }}>
        <p className="text-sm font-semibold" style={{ color: "#F6F1E8", fontFamily: "'Lora', serif" }}>Print View</p>
        <button onClick={() => window.print()} className="px-4 py-1.5 rounded text-sm font-semibold" style={{ background: "#C65A1E", color: "white", fontFamily: "'Lora', serif" }}>Print / Save PDF</button>
      </div>
      <div className="max-w-4xl mx-auto px-8 py-10">
        <div className="text-center border-b-2 pb-6 mb-8" style={{ borderColor: "#2F5D50" }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#2F6F73" }}>North Durham · Scugog · Uxbridge · Brock · Issue No. 1</p>
          <h1 className="text-5xl font-bold leading-none mb-2" style={{ fontFamily: "'Lora', serif", color: "#2F5D50" }}>North Durham Atlas</h1>
          <p className="text-sm italic" style={{ color: "#3F352C" }}>Make hidden abundance impossible to ignore.</p>
          <p className="text-xs mt-2" style={{ color: "#7A9E7E" }}>{typedListings.length} verified resources · Updated monthly · Community-authored and independent</p>
        </div>
        {ALL_CATEGORIES.map((cat) => {
          const catListings = typedListings.filter((l) => l.category === cat);
          if (catListings.length === 0) return null;
          return (
            <div key={cat} className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: CATEGORY_COLORS[cat] }} />
                <h2 className="text-sm font-bold uppercase tracking-wider" style={{ fontFamily: "'Lora', serif", color: "#2F5D50" }}>{cat}</h2>
                <div className="flex-1 border-b" style={{ borderColor: "#C2D1DB" }} />
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {catListings.map((listing) => (
                  <div key={listing.id} className="break-inside-avoid">
                    <p className="font-semibold text-sm" style={{ fontFamily: "'Lora', serif", color: "#2F5D50" }}>{listing.name}</p>
                    <p className="text-xs" style={{ color: "#3F352C" }}>{listing.address}</p>
                    <p className="text-xs font-medium" style={{ color: "#2F6F73" }}>{listing.hours}</p>
                    <p className="text-xs mt-0.5 leading-snug" style={{ color: "#3F352C" }}>{listing.description}</p>
                    {listing.contact && <p className="text-xs mt-0.5 italic" style={{ color: "#7A9E7E" }}>{listing.contact}</p>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <div className="mt-10 pt-6 border-t-2" style={{ borderColor: "#C65A1E" }}>
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ fontFamily: "'Lora', serif", color: "#C65A1E" }}>What&apos;s Still Missing</h2>
          <ul className="grid grid-cols-2 gap-2">
            {MISSING.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs leading-snug" style={{ color: "#3F352C" }}>
                <span className="shrink-0 mt-1 w-1 h-1 rounded-full" style={{ background: "#C65A1E" }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 pt-4 border-t flex items-center justify-between" style={{ borderColor: "#C2D1DB" }}>
          <p className="text-xs" style={{ color: "#7A9E7E" }}>North Durham Community Atlas · Scugog · Uxbridge · Brock</p>
          <p className="text-xs italic" style={{ color: "#3F352C" }}>Know something we don&apos;t? Submit at the atlas website.</p>
        </div>
      </div>
    </div>
  );
}
