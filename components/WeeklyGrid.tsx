"use client";

import { useState } from "react";

interface WeekEntry {
  week: number;
  label: string;
  url?: string;
  type: "event" | "news" | "update";
}

const TYPE_COLORS: Record<WeekEntry["type"], string> = {
  event: "#6B9433",
  news: "#1B75BC",
  update: "#E07B39",
};

const TYPE_LABELS: Record<WeekEntry["type"], string> = {
  event: "Event",
  news: "News",
  update: "Atlas update",
};

function getCurrentWeek(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  return Math.ceil((diff / 86400000 + start.getDay() + 1) / 7);
}

interface Props {
  entries: WeekEntry[];
}

export default function WeeklyGrid({ entries }: Props) {
  const [activeWeek, setActiveWeek] = useState<number | null>(null);
  const currentWeek = getCurrentWeek();
  const entryMap = new Map(entries.map((e) => [e.week, e]));
  const activeEntry = activeWeek !== null ? entryMap.get(activeWeek) : null;

  return (
    <div>
      {/* Active entry callout */}
      <div style={{ minHeight: 52, marginBottom: 16 }}>
        {activeEntry ? (
          <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: "#1E2E3E", borderLeft: `3px solid ${TYPE_COLORS[activeEntry.type]}` }}>
            <span className="text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5" style={{ background: `${TYPE_COLORS[activeEntry.type]}22`, color: TYPE_COLORS[activeEntry.type] }}>
              Wk {activeEntry.week} · {TYPE_LABELS[activeEntry.type]}
            </span>
            <p className="text-sm leading-snug" style={{ color: "#F0F4F0" }}>{activeEntry.label}</p>
            {activeEntry.url && (
              <a href={activeEntry.url} target="_blank" rel="noopener noreferrer" className="text-xs shrink-0 font-medium" style={{ color: "#6BB8F0" }}>→</a>
            )}
          </div>
        ) : (
          <p className="text-xs italic" style={{ color: "#3D4E5C" }}>Hover a marked week to see what happened.</p>
        )}
      </div>

      {/* Grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {Array.from({ length: 52 }, (_, i) => {
          const week = i + 1;
          const isPast = week < currentWeek;
          const isCurrent = week === currentWeek;
          const entry = entryMap.get(week);

          let bg = "transparent";
          let border = "#243040";
          if (isPast) { bg = "#243040"; border = "#243040"; }
          if (isCurrent) { bg = "#1B75BC"; border = "#1B75BC"; }
          if (entry && !isCurrent) { border = TYPE_COLORS[entry.type]; }

          return (
            <div
              key={week}
              onMouseEnter={() => entry ? setActiveWeek(week) : setActiveWeek(null)}
              onMouseLeave={() => setActiveWeek(null)}
              onClick={() => entry?.url ? window.open(entry.url, "_blank") : null}
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                background: bg,
                border: `1.5px solid ${border}`,
                cursor: entry ? "pointer" : "default",
                position: "relative",
                boxShadow: isCurrent ? "0 0 8px rgba(27,117,188,0.6)" : "none",
                transition: "transform 0.1s",
              }}
              title={`Week ${week}${entry ? ` — ${entry.label}` : ""}`}
            >
              {/* Dot indicator for entries */}
              {entry && !isCurrent && (
                <div style={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: TYPE_COLORS[entry.type],
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <div className="flex items-center gap-1.5">
          <div style={{ width: 10, height: 10, borderRadius: 2, background: "#243040" }} />
          <span className="text-xs" style={{ color: "#3D4E5C" }}>Past</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div style={{ width: 10, height: 10, borderRadius: 2, background: "#1B75BC", boxShadow: "0 0 5px rgba(27,117,188,0.6)" }} />
          <span className="text-xs" style={{ color: "#3D4E5C" }}>This week</span>
        </div>
        {(["event", "news", "update"] as const).map((type) => (
          <div key={type} className="flex items-center gap-1.5">
            <div style={{ width: 10, height: 10, borderRadius: 2, border: `1.5px solid ${TYPE_COLORS[type]}`, position: "relative" }}>
              <div style={{ position: "absolute", top: 1, right: 1, width: 3, height: 3, borderRadius: "50%", background: TYPE_COLORS[type] }} />
            </div>
            <span className="text-xs" style={{ color: "#3D4E5C" }}>{TYPE_LABELS[type]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
