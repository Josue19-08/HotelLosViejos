import { useEffect, useState } from "react"
import { getReservaById } from "@/lib/ReservaData"
import type { ReservaLectura } from "@/types/Reserva"

export function useReservaConfirmacion(id: number) {
  const [reserva, setReserva] = useState<ReservaLectura | null>(null)

  useEffect(() => {
    async function fetchReserva() {
      console.log("[HOOK] Buscando reserva con ID:", id)
      try {
        const data = await getReservaById(id)
        console.log("[HOOK] Reserva recibida:", data)
        setReserva(data)
      } catch (error) {
        console.error("[HOOK] Error al obtener reserva:", error)
      }
    }

    if (id) fetchReserva()
    else console.warn("[HOOK] ID de reserva inválido:", id)
  }, [id])

  return { reserva }
}
