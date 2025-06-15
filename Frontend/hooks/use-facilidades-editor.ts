import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { useFacilidad } from "@/hooks/use-facilidades"
import { updateFacilities, registerFacilities, deleteFacility } from "@/lib/FacilidadData"
import type { FacilidadBase } from "@/types/Facilidad"

interface FacilidadesData {
  facilidades: FacilidadBase[]
}

export function useFacilidadesEditor(onChange?: (data: FacilidadesData) => void) {
  const { facilidades } = useFacilidad()
  const [data, setData] = useState<FacilidadesData>({ facilidades: [] })
  const [isSaving, setIsSaving] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [indexToDelete, setIndexToDelete] = useState<number | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)

  // Nuevo estado para mensajes de feedback
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null)

  useEffect(() => {
    if (facilidades?.length > 0 && data.facilidades.length === 0) {
      setData({ facilidades })
    }
  }, [facilidades])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [message])


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
    const nueva: FacilidadBase = {
      id: uuidv4(),
      titulo: "",
      descripcion: "",
      nombreImagen: "/placeholder.svg?height=300&width=400",
    }
    notifyChange({ facilidades: [...data.facilidades, nueva] })
  }

  const handleRemove = (index: number) => {
    setIndexToDelete(index)
    setShowConfirmDelete(true)
  }

  const confirmDelete = async () => {
    if (indexToDelete === null) return

    const facilidad = data.facilidades[indexToDelete]

    try {
      if (facilidad.id && typeof facilidad.id === "number") {
        await deleteFacility(facilidad.id)
      }
      const copy = [...data.facilidades]
      copy.splice(indexToDelete, 1)
      notifyChange({ facilidades: copy })
      setShowConfirmDelete(false)
      setIndexToDelete(null)
      setMessage("Facilidad eliminada con éxito")
      setMessageType("success")
    } catch (error) {
      console.error("Error al eliminar facilidad:", error)
      setMessage("Error al eliminar la facilidad")
      setMessageType("error")
    }
  }

  const handleReorder = (index: number, dir: "up" | "down") => {
    if ((dir === "up" && index === 0) || (dir === "down" && index === data.facilidades.length - 1)) return

    const next = dir === "up" ? index - 1 : index + 1
    const copy = [...data.facilidades]
    ;[copy[index], copy[next]] = [copy[next], copy[index]]
    notifyChange({ facilidades: copy })
  }

  const validateFacilidad = (facilidad: FacilidadBase): string | null => {
    if (!facilidad.titulo.trim()) {
      return "El título no puede estar vacío."
    }
    if (!facilidad.descripcion.trim()) {
      return "La descripción no puede estar vacía."
    }
    if (!facilidad.nombreImagen || facilidad.nombreImagen.includes("placeholder.svg")) {
      return "Por favor selecciona una imagen válida."
    }
    return null
  }

  const handleSave = async (index: number) => {
    const facilidad = data.facilidades[index]
    const error = validateFacilidad(facilidad)

    if (error) {
      setValidationError(error)
      return
    }

    setIsSaving(true)

    try {
      const isNew = typeof facilidad.id !== "number"
      if (isNew) {
        const nueva = { ...facilidad }
        delete nueva._uuid
        await registerFacilities(nueva)
        setMessage("Facilidad registrada con éxito")
        setMessageType("success")
      } else {
        await updateFacilities(facilidad)
        setMessage("Cambios guardados con éxito")
        setMessageType("success")
      }
    } catch (error) {
      console.error("Error al guardar cambios:", error)
      setMessage(`Error al guardar cambios: ${error instanceof Error ? error.message : error}`)
      setMessageType("error")
    }

    setIsSaving(false)
    // No recargar la página para preservar estado y mostrar mensaje
     window.location.reload()
  }

  return {
    facilidades: data.facilidades,
    isSaving,
    validationError,
    setValidationError,
    message,
    setMessage,
    messageType,
    setMessageType,
    handleChange,
    handleAdd,
    handleRemove,
    handleReorder,
    handleSave,
    showConfirmDelete,
    setShowConfirmDelete,
    confirmDelete,
  }
}
