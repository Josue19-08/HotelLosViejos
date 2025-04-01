"use client"

import { useState } from "react"
import { Hotel, Save } from "lucide-react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminFooter } from "@/components/admin/admin-footer"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { UserWelcome } from "@/components/admin/user-welcome"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RoomDescriptionModal } from "@/components/admin/rooms/room-description-modal"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"

// Datos de ejemplo para las habitaciones
const habitacionesData = {
  standard: [
    { numero: 1, activa: true },
    { numero: 2, activa: false },
    { numero: 3, activa: true },
  ],
  junior: [
    { numero: 4, activa: true },
    { numero: 5, activa: false },
    { numero: 6, activa: true },
  ],
  deluxe: [
    { numero: 7, activa: true },
    { numero: 8, activa: true },
    { numero: 9, activa: false },
  ],
}

export default function AdministrarHabitacionesPage() {
  const router = useRouter()
  const [username] = useState("USUARIO")
  const [habitaciones, setHabitaciones] = useState(habitacionesData)
  const [showDescriptionModal, setShowDescriptionModal] = useState(false)
  const [selectedRoomType, setSelectedRoomType] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Manejar cambio de estado de habitación
  const handleToggleActive = (tipo: keyof typeof habitaciones, index: number) => {
    const newHabitaciones = { ...habitaciones }
    newHabitaciones[tipo][index].activa = !newHabitaciones[tipo][index].activa
    setHabitaciones(newHabitaciones)
    setHasChanges(true)
  }

  // Manejar clic en cambiar descripción
  const handleChangeDescription = (tipo: string) => {
    setSelectedRoomType(tipo)
    setShowDescriptionModal(true)
  }

  // Manejar clic en editar habitación
  const handleEditRoom = (tipo: string, numero: number) => {
    router.push(`/admin/dashboard/habitaciones/editar?tipo=${tipo}&numero=${numero}`)
  }

  // Guardar cambios de activación
  const handleSaveChanges = async () => {
    setIsSaving(true)

    // Simulación de guardado
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Aquí iría la lógica real para guardar los cambios en la base de datos
    console.log("Guardando cambios:", habitaciones)

    setIsSaving(false)
    setHasChanges(false)

    // Mostrar mensaje de éxito
    alert("Cambios guardados correctamente")
  }

  // Renderizar tabla de habitaciones por tipo
  const renderRoomTable = (tipo: keyof typeof habitaciones, titulo: string) => (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-gray-800">{titulo}</h2>
        <Button
          variant="link"
          className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal"
          onClick={() => handleChangeDescription(tipo)}
        >
          cambiar descripcion
        </Button>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/3">Numero de Habitacion</TableHead>
              <TableHead className="w-1/3">Estado</TableHead>
              <TableHead className="w-1/3 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {habitaciones[tipo].map((habitacion, index) => (
              <TableRow key={habitacion.numero}>
                <TableCell>{habitacion.numero}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={habitacion.activa}
                      onCheckedChange={() => handleToggleActive(tipo, index)}
                      id={`room-${tipo}-${habitacion.numero}`}
                    />
                    <label htmlFor={`room-${tipo}-${habitacion.numero}`} className="text-sm cursor-pointer">
                      Activa?
                    </label>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => handleEditRoom(tipo, habitacion.numero)}>
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <AdminHeader showWelcome={false} />
          <UserWelcome username={username} />
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8">
          <AdminSidebar />

          <div className="space-y-6">
            <Card className="p-6 border rounded-md">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Hotel className="h-6 w-6 text-teal-600" />
                  <h1 className="text-2xl font-playfair font-bold text-teal-800">Administrar Habitaciones</h1>
                </div>

                <Button
                  className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2"
                  onClick={handleSaveChanges}
                  disabled={isSaving || !hasChanges}
                >
                  {isSaving ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Guardar cambios
                    </>
                  )}
                </Button>
              </div>

              {renderRoomTable("standard", "Standard")}
              {renderRoomTable("junior", "Junior")}
              {renderRoomTable("deluxe", "Deluxe")}
            </Card>
          </div>
        </div>
      </main>

      <AdminFooter />

      {/* Modal para cambiar descripción */}
      {showDescriptionModal && (
        <RoomDescriptionModal
          roomType={selectedRoomType}
          onClose={() => setShowDescriptionModal(false)}
          onSave={(description) => {
            console.log(`Guardando descripción para ${selectedRoomType}:`, description)
            setShowDescriptionModal(false)
          }}
        />
      )}
    </div>
  )
}

