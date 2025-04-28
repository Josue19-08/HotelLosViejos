"use client";

import { useState } from "react";

export interface Reservacion {
  id: string;
  fecha: string;
  nombre: string;
  apellidos: string;
  email: string;
  tarjeta: string;
  transaccion: string;
  fechaLlegada: string;
  fechaSalida: string;
  tipo: string;
  estado: string;
}

const initialReservaciones: Reservacion[] = [
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

];

export function useAdminReservaciones() {
  const [username] = useState("USUARIO");
  const [reservaciones] = useState<Reservacion[]>(initialReservaciones);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReservation, setSelectedReservation] = useState<Reservacion | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState<string | null>(null);

  const itemsPerPage = 10;

  const filteredReservations = reservaciones.filter(
    (reserva) =>
      reserva.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReservations = filteredReservations.slice(startIndex, startIndex + itemsPerPage);

  const handleViewReservation = (reserva: Reservacion) => {
    setSelectedReservation(reserva);
    setShowDetailModal(true);
  };

  const handleDeleteClick = (id: string) => {
    setReservationToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log(`Eliminando reservación ${reservationToDelete}`);
    setShowDeleteModal(false);
    setReservationToDelete(null);
  };

  const handleEditReservation = () => {
    setShowDetailModal(false);
    setShowEditModal(true);
  };

  const handleSaveEdit = (updatedReservation: Reservacion) => {
    console.log("Guardando cambios:", updatedReservation);
    setShowEditModal(false);
  };

  const handleDeleteRoom = () => {
    console.log(`Eliminando habitación: ${selectedReservation?.tipo}`);
    setShowDetailModal(false);
  };

  const handlePrintRoom = () => {
    console.log(`Imprimiendo información de habitación: ${selectedReservation?.tipo}`);
  };

  return {
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
  };
}
