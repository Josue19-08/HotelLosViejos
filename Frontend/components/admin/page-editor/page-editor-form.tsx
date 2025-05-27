"use client"

import { Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ContentEditor } from "./content-editor"
import { ImageEditor } from "./image-editor"
import { usePageEditorForm } from "@/hooks/use-page-editor-form"
import { ButtonLoader } from "@/components/ui/button-loader"

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
  const {
    formData,
    isSaving,
    handleChange,
    handleContentChange,
    handleImageChange,
    handleSubmit,
  } = usePageEditorForm(initialData, onSave)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
            Título de la página
          </label>
          <Input
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <ContentEditor content={formData.contenido} onChange={handleContentChange} />
        <ImageEditor currentImageUrl={formData.imagenUrl} onImageChange={handleImageChange} />
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button type="submit" className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2" disabled={isSaving}>
          {isSaving ? (
            <>
              <ButtonLoader />
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
