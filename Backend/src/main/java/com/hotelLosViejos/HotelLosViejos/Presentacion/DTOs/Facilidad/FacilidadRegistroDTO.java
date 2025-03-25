package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Facilidad;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;

public record FacilidadRegistroDTO(

         @NotBlank(message ="{facilidad.titulo.vacio}" )
         String titulo,

         @NotBlank(message ="{facilidad.descripcion.vacio}" )
         String descripcion,

         @NotBlank(message ="{facilidad.nombreImagen.vacio}" )
         String nombreImagen
) {
}
