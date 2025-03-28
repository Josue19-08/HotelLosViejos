package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.DatoPago;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DatoPagoActualizacionDTO(

        @NotNull(message = "{datoPago.id.nulo}")
        @Min(value = 1, message = "{datoPago.id.mayor1}")
        Integer id,

        @NotNull(message = "{datoPago.idCliente.nulo}")
        @Min(value = 1, message = "{datoPago.idCliente.mayor1}")
        Integer idCliente,

        @NotBlank(message = "{datoPago.numeroTarjeta.vacio}")
        String numeroTarjeta

) {}
