package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Reserva;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record ReservaRegistroDTO(

        @NotNull(message = "{reserva.fechaLlegada.nulo}")
        @Future(message = "{reserva.fechaLlegada.futura}")
        LocalDateTime fechaLlegada,

        @NotNull(message = "{reserva.fechaSalida.nulo}")
        @Future(message = "{reserva.fechaSalida.futura}")
        LocalDateTime fechaSalida,

        @NotNull(message = "{reserva.clienteId.nulo}")
        Integer clienteId,

        @NotNull(message = "{reserva.habitacionId.nulo}")
        Integer habitacionId
) {
}
