package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Publicidad;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Range;

public record PublicidadActualizacionDTO(

        @Min(value = 1, message = "{publicidad.id.mayor1}")
        @NotNull(message = "{publicidad.id.nulo}")
        Integer id,

        @NotBlank(message = "{publicidad.nombre.vacio}")
        String nombre,

        @NotBlank(message = "{publicidad.image.vacio}")
        String imagen,

        @NotBlank(message = "{publicidad.enlace.vacio}")
        String enlace,

        @NotBlank(message = "{publicidad.descripcion.vacio}")
        String descripcion,

        @NotBlank(message = "{publicidad.titulo.vacio}")
        String titulo



) {
}
