"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import listings from "@/data/listings.json";
import stories from "@/data/stories.json";
import { Listing, Category, CATEGORY_COLORS } from "@/types";

const ZineMap = dynamic(() => import("@/components/Map"), { ssr: false });

const ALL_CATEGORIES: Category[] = [
  "Free Food","Tenant Defense","Public Space","Repair Skills",
  "Local Makers","Gathering Places","Mutual Aid","Co-op Leads",
];

const MISSING = [
  "A permanently affordable gathering space in Port Perry",
  "A tenant organizing network for rural rent increases",
  "A community land trust for North Durham",
  "A care co-op for isolated rural residents",
  "A bulk food buying co-op accessible without a car",
  "Expanded community broadband beyond Port Perry Wifi",
];

function TornEdge({ flip = false, color = "#F5DEB3" }: { flip?: boolean; color?: string }) {
  return (
    <div style={{ lineHeight: 0, transform: flip ? "scaleY(-1)" : "none", marginBottom: -1 }}>
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 40 }}>
        <path d="M0,20 C50,5 100,35 150,20 C200,5 250,32 300,18 C350,4 400,30 450,20 C500,8 550,34 600,20 C650,6 700,33 750,19 C800,5 850,31 900,20 C950,9 1000,35 1050,18 C1100,3 1150,28 1200,20 L1200,40 L0,40 Z" fill={color} />
      </svg>
    </div>
  );
}

function PullQuote({ text }: { text: string }) {
  return (
    <div className="my-8 px-6 py-6 border-l-4" style={{ borderLeftColor: "#FFA07A", background: "rgba(255,160,122,0.07)" }}>
      <p className="text-2xl sm:text-3xl font-bold leading-snug" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}

function PhotoBlock({ caption, tall = false }: { caption: string; tall?: boolean }) {
  return (
    <div className="rounded-lg overflow-hidden flex flex-col items-center justify-end" style={{ height: tall ? 320 : 220, background: "linear-gradient(160deg, #0A3D5C 0%, #1A6B8A 100%)", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
      <div className="relative w-full px-4 pb-4 pt-8" style={{ background: "linear-gradient(to top, rgba(10,61,92,0.95), transparent)" }}>
        <p className="text-xs italic" style={{ color: "#C8E0EC" }}>{caption}</p>
      </div>
    </div>
  );
}

// ─── MINI ZINE ────────────────────────────────────────────────────────────────

// Each panel is ~2.75" × 4.25" — one eighth of a letter sheet
// Fold order: fold lengthwise, fold widthwise, fold widthwise again,
// unfold, cut center slit, refold into booklet

function Panel({ n, bg = "#F5DEB3", children }: { n: number; bg?: string; children: React.ReactNode }) {
  return (
    <div style={{
      width: "100%", aspectRatio: "2.75 / 4.25",
      background: bg, position: "relative",
      border: "1px solid #C8E0EC",
      overflow: "hidden",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Panel number — for folding reference */}
      <div style={{ position: "absolute", top: 4, right: 6, fontSize: 8, color: "rgba(0,0,0,0.18)", fontWeight: 700, zIndex: 10 }}>{n}</div>
      <div style={{ padding: "10px 10px 8px", height: "100%", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}

function MiniZine({ typedListings }: { typedListings: Listing[] }) {
  const topListings = typedListings.slice(0, 16);
  const col1 = topListings.slice(0, 8);
  const col2 = topListings.slice(8, 16);

  return (
    <div>
      {/* Folding instructions */}
      <div className="mb-8 p-4 rounded-lg" style={{ background: "#0A3D5C" }}>
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#FFA07A" }}>How to fold your zine</p>
        <ol className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { n: "1", text: "Print this page landscape on one sheet of paper" },
            { n: "2", text: "Fold in half lengthwise (hot dog). Fold in half twice more" },
            { n: "3", text: "Unfold once. Cut along the middle fold line — only in the center" },
            { n: "4", text: "Open fully. Fold lengthwise again and push the ends in to form the booklet" },
          ].map((step) => (
            <div key={step.n} className="flex gap-2">
              <span className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "#FFA07A", color: "#0D2B3E" }}>{step.n}</span>
              <p className="text-xs leading-relaxed" style={{ color: "#C8E0EC" }}>{step.text}</p>
            </div>
          ))}
        </ol>
      </div>

      {/* 8 panels in reading order — 4 cols × 2 rows */}
      {/* Screen preview */}
      <div className="no-print grid gap-1" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>

        {/* Panel 1 — COVER */}
        <Panel n={1} bg="#0A3D5C">
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 7, color: "#5BAEC9", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Issue No. 1 · 2025–2026</p>
              <p style={{ fontSize: 20, fontFamily: "'Lora', serif", color: "#F5DEB3", fontWeight: 700, lineHeight: 1.1, marginBottom: 4 }}>North<br /><span style={{ color: "#FFA07A" }}>Durham</span><br />Atlas</p>
            </div>
            <div>
              <div style={{ height: 2, background: "#5BAEC9", marginBottom: 5, opacity: 0.4 }} />
              <p style={{ fontSize: 7, color: "#C8E0EC", fontStyle: "italic", lineHeight: 1.4 }}>Make hidden abundance impossible to ignore.</p>
              <p style={{ fontSize: 6, color: "#5BAEC9", marginTop: 3 }}>Scugog · Uxbridge · Brock</p>
            </div>
          </div>
        </Panel>

        {/* Panel 2 — INTRO */}
        <Panel n={2}>
          <p style={{ fontSize: 7, color: "#1A6B8A", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>Why this exists</p>
          <p style={{ fontSize: 9, fontFamily: "'Lora', serif", fontWeight: 700, color: "#0D2B3E", lineHeight: 1.3, marginBottom: 6 }}>This atlas is a counter-spell.</p>
          <p style={{ fontSize: 7.5, color: "#0D2B3E", lineHeight: 1.5, flex: 1 }}>
            North Durham is full of hidden abundance: repair cafés, below-market farmers, free Legion halls, mutual aid networks. Most residents have no idea these things exist.
          </p>
          <p style={{ fontSize: 7.5, color: "#0D2B3E", lineHeight: 1.5, marginTop: 5 }}>
            By making fragments visible in one shareable atlas, you alter what people believe is possible in their own community.
          </p>
          <p style={{ fontSize: 7, color: "#1A6B8A", fontWeight: 600, marginTop: 5, fontStyle: "italic" }}>&ldquo;The map is not the destination. It is the opening move.&rdquo;</p>
        </Panel>

        {/* Panel 3 — STORIES */}
        <Panel n={3}>
          <p style={{ fontSize: 7, color: "#5BAEC9", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Solidarity in action</p>
          {stories.map((s) => (
            <div key={s.id} style={{ marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid #C8E0EC" }}>
              <p style={{ fontSize: 6.5, color: "#1A6B8A", fontWeight: 700, marginBottom: 2 }}>{s.source} · {s.date}</p>
              <p style={{ fontSize: 8, fontFamily: "'Lora', serif", fontWeight: 600, color: "#0D2B3E", lineHeight: 1.3, marginBottom: 3 }}>{s.title}</p>
              <p style={{ fontSize: 7, color: "#0D2B3E", lineHeight: 1.4 }}>{s.excerpt.slice(0, 100)}…</p>
            </div>
          ))}
        </Panel>

        {/* Panel 4 — RESOURCES I */}
        <Panel n={4}>
          <p style={{ fontSize: 7, color: "#1A6B8A", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>Resources</p>
          {col1.map((l) => (
            <div key={l.id} style={{ marginBottom: 5 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 1 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: CATEGORY_COLORS[l.category as Category], flexShrink: 0 }} />
                <p style={{ fontSize: 7.5, fontFamily: "'Lora', serif", fontWeight: 600, color: "#0D2B3E", lineHeight: 1.2 }}>{l.name}</p>
              </div>
              <p style={{ fontSize: 6.5, color: "#1A6B8A", paddingLeft: 8 }}>{l.hours}</p>
            </div>
          ))}
        </Panel>

        {/* Panel 5 — RESOURCES II */}
        <Panel n={5}>
          <p style={{ fontSize: 7, color: "#1A6B8A", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>Resources cont.</p>
          {col2.map((l) => (
            <div key={l.id} style={{ marginBottom: 5 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 1 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: CATEGORY_COLORS[l.category as Category], flexShrink: 0 }} />
                <p style={{ fontSize: 7.5, fontFamily: "'Lora', serif", fontWeight: 600, color: "#0D2B3E", lineHeight: 1.2 }}>{l.name}</p>
              </div>
              <p style={{ fontSize: 6.5, color: "#1A6B8A", paddingLeft: 8 }}>{l.hours}</p>
            </div>
          ))}
        </Panel>

        {/* Panel 6 — CATEGORIES */}
        <Panel n={6} bg="#C8E0EC">
          <p style={{ fontSize: 7, color: "#0A3D5C", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>8 categories · {typedListings.length} resources</p>
          {ALL_CATEGORIES.map((cat) => {
            const count = typedListings.filter((l) => l.category === cat).length;
            return (
              <div key={cat} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: CATEGORY_COLORS[cat], flexShrink: 0 }} />
                <p style={{ fontSize: 7.5, color: "#0D2B3E", flex: 1, fontWeight: 500 }}>{cat}</p>
                <p style={{ fontSize: 7, color: "#0A3D5C", fontWeight: 700 }}>{count}</p>
              </div>
            );
          })}
          <p style={{ fontSize: 6.5, color: "#0A3D5C", marginTop: "auto", paddingTop: 6, fontStyle: "italic" }}>See the full map at the atlas website.</p>
        </Panel>

        {/* Panel 7 — WHAT'S MISSING */}
        <Panel n={7} bg="#FFA07A">
          <p style={{ fontSize: 7, color: "#0A3D5C", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>What&apos;s still missing</p>
          <p style={{ fontSize: 7, color: "#0D2B3E", lineHeight: 1.4, marginBottom: 6 }}>The atlas names gaps — not as complaint, but as coordinate.</p>
          {MISSING.map((item) => (
            <div key={item} style={{ display: "flex", gap: 4, marginBottom: 5 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#FF6B6B", flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 7, color: "#0D2B3E", lineHeight: 1.4 }}>{item}</p>
            </div>
          ))}
        </Panel>

        {/* Panel 8 — BACK COVER */}
        <Panel n={8} bg="#0A3D5C">
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 7, color: "#5BAEC9", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Know something we don&apos;t?</p>
              <p style={{ fontSize: 10, fontFamily: "'Lora', serif", color: "#F5DEB3", fontWeight: 600, lineHeight: 1.4, marginBottom: 6 }}>Submit a resource, story, or correction at the atlas website.</p>
              <div style={{ height: 1, background: "#5BAEC9", marginBottom: 6, opacity: 0.4 }} />
              <p style={{ fontSize: 7, color: "#C8E0EC", lineHeight: 1.5 }}>Community-authored and independent. Updated monthly. Not affiliated with any government or institution.</p>
            </div>
            <div>
              <div style={{ height: 1, background: "#5BAEC9", marginBottom: 5, opacity: 0.3 }} />
              <p style={{ fontSize: 7, color: "#5BAEC9", fontWeight: 700 }}>North Durham Community Atlas</p>
              <p style={{ fontSize: 6.5, color: "#C8E0EC" }}>Scugog · Uxbridge · Brock · Issue No. 1</p>
            </div>
          </div>
        </Panel>
      </div>

      {/* PRINT-ONLY flat layout — panels arranged for folding */}
      {/* Arrangement for one-sheet 8-panel zine (landscape letter):
           Top row (upside down): p2  p7  p6  p3
           Bottom row (right-side up): p1  p8  p5  p4
           After printing: fold hotdog × 2, cut center, refold into booklet */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .mini-print { display: grid !important; }
          body { background: white; margin: 0; }
          @page { size: letter landscape; margin: 0.25in; }
        }
        .mini-print {
          display: none;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 2px;
          height: calc(100vh - 0.5in);
        }
        .panel-flip { transform: rotate(180deg); }
      `}</style>

      <div className="mini-print">
        {/* Top row — flipped 180° */}
        <div className="panel-flip"><Panel n={2}><p style={{fontSize:7,color:"#1A6B8A",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>Why this exists</p><p style={{fontSize:9,fontFamily:"'Lora',serif",fontWeight:700,color:"#0D2B3E",lineHeight:1.3,marginBottom:6}}>This atlas is a counter-spell.</p><p style={{fontSize:7.5,color:"#0D2B3E",lineHeight:1.5,flex:1}}>North Durham is full of hidden abundance. By making fragments visible, you alter what people believe is possible.</p><p style={{fontSize:7,color:"#1A6B8A",fontWeight:600,marginTop:5,fontStyle:"italic"}}>&ldquo;The map is not the destination. It is the opening move.&rdquo;</p></Panel></div>
        <div className="panel-flip"><Panel n={7} bg="#FFA07A"><p style={{fontSize:7,color:"#0A3D5C",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>What&apos;s still missing</p>{MISSING.map((item)=>(<div key={item} style={{display:"flex",gap:4,marginBottom:5}}><span style={{width:5,height:5,borderRadius:"50%",background:"#FF6B6B",flexShrink:0,marginTop:2}}/><p style={{fontSize:7,color:"#0D2B3E",lineHeight:1.4}}>{item}</p></div>))}</Panel></div>
        <div className="panel-flip"><Panel n={6} bg="#C8E0EC"><p style={{fontSize:7,color:"#0A3D5C",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>8 categories · {typedListings.length} resources</p>{ALL_CATEGORIES.map((cat)=>{const count=typedListings.filter((l)=>l.category===cat).length;return(<div key={cat} style={{display:"flex",alignItems:"center",gap:4,marginBottom:5}}><div style={{width:6,height:6,borderRadius:"50%",background:CATEGORY_COLORS[cat],flexShrink:0}}/><p style={{fontSize:7.5,color:"#0D2B3E",flex:1,fontWeight:500}}>{cat}</p><p style={{fontSize:7,color:"#0A3D5C",fontWeight:700}}>{count}</p></div>)})}</Panel></div>
        <div className="panel-flip"><Panel n={3}><p style={{fontSize:7,color:"#5BAEC9",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>Solidarity in action</p>{stories.map((s)=>(<div key={s.id} style={{marginBottom:8,paddingBottom:8,borderBottom:"1px solid #C8E0EC"}}><p style={{fontSize:6.5,color:"#1A6B8A",fontWeight:700,marginBottom:2}}>{s.source} · {s.date}</p><p style={{fontSize:8,fontFamily:"'Lora',serif",fontWeight:600,color:"#0D2B3E",lineHeight:1.3,marginBottom:3}}>{s.title}</p><p style={{fontSize:7,color:"#0D2B3E",lineHeight:1.4}}>{s.excerpt.slice(0,100)}…</p></div>))}</Panel></div>

        {/* Bottom row — right-side up */}
        <Panel n={1} bg="#0A3D5C"><div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"space-between"}}><div><p style={{fontSize:7,color:"#5BAEC9",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:4}}>Issue No. 1 · 2025–2026</p><p style={{fontSize:20,fontFamily:"'Lora',serif",color:"#F5DEB3",fontWeight:700,lineHeight:1.1,marginBottom:4}}>North<br /><span style={{color:"#FFA07A"}}>Durham</span><br />Atlas</p></div><div><div style={{height:2,background:"#5BAEC9",marginBottom:5,opacity:0.4}}/><p style={{fontSize:7,color:"#C8E0EC",fontStyle:"italic",lineHeight:1.4}}>Make hidden abundance impossible to ignore.</p><p style={{fontSize:6,color:"#5BAEC9",marginTop:3}}>Scugog · Uxbridge · Brock</p></div></div></Panel>
        <Panel n={8} bg="#0A3D5C"><div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"space-between"}}><div><p style={{fontSize:7,color:"#5BAEC9",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>Know something we don&apos;t?</p><p style={{fontSize:10,fontFamily:"'Lora',serif",color:"#F5DEB3",fontWeight:600,lineHeight:1.4,marginBottom:6}}>Submit a resource, story, or correction at the atlas website.</p><p style={{fontSize:7,color:"#C8E0EC",lineHeight:1.5}}>Community-authored and independent. Updated monthly.</p></div><div><div style={{height:1,background:"#5BAEC9",marginBottom:5,opacity:0.3}}/><p style={{fontSize:7,color:"#5BAEC9",fontWeight:700}}>North Durham Community Atlas</p><p style={{fontSize:6.5,color:"#C8E0EC"}}>Scugog · Uxbridge · Brock · Issue No. 1</p></div></div></Panel>
        <Panel n={5}><p style={{fontSize:7,color:"#1A6B8A",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>Resources cont.</p>{col2.map((l)=>(<div key={l.id} style={{marginBottom:5}}><div style={{display:"flex",alignItems:"center",gap:3,marginBottom:1}}><div style={{width:5,height:5,borderRadius:"50%",background:CATEGORY_COLORS[l.category as Category],flexShrink:0}}/><p style={{fontSize:7.5,fontFamily:"'Lora',serif",fontWeight:600,color:"#0D2B3E",lineHeight:1.2}}>{l.name}</p></div><p style={{fontSize:6.5,color:"#1A6B8A",paddingLeft:8}}>{l.hours}</p></div>))}</Panel>
        <Panel n={4}><p style={{fontSize:7,color:"#1A6B8A",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:5}}>Resources</p>{col1.map((l)=>(<div key={l.id} style={{marginBottom:5}}><div style={{display:"flex",alignItems:"center",gap:3,marginBottom:1}}><div style={{width:5,height:5,borderRadius:"50%",background:CATEGORY_COLORS[l.category as Category],flexShrink:0}}/><p style={{fontSize:7.5,fontFamily:"'Lora',serif",fontWeight:600,color:"#0D2B3E",lineHeight:1.2}}>{l.name}</p></div><p style={{fontSize:6.5,color:"#1A6B8A",paddingLeft:8}}>{l.hours}</p></div>))}</Panel>
      </div>
    </div>
  );
}

// ─── DIGITAL ZINE ─────────────────────────────────────────────────────────────

function DigitalZine({ typedListings }: { typedListings: Listing[] }) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [expandedStory, setExpandedStory] = useState<string | null>(null);
  const displayListings = activeCategory ? typedListings.filter((l) => l.category === activeCategory) : typedListings;

  return (
    <div>
      <section className="relative min-h-screen flex flex-col justify-between px-8 pt-16 pb-0 overflow-hidden" style={{ background: "#0A3D5C" }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #F5DEB3 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative max-w-4xl mx-auto w-full">
          <div className="flex items-start justify-between mb-12">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#5BAEC9" }}>North Durham · Scugog · Uxbridge · Brock</p>
              <p className="text-xs" style={{ color: "#C8E0EC" }}>Issue No. 1 · 2025–2026 · Community-authored & independent</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold" style={{ color: "#FFA07A" }}>{typedListings.length} verified resources</p>
              <p className="text-xs" style={{ color: "#C8E0EC" }}>Updated monthly</p>
            </div>
          </div>
          <div className="mb-10">
            <h1 className="font-bold leading-none mb-4" style={{ fontFamily: "'Lora', serif", color: "#F5DEB3", fontSize: "clamp(3rem, 10vw, 7rem)", letterSpacing: "-0.03em" }}>
              North<br /><span style={{ color: "#FFA07A" }}>Durham</span><br />Atlas
            </h1>
            <p className="text-xl max-w-lg leading-relaxed" style={{ color: "#C8E0EC" }}>Make hidden abundance impossible to ignore.</p>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-0">
            <PhotoBlock caption="Port Perry Repair Café, April 2025" tall />
            <PhotoBlock caption="Farmers Market, Scugog" tall />
            <PhotoBlock caption="Durham Forest trails, Uxbridge" tall />
          </div>
        </div>
        <TornEdge color="#F5DEB3" />
      </section>

      <section className="px-8 py-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#1A6B8A" }}>Why this atlas exists</p>
            <h2 className="text-4xl font-bold leading-tight mb-6" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>This atlas is a<br />counter-spell.</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#0D2B3E" }}>Many communities are taught to see only scarcity while real resources remain fragmented and invisible. The Community Atlas Drop is built to make that invisibility impossible to maintain.</p>
            <p className="text-sm leading-relaxed" style={{ color: "#0D2B3E" }}>North Durham is full of hidden abundance: the repair café volunteer, the farmer selling below-market, the Legion hall available for free, the mutual aid network helping neighbours through winter.</p>
          </div>
          <div>
            <PullQuote text="Conventional advocacy says, look what we lack. This atlas says, look what we already have." />
            <p className="text-sm font-semibold mt-4" style={{ fontFamily: "'Lora', serif", color: "#1A6B8A" }}>The map is not the destination. It is the opening move.</p>
          </div>
        </div>
      </section>

      <div style={{ background: "#1A6B8A" }}>
        <TornEdge flip color="#F5DEB3" />
        <section className="px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#C8E0EC" }}>Interactive</p>
                <h2 className="text-3xl font-bold" style={{ fontFamily: "'Lora', serif", color: "#F5DEB3" }}>The Atlas Map</h2>
              </div>
              <Link href="/atlas" className="no-print text-sm font-semibold px-4 py-2 rounded" style={{ background: "#FF6B6B", color: "white", fontFamily: "'Lora', serif" }}>Full screen →</Link>
            </div>
            <div className="rounded-xl overflow-hidden" style={{ height: 420, boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
              <ZineMap listings={typedListings} selected={null} onSelect={() => {}} />
            </div>
            <p className="text-xs mt-3 text-center" style={{ color: "#C8E0EC" }}>{typedListings.length} verified resources · Trails, parks and services from OpenStreetMap</p>
          </div>
        </section>
        <TornEdge color="#F5DEB3" />
      </div>

      <section className="px-8 py-16 max-w-4xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#5BAEC9" }}>Reported & witnessed</p>
        <h2 className="text-3xl font-bold mb-10" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>Stories of Solidarity</h2>
        <div className="space-y-0">
          {stories.map((story) => (
            <div key={story.id} className="border-t" style={{ borderColor: "#C8E0EC" }}>
              <button className="w-full text-left py-6 flex items-start justify-between gap-4" onClick={() => setExpandedStory(expandedStory === story.id ? null : story.id)}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: "rgba(26,107,138,0.12)", color: "#1A6B8A" }}>{story.source}</span>
                    <span className="text-xs" style={{ color: "#0D2B3E" }}>{story.date}</span>
                  </div>
                  <p className="text-base font-semibold leading-snug" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>{story.title}</p>
                </div>
                <span className="text-xl shrink-0 mt-1" style={{ color: "#1A6B8A", display: "inline-block", transform: expandedStory === story.id ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </button>
              {expandedStory === story.id && (
                <div className="pb-8 grid sm:grid-cols-2 gap-8 items-start">
                  <p className="text-sm leading-relaxed" style={{ color: "#0D2B3E" }}>{story.excerpt}</p>
                  <PhotoBlock caption={`${story.source} · ${story.date}`} />
                </div>
              )}
            </div>
          ))}
          <div className="border-t" style={{ borderColor: "#C8E0EC" }} />
        </div>
      </section>

      <div style={{ background: "#C8E0EC" }}>
        <TornEdge flip color="#F5DEB3" />
        <section className="px-8 py-14">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>{typedListings.length} Resources, 3 Townships</h2>
            <div className="no-print flex flex-wrap gap-2 mb-8">
              <button onClick={() => setActiveCategory(null)} className="px-3 py-1 rounded-full text-xs font-semibold border" style={{ background: activeCategory === null ? "#0A3D5C" : "transparent", color: activeCategory === null ? "#F5DEB3" : "#0D2B3E", borderColor: "#0A3D5C" }}>All ({typedListings.length})</button>
              {ALL_CATEGORIES.map((cat) => (<button key={cat} onClick={() => setActiveCategory(activeCategory === cat ? null : cat)} className="px-3 py-1 rounded-full text-xs font-semibold border" style={{ background: activeCategory === cat ? CATEGORY_COLORS[cat] : "transparent", color: activeCategory === cat ? "white" : "#0D2B3E", borderColor: CATEGORY_COLORS[cat] }}>{cat} ({typedListings.filter((l) => l.category === cat).length})</button>))}
            </div>
            {ALL_CATEGORIES.filter((cat) => !activeCategory || cat === activeCategory).map((cat) => {
              const catListings = displayListings.filter((l) => l.category === cat);
              if (catListings.length === 0) return null;
              return (
                <div key={cat} className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ background: CATEGORY_COLORS[cat] }} />
                    <h3 className="text-sm font-bold uppercase tracking-wider" style={{ fontFamily: "'Lora', serif", color: "#0A3D5C" }}>{cat}</h3>
                    <div className="flex-1 border-b" style={{ borderColor: "#0A3D5C", opacity: 0.2 }} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {catListings.map((listing) => (
                      <Link key={listing.id} href={`/atlas?id=${listing.id}`} className="no-print p-4 rounded-lg block transition-all hover:shadow-md" style={{ background: "white" }}>
                        <p className="font-semibold text-sm mb-0.5" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>{listing.name}</p>
                        <p className="text-xs mb-1" style={{ color: "#1A6B8A" }}>{listing.hours}</p>
                        <p className="text-xs leading-snug" style={{ color: "#0D2B3E" }}>{listing.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <TornEdge color="#FFA07A" />
      </div>

      <section className="px-8 py-16" style={{ background: "#FFA07A" }}>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#0A3D5C" }}>Named, not forgotten</p>
            <h2 className="text-4xl font-bold leading-tight mb-6" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>What&apos;s still<br />missing.</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#0D2B3E" }}>Naming what&apos;s absent is part of the work — not as complaint, but as coordinate.</p>
          </div>
          <ul className="space-y-4 mt-2">
            {MISSING.map((item) => (<li key={item} className="flex items-start gap-3"><span className="shrink-0 mt-1.5 w-2 h-2 rounded-full" style={{ background: "#FF6B6B" }} /><p className="text-sm leading-snug font-medium" style={{ color: "#0D2B3E" }}>{item}</p></li>))}
          </ul>
        </div>
      </section>

      <div style={{ background: "#0A3D5C" }}>
        <TornEdge flip color="#FFA07A" />
        <section className="px-8 py-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: "'Lora', serif", color: "#F5DEB3" }}>What would happen if North Durham stopped introducing itself through problems?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link href="/submit" className="no-print px-8 py-3.5 rounded-lg font-semibold text-base" style={{ fontFamily: "'Lora', serif", background: "#FF6B6B", color: "white" }}>Add what you know →</Link>
              <Link href="/atlas" className="no-print px-8 py-3.5 rounded-lg font-semibold text-base border" style={{ fontFamily: "'Lora', serif", borderColor: "#5BAEC9", color: "#F5DEB3" }}>Explore the atlas</Link>
            </div>
            <p className="text-xs mt-16" style={{ color: "#5BAEC9" }}>Community-authored and independent · Updated monthly · North Durham Community Atlas · Issue No. 1</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function ZinePage() {
  const [mode, setMode] = useState<"mini" | "digital">("digital");
  const typedListings = listings as Listing[];

  function printMiniZine() {
    window.open("/print/sheet", "_blank");
  }

  function printDigital() {
    window.print();
  }

  return (
    <div style={{ background: "#F5DEB3" }}>

      {/* Toolbar */}
      <div className="no-print sticky top-0 z-50 px-6 py-3 flex items-center justify-between border-b" style={{ background: "#0A3D5C", borderColor: "#1A6B8A" }}>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-semibold" style={{ color: "#C8E0EC" }}>← Back</Link>
          <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(200,224,236,0.3)" }}>
            {([
              ["digital", "Digital Edition"],
              ["mini", "Mini Zine"],
            ] as const).map(([key, label]) => (
              <button key={key} onClick={() => setMode(key)} style={{ padding: "5px 14px", fontSize: 12, fontWeight: 600, fontFamily: "'Lora', serif", border: "none", cursor: "pointer", background: mode === key ? "#FFA07A" : "transparent", color: mode === key ? "#0D2B3E" : "#C8E0EC", transition: "all 0.15s" }}>
                {label}
              </button>
            ))}
          </div>
        </div>
        {mode === "mini" && (
          <button onClick={printMiniZine} className="px-5 py-1.5 rounded text-sm font-semibold" style={{ background: "#FF6B6B", color: "white", fontFamily: "'Lora', serif" }}>
            Print one-sheet zine →
          </button>
        )}
        {mode === "digital" && (
          <button onClick={printDigital} className="px-5 py-1.5 rounded text-sm font-semibold" style={{ background: "#FF6B6B", color: "white", fontFamily: "'Lora', serif" }}>
            Print / Save PDF →
          </button>
        )}
      </div>

      {mode === "mini" && (
        <div className="px-6 py-8 max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Lora', serif", color: "#0D2B3E" }}>Mini Zine — One Sheet, 8 Panels</h1>
            <p className="text-sm" style={{ color: "#0D2B3E" }}>Click "Print one-sheet zine" — a clean sheet opens in a new tab and triggers print automatically. Fold and cut to make a pocket booklet.</p>
          </div>
          <MiniZine typedListings={typedListings} />
        </div>
      )}

      {mode === "digital" && <DigitalZine typedListings={typedListings} />}

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; margin: 0; }
        }
      `}</style>
    </div>
  );
}
