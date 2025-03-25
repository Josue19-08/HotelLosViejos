package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Facilidad;

import com.hotelLosViejos.HotelLosViejos.Dominio.Facilidad;
import jakarta.persistence.Column;

public record FacilidadLecturaDTO(

         int id,

         String titulo,

         String descripcion,

         String nombreImagen
) {

    public FacilidadLecturaDTO(Facilidad facilidad){
         this(facilidad.getId(), facilidad.getTitulo(), facilidad.getDescripcion(), facilidad.getNombreImagen());
    }

}
