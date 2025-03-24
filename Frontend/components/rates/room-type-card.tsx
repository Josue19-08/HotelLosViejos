import Image from "next/image"

import { Check } from "lucide-react"
import type { RoomType } from "@/types"

interface RoomTypeCardProps {
  roomType: RoomType
}

export function RoomTypeCard({ roomType }: RoomTypeCardProps) {
  const { name, description, price, capacity, amenities, images } = roomType

  // Usar la primera imagen como imagen principal
  const mainImage = images[0]

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden transform transition-all duration-500 hover:shadow-xl">
      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        <div className="relative h-[250px] md:h-full overflow-hidden group">
          <Image
            src={mainImage.src || "/placeholder.svg?height=300&width=300"}
            alt={mainImage.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap justify-between items-start mb-4">
            <h2 className="text-2xl font-playfair font-bold text-teal-700 mb-2">{name}</h2>
            <div className="text-right">
              <p className="text-sm text-gray-500">Desde</p>
              <p className="text-2xl font-bold text-teal-600">
                ${price.toFixed(2)}
                <span className="text-sm font-normal">/noche</span>
              </p>
            </div>
          </div>

          <p className="text-gray-700 mb-4">{description}</p>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Capacidad:</p>
            <p className="text-gray-700">
              {capacity.adults} {capacity.adults === 1 ? "adulto" : "adultos"}
              {capacity.children > 0 && `, ${capacity.children} ${capacity.children === 1 ? "niño" : "niños"}`}
            </p>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-600 mb-2">Características:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {amenities.map((amenity, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <Check className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0" />
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

