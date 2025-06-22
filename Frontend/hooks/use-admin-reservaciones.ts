"use client";

import { useState, useEffect } from "react";
import { useReserva } from "./use-reserva";
import { ReservaLectura } from "@/types/Reserva";

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

export function useAdminReservaciones() {
  const [username] = useState("USUARIO");
  const { obtenerReservas } = useReserva();

  const [reservaciones, setReservaciones] = useState<ReservaLectura[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReservation, setSelectedReservation] =
    useState<ReservaLectura | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        const data = await obtenerReservas();
        setReservaciones(data);
      } catch (error) {
        console.error("Error cargando reservas:", error);
      }
    };

    cargarReservas();
  }, [obtenerReservas]);

  const filteredReservations = reservaciones.filter(
    (reserva) =>
      reserva.id == parseInt(searchTerm) ||
      reserva.cliente.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.fechaLlegada.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reserva.fechaSalida.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReservations = filteredReservations.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleViewReservation = (reserva: ReservaLectura) => {
    setSelectedReservation(reserva);
    setShowDetailModal(true);
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
    showDetailModal,
    setShowDetailModal,
    selectedReservation,
  };
}