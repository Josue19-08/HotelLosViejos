"use client"

import { useLocationMap } from "@/hooks/use-location-map"

interface LocationMapProps {
  address: string
  lat: number
  lng: number
}

export function LocationMap({ address, lat, lng }: LocationMapProps) {
  const { isLeafletLoaded } = useLocationMap(address, lat, lng)

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`
    window.open(url, "_blank")
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-teal-50 border-b border-teal-100">
        <h2 className="text-xl font-playfair font-bold text-teal-700">Nuestra ubicación</h2>
        <p className="text-teal-600 text-sm">{address}</p>
      </div>

      <div className="relative h-[400px] w-full bg-gray-100">
        {!isLeafletLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : (
          <div id="map-container" className="w-full h-full"></div>
        )}
      </div>

      <div className="p-4 flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Coordenadas: {Number(lat).toFixed(6)}, {Number(lng).toFixed(6)}
        </p>
        <button
          onClick={openGoogleMaps}
          className="text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors hover:underline flex items-center gap-1"
        >
          <span>Ver en Google Maps</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </button>
      </div>
    </div>
  )
}
