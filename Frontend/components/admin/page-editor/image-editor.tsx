"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ImageIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ImageEditorProps {
  label?: string
  currentImageUrl: string
  onImageChange: (newImageUrl: string) => void
  compact?: boolean
}

export function ImageEditor({ label = "Imagen", currentImageUrl, onImageChange, compact = false }: ImageEditorProps) {
  const [newImageUrl, setNewImageUrl] = useState("")
  const [previewImageUrl, setPreviewImageUrl] = useState("")

  useEffect(() => {
    setPreviewImageUrl(currentImageUrl)
  }, [currentImageUrl])

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewImageUrl(e.target.value)
  }

  const handlePreviewImage = () => {
    if (newImageUrl) {
      setPreviewImageUrl(newImageUrl)
    }
  }

  const handleApplyImage = () => {
    if (newImageUrl) {
      onImageChange(newImageUrl)
      setNewImageUrl("")
    }
  }

  const handleCancelImage = () => {
    setNewImageUrl("")
    setPreviewImageUrl(currentImageUrl)
  }

  if (compact) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <div className="border rounded-md overflow-hidden bg-gray-50 flex items-center justify-center h-[120px]">
          {previewImageUrl ? (
            <img
              src={previewImageUrl || "/placeholder.svg"}
              alt={label}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <ImageIcon size={32} strokeWidth={1} />
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="URL de la imagen"
            value={newImageUrl}
            onChange={handleImageUrlChange}
            className="flex-1 text-xs"
            size={10}
          />
          <Button type="button" size="sm" variant="outline" onClick={handlePreviewImage} className="text-xs">
            Ver
          </Button>
          <Button type="button" size="sm" onClick={handleApplyImage} className="bg-teal-600 hover:bg-teal-700 text-xs">
            Aplicar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-2">
      <label className="block text-sm font-medium text-gray-700 mb-3">{label}</label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Imagen actual</h3>
          <div className="border rounded-md overflow-hidden bg-gray-50 flex items-center justify-center h-[200px]">
            {previewImageUrl ? (
              <img
                src={previewImageUrl || "/placeholder.svg"}
                alt={label}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-400">
                <ImageIcon size={48} strokeWidth={1} />
                <span className="text-sm mt-2">No hay imagen</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Enlace de imagen</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="URL de la imagen"
                value={newImageUrl}
                onChange={handleImageUrlChange}
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={handlePreviewImage}>
                Previsualizar
              </Button>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={handleCancelImage}>
                Cancelar
              </Button>
              <Button type="button" onClick={handleApplyImage} className="bg-teal-600 hover:bg-teal-700">
                Aceptar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

