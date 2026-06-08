import Link from "next/link";
import events from "@/data/events.json";
import { CATEGORY_COLORS, Category } from "@/types";

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function isUpcoming(dateStr: string) {
  return new Date(dateStr + "T23:59:00") >= new Date();
}

const upcoming = events.filter((e) => isUpcoming(e.date));
const past = events.filter((e) => !isUpcoming(e.date));

export default function EventsPage() {
  return (
    <div style={{ background: "#F0F4F0", minHeight: "calc(100vh - 56px)" }}>
      <div className="max-w-3xl mx-auto px-6 py-12 sm:py-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#6B9433" }}>What's on in Scugog</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1A2433" }}>Community Events</h1>
          <div className="w-12 h-0.5 mb-5" style={{ background: "#6B9433" }} />
          <p className="text-base leading-relaxed max-w-xl" style={{ color: "#5A7080" }}>
            Repair cafés, seed swaps, tenant rights nights, market days, and co-op conversations. All free or low-cost, all in Scugog Township.
          </p>
        </div>

        {/* Upcoming */}
        {upcoming.length > 0 ? (
          <section className="mb-14">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: "#1B75BC" }}>Upcoming</h2>
            <div className="space-y-4">
              {upcoming.map((event) => (
                <div key={event.id} className="p-5 rounded-lg border" style={{ background: "white", borderColor: "#D8E4D8" }}>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 text-center pt-0.5">
                      <div className="w-12 h-12 rounded-lg flex flex-col items-center justify-center" style={{ background: "#F0F4F0" }}>
                        <p className="text-xs font-bold uppercase leading-none" style={{ color: "#5A7080" }}>
                          {new Date(event.date + "T12:00:00").toLocaleDateString("en-CA", { month: "short" })}
                        </p>
                        <p className="text-xl font-bold leading-none mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1A2433" }}>
                          {new Date(event.date + "T12:00:00").getDate()}
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-base font-semibold leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1A2433" }}>{event.title}</h3>
                        <span className="shrink-0 text-xs px-2 py-0.5 rounded-full" style={{ background: `${CATEGORY_COLORS[event.category as Category]}22`, color: CATEGORY_COLORS[event.category as Category] }}>
                          {event.category}
                        </span>
                      </div>
                      <p className="text-xs mb-2" style={{ color: "#8AA0A8" }}>
                        {formatDate(event.date)} · {event.time}
                      </p>
                      <p className="text-xs mb-2" style={{ color: "#5A7080" }}>📍 {event.location}</p>
                      <p className="text-sm leading-relaxed" style={{ color: "#5A7080" }}>{event.description}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-4">
                        {event.recurring && (
                          <span className="text-xs italic" style={{ color: "#8AA0A8" }}>↻ {event.recurring}</span>
                        )}
                        {event.contact && (
                          <a href={`mailto:${event.contact}`} className="text-xs font-medium" style={{ color: "#1B75BC" }}>{event.contact}</a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="mb-14 p-8 rounded-lg border text-center" style={{ background: "white", borderColor: "#D8E4D8" }}>
            <p className="text-sm" style={{ color: "#8AA0A8" }}>No upcoming events listed yet.</p>
            <Link href="/submit" className="text-sm font-semibold mt-2 inline-block" style={{ color: "#1B75BC" }}>Know of one? Submit it →</Link>
          </div>
        )}

        {/* Past events */}
        {past.length > 0 && (
          <section className="mb-14">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: "#8AA0A8" }}>Past Events</h2>
            <div className="space-y-3">
              {past.map((event) => (
                <div key={event.id} className="p-4 rounded-lg border flex items-center gap-4" style={{ background: "white", borderColor: "#D8E4D8", opacity: 0.7 }}>
                  <div className="shrink-0 w-10 text-center">
                    <p className="text-xs font-bold uppercase" style={{ color: "#8AA0A8" }}>
                      {new Date(event.date + "T12:00:00").toLocaleDateString("en-CA", { month: "short" })}
                    </p>
                    <p className="text-lg font-bold leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#8AA0A8" }}>
                      {new Date(event.date + "T12:00:00").getDate()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#5A7080" }}>{event.title}</p>
                    <p className="text-xs" style={{ color: "#8AA0A8" }}>{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Submit CTA */}
        <div className="p-6 rounded-lg border-l-4" style={{ background: "white", borderLeftColor: "#6B9433" }}>
          <p className="text-sm font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1A2433" }}>Know of an event that belongs here?</p>
          <p className="text-sm mb-4" style={{ color: "#5A7080" }}>A repair night, a market, a community meeting, a skill share — if it's in Scugog and open to neighbours, add it.</p>
          <Link href="/submit" className="inline-block px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90" style={{ fontFamily: "'Space Grotesk', sans-serif", background: "#6B9433", color: "white" }}>
            Submit an event →
          </Link>
        </div>

      </div>
    </div>
  );
}
