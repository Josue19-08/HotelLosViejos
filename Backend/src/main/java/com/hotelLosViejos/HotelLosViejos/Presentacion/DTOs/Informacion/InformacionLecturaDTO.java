package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Informacion;

import com.hotelLosViejos.HotelLosViejos.Dominio.Informacion;

public record InformacionLecturaDTO(

         Integer id,

         String textoSobreNosotros,

         String textoBienvenida,

         String nombre,

         String nombreImagenBienvenida
) {

    public InformacionLecturaDTO(Informacion informacion){
        this(informacion.getId(),
                informacion.getTextoSobreNosotros(), informacion.getTextoBienvenida(),
                informacion.getNombre(), informacion.getNombreImagenBienvenida());
    }
}
