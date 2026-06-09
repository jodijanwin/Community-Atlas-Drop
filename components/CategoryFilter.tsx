"use client";

import { Category, CATEGORY_COLORS } from "@/types";

const ALL_CATEGORIES: Category[] = ["Free Food","Tenant Defense","Public Space","Repair Skills","Local Makers","Gathering Places","Mutual Aid","Co-op Leads"];

interface Props {
  selected: Category | null;
  onChange: (cat: Category | null) => void;
}

export default function CategoryFilter({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => onChange(null)} className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all" style={{ background: selected === null ? "#0A3D5C" : "white", color: selected === null ? "#F5DEB3" : "#0D2B3E", borderColor: selected === null ? "#0A3D5C" : "#C8E0EC" }}>All</button>
      {ALL_CATEGORIES.map((cat) => {
        const isSelected = selected === cat;
        return (
          <button key={cat} onClick={() => onChange(isSelected ? null : cat)} className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all" style={{ background: isSelected ? CATEGORY_COLORS[cat] : "white", color: isSelected ? "white" : "#0D2B3E", borderColor: isSelected ? CATEGORY_COLORS[cat] : "#C8E0EC" }}>{cat}</button>
        );
      })}
    </div>
  );
}
