import { HabitacionBase } from "@/types/Habitacion";
import { API_URL } from "./services";

export async function getAllHabitaciones(): Promise<HabitacionBase[]> {
  const response = await fetch(`${API_URL}/habitacion`);

  if (!response.ok) {
    throw new Error(`Error al obtener habitaciones: ${response.statusText}`);
  }

  return response.json();
}
