package com.hotelLosViejos.HotelLosViejos.Datos.Interfaces;

import com.hotelLosViejos.HotelLosViejos.Dominio.Habitacion;
import com.hotelLosViejos.HotelLosViejos.Dominio.Reserva;

import java.time.LocalDateTime;
import java.util.List;

public interface IReserva {

    boolean registrarReserva(Reserva reserva);

    boolean actualizarReserva(Reserva reserva);

    boolean eliminarReserva(int idReserva);

    List<Reserva> obtenerReservas();

    Reserva obtenerReservaPorId(int id);

    boolean estaDisponible(Habitacion habitacion, LocalDateTime llegada, LocalDateTime salida);

    boolean estaDisponible(Habitacion habitacion, LocalDateTime llegada, LocalDateTime salida, int idActual);

}
