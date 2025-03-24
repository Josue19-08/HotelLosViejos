interface StaticMapProps {
  lat: number
  lng: number
  zoom?: number
  width?: number
  height?: number
  mapType?: "roadmap" | "satellite" | "terrain" | "hybrid"
}

export function StaticMap({ lat, lng, zoom = 15, width = 600, height = 400, mapType = "roadmap" }: StaticMapProps) {
  const mapUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&markers=${lat},${lng},red-pushpin`

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <img
        src={mapUrl || "/placeholder.svg"}
        alt="Mapa de ubicación"
        className="w-full h-full object-cover"
        onError={(e) => {
          // Si la imagen falla, mostrar un mapa alternativo
          const target = e.target as HTMLImageElement
          target.src = "/placeholder.svg?height=400&width=600&text=Mapa+no+disponible"
        }}
      />
    </div>
  )
}

