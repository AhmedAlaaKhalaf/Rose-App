"use client";

import dynamic from "next/dynamic";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Loader2 } from "lucide-react";

type Position = {
  lat: number;
  lng: number;
};

type AddressMapPickerProps = {
  position: Position;
  onPositionChange: (position: Position) => void;
};

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
const GOOGLE_MAPS_MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID?.trim();

const OsmMapPicker = dynamic(() => import("./osm-map-picker"), {
  ssr: false,
  loading: () => (
    <section className="flex justify-center items-center bg-zinc-50 dark:bg-zinc-900/60 rounded-xl h-[400px]">
      <Loader2 className="size-8 text-maroon-700 animate-spin" />
    </section>
  ),
});

function isGoogleMapsConfigured() {
  return Boolean(
    GOOGLE_MAPS_API_KEY &&
      GOOGLE_MAPS_API_KEY.length > 10 &&
      !GOOGLE_MAPS_API_KEY.includes("YOUR_") &&
      GOOGLE_MAPS_API_KEY !== "your-google-maps-api-key"
  );
}

function GoogleMapPicker({ position, onPositionChange }: AddressMapPickerProps) {
  return (
    <section className="shadow-lg rounded-xl w-full h-[400px] overflow-hidden">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY!}>
        <Map
          defaultCenter={position}
          defaultZoom={13}
          mapId={GOOGLE_MAPS_MAP_ID || undefined}
          gestureHandling="greedy"
          disableDefaultUI={false}
          onClick={(e) => {
            if (!e.detail.latLng) return;

            onPositionChange({
              lat: e.detail.latLng.lat,
              lng: e.detail.latLng.lng,
            });
          }}
        >
          <Marker position={position} />
        </Map>
      </APIProvider>
    </section>
  );
}

export default function AddressMapPicker({ position, onPositionChange }: AddressMapPickerProps) {
  if (isGoogleMapsConfigured()) {
    return <GoogleMapPicker position={position} onPositionChange={onPositionChange} />;
  }

  return <OsmMapPicker position={position} onPositionChange={onPositionChange} />;
}
