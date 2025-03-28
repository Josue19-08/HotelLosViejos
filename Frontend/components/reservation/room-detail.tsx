"use client"

import Image from "next/image"
import { format } from "date-fns"
import type { HabitacionBase } from "@/types/Habitacion"

interface RoomDetailProps {
  selectedRoom: HabitacionBase
  totalPrice: number
  nights: number
  checkInDate: Date | undefined
  checkOutDate: Date | undefined
}

export function RoomDetail({ selectedRoom, totalPrice, nights, checkInDate, checkOutDate }: RoomDetailProps) {

  console.log("selectedRoom", selectedRoom);
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Habitación Disponible</h3>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="relative h-48 w-full">
          <Image
            src={selectedRoom.nombreImagen || "/placeholder.svg?height=200&width=300"}
            alt={`Habitación ${selectedRoom.numero}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h4 className="font-bold text-lg mb-2">
            {selectedRoom.tipo === "ESTANDAR" ? "Habitación Standard" : "Suite Junior"}
          </h4>
          <p className="text-gray-600 mb-3">Habitación número {selectedRoom.numero}</p>
          <div className="flex flex-wrap gap-2">
            {selectedRoom.caracteristicas.slice(0, 4).map((caracteristica) => (
              <span key={caracteristica.id} className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded">
                {caracteristica.titulo}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 text-amber-800">
        <p className="font-medium">Monto de su reservación: ${totalPrice.toFixed(2)}</p>
        <p className="text-sm mt-1">
          {nights} {nights === 1 ? "noche" : "noches"} ({checkInDate && format(checkInDate, "dd/MM/yyyy")} -{" "}
          {checkOutDate && format(checkOutDate, "dd/MM/yyyy")})
        </p>
      </div>
    </div>
  )
}

