import { useEffect, useState } from "react"
import { useInformacion } from "@/hooks/use-informacion"
import { updateInformation } from "@/lib/Informacion"
import type { InformacionBase } from "@/types/Informacion"

export function useHomeEditor() {
  const info = useInformacion()

  const [data, setData] = useState<InformacionBase>({
    id: info.id,
    textoSobreNosotros: info.textoSobreNosotros,
    textoBienvenida: info.textoBienvenida,
    nombreImagenBienvenida: info.nombreImagenBienvenida,
    nombre: info.nombre,
  })

  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!data.id && info.id) {
      setData({ ...info })
    }
  }, [info])

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
