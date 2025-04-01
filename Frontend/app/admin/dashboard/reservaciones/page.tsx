"use client"

import { useState } from "react"
import { CalendarCheck, Eye, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminFooter } from "@/components/admin/admin-footer"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { UserWelcome } from "@/components/admin/user-welcome"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ReservationDetailModal } from "@/components/admin/reservaciones/reservation-detail-modal"
import { DeleteConfirmationModal } from "@/components/admin/reservaciones/delete-confirmation-modal"
import { EditReservationModal } from "@/components/admin/reservaciones/edit-reservation-modal"

// Datos de ejemplo para las reservaciones
const reservacionesData = [
  {
    id: "WERJFDSF123",
    fecha: "15/04/2023",
    nombre: "Juan",
    apellidos: "Perez Oso",
    email: "jperez@mail.com",
    tarjeta: "************2222",
    transaccion: "12312412",
    fechaLlegada: "20/04/2023",
    fechaSalida: "25/04/2023",
    tipo: "Standard",
    estado: "Confirmada",
  },
  {
    id: "WERJFDSF124",
    fecha: "16/04/2023",
    nombre: "María",
    apellidos: "González López",
    email: "mgonzalez@mail.com",
    tarjeta: "************1111",
    transaccion: "12312413",
    fechaLlegada: "22/04/2023",
    fechaSalida: "28/04/2023",
    tipo: "Suite",
    estado: "Confirmada",
  },
  {
    id: "WERJFDSF125",
    fecha: "17/04/2023",
    nombre: "Carlos",
    apellidos: "Rodríguez Mora",
    email: "crodriguez@mail.com",
    tarjeta: "************3333",
    transaccion: "12312414",
    fechaLlegada: "01/05/2023",
    fechaSalida: "05/05/2023",
    tipo: "Standard",
    estado: "Pendiente",
  },
  {
    id: "WERJFDSF126",
    fecha: "18/04/2023",
    nombre: "Ana",
    apellidos: "Martínez Solís",
    email: "amartinez@mail.com",
    tarjeta: "************4444",
    transaccion: "12312415",
    fechaLlegada: "10/05/2023",
    fechaSalida: "15/05/2023",
    tipo: "Deluxe",
    estado: "Confirmada",
  },
  {
    id: "WERJFDSF127",
    fecha: "19/04/2023",
    nombre: "Pedro",
    apellidos: "Sánchez Vega",
    email: "psanchez@mail.com",
    tarjeta: "************5555",
    transaccion: "12312416",
    fechaLlegada: "12/05/2023",
    fechaSalida: "18/05/2023",
    tipo: "Standard",
    estado: "Cancelada",
  },
  {
    id: "WERJFDSF128",
    fecha: "20/04/2023",
    nombre: "Laura",
    apellidos: "Jiménez Castro",
    email: "ljimenez@mail.com",
    tarjeta: "************6666",
    transaccion: "12312417",
    fechaLlegada: "15/05/2023",
    fechaSalida: "20/05/2023",
    tipo: "Suite",
    estado: "Confirmada",
  },
  {
    id: "WERJFDSF129",
    fecha: "21/04/2023",
    nombre: "Miguel",
    apellidos: "López Torres",
    email: "mlopez@mail.com",
    tarjeta: "************7777",
    transaccion: "12312418",
    fechaLlegada: "18/05/2023",
    fechaSalida: "25/05/2023",
    tipo: "Deluxe",
    estado: "Confirmada",
  },
  {
    id: "WERJFDSF130",
    fecha: "22/04/2023",
    nombre: "Sofía",
    apellidos: "Ramírez Blanco",
    email: "sramirez@mail.com",
    tarjeta: "************8888",
    transaccion: "12312419",
    fechaLlegada: "01/06/2023",
    fechaSalida: "07/06/2023",
    tipo: "Standard",
    estado: "Pendiente",
  },
  {
    id: "WERJFDSF131",
    fecha: "23/04/2023",
    nombre: "Daniel",
    apellidos: "Hernández Mora",
    email: "dhernandez@mail.com",
    tarjeta: "************9999",
    transaccion: "12312420",
    fechaLlegada: "05/06/2023",
    fechaSalida: "10/06/2023",
    tipo: "Suite",
    estado: "Confirmada",
  },
  {
    id: "WERJFDSF132",
    fecha: "24/04/2023",
    nombre: "Elena",
    apellidos: "Díaz Vargas",
    email: "ediaz@mail.com",
    tarjeta: "************0000",
    transaccion: "12312421",
    fechaLlegada: "10/06/2023",
    fechaSalida: "15/06/2023",
    tipo: "Standard",
    estado: "Confirmada",
  },
]

export default function ListadoReservacionesPage() {
  const [username] = useState("USUARIO")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedReservation, setSelectedReservation] = useState<any>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [reservationToDelete, setReservationToDelete] = useState<string | null>(null)

  const itemsPerPage = 10

  // Filtrar reservaciones según el término de búsqueda
  const filteredReservations = reservacionesData.filter(
    (reserva) =>
      reserva.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calcular paginación
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedReservations = filteredReservations.slice(startIndex, startIndex + itemsPerPage)

  // Manejar ver detalles de reservación
  const handleViewReservation = (reserva: any) => {
    setSelectedReservation(reserva)
    setShowDetailModal(true)
  }

  // Manejar eliminar reservación
  const handleDeleteClick = (id: string) => {
    setReservationToDelete(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    // Aquí iría la lógica para eliminar la reservación
    console.log(`Eliminando reservación ${reservationToDelete}`)
    setShowDeleteModal(false)
    setReservationToDelete(null)
    // En un caso real, aquí actualizaríamos el estado o haríamos una llamada a la API
  }

  // Manejar editar reservación
  const handleEditReservation = () => {
    setShowDetailModal(false)
    setShowEditModal(true)
  }

  const handleSaveEdit = (updatedReservation: any) => {
    // Aquí iría la lógica para guardar los cambios
    console.log("Guardando cambios:", updatedReservation)
    setShowEditModal(false)
    // En un caso real, aquí actualizaríamos el estado o haríamos una llamada a la API
  }

  // Actualizar las funciones para manejar las acciones de habitación
  const handleDeleteRoom = () => {
    console.log(`Eliminando habitación: ${selectedReservation?.tipo}`)
    setShowDetailModal(false)
    // Aquí iría la lógica para eliminar la habitación
  }

  const handlePrintRoom = () => {
    console.log(`Imprimiendo información de habitación: ${selectedReservation?.tipo}`)
    // Aquí iría la lógica para imprimir la información de la habitación
  }

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
              <div className="flex items-center gap-3 mb-6">
                <CalendarCheck className="h-6 w-6 text-teal-600" />
                <h1 className="text-2xl font-playfair font-bold text-teal-800">Listado de Reservaciones</h1>
              </div>

              {/* Búsqueda */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por ID, nombre o email..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Tabla de reservaciones */}
              <div className="border rounded-md overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Fecha</TableHead>
                        <TableHead>ID Reserva</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Apellidos</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Tarjeta</TableHead>
                        <TableHead>Transacción</TableHead>
                        <TableHead>Fecha Llegada</TableHead>
                        <TableHead>Fecha Salida</TableHead>
                        <TableHead>Habitación</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedReservations.length > 0 ? (
                        paginatedReservations.map((reserva) => (
                          <TableRow key={reserva.id}>
                            <TableCell className="font-medium">{reserva.fecha}</TableCell>
                            <TableCell>{reserva.id}</TableCell>
                            <TableCell>{reserva.nombre}</TableCell>
                            <TableCell>{reserva.apellidos}</TableCell>
                            <TableCell>{reserva.email}</TableCell>
                            <TableCell>{reserva.tarjeta}</TableCell>
                            <TableCell>{reserva.transaccion}</TableCell>
                            <TableCell>{reserva.fechaLlegada}</TableCell>
                            <TableCell>{reserva.fechaSalida}</TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  reserva.tipo === "Standard"
                                    ? "bg-blue-100 text-blue-800"
                                    : reserva.tipo === "Suite"
                                      ? "bg-purple-100 text-purple-800"
                                      : "bg-green-100 text-green-800"
                                }`}
                              >
                                {reserva.tipo}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleViewReservation(reserva)}
                                  className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteClick(reserva.id)}
                                  className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={11} className="text-center py-8 text-gray-500">
                            No se encontraron reservaciones
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Paginación */}
              {filteredReservations.length > 0 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredReservations.length)} de{" "}
                    {filteredReservations.length} reservaciones
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                      Página {currentPage} de {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>

      <AdminFooter />

      {/* Modal de detalles de reservación */}
      {showDetailModal && selectedReservation && (
        <ReservationDetailModal
          reservation={selectedReservation}
          onClose={() => setShowDetailModal(false)}
          onEdit={handleEditReservation}
          onDelete={handleDeleteRoom}
          onPrint={handlePrintRoom}
        />
      )}

      {/* Modal de edición de reservación */}
      {showEditModal && selectedReservation && (
        <EditReservationModal
          reservation={selectedReservation}
          onSave={handleSaveEdit}
          onCancel={() => setShowEditModal(false)}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <DeleteConfirmationModal onConfirm={confirmDelete} onCancel={() => setShowDeleteModal(false)} />
      )}
    </div>
  )
}

