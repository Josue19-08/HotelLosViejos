"use client"

import type React from "react"

import { useState } from "react"
import { Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ContentEditor } from "./content-editor"
import { ImageEditor } from "./image-editor"

interface PageData {
  titulo: string
  contenido: string
  imagenUrl: string
}

interface PageEditorFormProps {
  initialData: PageData
  onSave: (data: PageData) => Promise<void>
}

export function PageEditorForm({ initialData, onSave }: PageEditorFormProps) {
  const [formData, setFormData] = useState<PageData>(initialData)
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, contenido: content }))
  }

  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => ({ ...prev, imagenUrl: imageUrl }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      await onSave(formData)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
            Título de la página
          </label>
          <Input id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} className="w-full" />
        </div>

        <ContentEditor content={formData.contenido} onChange={handleContentChange} />

        <ImageEditor currentImageUrl={formData.imagenUrl} onImageChange={handleImageChange} />
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button type="submit" className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2" disabled={isSaving}>
          {isSaving ? (
            <>
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
              Guardando...
            </>
          ) : (
            <>
              <Save size={16} />
              Guardar cambios
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

