"use client";

import { useEffect } from "react";
import listings from "@/data/listings.json";
import { Listing, Category, CATEGORY_COLORS } from "@/types";

// Standalone print sheet — only the 8 panels, nothing else.
// Opened in a new tab by the Mini Zine print button.
// Auto-triggers window.print() on load.
//
// Print layout for one-sheet 8-panel zine (letter landscape):
//   Top row (rotated 180°): p2  p7  p6  p3
//   Bottom row (right-side up): p1  p8  p5  p4
// Fold: hotdog × 2 → cut center slit → push into booklet

const typedListings = listings as Listing[];

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

const col1 = typedListings.slice(0, 8);
const col2 = typedListings.slice(8, 16);

const panelBase: React.CSSProperties = {
  width: "100%",
  height: "100%",
  padding: "8px 9px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  fontFamily: "'Georgia', serif",
  boxSizing: "border-box",
  background: "#F6F1E8",
  border: "0.5pt solid #C2D1DB",
};

function P1() {
  return (
    <div style={{ ...panelBase, background: "#2F5D50", justifyContent: "space-between" }}>
      <div>
        <p style={{ fontSize: 6, color: "#7A9E7E", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 3px" }}>Issue No. 1 · 2025–2026</p>
        <p style={{ fontSize: 22, color: "#F6F1E8", fontWeight: 700, lineHeight: 1.05, margin: "0 0 4px" }}>
          North<br /><span style={{ color: "#E3A24C" }}>Durham</span><br />Atlas
        </p>
      </div>
      <div>
        <div style={{ height: 1, background: "#7A9E7E", opacity: 0.4, margin: "0 0 4px" }} />
        <p style={{ fontSize: 6.5, color: "#C2D1DB", fontStyle: "italic", lineHeight: 1.4, margin: "0 0 3px" }}>Make hidden abundance impossible to ignore.</p>
        <p style={{ fontSize: 5.5, color: "#7A9E7E", margin: 0 }}>Scugog · Uxbridge · Brock</p>
      </div>
    </div>
  );
}

function P2() {
  return (
    <div style={panelBase}>
      <p style={{ fontSize: 6.5, color: "#2F6F73", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px" }}>Why this exists</p>
      <p style={{ fontSize: 9, fontWeight: 700, color: "#3F352C", lineHeight: 1.3, margin: "0 0 5px" }}>This atlas is a counter-spell.</p>
      <p style={{ fontSize: 7, color: "#3F352C", lineHeight: 1.5, margin: "0 0 5px", flex: 1 }}>
        North Durham is full of hidden abundance: repair cafés, below-market farmers, free Legion halls, mutual aid networks. Most residents have no idea.
      </p>
      <p style={{ fontSize: 7, color: "#3F352C", lineHeight: 1.5, margin: 0 }}>
        By making fragments visible in one shareable atlas, you alter what people believe is possible in their own community.
      </p>
      <p style={{ fontSize: 6.5, color: "#2F6F73", fontWeight: 600, fontStyle: "italic", marginTop: 5 }}>&ldquo;The map is not the destination. It is the opening move.&rdquo;</p>
    </div>
  );
}

function P3() {
  return (
    <div style={panelBase}>
      <p style={{ fontSize: 6.5, color: "#7A9E7E", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 5px" }}>Solidarity in action</p>
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 7, paddingBottom: 7, borderBottom: "0.5pt solid #C2D1DB" }}>
          <p style={{ fontSize: 6, color: "#2F6F73", fontWeight: 700, margin: "0 0 2px" }}>Scugog Citizen · April 2025</p>
          <p style={{ fontSize: 7.5, fontWeight: 600, color: "#3F352C", lineHeight: 1.3, margin: "0 0 2px" }}>Port Perry Repair Café returns — the lineup is longer than ever</p>
          <p style={{ fontSize: 6.5, color: "#3F352C", lineHeight: 1.4, margin: 0 }}>&ldquo;People come in defeated and leave amazed. Mostly amazed that someone just did it for free.&rdquo;</p>
        </div>
        <div style={{ marginBottom: 7, paddingBottom: 7, borderBottom: "0.5pt solid #C2D1DB" }}>
          <p style={{ fontSize: 6, color: "#2F6F73", fontWeight: 700, margin: "0 0 2px" }}>Durham Region This Week · March 2025</p>
          <p style={{ fontSize: 7.5, fontWeight: 600, color: "#3F352C", lineHeight: 1.3, margin: "0 0 2px" }}>Blackstock General Store bulletin board: the original social network</p>
          <p style={{ fontSize: 6.5, color: "#3F352C", lineHeight: 1.4, margin: 0 }}>A corkboard since 1987. Still tells you more than anything on your phone.</p>
        </div>
        <div>
          <p style={{ fontSize: 6, color: "#2F6F73", fontWeight: 700, margin: "0 0 2px" }}>Community submission · Feb 2025</p>
          <p style={{ fontSize: 7.5, fontWeight: 600, color: "#3F352C", lineHeight: 1.3, margin: "0 0 2px" }}>Scugog Mutual Aid quietly helped 40 families through last winter</p>
          <p style={{ fontSize: 6.5, color: "#3F352C", lineHeight: 1.4, margin: 0 }}>No press release. Just neighbours helping neighbours.</p>
        </div>
      </div>
    </div>
  );
}

function P4() {
  return (
    <div style={panelBase}>
      <p style={{ fontSize: 6.5, color: "#2F6F73", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px" }}>Resources</p>
      {col1.map((l) => (
        <div key={l.id} style={{ marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 1 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: CATEGORY_COLORS[l.category as Category], flexShrink: 0 }} />
            <p style={{ fontSize: 7, fontWeight: 600, color: "#3F352C", lineHeight: 1.2, margin: 0 }}>{l.name}</p>
          </div>
          <p style={{ fontSize: 6, color: "#2F6F73", paddingLeft: 8, margin: 0 }}>{l.hours}</p>
        </div>
      ))}
    </div>
  );
}

function P5() {
  return (
    <div style={panelBase}>
      <p style={{ fontSize: 6.5, color: "#2F6F73", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px" }}>Resources cont.</p>
      {col2.map((l) => (
        <div key={l.id} style={{ marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 1 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: CATEGORY_COLORS[l.category as Category], flexShrink: 0 }} />
            <p style={{ fontSize: 7, fontWeight: 600, color: "#3F352C", lineHeight: 1.2, margin: 0 }}>{l.name}</p>
          </div>
          <p style={{ fontSize: 6, color: "#2F6F73", paddingLeft: 8, margin: 0 }}>{l.hours}</p>
        </div>
      ))}
    </div>
  );
}

function P6() {
  return (
    <div style={{ ...panelBase, background: "#C2D1DB" }}>
      <p style={{ fontSize: 6.5, color: "#2F5D50", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 5px" }}>
        8 categories · {typedListings.length} resources
      </p>
      {ALL_CATEGORIES.map((cat) => {
        const count = typedListings.filter((l) => l.category === cat).length;
        return (
          <div key={cat} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4.5 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: CATEGORY_COLORS[cat], flexShrink: 0 }} />
            <p style={{ fontSize: 7, color: "#3F352C", flex: 1, fontWeight: 500, margin: 0 }}>{cat}</p>
            <p style={{ fontSize: 7, color: "#2F5D50", fontWeight: 700, margin: 0 }}>{count}</p>
          </div>
        );
      })}
      <p style={{ fontSize: 6, color: "#2F5D50", marginTop: "auto", paddingTop: 5, fontStyle: "italic" }}>Full map at the atlas website.</p>
    </div>
  );
}

function P7() {
  return (
    <div style={{ ...panelBase, background: "#E3A24C" }}>
      <p style={{ fontSize: 6.5, color: "#2F5D50", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px" }}>What&apos;s still missing</p>
      <p style={{ fontSize: 6.5, color: "#3F352C", lineHeight: 1.4, margin: "0 0 5px" }}>The atlas names gaps — not as complaint, but as coordinate.</p>
      {MISSING.map((item) => (
        <div key={item} style={{ display: "flex", gap: 4, marginBottom: 4 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C65A1E", flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: 6.5, color: "#3F352C", lineHeight: 1.4, margin: 0 }}>{item}</p>
        </div>
      ))}
    </div>
  );
}

function P8() {
  return (
    <div style={{ ...panelBase, background: "#2F5D50", justifyContent: "space-between" }}>
      <div>
        <p style={{ fontSize: 6.5, color: "#7A9E7E", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 6px" }}>Know something we don&apos;t?</p>
        <p style={{ fontSize: 9, color: "#F6F1E8", fontWeight: 600, lineHeight: 1.4, margin: "0 0 5px" }}>Submit a resource, story, or correction at the atlas website.</p>
        <div style={{ height: 1, background: "#7A9E7E", opacity: 0.4, margin: "0 0 5px" }} />
        <p style={{ fontSize: 6.5, color: "#C2D1DB", lineHeight: 1.5, margin: 0 }}>Community-authored and independent. Updated monthly. Not affiliated with any government or institution.</p>
      </div>
      <div>
        <div style={{ height: 1, background: "#7A9E7E", opacity: 0.3, margin: "0 0 4px" }} />
        <p style={{ fontSize: 6.5, color: "#7A9E7E", fontWeight: 700, margin: "0 0 1px" }}>North Durham Community Atlas</p>
        <p style={{ fontSize: 6, color: "#C2D1DB", margin: 0 }}>Scugog · Uxbridge · Brock · Issue No. 1</p>
      </div>
    </div>
  );
}

// Cut/fold guide lines
const hLine: React.CSSProperties = { position: "absolute", left: 0, right: 0, height: 0, borderTop: "0.5pt dashed #aaa", pointerEvents: "none" };
const vLine: React.CSSProperties = { position: "absolute", top: 0, bottom: 0, width: 0, borderLeft: "0.5pt dashed #aaa", pointerEvents: "none" };

export default function PrintSheet() {
  useEffect(() => {
    const t = setTimeout(() => window.print(), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        nav, header, footer { display: none !important; }
        body { background: white !important; }
        main { padding: 0 !important; }
        @page { size: letter landscape; margin: 0.2in; }
      `}</style>
      {/* 4 col × 2 row grid — panels sized to fill one landscape letter */}
      <div
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(2, 1fr)",
            width: "100vw",
            height: "100vh",
            position: "relative",
            gap: 0,
          }}
        >
          {/* Fold / cut guide lines */}
          <div style={{ ...hLine, top: "50%" }} />
          <div style={{ ...vLine, left: "25%" }} />
          <div style={{ ...vLine, left: "50%" }} />
          <div style={{ ...vLine, left: "75%" }} />
          <div style={{ position: "absolute", top: "50%", left: "45%", width: "10%", borderTop: "1pt solid #aaa", zIndex: 10 }} />

          {/* TOP ROW — rotated 180° (these become pages 2,7,6,3 when folded) */}
          <div style={{ transform: "rotate(180deg)" }}><P2 /></div>
          <div style={{ transform: "rotate(180deg)" }}><P7 /></div>
          <div style={{ transform: "rotate(180deg)" }}><P6 /></div>
          <div style={{ transform: "rotate(180deg)" }}><P3 /></div>

          {/* BOTTOM ROW — right-side up (pages 1,8,5,4) */}
          <P1 />
          <P8 />
          <P5 />
          <P4 />
        </div>
    </>
  );
}
