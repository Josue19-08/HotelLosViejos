package com.hotelLosViejos.HotelLosViejos.Datos.Interfaces;

import com.hotelLosViejos.HotelLosViejos.Dominio.Habitacion;
import com.hotelLosViejos.HotelLosViejos.Dominio.Reserva;
import com.lowagie.text.Document;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.List;

public interface IReserva {

    public boolean registrarReserva(Reserva reserva);

    public boolean actualizarReserva(Reserva reserva);

    public boolean eliminarReserva(int idReserva);

    public List<Reserva> obtenerReservas();

    public Reserva obtenerReservaPorId(int id);

    public boolean estaDisponible(Habitacion habitacion, LocalDateTime llegada, LocalDateTime salida);

    public boolean estaDisponible(Habitacion habitacion, LocalDateTime llegada, LocalDateTime salida, int idActual);

    public byte[] obtenerPDFReserva(int id);

}
