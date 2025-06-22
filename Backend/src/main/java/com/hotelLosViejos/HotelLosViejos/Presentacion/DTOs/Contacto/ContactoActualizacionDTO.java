package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Contacto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ContactoActualizacionDTO(

        @NotNull(message = "{contacto.id.nulo}")
        @Min(value = 1, message = "{contacto.id.mayor1}")
        Integer id,

        @NotBlank(message = "{contacto.correo.vacio}")
        @Email(message = "{contacto.correo.invalido}")
        String correo,

        @NotBlank(message = "{contacto.telefono.vacio}")
        String telefono,

        @NotBlank(message = "{contacto.codigoPostal.vacio}")
        String codigoPostal,

        @NotBlank(message = "{contacto.direccion.vacio}")
        String direccion,

        @NotBlank(message = "{contacto.latitud.vacio}")
        String latitud,

        @NotBlank(message = "{contacto.longitud.vacio}")
        String longitud
) {
}
