"use client"

import { useState, useEffect } from "react"

interface LocationMapProps {
  address: string
  coordinates: {
    lat: number
    lng: number
  }
}

export function LocationMap({ address, coordinates }: LocationMapProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link")
        link.id = "leaflet-css"
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        link.crossOrigin = ""
        document.head.appendChild(link)
      }

      if (!window.L) {
        const script = document.createElement("script")
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        script.crossOrigin = ""
        script.async = true
        script.onload = () => {
          setIsLeafletLoaded(true)
        }
        document.head.appendChild(script)
      } else {
        setIsLeafletLoaded(true)
      }
    }
  }, [])

  useEffect(() => {
    if (!isLeafletLoaded) return

    // Inicializar el mapa
    const mapContainer = document.getElementById("map-container")
    if (!mapContainer) return

    // Limpiar el contenedor si ya existe un mapa
    mapContainer.innerHTML = ""

    // Crear el mapa
    const map = window.L.map("map-container").setView([coordinates.lat, coordinates.lng], 15)

    // Añadir capa de OpenStreetMap
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    // Añadir marcador
    const marker = window.L.marker([coordinates.lat, coordinates.lng]).addTo(map)
    marker.bindPopup(`<b>Hotel Los Viejos</b><br>${address}`).openPopup()

    setIsMapLoaded(true)

    // Limpiar al desmontar
    return () => {
      map.remove()
    }
  }, [isLeafletLoaded, coordinates, address])

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
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
          Coordenadas: {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
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

