"use client";

import L from "leaflet";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import "leaflet/dist/leaflet.css";

type Position = {
  lat: number;
  lng: number;
};

type OsmMapPickerProps = {
  position: Position;
  onPositionChange: (position: Position) => void;
};

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function OsmMapPicker({ position, onPositionChange }: OsmMapPickerProps) {
  const t = useTranslations("user-address.map");
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const onPositionChangeRef = useRef(onPositionChange);

  useEffect(() => {
    onPositionChangeRef.current = onPositionChange;
  }, [onPositionChange]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [position.lat, position.lng],
      zoom: 13,
      scrollWheelZoom: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const marker = L.marker([position.lat, position.lng], { icon: markerIcon }).addTo(map);

    map.on("click", (event) => {
      const nextPosition = {
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      };

      marker.setLatLng(event.latlng);
      onPositionChangeRef.current(nextPosition);
    });

    mapRef.current = map;
    markerRef.current = marker;

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return;

    const latLng = L.latLng(position.lat, position.lng);
    markerRef.current.setLatLng(latLng);
    mapRef.current.setView(latLng, mapRef.current.getZoom(), { animate: true });
  }, [position.lat, position.lng]);

  return (
    <section className="relative shadow-lg rounded-xl w-full h-[400px] overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />
      <p className="bottom-3 left-3 absolute bg-white/90 dark:bg-zinc-900/90 px-3 py-1.5 rounded-full font-medium text-zinc-600 dark:text-zinc-300 text-xs pointer-events-none">
        {t("pick-location")}
      </p>
    </section>
  );
}
