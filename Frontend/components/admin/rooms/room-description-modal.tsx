"use client"

import { useState } from "react"
import { X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

// Descripciones iniciales para cada tipo de habitación
const initialDescriptions = {
  standard:
    "Habitación Standard con todas las comodidades básicas. Incluye una cama matrimonial, baño privado, aire acondicionado, TV y acceso a WiFi.",
  junior:
    "Habitación Junior con espacio adicional y vistas parciales al mar. Incluye una cama king size, baño privado con amenidades premium, aire acondicionado, TV de pantalla plana y acceso a WiFi de alta velocidad.",
  deluxe:
    "Habitación Deluxe con vistas panorámicas al océano. Incluye una cama king size, sala de estar, baño privado con jacuzzi, aire acondicionado, TV de pantalla plana, minibar y acceso a WiFi de alta velocidad.",
}

// Títulos para mostrar en el modal
const roomTypeTitles = {
  standard: "Standard",
  junior: "Junior",
  deluxe: "Deluxe",
}

interface RoomDescriptionModalProps {
  roomType: string
  onClose: () => void
  onSave: (description: string) => void
}

export function RoomDescriptionModal({ roomType, onClose, onSave }: RoomDescriptionModalProps) {
  const [description, setDescription] = useState(
    initialDescriptions[roomType as keyof typeof initialDescriptions] || "",
  )
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)

    // Simulación de guardado
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSave(description)
    setIsSaving(false)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-bold text-gray-800">
            Cambiar descripción - {roomTypeTitles[roomType as keyof typeof roomTypeTitles] || roomType}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción de la habitación</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
              className="w-full"
              placeholder="Ingrese la descripción de la habitación..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
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
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Guardar cambios
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

