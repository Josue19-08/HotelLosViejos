"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageEditor } from "../image-editor"

interface HomePageData {
  titulo: string
  subtitulo: string
  descripcionBienvenida: string
  imagenHero: string
  imagenPiscina: string
}

interface HomeEditorProps {
  initialData: HomePageData
  onChange: (data: HomePageData) => void
}

export function HomeEditor({ initialData, onChange }: HomeEditorProps) {
  const [data, setData] = useState<HomePageData>(initialData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newData = { ...data, [name]: value }
    setData(newData)
    onChange(newData)
  }

  const handleImageChange = (field: keyof HomePageData, url: string) => {
    const newData = { ...data, [field]: url }
    setData(newData)
    onChange(newData)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4 border-b pb-6">
        <h3 className="text-md font-medium text-gray-700">Sección Hero</h3>

        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
            Título principal
          </label>
          <Input id="titulo" name="titulo" value={data.titulo} onChange={handleChange} className="w-full" />
        </div>

        <div>
          <label htmlFor="subtitulo" className="block text-sm font-medium text-gray-700 mb-1">
            Subtítulo
          </label>
          <Textarea
            id="subtitulo"
            name="subtitulo"
            value={data.subtitulo}
            onChange={handleChange}
            rows={2}
            className="w-full"
          />
        </div>

        <ImageEditor
          label="Imagen de fondo (Hero)"
          currentImageUrl={data.imagenHero}
          onImageChange={(url) => handleImageChange("imagenHero", url)}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-md font-medium text-gray-700">Sección Bienvenida</h3>

        <div>
          <label htmlFor="descripcionBienvenida" className="block text-sm font-medium text-gray-700 mb-1">
            Texto de bienvenida
          </label>
          <Textarea
            id="descripcionBienvenida"
            name="descripcionBienvenida"
            value={data.descripcionBienvenida}
            onChange={handleChange}
            rows={8}
            className="w-full"
          />
        </div>

        <ImageEditor
          label="Imagen de la piscina"
          currentImageUrl={data.imagenPiscina}
          onImageChange={(url) => handleImageChange("imagenPiscina", url)}
        />
      </div>
    </div>
  )
}

