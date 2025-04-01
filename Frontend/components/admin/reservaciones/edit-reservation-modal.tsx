"use client"

import type React from "react"

import { useState } from "react"
import { X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditReservationModalProps {
  reservation: any
  onSave: (updatedReservation: any) => void
  onCancel: () => void
}

export function EditReservationModal({ reservation, onSave, onCancel }: EditReservationModalProps) {
  const [formData, setFormData] = useState({
    ...reservation,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-bold text-gray-800">Editar Reservación</h2>
          <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Información de la reservación */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Información de la Reservación</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="id">ID de Reservación</Label>
                  <Input
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <Label htmlFor="fecha">Fecha de Reservación</Label>
                  <Input id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} />
                </div>

                <div>
                  <Label htmlFor="transaccion">ID de Transacción</Label>
                  <Input id="transaccion" name="transaccion" value={formData.transaccion} onChange={handleChange} />
                </div>

                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Select value={formData.estado} onValueChange={(value) => handleSelectChange("estado", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Confirmada">Confirmada</SelectItem>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                      <SelectItem value="Cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Información del cliente */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Información del Cliente</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                </div>

                <div>
                  <Label htmlFor="apellidos">Apellidos</Label>
                  <Input id="apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                </div>

                <div>
                  <Label htmlFor="tarjeta">Tarjeta</Label>
                  <Input
                    id="tarjeta"
                    name="tarjeta"
                    value={formData.tarjeta}
                    onChange={handleChange}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Detalles de la estancia */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Detalles de la Estancia</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fechaLlegada">Fecha de Llegada</Label>
                  <Input id="fechaLlegada" name="fechaLlegada" value={formData.fechaLlegada} onChange={handleChange} />
                </div>

                <div>
                  <Label htmlFor="fechaSalida">Fecha de Salida</Label>
                  <Input id="fechaSalida" name="fechaSalida" value={formData.fechaSalida} onChange={handleChange} />
                </div>

                <div>
                  <Label htmlFor="tipo">Habitación</Label>
                  <Select value={formData.tipo} onValueChange={(value) => handleSelectChange("tipo", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar habitación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Suite">Suite</SelectItem>
                      <SelectItem value="Deluxe">Deluxe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="border-t pt-6 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2">
                <Save className="h-4 w-4" />
                Guardar Cambios
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

