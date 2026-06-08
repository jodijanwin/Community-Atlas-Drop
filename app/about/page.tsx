import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ background: "#F6F1E8", minHeight: "calc(100vh - 56px)" }}>
      <div className="max-w-2xl mx-auto px-6 py-12 sm:py-16">
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#2F6F73" }}>About This Project</p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5" style={{ fontFamily: "'Lora', serif", color: "#3F352C" }}>This atlas is a<br />counter-spell.</h1>
          <div className="w-12 h-0.5 mb-6" style={{ background: "#2F6F73" }} />
          <p className="text-base leading-relaxed" style={{ color: "#3F352C" }}>Many communities are taught to see only scarcity while real resources remain fragmented and invisible. The Community Atlas Drop is built to make that invisibility impossible to maintain — starting in North Durham.</p>
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Lora', serif", color: "#3F352C" }}>The Concept</h2>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#3F352C" }}>
            <p>North Durham is full of hidden abundance: the repair café volunteer, the farmer selling below-market at the Saturday market, the Legion hall available for free, the mutual aid network helping neighbours through winter. Most residents have no idea these things exist.</p>
            <p>By making these fragments visible in one shareable atlas, you alter what people believe is possible in their own community. Instead of beginning with a demand to institutions, you begin by changing what people believe already exists where they live.</p>
            <p>Conventional advocacy says, <em>look what we lack.</em> This atlas says, <em>look what we already have</em> — and asks why it remains invisible, unsupported, and unshared.</p>
          </div>
        </section>

        <section className="mb-10 p-6 rounded-lg border-l-4" style={{ background: "white", borderLeftColor: "#7A9E7E", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Lora', serif", color: "#3F352C" }}>Why It Works</h2>
          <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#3F352C" }}>
            <p>A community that sees only scarcity behaves one way. A community that sees itself as resourced, connected, and capable begins to self-organize. The atlas is an epiphany device — it makes cooperation imaginable, then practical.</p>
            <p>Once people use the map to solve daily problems, they become more available for deeper work: housing advocacy, public-space protection, and cooperative enterprise rooted in a place they can see themselves in.</p>
            <p className="font-medium" style={{ color: "#3F352C" }}>The map is not the destination. It is the opening move.</p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Lora', serif", color: "#C65A1E" }}>What&apos;s Still Missing</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#3F352C" }}>The atlas doesn&apos;t pretend North Durham has everything it needs. Naming what&apos;s absent is part of the work too — not as complaint, but as coordinate.</p>
          <ul className="space-y-2">
            {[
              "A permanently affordable gathering space in Port Perry not tied to a church or private landlord",
              "A tenant organizing network with enough capacity to respond to the current wave of rural rent increases",
              "A community land trust capable of acquiring even one parcel in the township",
              "A care co-op for elderly and isolated rural residents",
              "A bulk food buying co-op accessible to residents without vehicles",
              "Expanded community-owned broadband beyond Port Perry Wifi's existing network — bringing digital equity to the rural north",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: "#3F352C" }}>
                <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#C65A1E" }} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "'Lora', serif", color: "#3F352C" }}>How It&apos;s Built</h2>
          <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#3F352C" }}>
            <p>Walk the townships with a notebook. Gather addresses, hours, names, categories. Verify each listing by visit, call, or message — not by scraping the internet. Drive out to Blackstock and Caesarea. The rural parts of North Durham are not an afterthought.</p>
            <p>Print a run and place copies in the library, the Legion, the Blackstock General Store, the community centre, the farmers market. Post the digital version in local Facebook groups and community boards.</p>
            <p>Update monthly so the atlas becomes a living civic ritual. By month three, begin approaching local journalists, councillors, and service organizations — not as formal partners yet, but as validators and distributors.</p>
          </div>
        </section>

        <div className="p-6 rounded-lg text-center" style={{ background: "#2F5D50" }}>
          <p className="text-lg sm:text-xl font-semibold leading-relaxed" style={{ fontFamily: "'Lora', serif", color: "#F6F1E8" }}>What would happen if North Durham stopped introducing itself through problems and began introducing itself through latent power?</p>
          <Link href="/submit" className="inline-block mt-5 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90" style={{ fontFamily: "'Lora', serif", background: "#C65A1E", color: "white" }}>Add what you know →</Link>
        </div>
      </div>
    </div>
  );
}
