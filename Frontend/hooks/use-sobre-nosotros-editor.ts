import { useState, useEffect } from "react"
import { useInformacion } from "@/hooks/use-informacion"
import { useGaleria } from "@/hooks/use-galeria"
import { updateInformation } from "@/lib/Informacion"
import { updateGaleries } from "@/lib/GaleriaData"
import type { InformacionBase } from "@/types/Informacion"
import isEqual from "lodash/isEqual"

// ✅ ID ahora puede ser null o no estar definido
export interface ImagenGaleria {
  id?: number | null
  descripcion?: string
  nombreImagen: string
}

interface InformacionConGaleria extends InformacionBase {
  imagenesGaleria: ImagenGaleria[]
}

export function useSobreNosotrosEditor() {
  const info = useInformacion()
  const { galerias } = useGaleria()

  const [data, setData] = useState<InformacionConGaleria>({
    id: info.id,
    textoSobreNosotros: info.textoSobreNosotros ?? "",
    textoBienvenida: info.textoBienvenida ?? "",
    nombre: info.nombre ?? "",
    nombreImagenBienvenida: info.nombreImagenBienvenida ?? "",
    imagenesGaleria: galerias
      ? galerias.map(g => ({
          id: g.id ?? null,
          nombreImagen: g.nombreImagen ?? "",
          descripcion: g.descripcion ?? "",
        }))
      : [],
  })

  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!info.id || !galerias) return

    const nuevaData = {
      id: info.id,
      textoSobreNosotros: info.textoSobreNosotros ?? "",
      textoBienvenida: info.textoBienvenida ?? "",
      nombre: info.nombre ?? "",
      nombreImagenBienvenida: info.nombreImagenBienvenida ?? "",
      imagenesGaleria: galerias.map(g => ({
        id: g.id ?? null,
        nombreImagen: g.nombreImagen ?? "",
        descripcion: g.descripcion ?? "",
      })),
    }

    if (!isEqual(data, nuevaData)) {
      setData(nuevaData)
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
    const { imagenesGaleria } = data
    console.log(imagenesGaleria)
    await updateGaleries(imagenesGaleria)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    alert("Cambios guardados con éxito")
    window.location.reload()
  }

  const handleAddImage = () => {
    const nueva: ImagenGaleria = {
      id: null,
      nombreImagen: "/placeholder.svg?height=200&width=300",
      descripcion: "",
    }
    setData(prev => ({
      ...prev,
      imagenesGaleria: [...prev.imagenesGaleria, nueva],
    }))
  }

  const handleRemoveImage = (id: number | null | undefined) => {
    setData(prev => ({
      ...prev,
      imagenesGaleria: prev.imagenesGaleria.filter(img => img.id !== id),
    }))
  }

  const handleImageTitleChange = (id: number | null | undefined, titulo: string) => {
    setData(prev => ({
      ...prev,
      imagenesGaleria: prev.imagenesGaleria.map(img =>
        img.id === id ? { ...img, descripcion: titulo } : img
      ),
    }))
  }

  const handleImageUrlChange = (id: number | null | undefined, url: string) => {
    setData(prev => ({
      ...prev,
      imagenesGaleria: prev.imagenesGaleria.map(img =>
        img.id === id ? { ...img, nombreImagen: url } : img
      ),
    }))
  }

  const moveImage = (id: number | null | undefined, direction: "up" | "down") => {
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
