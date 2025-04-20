"use client";

import { CalendarCheck, Eye, Trash2, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminFooter } from "@/components/admin/admin-footer";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { UserWelcome } from "@/components/admin/user-welcome";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ReservationDetailModal } from "@/components/admin/reservaciones/reservation-detail-modal";
import { DeleteConfirmationModal } from "@/components/admin/reservaciones/delete-confirmation-modal";
import { EditReservationModal } from "@/components/admin/reservaciones/edit-reservation-modal";
import { useAdminReservaciones } from "@/hooks/use-admin-reservaciones";

export default function ListadoReservacionesPage() {
  const {
    username,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    paginatedReservations,
    handleViewReservation,
    handleDeleteClick,
    handleEditReservation,
    handleSaveEdit,
    handleDeleteRoom,
    handlePrintRoom,
    showDetailModal,
    showEditModal,
    showDeleteModal,
    selectedReservation,
    confirmDelete,
  } = useAdminReservaciones();

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
                            <TableCell>{reserva.fecha}</TableCell>
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

              {paginatedReservations.length > 0 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    Mostrando {startIndex + 1} a {Math.min(startIndex + 10, paginatedReservations.length)} de{" "}
                    {paginatedReservations.length} reservaciones
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

      {showDetailModal && selectedReservation && (
        <ReservationDetailModal
          reservation={selectedReservation}
          onClose={() => setShowDetailModal(false)}
          onEdit={handleEditReservation}
          onDelete={handleDeleteRoom}
          onPrint={handlePrintRoom}
        />
      )}

      {showEditModal && selectedReservation && (
        <EditReservationModal
          reservation={selectedReservation}
          onSave={handleSaveEdit}
          onCancel={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal onConfirm={confirmDelete} onCancel={() => setShowDeleteModal(false)} />
      )}
    </div>
  );
}
