package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Galeria;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record GaleriaActualizacionDTO(

        @NotNull(message = "{galeria.id.nulo}")
        @Min(value = 1, message = "{galeria.id.mayor1}")
        Integer id,

        @NotBlank(message = "{galeria.descripcion.vacio}")
        String descripcion,

        @NotBlank(message = "{galeria.nombreImagen.vacio}")
        String nombreImagen
) {
}
