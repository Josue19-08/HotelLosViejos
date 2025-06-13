import { API_URL } from "./services"
import { ReservaPayload, ReservaLectura } from "@/types/Reserva"

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

export async function getReservaById(id: number): Promise<ReservaLectura> {
  const url = `${API_URL}/reserva/${id}`
  console.log("🌐 ReservaData → Llamando endpoint:", url)

  const response = await fetch(url)

  if (!response.ok) {
    const body = await response.text()
    console.error("❌ ReservaData → Error en fetch:", response.status, body)
    throw new Error(`Error al obtener reserva: ${response.statusText}`)
  }

  const json = await response.json()
  console.log("📥 ReservaData → JSON recibido:", json)

  return json

}
