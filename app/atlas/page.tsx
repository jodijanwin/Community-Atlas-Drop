"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import rawListings from "@/data/listings.json";
import { Listing, Category } from "@/types";
import ListingCard from "@/components/ListingCard";
import CategoryFilter from "@/components/CategoryFilter";

const listings = rawListings as Listing[];
const AtlasMap = dynamic(() => import("@/components/Map"), { ssr: false });

function AtlasContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [query, setQuery] = useState("");
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  useEffect(() => {
    const cat = searchParams.get("category") as Category | null;
    const id = searchParams.get("id");
    if (cat) setSelectedCategory(cat);
    if (id) {
      const found = listings.find((l) => l.id === id);
      if (found) setSelectedListing(found);
    }
  }, [searchParams]);

  const filtered = useMemo(() => listings.filter((l) => {
    const catMatch = !selectedCategory || l.category === selectedCategory;
    const queryMatch = !query || l.name.toLowerCase().includes(query.toLowerCase()) || l.description.toLowerCase().includes(query.toLowerCase()) || l.address.toLowerCase().includes(query.toLowerCase()) || (l.tags || []).some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return catMatch && queryMatch;
  }), [selectedCategory, query]);

  return (
    <div style={{ background: "#F5DEB3", height: "calc(100vh - 56px)", display: "flex", flexDirection: "column" }}>
      <div className="px-4 py-3 border-b shrink-0" style={{ background: "white", borderColor: "#C8E0EC" }}>
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold shrink-0" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>North Durham Community Atlas</h1>
            <input type="text" placeholder="Search resources, skills, places…" value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 max-w-sm text-sm px-3 py-1.5 rounded-lg border outline-none" style={{ borderColor: "#C8E0EC", background: "#F5DEB3", color: "#0D2B3E" }} />
            <span className="text-xs shrink-0" style={{ color: "#0D2B3E" }}>{filtered.length} of {listings.length} shown</span>
          </div>
          <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-full sm:w-80 lg:w-96 shrink-0 overflow-y-auto border-r" style={{ borderColor: "#C8E0EC", background: "#F5DEB3" }}>
          {filtered.length === 0 ? (
            <div className="p-6 text-center"><p className="text-sm" style={{ color: "#0D2B3E" }}>No resources match your search.</p></div>
          ) : (
            <div className="p-3 space-y-2">
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} onClick={() => setSelectedListing(listing)} selected={selectedListing?.id === listing.id} />
              ))}
            </div>
          )}
        </div>
        <div className="flex-1 relative hidden sm:block">
          <AtlasMap listings={filtered} selected={selectedListing} onSelect={setSelectedListing} />
        </div>
      </div>
    </div>
  );
}

export default function AtlasPage() {
  return (
    <Suspense fallback={<div style={{ background: "#F5DEB3", height: "calc(100vh - 56px)" }} />}>
      <AtlasContent />
    </Suspense>
  );
}
