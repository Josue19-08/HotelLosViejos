package com.hotelLosViejos.HotelLosViejos.Datos.Interfaces;

import com.hotelLosViejos.HotelLosViejos.Dominio.Disponibilidad;

import java.util.Date;
import java.util.List;

public interface IDisponibilidad {

    List<Disponibilidad> consultarCostoEstadia(Date fechaInicio, Date fechaFin, String tipoHabitacion);

}
