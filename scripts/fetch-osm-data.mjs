#!/usr/bin/env node
/**
 * fetch-osm-data.mjs
 *
 * Downloads OpenStreetMap data for North Durham from the Overpass API
 * and saves it as static GeoJSON files in public/osm/.
 *
 * Run once (or whenever you want to refresh the data):
 *   node scripts/fetch-osm-data.mjs
 *
 * After running, commit the updated files in public/osm/.
 */

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../public/osm");

const BBOX = "44.0,-79.4,44.65,-78.7";

// Try multiple mirrors in case one is down
const MIRRORS = [
  "overpass-api.de",
  "lz4.overpass-api.de",
  "overpass.kumi.systems",
];

const QUERIES = {
  "trails.geojson": `[out:json][timeout:60][bbox:${BBOX}];(way["highway"~"^(path|footway|cycleway|track)$"]["name"];way["route"~"^(hiking|bicycle|foot)$"]["name"];);out geom qt;`,
  "parks.geojson":  `[out:json][timeout:60][bbox:${BBOX}];(way["leisure"="park"]["name"];way["natural"~"^(wood|forest)$"]["name"];way["landuse"="recreation_ground"]["name"];);out geom qt;`,
  "amenities.geojson": `[out:json][timeout:60][bbox:${BBOX}];(node["amenity"~"^(library|community_centre|social_facility)$"];way["amenity"~"^(library|community_centre|social_facility)$"];node["shop"="farm"]["name"];);out center body qt;`,
};

function httpsGet(host, query) {
  const path = `/api/interpreter?data=${encodeURIComponent(query)}`;
  return new Promise((resolve, reject) => {
    const req = https.get(
      { host, path, headers: { "User-Agent": "NorthDurhamAtlas/1.0 (community atlas project)" } },
      (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} from ${host}`));
        }
        let raw = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => { raw += chunk; });
        res.on("end", () => {
          try { resolve(JSON.parse(raw)); }
          catch { reject(new Error("Invalid JSON response")); }
        });
      }
    );
    req.on("error", reject);
    req.setTimeout(70000, () => { req.destroy(new Error("Timeout")); });
  });
}

function overpassToGeoJSON(elements) {
  const features = [];
  for (const el of elements) {
    const props = { id: el.id, ...el.tags };
    if (el.type === "node" && el.lat != null) {
      features.push({ type: "Feature", geometry: { type: "Point", coordinates: [el.lon, el.lat] }, properties: props });
    } else if (el.type === "way") {
      if (el.geometry?.length > 1) {
        const coords = el.geometry.map((p) => [p.lon, p.lat]);
        const closed = coords.length > 3 && coords[0][0] === coords.at(-1)[0] && coords[0][1] === coords.at(-1)[1];
        features.push({ type: "Feature", geometry: closed ? { type: "Polygon", coordinates: [coords] } : { type: "LineString", coordinates: coords }, properties: props });
      } else if (el.center) {
        features.push({ type: "Feature", geometry: { type: "Point", coordinates: [el.center.lon, el.center.lat] }, properties: props });
      }
    }
  }
  return { type: "FeatureCollection", features };
}

async function fetchLayer(filename, query) {
  for (const host of MIRRORS) {
    try {
      process.stdout.write(`  Trying ${host}... `);
      const json = await httpsGet(host, query);
      const geo = overpassToGeoJSON(json.elements ?? []);
      fs.writeFileSync(path.join(OUT_DIR, filename), JSON.stringify(geo, null, 2));
      console.log(`✓ ${geo.features.length} features`);
      return;
    } catch (err) {
      console.log(`✗ ${err.message}`);
    }
  }
  console.error(`  All mirrors failed for ${filename}`);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const [filename, query] of Object.entries(QUERIES)) {
    // Skip files that already have data
    const outPath = path.join(OUT_DIR, filename);
    if (fs.existsSync(outPath)) {
      const existing = JSON.parse(fs.readFileSync(outPath, "utf8"));
      if (existing.features?.length > 0) {
        console.log(`\nSkipping ${filename} (already has ${existing.features.length} features)`);
        continue;
      }
    }
    console.log(`\nFetching ${filename}...`);
    await fetchLayer(filename, query);
    await new Promise((r) => setTimeout(r, 5000));
  }
  console.log("\nDone. Commit the files in public/osm/ to your repository.");
}

main();
