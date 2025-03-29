package com.hotelLosViejos.HotelLosViejos.Datos.Interfaces;

import com.hotelLosViejos.HotelLosViejos.Dominio.Habitacion;

import java.util.List;

public interface IHabitacion {

    boolean registrarHabitacion(Habitacion habitacion);

    boolean actualizarHabitacion(Habitacion habitacion);

    boolean eliminarHabitacion(int id);

    Habitacion obtenerHabitacionPorId(int id);

    List<Habitacion> obtenerHabitaciones();
}
