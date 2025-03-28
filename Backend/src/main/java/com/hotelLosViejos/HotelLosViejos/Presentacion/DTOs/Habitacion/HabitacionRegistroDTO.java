package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Habitacion;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record HabitacionRegistroDTO(

        @NotNull(message = "{habitacion.numero.nulo}")
        @Min(value = 1, message = "{habitacion.numero.minimo}")
        Integer numero,

        @NotNull(message = "{habitacion.tarifaDiariaBase.nula}")
        Float tarifaDiariaBase,

        @NotBlank(message = "{habitacion.nombreImagen.vacio}")
        String nombreImagen,

        @NotBlank(message = "{habitacion.tipo.vacio}")
        String tipo,

        @NotBlank(message = "{habitacion.estado.vacio}")
        String estado,

        List<Integer> caracteristicasIds

) {}
