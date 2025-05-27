import { useEffect, useState } from "react"
import type { PublicidadBase } from "@/types/Publicidad"

export function usePublicidadForm(initial: PublicidadBase | null) {
  const [formData, setFormData] = useState<PublicidadBase>({
    id: 0,
    titulo: "",
    imagen: "/placeholder.svg?height=300&width=500",
    enlace: "",
  })

  const [previewUrl, setPreviewUrl] = useState(formData.imagen)

  useEffect(() => {
    if (initial) {
      setFormData(initial)
      setPreviewUrl(initial.imagen)
    }
  }, [initial])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev: PublicidadBase) => ({ ...prev, [name]: value }))
  }

  const handleApplyImage = () => {
    setPreviewUrl(formData.imagen)
  }

  return {
    formData,
    previewUrl,
    handleChange,
    handleApplyImage,
    setFormData,
  }
}
