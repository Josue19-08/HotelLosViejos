"use client"

import { DateSelector } from "./date-selector"
import { RoomTypeSelector } from "./room-type-selector"
import { ReservationSummary } from "./reservation-summary"
import { AlertMessage } from "../alert"
import { Button } from "@/components/ui/button"
import type { HabitacionBase } from "@/types/Habitacion"

interface Step1Props {
  checkInDate?: Date
  checkOutDate?: Date
  roomType: string
  habitaciones: HabitacionBase[]
  selectedRoom: HabitacionBase | null
  nights: number
  totalPrice: number
  appliedOffer: { title: string; percentage: number } | null
  onCheckInChange: (d: Date) => void
  onCheckOutChange: (d: Date) => void
  onRoomTypeChange: (id: string) => void
  onSubmit: (e: React.FormEvent) => void
  alert: { type: string; title: string; message: string } | null
}

export function Step1({
  checkInDate,
  checkOutDate,
  roomType,
  habitaciones,
  selectedRoom,
  nights,
  totalPrice,
  appliedOffer,
  onCheckInChange,
  onCheckOutChange,
  onRoomTypeChange,
  onSubmit,
  alert
}: Step1Props) {
  const showTicket = checkInDate || checkOutDate || roomType

  return (
    <>
      {alert && <AlertMessage type={alert.type} title={alert.title} message={alert.message} />}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={onSubmit}>
            <DateSelector
              label="Fecha de Llegada"
              selectedDate={checkInDate}
              onDateChange={onCheckInChange}
              minDate={new Date()}
              id="check-in"
            />
            <DateSelector
              label="Fecha de Salida"
              selectedDate={checkOutDate}
              onDateChange={onCheckOutChange}
              minDate={checkInDate || new Date()}
              id="check-out"
            />
            <RoomTypeSelector
              roomType={roomType}
              onRoomTypeChange={onRoomTypeChange}
              habitaciones={habitaciones}
            />

            {appliedOffer && (
              <div className="mt-3 p-3 bg-green-100 text-green-800 rounded">
                Oferta: <strong>{appliedOffer.title}</strong> - {appliedOffer.percentage}% de descuento aplicado.
              </div>
            )}

            <div className="flex justify-center pt-4">
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white px-8">Continuar</Button>
            </div>
          </form>
        </div>

        {showTicket && (
          <ReservationSummary
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            selectedRoom={selectedRoom}
            nights={nights}
            totalPrice={totalPrice}
          />
        )}
      </div>
    </>
  )
}
