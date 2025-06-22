package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Informacion;

import jakarta.validation.constraints.NotBlank;

public record InformacionRegistroDTO(

         @NotBlank(message = "{informacion.textoSobreNosotros.vacio}")
         String textoSobreNosotros,

         @NotBlank(message = "{informacion.textoBienvenida.vacio}")
         String textoBienvenida,

         @NotBlank(message = "{informacion.nombre.vacio}")
         String nombre,

         @NotBlank(message = "{informacion.nombreImagenBienvenida.vacio}")
         String nombreImagenBienvenida
) {
}
