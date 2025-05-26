package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Oferta;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public record OfertaRegistroDTO(

        @NotBlank(message = "{oferta.titulo.vacio}")
        String titulo,

        @NotBlank(message = "{oferta.descripcion.vacio}")
        @Size(max = 2000, message = "{oferta.descripcion.longitud}")
        String descripcion,

        @Min(value = 1, message = "{oferta.porcentaje.minimo}")
        @Max(value = 100, message = "{oferta.porcentaje.maximo}")
        int porcentaje,

        @NotBlank(message = "{oferta.aplica.vacio}")
        String aplica,

        @NotNull(message = "{oferta.fechaInicio.nula}")
        LocalDateTime fechaInicio,

        @NotNull(message = "{oferta.fechaFin.nula}")
        LocalDateTime fechaFin

) {
}
