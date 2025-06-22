"use client"

import { useState } from "react"

// Tipos para los resultados de disponibilidad
export interface DisponibilidadResult {
  numero: number
  tipo: string
  costo: string
}

export function useDisponibilidad() {
  const [username] = useState("USUARIO")
  const [results, setResults] = useState<DisponibilidadResult[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [fechaLlegada, setFechaLlegada] = useState<Date>(new Date())
  const [fechaSalida, setFechaSalida] = useState<Date>(() => {
    const date = new Date()
    date.setDate(date.getDate() + 3)
    return date
  })
  const [tipoHabitacion, setTipoHabitacion] = useState("")

  // Manejar consulta
  const handleConsultar = () => {
    setIsLoading(true)

    // Simulación de consulta
    setTimeout(() => {
      // Generar resultados de ejemplo basados en el tipo seleccionado
      let resultadosEjemplo: DisponibilidadResult[] = [
        { numero: 1, tipo: "Standard", costo: "$120" },
        { numero: 5, tipo: "Junior", costo: "$180" },
        { numero: 8, tipo: "Deluxe", costo: "$250" },
      ]

      // Filtrar por tipo de habitación si se seleccionó uno
      if (tipoHabitacion && tipoHabitacion !== "all") {
        resultadosEjemplo = resultadosEjemplo.filter((r) => r.tipo.toLowerCase() === tipoHabitacion.toLowerCase())
      }

      setResults(resultadosEjemplo)
      setIsLoading(false)
    }, 1000)
  }

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
  }
}
