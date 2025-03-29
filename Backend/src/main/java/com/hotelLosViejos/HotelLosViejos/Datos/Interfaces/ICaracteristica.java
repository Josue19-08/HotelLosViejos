package com.hotelLosViejos.HotelLosViejos.Datos.Interfaces;

import com.hotelLosViejos.HotelLosViejos.Dominio.Caracteristica;

import java.util.List;

public interface ICaracteristica {

    boolean registrarCaracteristica(Caracteristica caracteristica);

    List<Caracteristica> obtenerCaracteristicas();

    boolean actualizarCaracteristica(Caracteristica caracteristica);

    boolean eliminarCaracteristica(int idCaracteristica);
}
