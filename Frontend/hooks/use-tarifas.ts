"use client";

import { useHabitacion } from "@/hooks/use-habitacion";
import type { HabitacionBase } from "@/types/Habitacion";

export function useTarifas() {
  const habitaciones = useHabitacion();

  // Obtener tipos únicos de habitaciones
  const uniqueRoomTypes = Array.from(new Set(habitaciones.habitaciones.map((h) => h.tipo)));

  // Obtener una sola habitación por tipo
  const habitacionesUnicasPorTipo = uniqueRoomTypes
    .map((tipo) => habitaciones.habitaciones.find((habitacion) => habitacion.tipo === tipo))
    .filter(Boolean) as HabitacionBase[];

  return {
    habitacionesUnicasPorTipo,
  };
}
