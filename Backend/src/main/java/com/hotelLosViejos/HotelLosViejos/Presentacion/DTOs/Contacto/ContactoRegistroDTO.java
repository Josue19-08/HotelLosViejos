package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Contacto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ContactoRegistroDTO (

         @NotBlank(message = "{contacto.correo.vacio}")
         @Email(message = "{contacto.correo.invalido}")
         String correo,

         @NotBlank(message = "{contacto.telefono.vacio}")
         String telefono,

         @NotBlank(message = "{contacto.codigoPostal.vacio}")
         String codigoPostal,

         @NotBlank(message = "{contacto.direccion.vacio}")
         String direccion

){
}
