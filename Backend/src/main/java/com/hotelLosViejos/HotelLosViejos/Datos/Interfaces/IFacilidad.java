package com.hotelLosViejos.HotelLosViejos.Datos.Interfaces;

import com.hotelLosViejos.HotelLosViejos.Dominio.Facilidad;
import com.hotelLosViejos.HotelLosViejos.Dominio.Informacion;

import java.util.List;

public interface IFacilidad {

    public boolean registrarFacilidad(Facilidad facilidad);

    public List<Facilidad> obtenerFacilidades();

    public boolean actualizarFacilidad(Facilidad facilidad);

    public boolean eliminarFacilidad(int idFacilidad);
}
