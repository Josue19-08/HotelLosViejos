import type { ClienteBase } from './Cliente';
import type { HabitacionBase } from './Habitacion';
export interface ReservaPayload {
    nombre: string
    apellidos: string
    correo: string
    numeroTarjeta: string
    habitacionId: number
    fechaLlegada: string 
    fechaSalida: string
  }

export interface ReservaLectura {
  id: number,
  numeroReserva: string,
  fechaLlegada: string,
  fechaSalida: string,
  cliente: ClienteBase,
  habitacion: HabitacionBase
}