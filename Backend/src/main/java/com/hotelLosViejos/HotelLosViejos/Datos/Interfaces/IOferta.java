package com.hotelLosViejos.HotelLosViejos.Datos.Interfaces;

import com.hotelLosViejos.HotelLosViejos.Dominio.Oferta;

import java.util.List;

public interface IOferta {

    public boolean registrarOferta(Oferta oferta);

    public List<Oferta> obtenerOfertas();

    public boolean actualizarOferta(Oferta oferta);

    public boolean eliminarOferta(int idOferta);
}
