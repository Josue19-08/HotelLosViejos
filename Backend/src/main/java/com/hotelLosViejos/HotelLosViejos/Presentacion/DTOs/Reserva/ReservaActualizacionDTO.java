package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Reserva;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record ReservaActualizacionDTO(

        @NotNull(message = "{reserva.id.nulo}")
        @Min(value = 1, message = "{reserva.id.mayor1}")
        Integer id,

        @NotNull(message = "{reserva.fechaLlegada.nulo}")
        LocalDateTime fechaLlegada,

        @NotNull(message = "{reserva.fechaSalida.nulo}")
        LocalDateTime fechaSalida
) {
}
