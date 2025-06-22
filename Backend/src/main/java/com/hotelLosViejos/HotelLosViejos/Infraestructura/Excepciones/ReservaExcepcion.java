package com.hotelLosViejos.HotelLosViejos.Infraestructura.Excepciones;

public class ReservaExcepcion extends RuntimeException {
    public ReservaExcepcion(String mensaje) {
        super(mensaje);
    }
}
