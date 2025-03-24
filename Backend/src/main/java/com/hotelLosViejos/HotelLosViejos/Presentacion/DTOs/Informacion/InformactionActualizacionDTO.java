package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Informacion;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Range;

public record InformactionActualizacionDTO(

        @Min(value = 1, message = "{informacion.id.mayor1}")
        @NotNull(message = "{informacion.id.nulo}")
        Integer id,

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
