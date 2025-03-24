import { Car, Bus, Plane, Ship } from "lucide-react"
import type { TransportOption } from "@/types"

interface TransportOptionsProps {
  transportOptions: TransportOption[]
}

export function TransportOptions({ transportOptions }: TransportOptionsProps) {
  const getTransportIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "car":
        return <Car className="h-6 w-6 text-teal-600" />
      case "bus":
        return <Bus className="h-6 w-6 text-teal-600" />
      case "plane":
        return <Plane className="h-6 w-6 text-teal-600" />
      case "boat":
        return <Ship className="h-6 w-6 text-teal-600" />
      default:
        return <Car className="h-6 w-6 text-teal-600" />
    }
  }

  return (
    <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
      <h2 className="text-2xl font-playfair font-bold text-teal-700 mb-4">Opciones de transporte</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {transportOptions.map((option, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${0.8 + index * 0.1}s` }}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-teal-50 rounded-full">{getTransportIcon(option.type)}</div>

              <div>
                <h3 className="font-bold text-teal-700 mb-1">{option.title}</h3>
                <p className="text-gray-600 text-sm">{option.description}</p>

                {option.details && (
                  <ul className="mt-2 space-y-1">
                    {option.details.map((detail, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start">
                        <span className="mr-2 text-teal-500">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

