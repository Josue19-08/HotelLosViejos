package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Caracteristica;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CaracteristicaActualizacionDTO(
        @NotNull(message = "{caracteristica.id.nulo}")
        @Min(value = 1, message = "{caracteristica.id.minimo}")
        Integer id,

        @NotBlank(message = "{caracteristica.titulo.vacio}")
        String titulo,

        @NotBlank(message = "{caracteristica.descripcion.vacio}")
        String descripcion
) {}
