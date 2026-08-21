"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { mapData } from "@/data/mock-data";

const riskColors: Record<string, string> = {
  critical: "#DC2626",
  high: "#EF4444",
  medium: "#D97706",
  low: "#0F766E",
};

const riskRadius: Record<string, number> = {
  critical: 14,
  high: 12,
  medium: 10,
  low: 8,
};

function MapBoundsUpdater({ data }: { data: typeof mapData }) {
  const map = useMap();
  useEffect(() => {
    if (data.length > 0) {
      const bounds = data.map((d) => [d.lat, d.lng] as [number, number]);
      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 9 });
      }
    }
  }, [data, map]);
  return null;
}

interface InfrastructureMapProps {
  filter?: string;
}

export default function InfrastructureMap({ filter = "all" }: InfrastructureMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categoryFilterMap: Record<string, string> = {
    water: "Water",
    roads: "Road",
    electricity: "Electricity",
    healthcare: "Healthcare",
    education: "Education",
  };

  const filteredData = filter === "all"
    ? mapData
    : mapData.filter((d) =>
        d.category?.toLowerCase().includes(categoryFilterMap[filter]?.toLowerCase() || filter)
      );

  const center: [number, number] = [15.9129, 79.7400];

  if (!mounted) {
    return (
      <div className="w-full h-full bg-off-white rounded-lg flex items-center justify-center">
        <div className="text-sm text-muted">Loading map...</div>
      </div>
    );
  }

  return (
    <MapContainer
      center={center}
      zoom={7}
      style={{ width: "100%", height: "100%", borderRadius: "8px", minHeight: "380px" }}
      scrollWheelZoom={true}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <MapBoundsUpdater data={filteredData} />
      {filteredData.map((point) => {
        const intensity = point.risk === "critical" ? 1.0 : point.risk === "high" ? 0.7 : point.risk === "medium" ? 0.4 : 0.2;
        const glowRadius = 30 + intensity * 25;
        return (
          <div key={point.id}>
            {/* Glow effect circle */}
            <Circle
              center={[point.lat, point.lng]}
              radius={glowRadius}
              fillColor={riskColors[point.risk]}
              fillOpacity={0.15 * intensity}
              stroke={false}
            />
            {/* Main marker */}
            <CircleMarker
              center={[point.lat, point.lng]}
              radius={riskRadius[point.risk] || 10}
              fillColor={riskColors[point.risk]}
              fillOpacity={0.85}
              color="#fff"
              weight={2}
            >
              <Popup>
                <div style={{ padding: "4px", minWidth: "180px" }}>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: "#1a1a2e", marginBottom: "4px" }}>
                    {point.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#555", lineHeight: "1.6" }}>
                    <div><strong>Priority:</strong> {point.priority}/100</div>
                    <div><strong>Issues:</strong> {point.issues} reports</div>
                    <div><strong>Category:</strong> {point.category}</div>
                    <div>
                      <strong>Risk: </strong>
                      <span style={{ color: riskColors[point.risk], fontWeight: 700, textTransform: "uppercase" }}>
                        {point.risk}
                      </span>
                    </div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          </div>
        );
      })}
    </MapContainer>
  );
}
