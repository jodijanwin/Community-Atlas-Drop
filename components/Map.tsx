"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from "react-leaflet";
import L from "leaflet";
import { Listing, CATEGORY_COLORS } from "@/types";

function createColoredIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="width:26px;height:26px;background:${color};border:2.5px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 6px rgba(0,0,0,0.25);"></div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
    popupAnchor: [0, -26],
  });
}

function FlyToSelected({ listing }: { listing: Listing | null }) {
  const map = useMap();
  useEffect(() => {
    if (listing) map.flyTo([listing.lat, listing.lng], 15, { duration: 0.8 });
  }, [listing, map]);
  return null;
}

interface Props {
  listings: Listing[];
  selected: Listing | null;
  onSelect: (listing: Listing) => void;
}

export default function AtlasMap({ listings, selected, onSelect }: Props) {
  const [durhamGeo, setDurhamGeo] = useState<object | null>(null);
  const [scugogGeo, setScugogGeo] = useState<object | null>(null);

  useEffect(() => {
    fetch("https://nominatim.openstreetmap.org/search?q=Regional+Municipality+of+Durham+Ontario+Canada&polygon_geojson=1&format=json&limit=1")
      .then((r) => r.json())
      .then((data) => { if (data[0]?.geojson) setDurhamGeo(data[0].geojson); })
      .catch(() => {});

    fetch("https://nominatim.openstreetmap.org/search?q=Scugog+Township+Ontario+Canada&polygon_geojson=1&format=json&limit=1")
      .then((r) => r.json())
      .then((data) => { if (data[0]?.geojson) setScugogGeo(data[0].geojson); })
      .catch(() => {});
  }, []);

  return (
    <MapContainer
      center={[44.1053, -78.9200]}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {/* Durham Region — faint fill, thin border */}
      {durhamGeo && (
        <GeoJSON
          data={durhamGeo as GeoJSON.GeoJsonObject}
          style={{
            color: "#1B75BC",
            weight: 1,
            opacity: 0.3,
            fillColor: "#1B75BC",
            fillOpacity: 0.04,
            dashArray: "4 4",
          }}
        />
      )}

      {/* Scugog Township — bold border, no fill */}
      {scugogGeo && (
        <GeoJSON
          data={scugogGeo as GeoJSON.GeoJsonObject}
          style={{
            color: "#1B75BC",
            weight: 3,
            opacity: 0.85,
            fillColor: "#6B9433",
            fillOpacity: 0.06,
          }}
        />
      )}

      <FlyToSelected listing={selected} />

      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={[listing.lat, listing.lng]}
          icon={createColoredIcon(CATEGORY_COLORS[listing.category])}
          eventHandlers={{ click: () => onSelect(listing) }}
        >
          <Popup>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", minWidth: 200 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: CATEGORY_COLORS[listing.category], margin: "0 0 2px" }}>{listing.category}</p>
              <p style={{ fontSize: 13, fontWeight: 700, margin: "0 0 4px" }}>{listing.name}</p>
              <p style={{ fontSize: 11, color: "#5A6E5B", margin: "0 0 2px" }}>{listing.address}</p>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#1B75BC", margin: "0 0 6px" }}>{listing.hours}</p>
              <p style={{ fontSize: 11, lineHeight: 1.5, margin: 0 }}>{listing.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
