import { API_URL } from "./services"
import { ReservaPayload } from "@/types/Reserva"

export async function registrarReservaCompleta(payload: ReservaPayload) {
  const response = await fetch(`${API_URL}/reserva/completa`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error("Error al registrar la reserva")
  }

  return await response.json()
}
