package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Publicidad;
import com.hotelLosViejos.HotelLosViejos.Dominio.Publicidad;

public record PublicidadLecturaDTO(

        Integer id,
        String nombre,
        String imagen,
        String enlace,
        String descripcion,
        String titulo

) {
    public PublicidadLecturaDTO(Publicidad publicidad){
        this(publicidad.getId(),
                publicidad.getNombre(),
                publicidad.getImagen(), publicidad.getEnlace(),publicidad.getDescripcion(), publicidad.getTitulo());
    }
}
