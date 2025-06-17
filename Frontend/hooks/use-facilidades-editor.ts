import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useFacilidad } from "@/hooks/use-facilidades"
import { updateFacilities, registerFacilities } from "@/lib/FacilidadData"
import type { FacilidadBase } from "@/types/Facilidad"

interface FacilidadesData {
  facilidades: FacilidadBase[]
}

export function useFacilidadesEditor(onChange?: (data: FacilidadesData) => void) {
  const { facilidades } = useFacilidad()
  const [data, setData] = useState<FacilidadesData>({ facilidades: [] })

  // Estado para saber si se está guardando y qué índice
  const [isSaving, setIsSaving] = useState(false)
  const [savingIndex, setSavingIndex] = useState<number | null>(null)

  useEffect(() => {
    if (facilidades?.length > 0 && data.facilidades.length === 0) {
      setData({ facilidades })
    }
  }, [facilidades])

  const notifyChange = (newData: FacilidadesData) => {
    setData(newData)
    onChange?.(newData)
  }

  const handleChange = (index: number, field: keyof FacilidadBase, value: string) => {
    const copy = [...data.facilidades]
    copy[index] = { ...copy[index], [field]: value }
    notifyChange({ facilidades: copy })
  }

  const handleAdd = () => {
    const nueva = {
      id: uuidv4(),
      titulo: "",
      descripcion: "",
      nombreImagen: "/placeholder.svg?height=300&width=400",
    }
    notifyChange({ facilidades: [...data.facilidades, nueva] })
  }

  const handleRemove = (index: number) => {
    const copy = [...data.facilidades]
    copy.splice(index, 1)
    notifyChange({ facilidades: copy })
  }

  const handleReorder = (index: number, dir: "up" | "down") => {
    if ((dir === "up" && index === 0) || (dir === "down" && index === data.facilidades.length - 1)) return
    const next = dir === "up" ? index - 1 : index + 1
    const copy = [...data.facilidades]
    ;[copy[index], copy[next]] = [copy[next], copy[index]]
    notifyChange({ facilidades: copy })
  }

  const handleSave = async (index: number) => {
    setIsSaving(true)
    setSavingIndex(index)
    const facilidad = data.facilidades[index]

    try {
      if (!facilidad.id) {
        const nueva = { ...facilidad }
        delete nueva._uuid
        await registerFacilities(nueva)
        alert("Facilidad registrada con éxito")
      } else {
        await updateFacilities(facilidad)
        alert("Cambios guardados con éxito")
      }
    } catch (error) {
      console.error("Error al guardar cambios:", error)
      alert("Error al guardar cambios")
    }

    setIsSaving(false)
    setSavingIndex(null)
    // No recomiendo recargar la página, mejor actualizar localmente
    // window.location.reload()
  }

  return {
    facilidades: data.facilidades,
    isSaving,
    savingIndex,
    handleChange,
    handleAdd,
    handleRemove,
    handleReorder,
    handleSave,
  }
}
