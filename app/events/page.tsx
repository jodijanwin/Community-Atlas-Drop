"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import eventsData from "@/data/events.json";
import { CATEGORY_COLORS, Category } from "@/types";

type Event = (typeof eventsData)[number];

const ALL_CATEGORIES = [...new Set(eventsData.map((e) => e.category))] as Category[];

function parseDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00");
}

function isUpcoming(dateStr: string) {
  return new Date(dateStr + "T23:59:00") >= new Date();
}

function formatDate(dateStr: string) {
  return parseDate(dateStr).toLocaleDateString("en-CA", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}

// ─── Category chip ────────────────────────────────────────────────────────────

function CategoryChip({ cat, active, onClick }: { cat: Category; active: boolean; onClick: () => void }) {
  const color = CATEGORY_COLORS[cat];
  return (
    <button
      onClick={onClick}
      style={{
        padding: "5px 12px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        border: `1.5px solid ${color}`,
        background: active ? color : "transparent",
        color: active ? "white" : color,
        cursor: "pointer",
        transition: "all 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {cat}
    </button>
  );
}

// ─── Event card ───────────────────────────────────────────────────────────────

function EventCard({ event, faded }: { event: Event; faded?: boolean }) {
  const d = parseDate(event.date);
  const color = CATEGORY_COLORS[event.category as Category];
  return (
    <div
      style={{
        background: "white",
        borderRadius: 10,
        border: "1px solid #C8E0EC",
        padding: "16px 18px",
        display: "flex",
        gap: 16,
        opacity: faded ? 0.65 : 1,
        transition: "opacity 0.15s",
      }}
    >
      {/* Date badge */}
      <div style={{ flexShrink: 0, textAlign: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: 8, background: "#F5DEB3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#0D2B3E", lineHeight: 1, margin: 0 }}>
            {d.toLocaleDateString("en-CA", { month: "short" })}
          </p>
          <p style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Lora', serif", color: "#0D2B3E", lineHeight: 1, margin: "2px 0 0" }}>
            {d.getDate()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
          <p style={{ fontSize: 15, fontWeight: 600, fontFamily: "'Lora', serif", color: "#0D2B3E", margin: 0, lineHeight: 1.3 }}>{event.title}</p>
          <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: `${color}22`, color, flexShrink: 0, whiteSpace: "nowrap" }}>
            {event.category}
          </span>
        </div>
        <p style={{ fontSize: 12, color: "#1A6B8A", margin: "0 0 3px", fontWeight: 500 }}>
          {formatDate(event.date)} · {event.time}
        </p>
        <p style={{ fontSize: 12, color: "#0D2B3E", margin: "0 0 6px" }}>📍 {event.location}</p>
        {!faded && <p style={{ fontSize: 13, color: "#0D2B3E", lineHeight: 1.5, margin: 0 }}>{event.description}</p>}
        {!faded && (event.recurring || event.contact) && (
          <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 12 }}>
            {event.recurring && <span style={{ fontSize: 11, color: "#5BAEC9", fontStyle: "italic" }}>↻ {event.recurring}</span>}
            {event.contact && <a href={`mailto:${event.contact}`} style={{ fontSize: 11, color: "#1A6B8A", fontWeight: 500 }}>{event.contact}</a>}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Calendar view ────────────────────────────────────────────────────────────

function CalendarView({ events }: { events: Event[] }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-indexed

  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const eventsByDay = useMemo(() => {
    const map: Record<number, Event[]> = {};
    for (const e of events) {
      const d = parseDate(e.date);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!map[day]) map[day] = [];
        map[day].push(e);
      }
    }
    return map;
  }, [events, year, month]);

  const monthName = new Date(year, month).toLocaleDateString("en-CA", { month: "long", year: "numeric" });

  function prev() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function next() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      {/* Month nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <button onClick={prev} style={{ background: "none", border: "1px solid #C8E0EC", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 14, color: "#0D2B3E" }}>‹</button>
        <p style={{ fontFamily: "'Lora', serif", fontWeight: 700, fontSize: 16, color: "#0D2B3E", margin: 0 }}>{monthName}</p>
        <button onClick={next} style={{ background: "none", border: "1px solid #C8E0EC", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontSize: 14, color: "#0D2B3E" }}>›</button>
      </div>

      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 700, color: "#5BAEC9", textTransform: "uppercase", letterSpacing: "0.05em", padding: "4px 0" }}>{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {cells.map((day, i) => {
          if (day === null) return <div key={`e${i}`} />;
          const dayEvents = eventsByDay[day] || [];
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          return (
            <div
              key={day}
              style={{
                minHeight: 64,
                borderRadius: 6,
                padding: "6px 5px",
                background: isToday ? "#F0F8F0" : "white",
                border: isToday ? "1.5px solid #5BAEC9" : "1px solid #E8E2D9",
                position: "relative",
              }}
            >
              <p style={{ fontSize: 12, fontWeight: isToday ? 700 : 400, color: isToday ? "#0A3D5C" : "#0D2B3E", margin: "0 0 4px", lineHeight: 1 }}>{day}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {dayEvents.map((e) => {
                  const color = CATEGORY_COLORS[e.category as Category];
                  return (
                    <div key={e.id} title={e.title} style={{ fontSize: 9, fontWeight: 600, color: "white", background: color, borderRadius: 3, padding: "1px 4px", lineHeight: 1.4, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                      {e.title}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Events this month */}
      {Object.keys(eventsByDay).length > 0 && (
        <div style={{ marginTop: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#5BAEC9", marginBottom: 10 }}>Events this month</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {Object.entries(eventsByDay)
              .sort(([a], [b]) => Number(a) - Number(b))
              .flatMap(([, evts]) => evts)
              .map((e) => <EventCard key={e.id} event={e} />)}
          </div>
        </div>
      )}
      {Object.keys(eventsByDay).length === 0 && (
        <p style={{ textAlign: "center", fontSize: 13, color: "#5BAEC9", marginTop: 24 }}>No events this month.</p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EventsPage() {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());

  function toggleCategory(cat: string) {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  }

  const filtered = useMemo(() => {
    if (activeCategories.size === 0) return eventsData as Event[];
    return (eventsData as Event[]).filter((e) => activeCategories.has(e.category));
  }, [activeCategories]);

  const upcoming = filtered.filter((e) => isUpcoming(e.date));
  const past = filtered.filter((e) => !isUpcoming(e.date));

  return (
    <div style={{ background: "#F5DEB3", minHeight: "calc(100vh - 56px)" }}>
      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#5BAEC9", marginBottom: 8 }}>What&apos;s on in North Durham</p>
          <h1 style={{ fontFamily: "'Lora', serif", fontSize: 42, fontWeight: 700, color: "#0D2B3E", lineHeight: 1.1, marginBottom: 10 }}>Community Events</h1>
          <div style={{ width: 48, height: 2, background: "#5BAEC9", marginBottom: 14 }} />
          <p style={{ fontSize: 15, color: "#0D2B3E", lineHeight: 1.6, maxWidth: 520 }}>
            Repair cafés, seed swaps, tenant rights nights, market days, and co-op conversations. All free or low-cost, all across North Durham.
          </p>
        </div>

        {/* Toolbar: view toggle + filters */}
        <div style={{ marginBottom: 24 }}>
          {/* View toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            {(["list", "calendar"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: "6px 16px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  border: "1.5px solid #1A6B8A",
                  background: view === v ? "#1A6B8A" : "transparent",
                  color: view === v ? "white" : "#1A6B8A",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "all 0.15s",
                }}
              >
                {v === "list" ? "📋 List" : "📅 Calendar"}
              </button>
            ))}
          </div>

          {/* Category filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#5BAEC9", textTransform: "uppercase", letterSpacing: "0.06em", marginRight: 4 }}>Filter:</span>
            {ALL_CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat}
                cat={cat}
                active={activeCategories.has(cat)}
                onClick={() => toggleCategory(cat)}
              />
            ))}
            {activeCategories.size > 0 && (
              <button
                onClick={() => setActiveCategories(new Set())}
                style={{ fontSize: 11, color: "#FF6B6B", background: "none", border: "none", cursor: "pointer", fontWeight: 600, marginLeft: 4 }}
              >
                Clear ✕
              </button>
            )}
          </div>
        </div>

        {/* ── List view ── */}
        {view === "list" && (
          <>
            {upcoming.length > 0 ? (
              <section style={{ marginBottom: 40 }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#1A6B8A", marginBottom: 16 }}>Upcoming</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {upcoming.map((e) => <EventCard key={e.id} event={e} />)}
                </div>
              </section>
            ) : (
              <div style={{ background: "white", border: "1px solid #C8E0EC", borderRadius: 10, padding: 32, textAlign: "center", marginBottom: 40 }}>
                <p style={{ fontSize: 13, color: "#0D2B3E", marginBottom: 8 }}>No upcoming events{activeCategories.size > 0 ? " in these categories" : ""} listed yet.</p>
                <Link href="/submit" style={{ fontSize: 13, fontWeight: 600, color: "#1A6B8A" }}>Know of one? Submit it →</Link>
              </div>
            )}

            {past.length > 0 && (
              <section style={{ marginBottom: 40 }}>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#0D2B3E", marginBottom: 12 }}>Past Events</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {past.map((e) => <EventCard key={e.id} event={e} faded />)}
                </div>
              </section>
            )}
          </>
        )}

        {/* ── Calendar view ── */}
        {view === "calendar" && (
          <div style={{ background: "white", borderRadius: 12, border: "1px solid #C8E0EC", padding: 20, marginBottom: 40 }}>
            <CalendarView events={filtered} />
          </div>
        )}

        {/* Submit CTA */}
        <div style={{ background: "white", borderLeft: "4px solid #5BAEC9", borderRadius: "0 10px 10px 0", padding: "20px 24px" }}>
          <p style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: 14, color: "#0D2B3E", marginBottom: 4 }}>Know of an event that belongs here?</p>
          <p style={{ fontSize: 13, color: "#0D2B3E", marginBottom: 16, lineHeight: 1.5 }}>A repair night, a market, a community meeting, a skill share — if it&apos;s in North Durham and open to neighbours, add it.</p>
          <Link href="/submit" style={{ display: "inline-block", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: "#0A3D5C", color: "#F5DEB3", fontFamily: "'Lora', serif" }}>
            Submit an event →
          </Link>
        </div>

      </div>
    </div>
  );
}
