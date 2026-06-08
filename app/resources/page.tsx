import Link from "next/link";

const ACTIVIST_RESOURCES = [
  {
    name: "Shareable",
    description: "News, stories, and how-tos about the sharing economy, commons, and cooperative living. A go-to resource for community abundance thinking.",
    url: "https://www.shareable.net",
    tag: "Sharing Economy",
  },
  {
    name: "Beautiful Trouble",
    description: "A toolbox of tactics, theories, and case studies for creative activism. Used by organizers worldwide.",
    url: "https://beautifultrouble.org",
    tag: "Tactics & Theory",
  },
  {
    name: "Everyday Activism Network",
    description: "Learn and take action on social justice issues. Practical guides for everyday people.",
    url: "https://everydayactivism.net",
    tag: "Action Guides",
  },
  {
    name: "Museum of Protest",
    description: "Preserving the past to inspire the future. A living archive of protest culture and movements.",
    url: "https://museumofprotest.com",
    tag: "History & Archive",
  },
  {
    name: "Activists Resource Hub",
    description: "A growing collection of resources, tools, and guides for community organizers and activists.",
    url: "https://activistsresourcehub.org",
    tag: "Organizers",
  },
  {
    name: "Activist Handbook",
    description: "Campaigning guides for activists. Covers strategy, communication, wellbeing, and movement building.",
    url: "https://activisthandbook.org",
    tag: "Campaigning",
  },
];

const LOCAL_RESOURCES = [
  {
    name: "North Durham Chamber of Commerce",
    description: "Business and community advocacy covering Scugog, Uxbridge, and Brock. A connecting point for local enterprise and economic development across all three townships.",
    url: "https://northdurhamchamber.ca/",
    tag: "Community",
  },
  {
    name: "The Standard Newspaper",
    description: "Primary local news source covering Scugog, Uxbridge, and Brock Townships. Covers community events, local governance, and social issues.",
    url: "https://www.thestandardnewspaper.ca/",
    tag: "Local News",
  },
  {
    name: "Durham Tourism — North Durham Communities",
    description: "Regional tourism resource covering Port Perry, Uxbridge, Beaverton, Cannington, and Sunderland — useful for discovering local events and seasonal highlights.",
    url: "https://www.durham.ca/en/tourism/communities.aspx",
    tag: "Tourism",
  },
  {
    name: "Community Development Council Durham",
    description: "Inter-agency network coordinating service planning across North Durham. Connects northern rural service providers and hosts community forums.",
    url: "https://www.cdcd.org/social-planning-council/",
    tag: "Social Planning",
  },
  {
    name: "North House — Housing Support",
    description: "Lead housing support org for all three townships. Eviction prevention, landlord mediation, rental support, and emergency rent assistance.",
    url: "https://northhouse.ca/",
    tag: "Housing",
  },
  {
    name: "Uxbridge Trail System",
    description: "Over 300 km of trails connecting Durham Forest, Oak Ridges Trail, and the Trans-Canada Trail. The Trail Capital of Canada — hiking, cycling, skiing, and equestrian use.",
    url: "https://www.uxbridge.ca/en/explore-and-play/trail-system.aspx",
    tag: "Trails",
  },
];

function ResourceCard({ name, description, url, tag }: { name: string; description: string; url: string; tag: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block p-5 rounded-lg border transition-all hover:border-teal-700/50 hover:scale-[1.01]" style={{ background: "white", borderColor: "#C2D1DB" }}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-semibold leading-snug" style={{ fontFamily: "'Lora', serif", color: "#3F352C" }}>{name}</h3>
        <span className="shrink-0 text-xs px-2 py-0.5 rounded" style={{ background: "rgba(47,111,115,0.15)", color: "#2F6F73" }}>{tag}</span>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: "#3F352C" }}>{description}</p>
      <p className="text-xs mt-2 font-medium" style={{ color: "#2F6F73" }}>Visit →</p>
    </a>
  );
}

export default function ResourcesPage() {
  return (
    <div style={{ background: "#F6F1E8", minHeight: "calc(100vh - 56px)" }}>
      <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#2F6F73" }}>Further Reading & Links</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5" style={{ fontFamily: "'Lora', serif", color: "#3F352C" }}>Resources</h1>
          <div className="w-12 h-0.5 mb-5" style={{ background: "#2F6F73" }} />
          <p className="text-base leading-relaxed max-w-xl" style={{ color: "#3F352C" }}>
            Tools for organizers and links to local community media for North Durham Region. Natural areas are mapped in the <Link href="/atlas?category=Public+Space" style={{ color: "#2F6F73" }}>Public Space</Link> category of the atlas.
          </p>
        </div>

        {/* Activist & Organizer Resources */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold" style={{ fontFamily: "'Lora', serif", color: "#3F352C" }}>For Organizers & Activists</h2>
            <div className="flex-1 border-t" style={{ borderColor: "#C2D1DB" }} />
          </div>
          <p className="text-sm mb-6" style={{ color: "#3F352C" }}>
            Shareable resources for anyone doing community work — tactics, theory, guides, and archives.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ACTIVIST_RESOURCES.map((r) => (
              <ResourceCard key={r.name} {...r} />
            ))}
          </div>
        </section>

        {/* Local Resources */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold" style={{ fontFamily: "'Lora', serif", color: "#3F352C" }}>Local North Durham Resources</h2>
            <div className="flex-1 border-t" style={{ borderColor: "#C2D1DB" }} />
          </div>
          <p className="text-sm mb-6" style={{ color: "#3F352C" }}>
            Community media, tourism, and local information sources covering North Durham — Scugog, Uxbridge, and Brock Townships.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LOCAL_RESOURCES.map((r) => (
              <ResourceCard key={r.name} {...r} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="p-6 rounded-lg" style={{ background: "#2F5D50" }}>
          <p className="text-sm font-semibold mb-1" style={{ fontFamily: "'Lora', serif", color: "#F6F1E8" }}>Know a resource that should be here?</p>
          <p className="text-sm mb-4" style={{ color: "#C2D1DB" }}>A local organization, a useful tool, a conservation area we missed — add it.</p>
          <Link href="/submit" className="inline-block px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90" style={{ fontFamily: "'Lora', serif", background: "#C65A1E", color: "white" }}>Submit a resource →</Link>
        </div>

      </div>
    </div>
  );
}
