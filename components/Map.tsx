"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from "react-leaflet";
import L from "leaflet";
import React from "react";
import { Listing, CATEGORY_COLORS } from "@/types";

// ─── Data sources ──────────────────────────────────────────────────────────────
// Trails and parks come from OpenStreetMap via the Overpass API.
// This API is public, CORS-enabled, and free.
// Overpass API docs: https://wiki.openstreetmap.org/wiki/Overpass_API
//
// North Durham bounding box: SW 44.00,-79.40  NE 44.65,-78.70
// Overpass bbox format: south,west,north,east

const BBOX = "44.0,-79.4,44.65,-78.7";
const OVERPASS = "https://overpass-api.de/api/interpreter";

// Build an Overpass query URL
function overpassUrl(query: string) {
  return `${OVERPASS}?data=${encodeURIComponent(query)}`;
}

// ─── Overpass queries ──────────────────────────────────────────────────────────

const QUERIES = {
  trails: `[out:json][timeout:30][bbox:${BBOX}];
(
  way["highway"~"^(path|footway|cycleway|track)$"]["name"];
  way["route"~"^(hiking|bicycle|foot)$"]["name"];
);
out geom qt;`,

  parks: `[out:json][timeout:30][bbox:${BBOX}];
(
  way["leisure"="park"]["name"];
  way["natural"~"^(wood|forest)$"]["name"];
  way["landuse"="recreation_ground"]["name"];
);
out geom qt;`,

  amenities: `[out:json][timeout:30][bbox:${BBOX}];
(
  node["amenity"~"^(library|community_centre|social_facility)$"];
  way["amenity"~"^(library|community_centre|social_facility)$"];
  node["shop"="farm"]["name"];
  way["shop"="farm"]["name"];
);
out center body qt;`,
} as const;

type LayerId = keyof typeof QUERIES;

// ─── Overpass JSON → GeoJSON converter ────────────────────────────────────────

interface OverpassElement {
  type: "node" | "way" | "relation";
  id: number;
  tags?: Record<string, string>;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  geometry?: Array<{ lat: number; lon: number }>;
}

function overpassToGeoJSON(elements: OverpassElement[]): GeoJSON.FeatureCollection {
  const features: GeoJSON.Feature[] = [];

  for (const el of elements) {
    const props = { id: el.id, ...el.tags };

    if (el.type === "node" && el.lat !== undefined && el.lon !== undefined) {
      features.push({
        type: "Feature",
        geometry: { type: "Point", coordinates: [el.lon, el.lat] },
        properties: props,
      });
    } else if (el.type === "way") {
      if (el.geometry && el.geometry.length > 1) {
        // Full geometry available (out geom)
        const coords = el.geometry.map((p) => [p.lon, p.lat] as [number, number]);
        const isClosed =
          coords.length > 3 &&
          coords[0][0] === coords[coords.length - 1][0] &&
          coords[0][1] === coords[coords.length - 1][1];
        features.push({
          type: "Feature",
          geometry: isClosed
            ? { type: "Polygon", coordinates: [coords] }
            : { type: "LineString", coordinates: coords },
          properties: props,
        });
      } else if (el.center) {
        // Center point only (out center body)
        features.push({
          type: "Feature",
          geometry: { type: "Point", coordinates: [el.center.lon, el.center.lat] },
          properties: props,
        });
      }
    }
  }

  return { type: "FeatureCollection", features };
}

async function fetchOverpass(query: string): Promise<GeoJSON.FeatureCollection> {
  const res = await fetch(overpassUrl(query));
  if (!res.ok) throw new Error(`Overpass HTTP ${res.status}`);
  const data = await res.json();
  return overpassToGeoJSON(data.elements ?? []);
}

// ─── Layer definitions ─────────────────────────────────────────────────────────

const LAYERS = [
  { id: "trails" as LayerId, label: "Trails & Paths", color: "#7A9E7E", defaultOn: true },
  { id: "parks" as LayerId, label: "Parks & Forests", color: "#2F5D50", defaultOn: true },
  { id: "amenities" as LayerId, label: "Libraries & Services", color: "#2F6F73", defaultOn: true },
] as const;

// ─── Tile options ──────────────────────────────────────────────────────────────

const TILE_LAYERS = {
  clean: {
    label: "Minimal",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  terrain: {
    label: "Terrain",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
};

// ─── Marker helpers ────────────────────────────────────────────────────────────

function createColoredIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="width:26px;height:26px;background:${color};border:2.5px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 6px rgba(0,0,0,0.25);"></div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
    popupAnchor: [0, -26],
  });
}

function createSmallIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="width:10px;height:10px;background:${color};border:2px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [10, 10],
    iconAnchor: [5, 5],
    popupAnchor: [0, -8],
  });
}

function FlyToSelected({ listing }: { listing: Listing | null }) {
  const map = useMap();
  useEffect(() => {
    if (listing) map.flyTo([listing.lat, listing.lng], 15, { duration: 0.8 });
  }, [listing, map]);
  return null;
}

// Build a readable popup for OSM features
function osmPopup(props: Record<string, string>): string {
  const name = props.name || props["name:en"] || "";
  const type = props.amenity || props.leisure || props.natural || props.highway || props.route || "";
  const operator = props.operator || props.brand || "";
  const website = props.website || props["contact:website"] || "";
  const hours = props.opening_hours || "";
  return `<div style="font-family:'Lora',serif;min-width:150px">
    <p style="font-size:10px;font-weight:700;color:#2F6F73;margin:0 0 3px;text-transform:capitalize">${type.replace(/_/g, " ")}</p>
    ${name ? `<p style="font-size:12px;font-weight:700;margin:0 0 3px">${name}</p>` : ""}
    ${operator ? `<p style="font-size:10px;color:#3F352C;margin:0 0 2px">${operator}</p>` : ""}
    ${hours ? `<p style="font-size:10px;color:#2F6F73;margin:0 0 2px">${hours}</p>` : ""}
    ${website ? `<p style="font-size:10px;margin:0"><a href="${website}" target="_blank" rel="noopener noreferrer" style="color:#2F6F73">Visit website →</a></p>` : ""}
  </div>`;
}

// ─── Main component ────────────────────────────────────────────────────────────

interface Props {
  listings: Listing[];
  selected: Listing | null;
  onSelect: (listing: Listing) => void;
}

export default function AtlasMap({ listings, selected, onSelect }: Props) {
  const [durhamGeo, setDurhamGeo] = useState<object | null>(null);
  const [activeTile, setActiveTile] = useState<keyof typeof TILE_LAYERS>("clean");
  const [visibleLayers, setVisibleLayers] = useState<Set<LayerId>>(
    new Set(LAYERS.filter((l) => l.defaultOn).map((l) => l.id))
  );
  const [layerData, setLayerData] = useState<Partial<Record<LayerId, GeoJSON.FeatureCollection>>>({});
  const [layerStatus, setLayerStatus] = useState<Partial<Record<LayerId, "loading" | "ok" | "error">>>({});
  const fetchedLayers = useRef<Set<LayerId>>(new Set());

  // Durham boundary outline from Nominatim
  useEffect(() => {
    fetch("https://nominatim.openstreetmap.org/search?q=Regional+Municipality+of+Durham+Ontario+Canada&polygon_geojson=1&format=json&limit=1")
      .then((r) => r.json())
      .then((data) => { if (data[0]?.geojson) setDurhamGeo(data[0].geojson); })
      .catch(() => {});
  }, []);

  // Fetch Overpass layers on demand — use a ref to track in-flight/done fetches
  // so this effect only depends on visibleLayers and never re-runs due to state updates
  useEffect(() => {
    for (const layer of LAYERS) {
      if (!visibleLayers.has(layer.id)) continue;
      if (fetchedLayers.current.has(layer.id)) continue;

      fetchedLayers.current.add(layer.id);
      setLayerStatus((prev) => ({ ...prev, [layer.id]: "loading" }));

      fetchOverpass(QUERIES[layer.id])
        .then((geo) => {
          setLayerData((prev) => ({ ...prev, [layer.id]: geo }));
          setLayerStatus((prev) => ({ ...prev, [layer.id]: "ok" }));
        })
        .catch(() => {
          setLayerStatus((prev) => ({ ...prev, [layer.id]: "error" }));
        });
    }
  }, [visibleLayers]);

  function toggleLayer(id: LayerId) {
    setVisibleLayers((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const tile = TILE_LAYERS[activeTile];

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>

      {/* ── Controls panel ── */}
      <div style={{
        position: "absolute", top: 12, right: 12, zIndex: 1000,
        background: "white", borderRadius: 10, padding: "12px 14px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.18)", minWidth: 186,
        fontFamily: "'Inter', sans-serif",
      }}>
        {/* Base map toggle */}
        <p style={{ fontSize: 10, fontWeight: 700, color: "#3F352C", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Base Map</p>
        <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", border: "1px solid #C2D1DB", marginBottom: 14 }}>
          {(Object.keys(TILE_LAYERS) as (keyof typeof TILE_LAYERS)[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTile(key)}
              style={{
                flex: 1, padding: "5px 0", fontSize: 11, fontWeight: 600,
                border: "none", cursor: "pointer",
                background: activeTile === key ? "#2F6F73" : "white",
                color: activeTile === key ? "white" : "#3F352C",
                transition: "all 0.15s",
              }}
            >
              {TILE_LAYERS[key].label}
            </button>
          ))}
        </div>

        {/* Layer toggles */}
        <p style={{ fontSize: 10, fontWeight: 700, color: "#3F352C", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
          Map Layers
          <span style={{ fontWeight: 400, color: "#7A9E7E", marginLeft: 5, textTransform: "none", letterSpacing: 0 }}>OpenStreetMap</span>
        </p>
        {LAYERS.map((layer) => {
          const on = visibleLayers.has(layer.id);
          const status = layerStatus[layer.id];
          const count = layerData[layer.id]?.features?.length;
          return (
            <label
              key={layer.id}
              style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer" }}
            >
              <div
                onClick={() => toggleLayer(layer.id)}
                style={{
                  width: 14, height: 14, borderRadius: 3, flexShrink: 0,
                  background: on ? layer.color : "transparent",
                  border: `2px solid ${layer.color}`,
                  transition: "background 0.15s",
                }}
              />
              <span style={{ fontSize: 11, color: status === "error" ? "#C65A1E" : "#3F352C", flex: 1, lineHeight: 1.3 }}>
                {layer.label}
              </span>
              {status === "loading" && <span style={{ fontSize: 9, color: "#2F6F73" }}>…</span>}
              {status === "ok" && count !== undefined && <span style={{ fontSize: 9, color: "#7A9E7E" }}>{count}</span>}
              {status === "error" && <span style={{ fontSize: 9, color: "#C65A1E" }} title="Could not load layer">✕</span>}
            </label>
          );
        })}
        <div style={{ borderTop: "1px solid #C2D1DB", marginTop: 8, paddingTop: 8 }}>
          <p style={{ fontSize: 9, color: "#7A9E7E", lineHeight: 1.4, margin: 0 }}>
            Regional data:{" "}
            <a href="https://www.openstreetmap.org" target="_blank" rel="noopener noreferrer" style={{ color: "#2F6F73" }}>
              © OpenStreetMap
            </a>
          </p>
        </div>
      </div>

      <MapContainer
        center={[44.2200, -79.0400]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer key={activeTile} url={tile.url} attribution={tile.attribution} />

        {/* Durham Region boundary */}
        {durhamGeo && (
          <GeoJSON
            data={durhamGeo as GeoJSON.GeoJsonObject}
            style={{ color: "#2F6F73", weight: 1, opacity: 0.3, fillColor: "#2F6F73", fillOpacity: 0.04, dashArray: "4 4" }}
          />
        )}

        {/* OSM layers */}
        {LAYERS.map((layer) => {
          const data = layerData[layer.id];
          if (!visibleLayers.has(layer.id) || !data) return null;

          const points = data.features.filter((f) => f.geometry?.type === "Point");
          const nonPoints: GeoJSON.FeatureCollection = {
            type: "FeatureCollection",
            features: data.features.filter((f) => f.geometry?.type !== "Point"),
          };

          const lineOrPolyStyle = (feature?: GeoJSON.Feature) => {
            const isPolygon = feature?.geometry?.type === "Polygon" || feature?.geometry?.type === "MultiPolygon";
            return isPolygon
              ? { color: layer.color, weight: 1.5, opacity: 0.6, fillColor: layer.color, fillOpacity: 0.15 }
              : { color: layer.color, weight: 2.5, opacity: 0.8 };
          };

          return (
            <React.Fragment key={layer.id}>
              {nonPoints.features.length > 0 && (
                <GeoJSON
                  key={`${layer.id}-geo`}
                  data={nonPoints as GeoJSON.GeoJsonObject}
                  style={lineOrPolyStyle}
                  onEachFeature={(feature, leafletLayer) => {
                    const props = (feature.properties || {}) as Record<string, string>;
                    if (props.name) leafletLayer.bindPopup(osmPopup(props));
                  }}
                />
              )}
              {points.map((feature, i) => {
                const [lng, lat] = (feature.geometry as GeoJSON.Point).coordinates;
                const props = (feature.properties || {}) as Record<string, string>;
                return (
                  <Marker
                    key={`${layer.id}-pt-${i}`}
                    position={[lat, lng]}
                    icon={createSmallIcon(layer.color)}
                  >
                    <Popup>
                      <div dangerouslySetInnerHTML={{ __html: osmPopup(props) }} />
                    </Popup>
                  </Marker>
                );
              })}
            </React.Fragment>
          );
        })}

        <FlyToSelected listing={selected} />

        {/* Atlas listings — always on top */}
        {listings.map((listing) => (
          <Marker
            key={listing.id}
            position={[listing.lat, listing.lng]}
            icon={createColoredIcon(CATEGORY_COLORS[listing.category])}
            eventHandlers={{ click: () => onSelect(listing) }}
          >
            <Popup>
              <div style={{ fontFamily: "'Lora', serif", minWidth: 200 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: CATEGORY_COLORS[listing.category], margin: "0 0 2px" }}>{listing.category}</p>
                <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 4px" }}>{listing.name}</p>
                <p style={{ fontSize: 11, color: "#3F352C", margin: "0 0 2px" }}>{listing.address}</p>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#2F6F73", margin: "0 0 6px" }}>{listing.hours}</p>
                <p style={{ fontSize: 11, lineHeight: 1.5, margin: 0 }}>{listing.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
