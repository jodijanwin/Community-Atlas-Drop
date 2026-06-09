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
  {
    name: "Ontario Nonprofit Network",
    description: "Provincial network supporting Ontario's nonprofit and charity sector. Policy resources, capacity-building tools, and sector-wide advocacy for community organizations.",
    url: "https://theonn.ca",
    tag: "Nonprofits",
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
  {
    name: "Oak Ridges Moraine Land Trust",
    description: "Conserves ecologically sensitive lands across the Moraine, including properties in Uxbridge and Brock. Maintains publicly accessible conservation trails and runs volunteer stewardship events.",
    url: "https://www.oakridgesmoraine.org",
    tag: "Conservation",
  },
  {
    name: "North Durham Family Health Team",
    description: "Interdisciplinary primary care serving North Durham — family doctors, nurses, social workers, dietitians, and mental health support. Accepts new patients in underserved areas.",
    url: "https://www.northdurhamfht.ca",
    tag: "Health",
  },
  {
    name: "Port Perry Wifi — Communicate Freely",
    description: "Grassroots community wireless network providing free or low-cost internet to Port Perry residents. One of the only active community-owned broadband initiatives in rural Ontario.",
    url: "https://www.portperrywifi.ca",
    tag: "Digital Equity",
  },
];

function ResourceCard({ name, description, url, tag }: { name: string; description: string; url: string; tag: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block p-5 rounded-lg border transition-all hover:border-teal-700/50 hover:scale-[1.01]" style={{ background: "white", borderColor: "#C8E0EC" }}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-semibold leading-snug" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>{name}</h3>
        <span className="shrink-0 text-xs px-2 py-0.5 rounded" style={{ background: "rgba(26,107,138,0.15)", color: "#1A6B8A" }}>{tag}</span>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: "#0D2B3E" }}>{description}</p>
      <p className="text-xs mt-2 font-medium" style={{ color: "#1A6B8A" }}>Visit →</p>
    </a>
  );
}

export default function ResourcesPage() {
  return (
    <div style={{ background: "#F5DEB3", minHeight: "calc(100vh - 56px)" }}>
      <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#1A6B8A" }}>Further Reading & Links</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>Resources</h1>
          <div className="w-12 h-0.5 mb-5" style={{ background: "#1A6B8A" }} />
          <p className="text-base leading-relaxed max-w-xl" style={{ color: "#0D2B3E" }}>
            Tools for organizers and links to local community media for North Durham Region. Natural areas are mapped in the <Link href="/atlas?category=Public+Space" style={{ color: "#1A6B8A" }}>Public Space</Link> category of the atlas.
          </p>
        </div>

        {/* Activist & Organizer Resources */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>For Organizers & Activists</h2>
            <div className="flex-1 border-t" style={{ borderColor: "#C8E0EC" }} />
          </div>
          <p className="text-sm mb-6" style={{ color: "#0D2B3E" }}>
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
            <h2 className="text-xl font-bold" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>Local North Durham Resources</h2>
            <div className="flex-1 border-t" style={{ borderColor: "#C8E0EC" }} />
          </div>
          <p className="text-sm mb-6" style={{ color: "#0D2B3E" }}>
            Community media, tourism, and local information sources covering North Durham — Scugog, Uxbridge, and Brock Townships.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LOCAL_RESOURCES.map((r) => (
              <ResourceCard key={r.name} {...r} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="p-6 rounded-lg" style={{ background: "#0A3D5C" }}>
          <p className="text-sm font-semibold mb-1" style={{ fontFamily: "'Lora', serif", color: "#F5DEB3" }}>Know a resource that should be here?</p>
          <p className="text-sm mb-4" style={{ color: "#C8E0EC" }}>A local organization, a useful tool, a conservation area we missed — add it.</p>
          <Link href="/submit" className="inline-block px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90" style={{ fontFamily: "'Lora', serif", background: "#FF6B6B", color: "white" }}>Submit a resource →</Link>
        </div>

      </div>
    </div>
  );
}
