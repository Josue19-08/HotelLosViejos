"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Check, ArrowLeft } from "lucide-react"
import { format, differenceInDays } from "date-fns"
import { es } from "date-fns/locale"
import { roomTypes } from "@/lib/data"
import Image from "next/image"

export function ReservationForm() {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined)
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined)
  const [roomType, setRoomType] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [nights, setNights] = useState<number>(0)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [step, setStep] = useState<number>(1)
  const [reservationNumber, setReservationNumber] = useState<string>("")

  // Campos para el segundo paso
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [creditCard, setCreditCard] = useState<string>("")
  const [formattedCreditCard, setFormattedCreditCard] = useState<string>("")

  const handleCreditCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")

    setCreditCard(value)

    // Aplicar formato para la visualización (XXXX XXXX XXXX XXXX)
    let formatted = ""
    for (let i = 0; i < value.length && i < 16; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += " "
      }
      formatted += value[i]
    }

    setFormattedCreditCard(formatted)
  }

  // Calcular noches y precio total cuando cambian las fechas o el tipo de habitación
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const nightsCount = differenceInDays(checkOutDate, checkInDate)
      setNights(nightsCount)

      if (roomType && nightsCount > 0) {
        const room = roomTypes.find((r) => r.id === roomType)
        if (room) {
          setSelectedRoom(room)
          setTotalPrice(room.price * nightsCount)
        }
      }
    } else {
      setNights(0)
      setTotalPrice(0)
    }
  }, [checkInDate, checkOutDate, roomType])

  const handleFirstStep = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar que se hayan seleccionado todas las opciones
    if (!checkInDate || !checkOutDate || !roomType) {
      alert("Por favor complete todos los campos")
      return
    }

    // Validar que la fecha de salida sea posterior a la de entrada
    if (checkOutDate <= checkInDate) {
      alert("La fecha de salida debe ser posterior a la fecha de entrada")
      return
    }

    // Avanzar al segundo paso
    setStep(2)
  }

  const handleSecondStep = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar que se hayan completado todos los campos
    if (!firstName || !lastName || !email || !creditCard) {
      alert("Por favor complete todos los campos")
      return
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Por favor ingrese un email válido")
      return
    }

    // Validar que la tarjeta tenga al menos 13 dígitos (estándar mínimo)
    if (creditCard.length < 13) {
      alert("Por favor ingrese un número de tarjeta válido")
      return
    }

    setIsSubmitting(true)

    // Simulación de envío de formulario
    setTimeout(() => {
      // Generar un número de reserva aleatorio
      const generatedNumber =
        Math.random().toString(36).substring(2, 10).toUpperCase() +
        Math.floor(Math.random() * 1000000)
          .toString()
          .padStart(6, "0")
      setReservationNumber(generatedNumber)

      setIsSubmitting(false)
      setFormSubmitted(true)

      // No resetear el formulario inmediatamente para que el usuario pueda ver la confirmación
    }, 1500)
  }

  const goBack = () => {
    setStep(1)
  }

  if (formSubmitted) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-playfair font-bold text-teal-700 mb-6">Reservacion realizada!</h2>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 space-y-6">
          <p className="text-xl font-medium">
            Gracias <strong>{firstName}</strong>!! Su reservacion fue realizada exitosamente.
          </p>

          <p className="font-medium">
            Numero de reservacion: <span className="font-mono">{reservationNumber}</span>
          </p>

          <p>
            Acabamos de enviar esta informacion a la direccion <strong>{email}</strong> para mayor facilidad.
          </p>

          <div className="pt-8">
            <p className="font-medium">Gracias por preferirnos!</p>
          </div>
        </div>
      </div>
    )
  }

  // Determinar si mostrar el ticket de reserva en el primer paso
  const showTicket = checkInDate || checkOutDate || roomType

  return (
    <>
      {step === 1 && (
        <div className="grid md:grid-cols-2 gap-8">
          <form onSubmit={handleFirstStep} className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="check-in" className="block text-sm font-medium text-gray-700">
                  Fecha de Llegada
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal" id="check-in">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkInDate ? format(checkInDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkInDate}
                      onSelect={setCheckInDate}
                      locale={es}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label htmlFor="check-out" className="block text-sm font-medium text-gray-700">
                  Fecha de Salida
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal" id="check-out">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOutDate ? format(checkOutDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkOutDate}
                      onSelect={setCheckOutDate}
                      locale={es}
                      initialFocus
                      disabled={(date) => date < (checkInDate || new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label htmlFor="room-type" className="block text-sm font-medium text-gray-700">
                  Tipo de Habitación
                </label>
                <Select value={roomType} onValueChange={setRoomType}>
                  <SelectTrigger id="room-type">
                    <SelectValue placeholder="Seleccione tipo de habitación" />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name} - ${type.price}/noche
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white px-8">
                Aceptar
              </Button>
            </div>
          </form>

          {/* Ticket de reserva */}
          {showTicket && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transform transition-all duration-300 hover:shadow-lg">
              <div className="bg-teal-600 text-white p-4">
                <h3 className="text-lg font-bold">Resumen de Reserva</h3>
              </div>

              <div className="p-4">
                {/* Detalles de la reserva */}
                <div className="space-y-4">
                  {/* Fechas */}
                  <div className="grid grid-cols-2 gap-2 border-b pb-3">
                    <div>
                      <p className="text-sm text-gray-500">Llegada</p>
                      <p className="font-medium">
                        {checkInDate ? format(checkInDate, "dd/MM/yyyy") : "No seleccionada"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Salida</p>
                      <p className="font-medium">
                        {checkOutDate ? format(checkOutDate, "dd/MM/yyyy") : "No seleccionada"}
                      </p>
                    </div>
                  </div>

                  {/* Habitación seleccionada */}
                  {selectedRoom && (
                    <div className="border-b pb-3">
                      <p className="text-sm text-gray-500">Habitación</p>
                      <div className="flex items-center mt-1">
                        <div className="relative h-16 w-16 rounded overflow-hidden mr-3">
                          <Image
                            src={selectedRoom.images[0].src || "/placeholder.svg?height=64&width=64"}
                            alt={selectedRoom.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{selectedRoom.name}</p>
                          <p className="text-sm text-gray-500">${selectedRoom.price} por noche</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Detalles de la estancia */}
                  {nights > 0 && (
                    <div className="border-b pb-3">
                      <p className="text-sm text-gray-500">Detalles de la estancia</p>
                      <div className="mt-1">
                        <div className="flex justify-between">
                          <p>Noches</p>
                          <p>{nights}</p>
                        </div>
                        {selectedRoom && (
                          <div className="flex justify-between">
                            <p>Precio por noche</p>
                            <p>${selectedRoom.price.toFixed(2)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Total */}
                  {totalPrice > 0 && (
                    <div className="pt-2">
                      <div className="flex justify-between items-center font-bold text-lg">
                        <p>Total</p>
                        <p>${totalPrice.toFixed(2)}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Impuestos incluidos</p>
                    </div>
                  )}

                  {/* Características incluidas */}
                  {selectedRoom && (
                    <div className="mt-4 pt-3 border-t">
                      <p className="text-sm font-medium text-gray-700 mb-2">Incluye:</p>
                      <ul className="space-y-1">
                        {selectedRoom.amenities.slice(0, 3).map((amenity: string, index: number) => (
                          <li key={index} className="flex items-start text-sm">
                            <Check className="h-4 w-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{amenity}</span>
                          </li>
                        ))}
                        {selectedRoom.amenities.length > 3 && (
                          <li className="text-sm text-teal-600">+ {selectedRoom.amenities.length - 3} más</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Pie del ticket */}
              <div className="bg-gray-50 p-4 text-center text-sm text-gray-500">
                <p>Esta es una vista previa de su reserva</p>
              </div>
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <button onClick={goBack} className="flex items-center text-teal-600 hover:text-teal-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver
          </button>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Habitación Disponible</h3>

              {selectedRoom && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                  <div className="relative h-48 w-full">
                    <Image
                      src={selectedRoom.images[0].src || "/placeholder.svg?height=200&width=300"}
                      alt={selectedRoom.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg mb-2">{selectedRoom.name}</h4>
                    <p className="text-gray-600 mb-3">{selectedRoom.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedRoom.amenities.slice(0, 4).map((amenity: string, index: number) => (
                        <span key={index} className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 text-amber-800">
                <p className="font-medium">Monto de su reservación: ${totalPrice.toFixed(2)}</p>
                <p className="text-sm mt-1">
                  {nights} {nights === 1 ? "noche" : "noches"} ({checkInDate && format(checkInDate, "dd/MM/yyyy")} -{" "}
                  {checkOutDate && format(checkOutDate, "dd/MM/yyyy")})
                </p>
              </div>
            </div>

            <div>
              <form onSubmit={handleSecondStep} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                    Nombre:
                  </label>
                  <Input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                    Apellidos:
                  </label>
                  <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email:
                  </label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="credit-card" className="block text-sm font-medium text-gray-700">
                    Tarjeta de Crédito:
                  </label>
                  <Input
                    id="credit-card"
                    value={formattedCreditCard}
                    onChange={handleCreditCardChange}
                    placeholder="XXXX XXXX XXXX XXXX"
                    maxLength={19} // 16 dígitos + 3 espacios
                    required
                  />
                </div>

                <div className="flex justify-between pt-6">
                  <Button type="button" variant="outline" onClick={goBack}>
                    Cancelar
                  </Button>

                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Procesando...
                      </>
                    ) : (
                      "Aceptar"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

