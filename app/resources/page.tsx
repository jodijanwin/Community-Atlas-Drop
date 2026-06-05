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
    name: "Scugog Tourism",
    description: "Official tourism resource for Scugog Township — events, attractions, and what's happening locally.",
    url: "https://www.scugog.ca/en/tourism/tourism.aspx",
    tag: "Township",
  },
  {
    name: "Port Perry — Destination Ontario",
    description: "Provincial tourism profile of Port Perry, covering local gems, trails, and community highlights.",
    url: "https://www.destinationontario.com/en-ca/regions/central-ontario/port-perry",
    tag: "Tourism",
  },
  {
    name: "Sideroads of Scugog",
    description: "A community-led resource celebrating the rural roads, places, and stories of Scugog Township.",
    url: "https://www.sideroadsofscugog.ca",
    tag: "Community",
  },
  {
    name: "Focus on Scugog",
    description: "Local news, events, and community information specific to Scugog Township.",
    url: "https://www.focusonscugog.com",
    tag: "Local News",
  },
];

function ResourceCard({ name, description, url, tag }: { name: string; description: string; url: string; tag: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block p-5 rounded-lg border transition-all hover:border-blue-700/50 hover:scale-[1.01]" style={{ background: "#1E2E3E", borderColor: "#243040" }}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-semibold leading-snug" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>{name}</h3>
        <span className="shrink-0 text-xs px-2 py-0.5 rounded" style={{ background: "rgba(27,117,188,0.15)", color: "#6BB8F0" }}>{tag}</span>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: "#5A7080" }}>{description}</p>
      <p className="text-xs mt-2 font-medium" style={{ color: "#1B75BC" }}>Visit →</p>
    </a>
  );
}

export default function ResourcesPage() {
  return (
    <div style={{ background: "#1A2433", minHeight: "calc(100vh - 56px)" }}>
      <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#1B75BC" }}>Further Reading & Links</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>Resources</h1>
          <div className="w-12 h-0.5 mb-5" style={{ background: "#1B75BC" }} />
          <p className="text-base leading-relaxed max-w-xl" style={{ color: "#5A7080" }}>
            Tools for organizers and links to local community media. Natural areas are mapped in the <Link href="/atlas?category=Public+Space" style={{ color: "#6BB8F0" }}>Public Space</Link> category of the atlas.
          </p>
        </div>

        {/* Activist & Organizer Resources */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>For Organizers & Activists</h2>
            <div className="flex-1 border-t" style={{ borderColor: "#243040" }} />
          </div>
          <p className="text-sm mb-6" style={{ color: "#5A7080" }}>
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
            <h2 className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>Local Scugog Resources</h2>
            <div className="flex-1 border-t" style={{ borderColor: "#243040" }} />
          </div>
          <p className="text-sm mb-6" style={{ color: "#5A7080" }}>
            Community media, tourism, and local information sources covering Scugog Township.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LOCAL_RESOURCES.map((r) => (
              <ResourceCard key={r.name} {...r} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="p-6 rounded-lg" style={{ background: "#243040" }}>
          <p className="text-sm font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>Know a resource that should be here?</p>
          <p className="text-sm mb-4" style={{ color: "#5A7080" }}>A local organization, a useful tool, a conservation area we missed — add it.</p>
          <Link href="/submit" className="inline-block px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90" style={{ fontFamily: "'Space Grotesk', sans-serif", background: "#1B75BC", color: "white" }}>Submit a resource →</Link>
        </div>

      </div>
    </div>
  );
}
