"use client"

import { X, Calendar, User, Mail, CreditCard, Tag, Clock, Edit, Printer, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ReservationDetailModalProps {
  reservation: any
  onClose: () => void
  onEdit: () => void
  onDelete?: () => void
  onPrint?: () => void
}

export function ReservationDetailModal({
  reservation,
  onClose,
  onEdit,
  onDelete = () => console.log(`Eliminar habitación: ${reservation.tipo}`),
  onPrint = () => console.log(`Imprimir información de habitación: ${reservation.tipo}`),
}: ReservationDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-bold text-gray-800">Detalles de la Reservación</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Información principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">ID de Reservación</h3>
                <p className="text-lg font-medium">{reservation.id}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Estado</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    reservation.estado === "Confirmada"
                      ? "bg-green-100 text-green-800"
                      : reservation.estado === "Pendiente"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {reservation.estado}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Fecha de Reservación</h3>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <p>{reservation.fecha}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Habitación</h3>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <p>{reservation.tipo}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Cliente</h3>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <p>
                    {reservation.nombre} {reservation.apellidos}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <p>{reservation.email}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Tarjeta</h3>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  <p>{reservation.tarjeta}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">ID de Transacción</h3>
                <p>{reservation.transaccion}</p>
              </div>
            </div>
          </div>

          {/* Fechas de estancia */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Fechas de Estancia</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-teal-600" />
                  <h4 className="font-medium text-gray-700">Check-in</h4>
                </div>
                <p className="text-lg">{reservation.fechaLlegada}</p>
                <p className="text-sm text-gray-500">A partir de las 15:00</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-teal-600" />
                  <h4 className="font-medium text-gray-700">Check-out</h4>
                </div>
                <p className="text-lg">{reservation.fechaSalida}</p>
                <p className="text-sm text-gray-500">Hasta las 12:00</p>
              </div>
            </div>
          </div>

          {/* Acciones de habitación */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Acciones de Habitación</h3>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-24 border-2 hover:border-red-500 hover:bg-red-50"
                onClick={onDelete}
              >
                <div className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-md mb-2">
                  <Trash2 className="h-6 w-6 text-gray-700" />
                </div>
                <span className="text-sm font-medium">Eliminar</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-24 border-2 hover:border-blue-500 hover:bg-blue-50"
                onClick={onPrint}
              >
                <div className="w-12 h-12 flex items-center justify-center border-2 border-gray-300 rounded-md mb-2">
                  <Printer className="h-6 w-6 text-gray-700" />
                </div>
                <span className="text-sm font-medium">Imprimir</span>
              </Button>
            </div>
          </div>

          {/* Acciones */}
          <div className="border-t pt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2" onClick={onEdit}>
              <Edit className="h-4 w-4" />
              Editar Reservación
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

