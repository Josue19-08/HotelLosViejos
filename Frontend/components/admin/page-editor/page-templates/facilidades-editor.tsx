"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ImageEditor } from "../image-editor"
import { MoveUp, MoveDown, Trash2, Save, Plus } from "lucide-react"

import { useFacilidadesEditor } from "@/hooks/use-facilidades-editor"

export function FacilidadesEditor({ onChange }: { onChange?: (data: any) => void }) {
  const {
    facilidades,
    isSaving,
    savingIndex,
    handleChange,
    handleAdd,
    handleRemove,
    handleReorder,
    handleSave,
    showConfirmDelete,
    setShowConfirmDelete,
    confirmDelete,
    validationError,
    setValidationError,
    message,
    messageType,
  } = useFacilidadesEditor(onChange)

  return (
    <div className="space-y-6">
      {/* Mensaje de feedback */}
      {message && (
        <div
          className={`p-4 rounded-md text-sm ${
            messageType === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-gray-800">Facilidades del hotel</h2>
        <Button
          onClick={handleAdd}
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          disabled={isSaving}
        >
          <Plus size={16} />
          Agregar facilidad
        </Button>
      </div>

      {/* Facilidades vacías */}
      {facilidades.length === 0 ? (
        <div className="text-center py-8 border rounded-md bg-gray-50">
          <p className="text-gray-500">No hay facilidades agregadas</p>
          <Button
            onClick={handleAdd}
            variant="outline"
            size="sm"
            className="mt-2 flex items-center gap-1 mx-auto"
            disabled={isSaving}
          >
            <Plus size={16} />
            Agregar facilidad
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {facilidades.map((facilidad, i) => {
            const isCurrentSaving = isSaving && savingIndex === i

            return (
              <div key={facilidad.id || facilidad._uuid} className="border rounded-md p-4 relative">
                {/* Overlay spinner solo para el card que se está guardando */}
                {isCurrentSaving && (
                  <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-md pointer-events-none">
                    <svg
                      className="animate-spin h-10 w-10 text-teal-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                  </div>
                )}

                {/* Acciones arriba */}
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button
                    onClick={() => handleReorder(i, "up")}
                    disabled={i === 0 || isSaving}
                    variant="ghost"
                    size="icon"
                  >
                    <MoveUp size={16} />
                  </Button>
                  <Button
                    onClick={() => handleReorder(i, "down")}
                    disabled={i === facilidades.length - 1 || isSaving}
                    variant="ghost"
                    size="icon"
                  >
                    <MoveDown size={16} />
                  </Button>
                  <Button
                    onClick={() => handleRemove(i)}
                    variant="ghost"
                    size="icon"
                    disabled={isSaving}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>

                {/* Campos */}
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <Input
                      value={facilidad.titulo}
                      onChange={(e) => handleChange(i, "titulo", e.target.value)}
                      placeholder="Ej: Spa, Piscina..."
                      disabled={isCurrentSaving}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <Textarea
                      value={facilidad.descripcion}
                      onChange={(e) => handleChange(i, "descripcion", e.target.value)}
                      rows={4}
                      placeholder="Describa esta facilidad"
                      disabled={isCurrentSaving}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-md bg-gray-50 flex items-center justify-center h-[200px]">
                        <img
                          src={facilidad.nombreImagen || "/placeholder.svg"}
                          alt={facilidad.titulo}
                          className="max-w-full max-h-full object-cover"
                        />
                      </div>
                      <div>
                        <ImageEditor
                          compact
                          currentImageUrl={facilidad.nombreImagen}
                          onImageChange={(url) => handleChange(i, "nombreImagen", url)}
                          disabled={isCurrentSaving}
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={() => handleSave(i)}
                    disabled={isSaving}
                    className="mt-4 bg-teal-600 hover:bg-teal-700 flex items-center gap-2 text-white"
                  >
                    {isCurrentSaving ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            className="opacity-25"
                          />
                          <path
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291..."
                            className="opacity-75"
                          />
                        </svg>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        Guardar cambios
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Confirmación de eliminación */}
      {showConfirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded p-6 shadow-md text-center max-w-sm mx-auto">
            <h2 className="text-lg font-semibold mb-4">
              ¿Estás seguro que deseas eliminar esta facilidad?
            </h2>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setShowConfirmDelete(false)}
                variant="outline"
              >
                Cancelar
              </Button>
              <Button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Error de validación */}
      {validationError && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded p-6 shadow-md max-w-sm mx-auto text-center">
            <h3 className="text-lg font-semibold mb-4">Error de validación</h3>
            <p className="mb-6">{validationError}</p>
            <Button onClick={() => setValidationError(null)} variant="outline">
              Cerrar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
