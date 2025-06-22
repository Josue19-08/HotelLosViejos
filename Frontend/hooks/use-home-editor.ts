import { useEffect, useState } from "react"
import { useInformacion } from "@/hooks/use-informacion"
import { updateInformation } from "@/lib/Informacion"
import type { InformacionBase } from "@/types/Informacion"

export function useHomeEditor() {
  const info = useInformacion()

  // Inicializamos en null para saber que aún no cargó la info
  const [data, setData] = useState<InformacionBase | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Cuando info esté disponible y data no esté cargada, setear data
    if (info && info.id && !data) {
      setData({ ...info })
    }
  }, [info, data])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    if (!data) return
    setData(prev => ({ ...prev!, [name]: value }))
  }

  const handleImageChange = (field: keyof InformacionBase, url: string) => {
    if (!data) return
    setData(prev => ({ ...prev!, [field]: url }))
  }

  const handleSave = async () => {
    if (!data) return
    setIsSaving(true)
    await updateInformation(data)
    await new Promise(res => setTimeout(res, 1500))
    setIsSaving(false)
    alert("Cambios guardados con éxito")
    window.location.reload()
  }

  return {
    data,
    isSaving,
    handleChange,
    handleImageChange,
    handleSave,
  }
}
