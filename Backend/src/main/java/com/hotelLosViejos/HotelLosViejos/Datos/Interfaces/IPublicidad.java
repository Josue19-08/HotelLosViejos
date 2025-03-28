package com.hotelLosViejos.HotelLosViejos.Datos.Interfaces;

import com.hotelLosViejos.HotelLosViejos.Dominio.Publicidad;

import java.util.List;

public interface IPublicidad {

    public boolean registrarPublicidad(Publicidad publicidad);

    public List<Publicidad> obtenerPublicidad();

    public boolean actualizarPublicidad(Publicidad publicidad);

    public boolean eliminarPublicidad(int idPublicidad);

}
