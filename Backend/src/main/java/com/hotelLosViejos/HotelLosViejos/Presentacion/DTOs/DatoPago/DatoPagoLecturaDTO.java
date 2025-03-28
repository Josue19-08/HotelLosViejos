package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.DatoPago;

import com.hotelLosViejos.HotelLosViejos.Dominio.DatoPago;

public record DatoPagoLecturaDTO(

        int id,
        int idCliente,
        String numeroTarjeta

) {
    public DatoPagoLecturaDTO(DatoPago datoPago) {
        this(datoPago.getId(), datoPago.getCliente().getId(), datoPago.getNumeroTarjeta());
    }
}
