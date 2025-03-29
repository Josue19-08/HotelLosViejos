package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Publicidad;

import com.hotelLosViejos.HotelLosViejos.Dominio.Publicidad;

import java.util.List;
import java.util.stream.Collectors;

public class PublicidadMapperDTO {
    public static Publicidad convertirPublicidadRegistroDTOAPublicidad(PublicidadRegistroDTO publicidadRegistroDTO){

        return new Publicidad(publicidadRegistroDTO);

    }

    public static List<PublicidadLecturaDTO> convertirListaPublicidadAListaPublicidadLecturaDTO(List<Publicidad> listaPublicidadLecturaDTO){

        return listaPublicidadLecturaDTO.stream()
                .map(PublicidadLecturaDTO::new)
                .collect(Collectors.toList());
    }

    public static Publicidad convertirPublicidadActualizacionDTOAPublicidad(PublicidadActualizacionDTO publicidadActualizacionDTO){

        return new Publicidad(publicidadActualizacionDTO);

    }
}
