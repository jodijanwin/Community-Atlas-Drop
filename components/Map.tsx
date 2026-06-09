"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from "react-leaflet";
import L from "leaflet";
import React from "react";
import { Listing, CATEGORY_COLORS } from "@/types";

// ─── Regional map layers ───────────────────────────────────────────────────────
// GeoJSON files are pre-built from OpenStreetMap data and served as static
// assets from /public/osm/. To refresh the data, run:
//
//   node scripts/fetch-osm-data.mjs
//
// then commit the updated files in public/osm/.
// See UPDATING.md section 4 for full instructions.

const LAYERS = [
  { id: "trails",    label: "Trails & Paths",       color: "#7A9E7E", file: "/osm/trails.geojson",    defaultOn: true  },
  { id: "parks",     label: "Parks & Forests",       color: "#2F5D50", file: "/osm/parks.geojson",     defaultOn: true  },
  { id: "amenities", label: "Libraries & Services",  color: "#2F6F73", file: "/osm/amenities.geojson", defaultOn: true  },
] as const;

type LayerId = (typeof LAYERS)[number]["id"];

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

function osmPopup(props: Record<string, string>): string {
  const name = props.name || props["name:en"] || "";
  const type = (props.amenity || props.leisure || props.natural || props.highway || props.shop || "").replace(/_/g, " ");
  const operator = props.operator || props.brand || "";
  const hours = props.opening_hours || "";
  const website = props.website || props["contact:website"] || "";
  return `<div style="font-family:'Lora',serif;min-width:150px">
    <p style="font-size:10px;font-weight:700;color:#2F6F73;margin:0 0 3px;text-transform:capitalize">${type}</p>
    ${name ? `<p style="font-size:12px;font-weight:700;margin:0 0 3px">${name}</p>` : ""}
    ${operator ? `<p style="font-size:10px;color:#3F352C;margin:0 0 2px">${operator}</p>` : ""}
    ${hours ? `<p style="font-size:10px;color:#2F6F73;margin:0 0 2px">${hours}</p>` : ""}
    ${website ? `<p style="font-size:10px;margin:0"><a href="${website}" target="_blank" rel="noopener noreferrer" style="color:#2F6F73">Visit →</a></p>` : ""}
  </div>`;
}

// ─── Component ────────────────────────────────────────────────────────────────

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
  const [layerStatus, setLayerStatus] = useState<Partial<Record<LayerId, "loading" | "ok" | "empty" | "error">>>({});
  const fetchedRef = useRef<Set<LayerId>>(new Set());

  // Durham boundary
  useEffect(() => {
    fetch("https://nominatim.openstreetmap.org/search?q=Regional+Municipality+of+Durham+Ontario+Canada&polygon_geojson=1&format=json&limit=1")
      .then((r) => r.json())
      .then((data) => { if (data[0]?.geojson) setDurhamGeo(data[0].geojson); })
      .catch(() => {});
  }, []);

  // Fetch static GeoJSON files
  useEffect(() => {
    for (const layer of LAYERS) {
      if (!visibleLayers.has(layer.id)) continue;
      if (fetchedRef.current.has(layer.id)) continue;

      fetchedRef.current.add(layer.id);
      setLayerStatus((prev) => ({ ...prev, [layer.id]: "loading" }));

      fetch(layer.file)
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json() as Promise<GeoJSON.FeatureCollection>;
        })
        .then((geo) => {
          setLayerData((prev) => ({ ...prev, [layer.id]: geo }));
          setLayerStatus((prev) => ({
            ...prev,
            [layer.id]: geo.features.length === 0 ? "empty" : "ok",
          }));
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
  const hasEmptyLayers = Object.values(layerStatus).some((s) => s === "empty");

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>

      {/* ── Controls panel ── */}
      <div className="no-print" style={{
        position: "absolute", top: 12, right: 12, zIndex: 1000,
        background: "white", borderRadius: 10, padding: "12px 14px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.18)", minWidth: 190,
        fontFamily: "'Inter', sans-serif",
      }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: "#3F352C", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Base Map</p>
        <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", border: "1px solid #C2D1DB", marginBottom: 14 }}>
          {(Object.keys(TILE_LAYERS) as (keyof typeof TILE_LAYERS)[]).map((key) => (
            <button key={key} onClick={() => setActiveTile(key)} style={{
              flex: 1, padding: "5px 0", fontSize: 11, fontWeight: 600,
              border: "none", cursor: "pointer",
              background: activeTile === key ? "#2F6F73" : "white",
              color: activeTile === key ? "white" : "#3F352C",
              transition: "all 0.15s",
            }}>
              {TILE_LAYERS[key].label}
            </button>
          ))}
        </div>

        <p style={{ fontSize: 10, fontWeight: 700, color: "#3F352C", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
          Map Layers
          <span style={{ fontWeight: 400, color: "#7A9E7E", marginLeft: 5, textTransform: "none", letterSpacing: 0 }}>OpenStreetMap</span>
        </p>

        {LAYERS.map((layer) => {
          const on = visibleLayers.has(layer.id);
          const status = layerStatus[layer.id];
          const count = layerData[layer.id]?.features?.length;
          return (
            <label key={layer.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer" }}>
              <div onClick={() => toggleLayer(layer.id)} style={{
                width: 14, height: 14, borderRadius: 3, flexShrink: 0,
                background: on ? layer.color : "transparent",
                border: `2px solid ${layer.color}`,
                transition: "background 0.15s",
              }} />
              <span style={{ fontSize: 11, color: "#3F352C", flex: 1, lineHeight: 1.3 }}>{layer.label}</span>
              {status === "loading" && <span style={{ fontSize: 9, color: "#2F6F73" }}>…</span>}
              {status === "ok" && count !== undefined && <span style={{ fontSize: 9, color: "#7A9E7E" }}>{count}</span>}
              {status === "empty" && <span style={{ fontSize: 9, color: "#E3A24C" }}>run script</span>}
              {status === "error" && <span style={{ fontSize: 9, color: "#C65A1E" }}>✕</span>}
            </label>
          );
        })}

        {hasEmptyLayers && (
          <div style={{ borderTop: "1px solid #C2D1DB", marginTop: 8, paddingTop: 8 }}>
            <p style={{ fontSize: 9, color: "#E3A24C", lineHeight: 1.5, margin: 0 }}>
              No regional data yet.<br />
              Run: <code style={{ background: "#F6F1E8", padding: "1px 3px", borderRadius: 2 }}>node scripts/fetch-osm-data.mjs</code>
            </p>
          </div>
        )}

        <div style={{ borderTop: "1px solid #C2D1DB", marginTop: 8, paddingTop: 8 }}>
          <p style={{ fontSize: 9, color: "#7A9E7E", lineHeight: 1.4, margin: 0 }}>
            Data: <a href="https://www.openstreetmap.org" target="_blank" rel="noopener noreferrer" style={{ color: "#2F6F73" }}>© OpenStreetMap contributors</a>
          </p>
        </div>
      </div>

      <MapContainer center={[44.2200, -79.0400]} zoom={10} style={{ height: "100%", width: "100%" }}>
        <TileLayer key={activeTile} url={tile.url} attribution={tile.attribution} />

        {durhamGeo && (
          <GeoJSON
            data={durhamGeo as GeoJSON.GeoJsonObject}
            style={{ color: "#2F6F73", weight: 1, opacity: 0.3, fillColor: "#2F6F73", fillOpacity: 0.04, dashArray: "4 4" }}
          />
        )}

        {LAYERS.map((layer) => {
          const data = layerData[layer.id];
          if (!visibleLayers.has(layer.id) || !data || data.features.length === 0) return null;

          const points = data.features.filter((f) => f.geometry?.type === "Point");
          const nonPoints: GeoJSON.FeatureCollection = {
            type: "FeatureCollection",
            features: data.features.filter((f) => f.geometry?.type !== "Point"),
          };

          const styleFunc = (feature?: GeoJSON.Feature) => {
            const isPoly = feature?.geometry?.type === "Polygon" || feature?.geometry?.type === "MultiPolygon";
            return isPoly
              ? { color: layer.color, weight: 1.5, opacity: 0.6, fillColor: layer.color, fillOpacity: 0.15 }
              : { color: layer.color, weight: 2.5, opacity: 0.8 };
          };

          return (
            <React.Fragment key={layer.id}>
              {nonPoints.features.length > 0 && (
                <GeoJSON
                  key={`${layer.id}-geo`}
                  data={nonPoints as GeoJSON.GeoJsonObject}
                  style={styleFunc}
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
                  <Marker key={`${layer.id}-pt-${i}`} position={[lat, lng]} icon={createSmallIcon(layer.color)}>
                    <Popup><div dangerouslySetInnerHTML={{ __html: osmPopup(props) }} /></Popup>
                  </Marker>
                );
              })}
            </React.Fragment>
          );
        })}

        <FlyToSelected listing={selected} />

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
