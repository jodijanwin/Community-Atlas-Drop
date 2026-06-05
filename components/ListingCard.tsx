"use client";

import { Listing, CATEGORY_BG, CATEGORY_COLORS } from "@/types";

interface Props {
  listing: Listing;
  compact?: boolean;
  onClick?: () => void;
  selected?: boolean;
}

export default function ListingCard({ listing, compact, onClick, selected }: Props) {
  const bgClass = CATEGORY_BG[listing.category];

  function copyLink() {
    const url = `${window.location.origin}/atlas?id=${listing.id}`;
    navigator.clipboard.writeText(url);
  }

  return (
    <div
      onClick={onClick}
      className={`rounded-lg border transition-all cursor-pointer ${
        selected ? "ring-2" : ""
      } ${compact ? "p-3" : "p-4"}`}
      style={{
        background: selected ? "rgba(196,135,10,0.06)" : "white",
        borderColor: selected ? "#C4870A" : "#E5DDD0",
        boxShadow: selected ? "0 0 0 2px #C4870A" : "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <span
            className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5 ${bgClass}`}
          >
            {listing.category}
          </span>
          <h3
            className="font-semibold text-sm leading-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1A1A18" }}
          >
            {listing.name}
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#6B6355" }}>
            {listing.address}
          </p>
          <p className="text-xs mt-0.5 font-medium" style={{ color: "#C4870A" }}>
            {listing.hours}
          </p>
          {!compact && (
            <p className="text-xs mt-2 leading-relaxed" style={{ color: "#4A4540" }}>
              {listing.description}
            </p>
          )}
          {!compact && listing.contact && (
            <p className="text-xs mt-1.5 italic" style={{ color: "#6B6355" }}>
              Contact: {listing.contact}
            </p>
          )}
        </div>
        {!compact && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyLink();
            }}
            className="shrink-0 text-xs px-2 py-1 rounded border transition-colors hover:bg-amber-50"
            style={{ borderColor: "#E5DDD0", color: "#6B6355" }}
            title="Copy shareable link"
          >
            Share
          </button>
        )}
      </div>
      {!compact && listing.tags && listing.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {listing.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-1.5 py-0.5 rounded"
              style={{ background: "#F5F0E8", color: "#6B6355" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
