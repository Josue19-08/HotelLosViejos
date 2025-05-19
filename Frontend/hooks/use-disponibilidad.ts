"use client";

import { useState } from "react";
import { consultarDisponibilidad } from "@/lib/disponibilidadData";
import type { Disponibilidad } from "@/types/Disponibilidad";

export const useDisponibilidad = () => {
  const [username] = useState("Admin"); // o usar contexto auth real
  const [results, setResults] = useState<Disponibilidad[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [fechaLlegada, setFechaLlegada] = useState<Date>(new Date());
  const [fechaSalida, setFechaSalida] = useState<Date>(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const [tipoHabitacion, setTipoHabitacion] = useState<string>("all");

  const handleConsultar = async () => {
    setIsLoading(true);
    try {
      const disponibilidad = await consultarDisponibilidad(fechaLlegada, fechaSalida, tipoHabitacion);
      setResults(disponibilidad);
    } catch (error) {
      console.error("Error al consultar disponibilidad:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    results,
    isLoading,
    fechaLlegada,
    setFechaLlegada,
    fechaSalida,
    setFechaSalida,
    tipoHabitacion,
    setTipoHabitacion,
    handleConsultar,
  };
};
