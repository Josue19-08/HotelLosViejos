package com.hotelLosViejos.HotelLosViejos.Datos.Interfaces;

import com.hotelLosViejos.HotelLosViejos.Dominio.Contacto;
import com.hotelLosViejos.HotelLosViejos.Dominio.Facilidad;

import java.util.List;

public interface IContacto {

    public boolean registrarContacto(Contacto contacto);

    public List<Contacto> obtenerContacto();

    public boolean actualizarContacto(Contacto contacto);

    public boolean eliminarContacto(int idContacto);
}
