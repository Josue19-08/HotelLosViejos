import { registrarReservaCompleta } from "@/lib/ReservaData"
import { ReservaPayload } from "@/types/Reserva"

export const useReserva = () => {
  const crearReserva = async (
    nombre: string,
    apellidos: string,
    correo: string,
    numeroTarjeta: string,
    habitacionId: number,
    fechaLlegada: Date,
    fechaSalida: Date
  ) => {
    const payload: ReservaPayload = {
      nombre,
      apellidos,
      correo,
      numeroTarjeta,
      habitacionId,
      fechaLlegada: fechaLlegada.toISOString(),
      fechaSalida: fechaSalida.toISOString()
    }

    return await registrarReservaCompleta(payload)
  }

  return { crearReserva }
}
