import { useEffect, useState } from "react"

declare global {
  interface Window {
    L: any
  }
}

export function useLocationMap(address: string, lat: number, lng: number) {
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

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
      script.onload = () => setIsLeafletLoaded(true)
      document.head.appendChild(script)
    } else {
      setIsLeafletLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!isLeafletLoaded) return

    const mapContainer = document.getElementById("map-container")
    if (!mapContainer) return

    mapContainer.innerHTML = ""

    const map = window.L.map("map-container").setView([lat, lng], 15)

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    const marker = window.L.marker([lat, lng]).addTo(map)
    marker.bindPopup(`<b>Hotel Los Viejos</b><br>${address}`).openPopup()

    setIsMapLoaded(true)

    return () => map.remove()
  }, [isLeafletLoaded, lat, lng, address])

  return {
    isLeafletLoaded,
    isMapLoaded,
  }
}
