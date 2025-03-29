package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Cliente;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ClienteRegistroDTO(

        @NotNull(message = "{cliente.id.nulo}")
        @Min(value = 1, message = "{cliente.id.mayor1}")
        Integer id,

        @NotBlank(message = "{cliente.nombre.vacio}")
        String nombre,

        @NotBlank(message = "{cliente.apellidos.vacio}")
        String apellidos,

        @Email(message = "{cliente.correo.invalido}")
        @NotBlank(message = "{cliente.correo.vacio}")
        String correo
) {
}
