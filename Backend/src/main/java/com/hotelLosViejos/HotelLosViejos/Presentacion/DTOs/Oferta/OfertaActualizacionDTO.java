package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Oferta;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public record OfertaActualizacionDTO(

        @NotNull(message = "{oferta.id.nulo}")
        @Min(value = 1, message = "{oferta.id.mayor1}")
        Integer id,

        @NotBlank(message = "{oferta.titulo.vacio}")
        String titulo,

        @NotBlank(message = "{oferta.descripcion.vacio}")
        String descripcion,

        @NotNull(message = "{oferta.porcentaje.nulo}")
        @Min(value = 1, message = "{oferta.porcentaje.min}")
        @Max(value = 100, message = "{oferta.porcentaje.max}")
        Integer porcentaje,

        @NotBlank(message = "{oferta.aplica.vacio}")
        String aplica,


        @NotNull(message = "{oferta.fechaInicio.nula}")
        LocalDateTime fechaInicio,

        @NotNull(message = "{oferta.fechaFin.nula}")
        LocalDateTime fechaFin

) {
}
