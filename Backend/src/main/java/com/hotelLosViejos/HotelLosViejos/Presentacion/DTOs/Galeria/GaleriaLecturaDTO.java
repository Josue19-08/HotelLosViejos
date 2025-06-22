package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Galeria;

import com.hotelLosViejos.HotelLosViejos.Dominio.Galeria;
import jakarta.persistence.Column;

public record GaleriaLecturaDTO(

        int id,

        String descripcion,

        String nombreImagen

) {

    public GaleriaLecturaDTO(Galeria galeria){
        this(galeria.getId(), galeria.getDescripcion(),galeria.getNombreImagen());
    }

}
