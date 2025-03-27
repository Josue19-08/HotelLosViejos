package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Publicidad;
import jakarta.validation.constraints.NotBlank;
public record PublicidadRegistroDTO(

        @NotBlank(message = "{publicidad.nombre.vacio}")
        String nombre,

        @NotBlank(message = "{publicidad.imagen.vacio}")
        String imagen,

        @NotBlank(message = "{publicidad.enlace.vacio}")
        String enlace,

        @NotBlank(message = "{publicidad.descripcion.vacio}")
        String descripcion,

        @NotBlank(message = "{publicidad.titulo.vacio}")
        String titulo

) {

}
