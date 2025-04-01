"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, ExternalLink } from "lucide-react"
import type { Publicidad } from "@/app/admin/dashboard/publicidad/page"

interface PublicidadListProps {
  publicidades: Publicidad[]
  onEdit: (publicidad: Publicidad) => void
  onDelete: (id: string) => void
}

export function PublicidadList({ publicidades, onEdit, onDelete }: PublicidadListProps) {
  // Verificar si hay publicidades
  if (publicidades.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-md">
        <p className="text-gray-500">No se encontraron publicidades.</p>
      </div>
    )
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Link Destino</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {publicidades.map((publicidad) => (
            <TableRow key={publicidad.id}>
              <TableCell>
                <div className="relative w-20 h-12 bg-gray-100 rounded overflow-hidden">
                  <img
                    src={publicidad.imagenUrl || "/placeholder.svg"}
                    alt={publicidad.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{publicidad.titulo}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className="text-gray-600 truncate max-w-[250px]">{publicidad.linkDestino}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.open(publicidad.linkDestino, "_blank")}
                    className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 ml-2"
                    title="Ver enlace"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(publicidad)}
                    className="h-8 w-8 text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(publicidad.id)}
                    className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

