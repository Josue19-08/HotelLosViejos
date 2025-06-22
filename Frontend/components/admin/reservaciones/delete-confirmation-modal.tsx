"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DeleteConfirmationModalProps {
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteConfirmationModal({ onConfirm, onCancel }: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Confirmar eliminación</h2>
          </div>

          <p className="text-gray-600 mb-6">
            ¿Está seguro que desea eliminar esta reservación? Esta acción no se puede deshacer.
          </p>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

