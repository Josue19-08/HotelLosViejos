export interface ReservaLectura {
  id: number
  numeroReserva: string
  fechaLlegada: string
  fechaSalida: string
  clienteNombre: string
  habitacionId: number
}
export interface ReservaPayload {
    nombre: string
    apellidos: string
    correo: string
    numeroTarjeta: string
    habitacionId: number
    fechaLlegada: string 
    fechaSalida: string
  }
  