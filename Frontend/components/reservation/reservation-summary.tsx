"use client"

import Image from "next/image"
import { format } from "date-fns"
import { Check } from "lucide-react"
import type { HabitacionBase } from "@/types/Habitacion"

interface ReservationSummaryProps {
  checkInDate: Date | undefined
  checkOutDate: Date | undefined
  selectedRoom: HabitacionBase | null
  nights: number
  totalPrice: number
}

export function ReservationSummary({
  checkInDate,
  checkOutDate,
  selectedRoom,
  nights,
  totalPrice,
}: ReservationSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="bg-teal-600 text-white p-4">
        <h3 className="text-lg font-bold">Resumen de Reserva</h3>
      </div>

      <div className="p-4">
        {/* Fechas */}
        <div className="grid grid-cols-2 gap-2 border-b pb-3">
          <div>
            <p className="text-sm text-gray-500">Llegada</p>
            <p className="font-medium">{checkInDate ? format(checkInDate, "dd/MM/yyyy") : "No seleccionada"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Salida</p>
            <p className="font-medium">{checkOutDate ? format(checkOutDate, "dd/MM/yyyy") : "No seleccionada"}</p>
          </div>
        </div>

        {/* Habitación seleccionada */}
        {selectedRoom && (
          <div className="border-b pb-3 pt-3">
            <p className="text-sm text-gray-500">Habitación</p>
            <div className="flex items-center mt-1">
              <div className="relative h-16 w-16 rounded overflow-hidden mr-3">
                <Image
                  src={`/images/${selectedRoom.nombreImagen}` || "/placeholder.svg?height=64&width=64"}
                  alt={`Habitación ${selectedRoom.numero}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium">
                  {selectedRoom.tipo === "ESTANDAR" ? "Habitación Standard" : "Suite Junior"}
                </p>
                <p className="text-sm text-gray-500">${selectedRoom.tarifaDiariaBase} por noche</p>
              </div>
            </div>
          </div>
        )}

        {/* Detalles de la estancia */}
        {nights > 0 && (
          <div className="border-b pb-3 pt-3">
            <p className="text-sm text-gray-500">Detalles de la estancia</p>
            <div className="mt-1">
              <div className="flex justify-between">
                <p>Noches</p>
                <p>{nights}</p>
              </div>
              {selectedRoom && (
                <div className="flex justify-between">
                  <p>Precio por noche</p>
                  <p>${selectedRoom.tarifaDiariaBase.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Total */}
        {totalPrice > 0 && (
          <div className="pt-3">
            <div className="flex justify-between items-center font-bold text-lg">
              <p>Total</p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">Impuestos incluidos</p>
          </div>
        )}

        {/* Características incluidas */}
        {selectedRoom && selectedRoom.caracteristicas && selectedRoom.caracteristicas.length > 0 && (
          <div className="mt-4 pt-3 border-t">
            <p className="text-sm font-medium text-gray-700 mb-2">Incluye:</p>
            <ul className="space-y-1">
              {selectedRoom.caracteristicas.slice(0, 3).map((caracteristica) => (
                <li key={caracteristica.id} className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{caracteristica.titulo}</span>
                </li>
              ))}
              {selectedRoom.caracteristicas.length > 3 && (
                <li className="text-sm text-teal-600">+ {selectedRoom.caracteristicas.length - 3} más</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Pie del ticket */}
      <div className="bg-gray-50 p-4 text-center text-sm text-gray-500">
        <p>Esta es una vista previa de su reserva</p>
      </div>
    </div>
  )
}

