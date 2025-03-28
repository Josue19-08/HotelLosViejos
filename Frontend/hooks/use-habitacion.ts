"use client";
import { useEffect, useState } from "react";
import { HabitacionBase } from "@/types/Habitacion";
import { getAllHabitaciones } from "@/lib/HabitacionData";

export const useHabitacion = () => {
  const [habitaciones, setHabitaciones] = useState<HabitacionBase[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllHabitaciones();
        setHabitaciones(data);
      } catch (error) {
        console.error("Error al obtener habitaciones:", error);
      }
    }

    fetchData();
  }, []);

  return habitaciones;
};
