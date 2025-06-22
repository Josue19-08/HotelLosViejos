"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useImageEditor } from "@/hooks/use-image-editor"
import { ImagePreview } from "./image-preview"

interface ImageEditorProps {
  label?: string
  currentImageUrl: string
  onImageChange: (newImageUrl: string) => void
  compact?: boolean
}

export function ImageEditor({
  label = "Imagen",
  currentImageUrl,
  onImageChange,
  compact = false,
}: ImageEditorProps) {
  const {
    newImageUrl,
    previewImageUrl,
    handleImageUrlChange,
    handlePreviewImage,
    handleApplyImage,
    handleCancelImage,
  } = useImageEditor(currentImageUrl, onImageChange)

  if (compact) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <ImagePreview url={previewImageUrl} alt={label} height="h-[120px]" size={32} emptyLabel="" />
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="URL de la imagen"
            value={newImageUrl}
            onChange={(e) => handleImageUrlChange(e.target.value)}
            className="flex-1 text-xs"
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
          <ImagePreview url={previewImageUrl} alt={label} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Enlace de imagen</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="URL de la imagen"
                value={newImageUrl}
                onChange={(e) => handleImageUrlChange(e.target.value)}
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
