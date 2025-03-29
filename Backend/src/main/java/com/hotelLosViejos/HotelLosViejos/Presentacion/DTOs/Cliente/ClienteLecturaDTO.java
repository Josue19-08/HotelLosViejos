package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Cliente;

import com.hotelLosViejos.HotelLosViejos.Dominio.Cliente;

public record ClienteLecturaDTO(
        int id,
        String nombre,
        String apellidos,
        String correo
) {
    public ClienteLecturaDTO(Cliente cliente) {
        this(cliente.getId(), cliente.getNombre(), cliente.getApellidos(), cliente.getCorreo());
    }
}
