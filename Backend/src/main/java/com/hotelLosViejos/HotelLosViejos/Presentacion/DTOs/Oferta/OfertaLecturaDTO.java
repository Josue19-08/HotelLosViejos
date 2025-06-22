package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Oferta;

import com.hotelLosViejos.HotelLosViejos.Dominio.Oferta;
import java.time.LocalDateTime;

public record OfertaLecturaDTO(

        int id,
        String titulo,
        String descripcion,
        int porcentaje,
        String aplica,
        LocalDateTime fechaInicio,
        LocalDateTime fechaFin
) {

    public OfertaLecturaDTO(Oferta oferta) {
        this(
                oferta.getId(),
                oferta.getTitulo(),
                oferta.getDescripcion(),
                oferta.getPorcentaje(),
                oferta.getAplica(),
                oferta.getFechaInicio(),
                oferta.getFechaFin()
        );
    }
}
