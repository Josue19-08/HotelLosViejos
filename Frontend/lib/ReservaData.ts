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

  if (response.status === 422) {
    throw new Error("Habitacion no disponible")
  }

  if (!response.ok) {
    throw new Error("Error al registrar la reserva")
  }

  return await response.json()
}

export async function obtenerReservasData() {
  const response = await fetch(`${API_URL}/reserva`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (!response.ok) {
    throw new Error("Error al obtener las reservas")
  }

  return await response.json()
}
