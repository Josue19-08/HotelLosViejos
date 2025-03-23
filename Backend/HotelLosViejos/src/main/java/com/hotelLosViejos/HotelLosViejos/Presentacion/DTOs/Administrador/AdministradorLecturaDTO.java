package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Administrador;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record AdministradorLecturaDTO(

        @NotNull(message = "No se aceptan nulos")
        Integer id,

        @Email(message = "Correo inválido")
        String correo,

        String contrasenia
) {
}
