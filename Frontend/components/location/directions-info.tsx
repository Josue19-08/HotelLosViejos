import { MapPin } from "lucide-react"

interface DirectionsInfoProps {
  directions: string[]
}

export function DirectionsInfo({ directions }: DirectionsInfoProps) {
  return (
    <div
      className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 animate-fade-in-up"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="flex items-start gap-3 mb-4">
        <MapPin
          className="h-6 w-6 text-teal-600 mt-1 flex-shrink-0 animate-bounce"
          style={{ animationDuration: "2s" }}
        />
        <h2 className="text-2xl font-playfair font-bold text-teal-700">Cómo encontrarnos</h2>
      </div>

      <div className="space-y-4 text-gray-700">
        {directions.map((paragraph, index) => (
          <p key={index} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}

