package com.hotelLosViejos.HotelLosViejos.Datos.Interfaces;

import com.hotelLosViejos.HotelLosViejos.Dominio.DatoPago;

import java.util.List;

public interface IDatoPago {

    boolean registrar(DatoPago datoPago);
    boolean actualizar(DatoPago datoPago);
    boolean eliminar(int id);
    DatoPago obtenerPorId(int id);
    List<DatoPago> obtenerTodos();
}
