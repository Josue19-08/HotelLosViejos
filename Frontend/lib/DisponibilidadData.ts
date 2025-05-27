import { Disponibilidad } from "@/types/Disponibilidad";
import { API_URL } from "./services";

export async function consultarDisponibilidad(
  fechaInicio: Date,
  fechaFin: Date,
  tipoHabitacion: string = "all"
): Promise<Disponibilidad[]> {
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const params = new URLSearchParams({
    fechaInicio: formatDate(fechaInicio),
    fechaFin: formatDate(fechaFin),
    tipoHabitacion,
  });

  const response = await fetch(`${API_URL}/disponibilidad?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Error al consultar disponibilidad: ${response.statusText}`);
  }

  const rawData = await response.json();

  const data: Disponibilidad[] = rawData.map((item: any) => ({
    numeroHabitacion: item.numeroHabitacion,
    tipoHabitacion: item.tipoHabitacion,
    costoEstadia: item.costoEstadia,
  }));


  return data;
}
