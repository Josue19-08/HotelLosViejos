"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Phone, MapIcon } from "lucide-react"

interface ComoLlegarData {
  titulo: string
  descripcion: string
  direccion: string
  correo: string
  telefono: string
  codigoPostal: string
  coordenadas: {
    latitud: string
    longitud: string
  }
  instrucciones: string
}

interface ComoLlegarEditorProps {
  initialData: ComoLlegarData
  onChange: (data: ComoLlegarData) => void
}

export function ComoLlegarEditor({ initialData, onChange }: ComoLlegarEditorProps) {
  const [data, setData] = useState<ComoLlegarData>(initialData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Manejar campos anidados (coordenadas)
    if (name === "latitud" || name === "longitud") {
      const newData = {
        ...data,
        coordenadas: {
          ...data.coordenadas,
          [name]: value,
        },
      }
      setData(newData)
      onChange(newData)
    } else {
      const newData = { ...data, [name]: value }
      setData(newData)
      onChange(newData)
    }
  }

  const handleVerificarCoordenadas = () => {
    // Abrir Google Maps con las coordenadas actuales
    const url = `https://www.google.com/maps?q=${data.coordenadas.latitud},${data.coordenadas.longitud}`
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-6">

      <div className="border-t pt-6">
        <h2 className="text-xl font-medium text-gray-800 mb-4">Información de contacto</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="direccion" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <MapPin size={16} />
              Dirección completa
            </label>
            <Input
              id="direccion"
              name="direccion"
              value={data.direccion}
              onChange={handleChange}
              className="w-full"
              placeholder="Ej: San Francisco de Coyote, Guanacaste, Costa Rica"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="telefono" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Phone size={16} />
                Teléfono
              </label>
              <Input
                id="telefono"
                name="telefono"
                value={data.telefono}
                onChange={handleChange}
                className="w-full"
                placeholder="Ej: +506 2222-3333"
              />
            </div>

            <div>
              <label htmlFor="correo" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Mail size={16} />
                Correo electrónico
              </label>
              <Input
                id="correo"
                name="correo"
                value={data.correo}
                onChange={handleChange}
                className="w-full"
                placeholder="Ej: info@hotellosviejo.com"
                type="email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="codigoPostal" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <MapIcon size={16} />
              Código Postal
            </label>
            <Input
              id="codigoPostal"
              name="codigoPostal"
              value={data.codigoPostal}
              onChange={handleChange}
              className="w-full"
              placeholder="Ej: 50101"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-xl font-medium text-gray-800 mb-4">Ubicación en el mapa</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="latitud" className="block text-sm font-medium text-gray-700 mb-1">
                Latitud
              </label>
              <Input
                id="latitud"
                name="latitud"
                value={data.coordenadas.latitud}
                onChange={handleChange}
                className="w-full"
                placeholder="Ej: 9.7489"
              />
            </div>
            <div>
              <label htmlFor="longitud" className="block text-sm font-medium text-gray-700 mb-1">
                Longitud
              </label>
              <Input
                id="longitud"
                name="longitud"
                value={data.coordenadas.longitud}
                onChange={handleChange}
                className="w-full"
                placeholder="Ej: -85.2755"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleVerificarCoordenadas}
              className="flex items-center gap-2"
            >
              <MapPin size={16} />
              Verificar coordenadas en Google Maps
            </Button>
          </div>
        </div>
      </div>

      
    </div>
  )
}

