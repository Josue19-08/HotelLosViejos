package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Caracteristica;

import com.hotelLosViejos.HotelLosViejos.Dominio.Caracteristica;

public record CaracteristicaLecturaDTO(
        int id,
        String titulo,
        String descripcion
) {
    public CaracteristicaLecturaDTO(Caracteristica caracteristica) {
        this(
                caracteristica.getId(),
                caracteristica.getTitulo(),
                caracteristica.getDescripcion()
        );
    }
}
