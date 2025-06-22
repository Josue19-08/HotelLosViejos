package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Caracteristica;

import jakarta.validation.constraints.NotBlank;

public record CaracteristicaRegistroDTO(

        @NotBlank(message = "{caracteristica.titulo.vacio}")
        String titulo,

        @NotBlank(message = "{caracteristica.descripcion.vacio}")
        String descripcion

) {}
