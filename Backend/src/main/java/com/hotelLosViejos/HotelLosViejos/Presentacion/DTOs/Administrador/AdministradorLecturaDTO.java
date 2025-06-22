package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Administrador;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record AdministradorLecturaDTO(

        Integer id,

        String correo,

        String contrasenia
) {
}
