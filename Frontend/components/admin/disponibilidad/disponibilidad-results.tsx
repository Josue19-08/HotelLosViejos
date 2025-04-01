"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { DisponibilidadResult } from "@/app/admin/dashboard/disponibilidad/page"

interface DisponibilidadResultsProps {
  results: DisponibilidadResult[]
}

export function DisponibilidadResults({ results }: DisponibilidadResultsProps) {
  // Verificar si hay resultados
  if (results.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-md">
        <p className="text-gray-500">No se encontraron habitaciones disponibles con los criterios seleccionados.</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-medium text-gray-800 mb-4">Resultados de la consulta</h2>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Capacidad</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((room) => (
              <TableRow key={room.numero}>
                <TableCell className="font-medium">{room.numero}</TableCell>
                <TableCell>{room.tipo}</TableCell>
                <TableCell>{room.capacidad} personas</TableCell>
                <TableCell>${room.precio}</TableCell>
                <TableCell>
                  {room.disponible ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">DISPONIBLE</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-200">
                      NO DISPONIBLE
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

