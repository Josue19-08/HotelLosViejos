package com.hotelLosViejos.HotelLosViejos.Datos.Interfaces;

import com.hotelLosViejos.HotelLosViejos.Dominio.Informacion;

import java.util.List;

public interface IInformacion {

    public boolean registrarInformacion(Informacion informacion);

    public List<Informacion> obtenerInformacion();

    public boolean actualizarInformacion(Informacion informacion);

    public boolean eliminarInformacion(int idInformacion);


}
