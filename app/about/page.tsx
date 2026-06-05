import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ background: "#F5F0E8", minHeight: "calc(100vh - 56px)" }}>
      <div className="max-w-2xl mx-auto px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-12">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#C4870A" }}
          >
            About This Project
          </p>
          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight mb-5"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1A1A18" }}
          >
            This atlas is a
            <br />
            counter-spell.
          </h1>
          <div
            className="w-12 h-0.5 mb-6"
            style={{ background: "#C4870A" }}
          />
          <p className="text-base leading-relaxed" style={{ color: "#4A4540" }}>
            Many neighborhoods are taught to see only scarcity while real resources remain
            fragmented and invisible. The Community Atlas Drop is built to make that invisibility
            impossible to maintain.
          </p>
        </div>

        {/* Section: The Concept */}
        <section className="mb-10">
          <h2
            className="text-xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1A1A18" }}
          >
            The Concept
          </h2>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#4A4540" }}>
            <p>
              Power endures by convincing neighborhoods that nothing exists except need, decay, and
              dependency — when in truth the social body is full of hidden abundance: the tenant
              advocate above the bakery, the elder who fixes radios, the church basement open on
              Thursdays, the mutual aid fridge, the local grower, the corner where people still trust
              each other enough to talk.
            </p>
            <p>
              By making these fragments visible in one elegant, shareable atlas, you alter perception
              before you alter policy. That is the strategic depth here. Instead of beginning with a
              demand to institutions, you begin by changing what people believe is already possible
              where they live.
            </p>
            <p>
              Conventional advocacy says, <em>look what we lack.</em> This campaign says,{" "}
              <em>look what we already have</em> — and now ask why it remains unsupported,
              unprotected, and unshared.
            </p>
          </div>
        </section>

        {/* Section: The Reckoning */}
        <section
          className="mb-10 p-6 rounded-lg border-l-4"
          style={{ background: "white", borderLeftColor: "#2D5016", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
        >
          <h2
            className="text-xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1A1A18" }}
          >
            The Reckoning
          </h2>
          <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#4A4540" }}>
            <p>
              A neighborhood that sees only scarcity behaves one way. A neighborhood that sees itself
              as resourced, connected, and capable begins to self-organize. The atlas is an epiphany
              device. It makes cooperation imaginable, then practical.
            </p>
            <p>
              Once people use the map to solve daily problems, they become more available for deeper
              projects: housing campaigns, public-space defense, and cooperative enterprise.
            </p>
            <p>
              The likeliest countertactic is not dramatic repression but soft neutralization — institutions
              may ignore it, copy its aesthetics, or try to absorb it into harmless boosterism. We
              pre-empt this by keeping the atlas independent, visibly community-authored, and gently
              insurgent. We include sections on what is missing, who controls key land and property,
              and where collective solutions are needed next.
            </p>
            <p className="font-medium" style={{ color: "#1A1A18" }}>
              If they imitate the map, good. Escalate by becoming the trusted source they cannot match.
            </p>
          </div>
        </section>

        {/* Section: What's Missing */}
        <section className="mb-10">
          <h2
            className="text-xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#8B1A1A" }}
          >
            What&apos;s Still Missing
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#4A4540" }}>
            The atlas doesn&apos;t pretend the neighborhood has everything it needs. Naming what&apos;s
            absent is part of the project too — it is not a complaint but a coordinate.
          </p>
          <ul className="space-y-2">
            {[
              "A permanently affordable community space not dependent on a church or landlord",
              "A tenant organizing committee with enough capacity to defend the next wave of evictions",
              "A community land trust with enough capital to take even one parcel off the market",
              "A bulk food buying co-op with a physical home",
              "A care co-op for elders and young children run by and for residents",
              "A neighborhood newspaper that is not a press release distribution service",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm leading-relaxed"
                style={{ color: "#4A4540" }}
              >
                <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#8B1A1A" }} />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Section: The Method */}
        <section className="mb-12">
          <h2
            className="text-xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#1A1A18" }}
          >
            How It&apos;s Built
          </h2>
          <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#4A4540" }}>
            <p>
              Start alone, but do not think small. Walk the neighborhood with a notebook and a phone.
              Gather addresses, hours, names, and categories. Verify each listing by visit, call, or
              message — not by scraping the internet.
            </p>
            <p>
              Print a first run cheaply and place copies in laundromats, libraries, cafes, clinics,
              campuses, and bus stops. Post the digital version in neighborhood groups and local forums.
              Add a submission line inviting residents to suggest housing solutions, reclaimable spaces,
              and co-op ideas.
            </p>
            <p>
              Update monthly so the atlas becomes a living civic ritual, not a one-off artifact. By
              month three, begin approaching librarians, shopkeepers, tenant organizers, and local
              journalists — not as formal partners at first but as validators and distributors.
            </p>
          </div>
        </section>

        {/* Closing question */}
        <div
          className="p-6 rounded-lg text-center"
          style={{ background: "#1A1A18" }}
        >
          <p
            className="text-lg sm:text-xl font-semibold leading-relaxed"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F5F0E8" }}
          >
            What would happen if your neighborhood stopped introducing itself through wounds
            and began introducing itself through latent power?
          </p>
          <Link
            href="/submit"
            className="inline-block mt-5 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
            style={{ fontFamily: "'Space Grotesk', sans-serif", background: "#C4870A", color: "#1A1A18" }}
          >
            Add what you know →
          </Link>
        </div>
      </div>
    </div>
  );
}
