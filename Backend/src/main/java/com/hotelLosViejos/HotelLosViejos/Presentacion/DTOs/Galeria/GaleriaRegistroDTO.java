package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Galeria;

import jakarta.validation.constraints.NotBlank;

public record GaleriaRegistroDTO (

        @NotBlank(message = "{galeria.descripcion.vacio}")
        String descripcion,

        @NotBlank(message = "{galeria.nombreImagen.vacio}")
        String nombreImagen
) {
}
