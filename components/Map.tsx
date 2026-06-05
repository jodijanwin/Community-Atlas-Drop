"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Listing, CATEGORY_COLORS } from "@/types";

function createColoredIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 28px; height: 28px;
        background: ${color};
        border: 2.5px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
}

function FlyToSelected({ listing }: { listing: Listing | null }) {
  const map = useMap();
  useEffect(() => {
    if (listing) {
      map.flyTo([listing.lat, listing.lng], 16, { duration: 0.8 });
    }
  }, [listing, map]);
  return null;
}

interface Props {
  listings: Listing[];
  selected: Listing | null;
  onSelect: (listing: Listing) => void;
}

export default function AtlasMap({ listings, selected, onSelect }: Props) {
  return (
    <MapContainer
      center={[37.7749, -122.2194]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <FlyToSelected listing={selected} />
      {listings.map((listing) => {
        const icon = createColoredIcon(CATEGORY_COLORS[listing.category]);
        return (
          <Marker
            key={listing.id}
            position={[listing.lat, listing.lng]}
            icon={icon}
            eventHandlers={{ click: () => onSelect(listing) }}
          >
            <Popup>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", minWidth: 200 }}>
                <p className="text-xs font-semibold" style={{ color: CATEGORY_COLORS[listing.category] }}>
                  {listing.category}
                </p>
                <p className="font-bold text-sm mt-0.5">{listing.name}</p>
                <p className="text-xs mt-1" style={{ color: "#6B6355" }}>{listing.address}</p>
                <p className="text-xs font-medium mt-0.5" style={{ color: "#C4870A" }}>{listing.hours}</p>
                <p className="text-xs mt-1.5 leading-relaxed">{listing.description}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
