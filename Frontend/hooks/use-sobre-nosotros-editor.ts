import { useState, useEffect } from "react"
import { useInformacion } from "@/hooks/use-informacion"
import { useGaleria } from "@/hooks/use-galeria"
import { updateInformation } from "@/lib/Informacion"
import type { InformacionBase } from "@/types/Informacion"

export interface ImagenGaleria {
  id: string
  nombreImagen: string
  descripcion?: string
}

// 🔧 Tipo extendido para incluir imágenes de galería
interface InformacionConGaleria extends InformacionBase {
  imagenesGaleria: ImagenGaleria[]
}

export function useSobreNosotrosEditor() {
  const info = useInformacion()
  const { galerias } = useGaleria()

  const [data, setData] = useState<InformacionConGaleria>({
    id: info.id,
    textoSobreNosotros: info.textoSobreNosotros,
    textoBienvenida: info.textoBienvenida,
    nombre: info.nombre,
    nombreImagenBienvenida: info.nombreImagenBienvenida,
    imagenesGaleria: galerias
      ? galerias.map(g => ({
          id: g.id !== undefined ? String(g.id) : Date.now().toString(),
          nombreImagen: g.nombreImagen ?? "",
          descripcion: g.descripcion ?? "",
        }))
      : [],
  })

  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!data.id && info.id) {
      setData({
        ...info,
        imagenesGaleria: galerias
          ? galerias.map(g => ({
              id: g.id !== undefined ? String(g.id) : Date.now().toString(),
              nombreImagen: g.nombreImagen ?? "",
              descripcion: g.descripcion ?? "",
            }))
          : [],
      })
    }
  }, [info, galerias])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (field: keyof InformacionBase, url: string) => {
    setData(prev => ({ ...prev, [field]: url }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    await updateInformation(data)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    alert("Cambios guardados con éxito")
    window.location.reload()
  }

  const handleAddImage = () => {
    const nueva: ImagenGaleria = {
      id: Date.now().toString(),
      nombreImagen: "/placeholder.svg?height=200&width=300",
      descripcion: "",
    }
    setData(prev => ({
      ...prev,
      imagenesGaleria: [...prev.imagenesGaleria, nueva],
    }))
  }

  const handleRemoveImage = (id: string) => {
    setData(prev => ({
      ...prev,
      imagenesGaleria: prev.imagenesGaleria.filter(img => img.id !== id),
    }))
  }

  const handleImageTitleChange = (id: string, titulo: string) => {
    setData(prev => ({
      ...prev,
      imagenesGaleria: prev.imagenesGaleria.map(img =>
        img.id === id ? { ...img, descripcion: titulo } : img
      ),
    }))
  }

  const handleImageUrlChange = (id: string, url: string) => {
    setData(prev => ({
      ...prev,
      imagenesGaleria: prev.imagenesGaleria.map(img =>
        img.id === id ? { ...img, nombreImagen: url } : img
      ),
    }))
  }

  const moveImage = (id: string, direction: "up" | "down") => {
    const index = data.imagenesGaleria.findIndex(img => img.id === id)
    if (
      index === -1 ||
      (direction === "up" && index === 0) ||
      (direction === "down" && index === data.imagenesGaleria.length - 1)
    ) return

    const swapIndex = direction === "up" ? index - 1 : index + 1
    const newImages = [...data.imagenesGaleria]
    ;[newImages[index], newImages[swapIndex]] = [
      newImages[swapIndex],
      newImages[index],
    ]

    setData(prev => ({
      ...prev,
      imagenesGaleria: newImages,
    }))
  }

  return {
    data,
    isSaving,
    handleChange,
    handleImageChange,
    handleSave,
    handleAddImage,
    handleRemoveImage,
    handleImageTitleChange,
    handleImageUrlChange,
    moveImage,
  }
}
