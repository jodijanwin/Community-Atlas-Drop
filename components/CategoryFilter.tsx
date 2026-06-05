"use client";

import { Category, CATEGORY_COLORS } from "@/types";

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

interface Props {
  selected: Category | null;
  onChange: (cat: Category | null) => void;
}

export default function CategoryFilter({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
        style={{
          background: selected === null ? "#1A1A18" : "white",
          color: selected === null ? "#F5F0E8" : "#6B6355",
          borderColor: selected === null ? "#1A1A18" : "#E5DDD0",
        }}
      >
        All
      </button>
      {ALL_CATEGORIES.map((cat) => {
        const isSelected = selected === cat;
        const color = CATEGORY_COLORS[cat];
        return (
          <button
            key={cat}
            onClick={() => onChange(isSelected ? null : cat)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
            style={{
              background: isSelected ? color : "white",
              color: isSelected ? "white" : "#6B6355",
              borderColor: isSelected ? color : "#E5DDD0",
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
