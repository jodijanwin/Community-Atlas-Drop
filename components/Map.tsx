"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from "react-leaflet";
import L from "leaflet";
import { Listing, CATEGORY_COLORS } from "@/types";

// ─── Durham Region ArcGIS REST API ────────────────────────────────────────────
// Public open data: https://opendata.durham.ca
// MapServer base: https://maps.durham.ca/arcgis/rest/services/Open_Data/Durham_OpenData/MapServer
// yourDurhamLayers: https://maps.durham.ca/arcgis/rest/services/yourDurham/yourDurhamLayers/MapServer
//
// To add a new layer: add an entry to DURHAM_LAYERS below with the correct
// ArcGIS layer number and style. See UPDATING.md for full instructions.
//
// North Durham bounding box used to filter all queries:
//   SW: 44.00, -79.40   NE: 44.65, -78.70

const NORTH_DURHAM_BBOX = "-79.4,44.0,-78.7,44.65";

const ARCGIS_BASE = "https://maps.durham.ca/arcgis/rest/services/Open_Data/Durham_OpenData/MapServer";
const ARCGIS_YOUR_DURHAM = "https://maps.durham.ca/arcgis/rest/services/yourDurham/yourDurhamLayers/MapServer";

function arcgisUrl(base: string, layerId: number) {
  const [xmin, ymin, xmax, ymax] = NORTH_DURHAM_BBOX.split(",");
  const geom = encodeURIComponent(JSON.stringify({ xmin, ymin, xmax, ymax, spatialReference: { wkid: 4326 } }));
  return `${base}/${layerId}/query?where=1%3D1&geometry=${geom}&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&outFields=*&outSR=4326&f=geojson`;
}

// Layers fetched from Durham Region Open Data.
// Toggle visibility with the checkboxes in the map legend.
const DURHAM_LAYERS = [
  {
    id: "trails",
    label: "Regional Trails",
    color: "#7A9E7E",
    url: arcgisUrl(ARCGIS_YOUR_DURHAM, 11),
    type: "line" as const,
  },
  {
    id: "parks",
    label: "Recreation Parks",
    color: "#2F5D50",
    url: arcgisUrl(ARCGIS_YOUR_DURHAM, 10),
    type: "polygon" as const,
  },
  {
    id: "community",
    label: "Community Services",
    color: "#2F6F73",
    url: arcgisUrl(ARCGIS_BASE, 4),
    type: "point" as const,
  },
  {
    id: "healthcare",
    label: "Healthcare",
    color: "#C65A1E",
    url: arcgisUrl(ARCGIS_BASE, 18),
    type: "point" as const,
  },
] as const;

type DurhamLayerId = (typeof DURHAM_LAYERS)[number]["id"];

// ─── Base map tile options ─────────────────────────────────────────────────────

const TILE_LAYERS = {
  clean: {
    label: "Minimal",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  satellite: {
    label: "Terrain",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

// ─── GeoJSON style helpers ─────────────────────────────────────────────────────

function lineStyle(color: string) {
  return { color, weight: 2.5, opacity: 0.75 };
}

function polygonStyle(color: string) {
  return { color, weight: 1.5, opacity: 0.6, fillColor: color, fillOpacity: 0.12 };
}

// Build a popup string from ArcGIS feature properties (best-effort)
function featurePopup(props: Record<string, unknown>, layerLabel: string): string {
  const name = (props.NAME || props.Name || props.FACILITYNAME || props.SITE_NAME || props.TRAIL_NAME || props.PARK_NAME || "") as string;
  const addr = (props.ADDRESS || props.STREET_NUMBER ? `${props.STREET_NUMBER} ${props.STREET_NAME}` : "") as string;
  const type = (props.FACILITY_TYPE || props.TYPE || props.CATEGORY || "") as string;
  return `<div style="font-family:'Lora',serif;min-width:160px">
    <p style="font-size:10px;font-weight:700;color:#2F6F73;margin:0 0 3px">${layerLabel}</p>
    ${name ? `<p style="font-size:12px;font-weight:700;margin:0 0 2px">${name}</p>` : ""}
    ${type ? `<p style="font-size:10px;color:#3F352C;margin:0 0 2px">${type}</p>` : ""}
    ${addr ? `<p style="font-size:10px;color:#3F352C;margin:0">${addr}</p>` : ""}
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
  const [visibleLayers, setVisibleLayers] = useState<Set<DurhamLayerId>>(new Set(["trails", "parks"]));
  const [layerData, setLayerData] = useState<Partial<Record<DurhamLayerId, GeoJSON.FeatureCollection>>>({});
  const [layerErrors, setLayerErrors] = useState<Set<DurhamLayerId>>(new Set());

  // Durham boundary outline
  useEffect(() => {
    fetch("https://nominatim.openstreetmap.org/search?q=Regional+Municipality+of+Durham+Ontario+Canada&polygon_geojson=1&format=json&limit=1")
      .then((r) => r.json())
      .then((data) => { if (data[0]?.geojson) setDurhamGeo(data[0].geojson); })
      .catch(() => {});
  }, []);

  // Fetch Durham open data layers on demand
  useEffect(() => {
    for (const layer of DURHAM_LAYERS) {
      if (!visibleLayers.has(layer.id) || layerData[layer.id] || layerErrors.has(layer.id)) continue;
      fetch(layer.url)
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
        .then((geo) => {
          if (geo?.features) {
            setLayerData((prev) => ({ ...prev, [layer.id]: geo }));
          }
        })
        .catch(() => {
          setLayerErrors((prev) => new Set(prev).add(layer.id));
        });
    }
  }, [visibleLayers, layerData, layerErrors]);

  function toggleLayer(id: DurhamLayerId) {
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
        background: "white", borderRadius: 10, padding: "10px 14px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.18)", minWidth: 180,
        fontFamily: "'Inter', sans-serif",
      }}>
        {/* Base map toggle */}
        <p style={{ fontSize: 10, fontWeight: 700, color: "#3F352C", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Base Map</p>
        <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", border: "1px solid #C2D1DB", marginBottom: 12 }}>
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

        {/* Durham open data layer toggles */}
        <p style={{ fontSize: 10, fontWeight: 700, color: "#3F352C", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
          Regional Layers
          <span style={{ fontWeight: 400, color: "#7A9E7E", marginLeft: 4 }}>Durham Open Data</span>
        </p>
        {DURHAM_LAYERS.map((layer) => {
          const on = visibleLayers.has(layer.id);
          const loading = on && !layerData[layer.id] && !layerErrors.has(layer.id);
          const errored = layerErrors.has(layer.id);
          return (
            <label
              key={layer.id}
              style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, cursor: "pointer" }}
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
              <span style={{ fontSize: 11, color: errored ? "#C65A1E" : "#3F352C", flex: 1 }}>
                {layer.label}
              </span>
              {loading && <span style={{ fontSize: 9, color: "#2F6F73" }}>…</span>}
              {errored && <span style={{ fontSize: 9, color: "#C65A1E" }}>✕</span>}
            </label>
          );
        })}
        <p style={{ fontSize: 9, color: "#7A9E7E", marginTop: 8, lineHeight: 1.4 }}>
          Data: <a href="https://opendata.durham.ca" target="_blank" rel="noopener noreferrer" style={{ color: "#2F6F73" }}>Durham Region Open Data</a>
        </p>
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

        {/* Durham Open Data layers */}
        {DURHAM_LAYERS.map((layer) => {
          const data = layerData[layer.id];
          if (!visibleLayers.has(layer.id) || !data) return null;

          if (layer.type === "point") {
            return data.features?.map((feature, i) => {
              if (feature.geometry?.type !== "Point") return null;
              const [lng, lat] = (feature.geometry as GeoJSON.Point).coordinates;
              return (
                <Marker
                  key={`${layer.id}-${i}`}
                  position={[lat, lng]}
                  icon={createSmallIcon(layer.color)}
                >
                  <Popup>
                    <div dangerouslySetInnerHTML={{ __html: featurePopup(feature.properties as Record<string, unknown> || {}, layer.label) }} />
                  </Popup>
                </Marker>
              );
            });
          }

          const styleFunc = layer.type === "line" ? lineStyle(layer.color) : polygonStyle(layer.color);
          return (
            <GeoJSON
              key={layer.id}
              data={data as GeoJSON.GeoJsonObject}
              style={() => styleFunc}
              onEachFeature={(feature, leafletLayer) => {
                leafletLayer.bindPopup(featurePopup(feature.properties as Record<string, unknown> || {}, layer.label));
              }}
            />
          );
        })}

        <FlyToSelected listing={selected} />

        {/* Atlas listings */}
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
