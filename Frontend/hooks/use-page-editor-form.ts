import { useState } from "react"

interface PageData {
  titulo: string
  contenido: string
  imagenUrl: string
}

export function usePageEditorForm(initialData: PageData, onSave: (data: PageData) => Promise<void>) {
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

  return {
    formData,
    isSaving,
    handleChange,
    handleContentChange,
    handleImageChange,
    handleSubmit,
  }
}
