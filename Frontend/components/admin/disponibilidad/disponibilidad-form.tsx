"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/admin/disponibilidad/date-picker"

interface DisponibilidadFormProps {
  onConsultar: (fechaLlegada: Date, fechaSalida: Date, tipoHabitacion: string) => void
  isLoading: boolean
}

export function DisponibilidadForm({ onConsultar, isLoading }: DisponibilidadFormProps) {
  // Fechas iniciales (hoy y dentro de 3 días)
  const today = new Date()
  const threeDaysLater = new Date()
  threeDaysLater.setDate(today.getDate() + 3)

  const [fechaLlegada, setFechaLlegada] = useState<Date>(today)
  const [fechaSalida, setFechaSalida] = useState<Date>(threeDaysLater)
  const [tipoHabitacion, setTipoHabitacion] = useState("")

  // Validar fechas
  const isValidDateRange = fechaLlegada && fechaSalida && fechaLlegada < fechaSalida

  // Manejar envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidDateRange) {
      onConsultar(fechaLlegada, fechaSalida, tipoHabitacion)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div className="space-y-2">
          <Label htmlFor="fechaLlegada">Fecha Llegada:</Label>
          <DatePicker id="fechaLlegada" date={fechaLlegada} onDateChange={setFechaLlegada} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fechaSalida">Fecha Salida:</Label>
          <DatePicker
            id="fechaSalida"
            date={fechaSalida}
            onDateChange={setFechaSalida}
            minDate={new Date(fechaLlegada.getTime() + 86400000)} // Mínimo un día después de la llegada
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipoHabitacion">Tipo de Habitacion</Label>
          <Select value={tipoHabitacion} onValueChange={setTipoHabitacion}>
            <SelectTrigger id="tipoHabitacion">
              <SelectValue placeholder="Tipo de Habitacion" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="junior">Junior</SelectItem>
              <SelectItem value="deluxe">Deluxe</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          type="submit"
          disabled={isLoading || !isValidDateRange}
          className="bg-teal-600 hover:bg-teal-700 min-w-[120px]"
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Consultando...
            </div>
          ) : (
            "Consultar"
          )}
        </Button>
      </div>
    </form>
  )
}

