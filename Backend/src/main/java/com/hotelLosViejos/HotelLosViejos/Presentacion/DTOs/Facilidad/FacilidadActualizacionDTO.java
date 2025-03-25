package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Facilidad;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FacilidadActualizacionDTO(

        @Min(value = 1, message = "{facilidad.id.mayor1}")
        @NotNull(message = "{facilidad.id.nulo}")
        Integer id,

        @NotBlank(message ="{facilidad.titulo.vacio}" )
        String titulo,

        @NotBlank(message ="{facilidad.descripcion.vacio}" )
        String descripcion,

        @NotBlank(message ="{facilidad.nombreImagen.vacio}" )
        String nombreImagen

) {
}
