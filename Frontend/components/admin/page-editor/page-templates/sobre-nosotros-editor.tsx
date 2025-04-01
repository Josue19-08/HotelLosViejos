"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageEditor } from "../image-editor"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, MoveUp, MoveDown } from "lucide-react"

interface ImagenGaleria {
  id: string
  url: string
  titulo?: string
}

interface SobreNosotrosData {
  historia: string
  imagenPrincipal: string
  imagenesGaleria: ImagenGaleria[]
}

interface SobreNosotrosEditorProps {
  initialData: SobreNosotrosData
  onChange: (data: SobreNosotrosData) => void
}

export function SobreNosotrosEditor({ initialData, onChange }: SobreNosotrosEditorProps) {
  const [data, setData] = useState<SobreNosotrosData>(initialData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newData = { ...data, [name]: value }
    setData(newData)
    onChange(newData)
  }

  const handleImageChange = (field: keyof SobreNosotrosData, url: string) => {
    const newData = { ...data, [field]: url }
    setData(newData)
    onChange(newData)
  }

  const handleAddImage = () => {
    const newImage: ImagenGaleria = {
      id: Date.now().toString(),
      url: "/placeholder.svg?height=200&width=300",
      titulo: "",
    }

    const newData = {
      ...data,
      imagenesGaleria: [...data.imagenesGaleria, newImage],
    }

    setData(newData)
    onChange(newData)
  }

  const handleRemoveImage = (id: string) => {
    const newData = {
      ...data,
      imagenesGaleria: data.imagenesGaleria.filter((img) => img.id !== id),
    }

    setData(newData)
    onChange(newData)
  }

  const handleImageTitleChange = (id: string, titulo: string) => {
    const newData = {
      ...data,
      imagenesGaleria: data.imagenesGaleria.map((img) => (img.id === id ? { ...img, titulo } : img)),
    }

    setData(newData)
    onChange(newData)
  }

  const handleImageUrlChange = (id: string, url: string) => {
    const newData = {
      ...data,
      imagenesGaleria: data.imagenesGaleria.map((img) => (img.id === id ? { ...img, url } : img)),
    }

    setData(newData)
    onChange(newData)
  }

  const moveImage = (id: string, direction: "up" | "down") => {
    const index = data.imagenesGaleria.findIndex((img) => img.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === data.imagenesGaleria.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const newImagenes = [...data.imagenesGaleria]
    const temp = newImagenes[index]
    newImagenes[index] = newImagenes[newIndex]
    newImagenes[newIndex] = temp

    const newData = {
      ...data,
      imagenesGaleria: newImagenes,
    }

    setData(newData)
    onChange(newData)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium text-gray-800 mb-2">Contenido principal</h2>
        <label htmlFor="historia" className="block text-sm font-medium text-gray-700 mb-1">
          Historia del hotel
        </label>
        <Textarea
          id="historia"
          name="historia"
          value={data.historia}
          onChange={handleChange}
          rows={10}
          className="w-full"
        />
      </div>

      <div className="border-t pt-6">
        <div className="mb-4">
          <h2 className="text-xl font-medium text-gray-800 mb-2">Nuestra Galería</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen principal de la galería</label>
            <ImageEditor
              currentImageUrl={data.imagenPrincipal}
              onImageChange={(url) => handleImageChange("imagenPrincipal", url)}
            />
          </div>

          <div className="border-t pt-4 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-md font-medium text-gray-700">Imágenes de la galería</h3>
              <Button
                type="button"
                onClick={handleAddImage}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus size={16} />
                Agregar imagen
              </Button>
            </div>

            {data.imagenesGaleria.length === 0 ? (
              <div className="text-center py-8 border rounded-md bg-gray-50">
                <p className="text-gray-500">No hay imágenes en la galería</p>
                <Button
                  type="button"
                  onClick={handleAddImage}
                  variant="outline"
                  size="sm"
                  className="mt-2 flex items-center gap-1 mx-auto"
                >
                  <Plus size={16} />
                  Agregar imagen
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {data.imagenesGaleria.map((imagen, index) => (
                  <div key={imagen.id} className="border rounded-md p-4 relative">
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-gray-500 hover:text-blue-500"
                        onClick={() => moveImage(imagen.id, "up")}
                        disabled={index === 0}
                      >
                        <MoveUp size={16} />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-gray-500 hover:text-blue-500"
                        onClick={() => moveImage(imagen.id, "down")}
                        disabled={index === data.imagenesGaleria.length - 1}
                      >
                        <MoveDown size={16} />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-gray-500 hover:text-red-500"
                        onClick={() => handleRemoveImage(imagen.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div>
                        <img
                          src={imagen.url || "/placeholder.svg"}
                          alt={imagen.titulo || "Imagen de galería"}
                          className="w-full h-40 object-cover rounded-md"
                        />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Título de la imagen (opcional)
                          </label>
                          <Input
                            value={imagen.titulo || ""}
                            onChange={(e) => handleImageTitleChange(imagen.id, e.target.value)}
                            placeholder="Ej: Playa, Atardecer, etc."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">URL de la imagen</label>
                          <div className="flex gap-2">
                            <Input
                              value={imagen.url}
                              onChange={(e) => handleImageUrlChange(imagen.id, e.target.value)}
                              placeholder="URL de la imagen"
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

