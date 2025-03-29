package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Reserva;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record ReservaFullDTO(
        @NotNull String nombre,
        @NotNull String apellidos,
        @NotNull String correo,
        @NotNull String numeroTarjeta,
        @NotNull Integer habitacionId,
        @NotNull LocalDateTime fechaLlegada,
        @NotNull LocalDateTime fechaSalida
) {}
