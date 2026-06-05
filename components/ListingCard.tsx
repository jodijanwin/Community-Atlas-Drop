"use client";

import { Listing, CATEGORY_BG } from "@/types";

interface Props {
  listing: Listing;
  compact?: boolean;
  onClick?: () => void;
  selected?: boolean;
}

export default function ListingCard({ listing, compact, onClick, selected }: Props) {
  function copyLink() {
    navigator.clipboard.writeText(`${window.location.origin}/atlas?id=${listing.id}`);
  }

  return (
    <div onClick={onClick} className={`rounded-lg border transition-all cursor-pointer ${compact ? "p-3" : "p-4"}`} style={{ background: selected ? "rgba(27,117,188,0.06)" : "white", borderColor: selected ? "#1B75BC" : "#D8E4D8", boxShadow: selected ? "0 0 0 2px #1B75BC" : "0 1px 3px rgba(0,0,0,0.05)" }}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5 ${CATEGORY_BG[listing.category]}`}>{listing.category}</span>
          <h3 className="font-semibold text-sm leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1A2433" }}>{listing.name}</h3>
          <p className="text-xs mt-0.5" style={{ color: "#5A7080" }}>{listing.address}</p>
          <p className="text-xs mt-0.5 font-medium" style={{ color: "#1B75BC" }}>{listing.hours}</p>
          {!compact && <p className="text-xs mt-2 leading-relaxed" style={{ color: "#3D5040" }}>{listing.description}</p>}
          {!compact && listing.contact && <p className="text-xs mt-1.5 italic" style={{ color: "#5A7080" }}>Contact: {listing.contact}</p>}
        </div>
        {!compact && (
          <button onClick={(e) => { e.stopPropagation(); copyLink(); }} className="shrink-0 text-xs px-2 py-1 rounded border transition-colors hover:bg-blue-50" style={{ borderColor: "#D8E4D8", color: "#5A7080" }} title="Copy shareable link">Share</button>
        )}
      </div>
      {!compact && listing.tags && listing.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {listing.tags.map((tag) => <span key={tag} className="text-xs px-1.5 py-0.5 rounded" style={{ background: "#F0F4F0", color: "#5A7080" }}>{tag}</span>)}
        </div>
      )}
    </div>
  );
}
