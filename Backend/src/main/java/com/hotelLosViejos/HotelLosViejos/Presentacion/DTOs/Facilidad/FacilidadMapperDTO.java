package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Facilidad;

import com.hotelLosViejos.HotelLosViejos.Dominio.Facilidad;

import java.util.List;
import java.util.stream.Collectors;

public class FacilidadMapperDTO {

    public static List<FacilidadLecturaDTO> convertirFacilidadesAFacilidadesLecturaDTO(List<Facilidad> facilidades){

        return facilidades.stream()
                .map(FacilidadLecturaDTO::new)
                .collect(Collectors.toList());
    }

    public static Facilidad convertirFacilidadRegistroDTOAFacilidad(FacilidadRegistroDTO facilidadRegistroDTO){
        return new Facilidad(facilidadRegistroDTO);
    }

    public static Facilidad convertirFacilidadActualizacionDTOAFacilidad(FacilidadActualizacionDTO facilidadActualizacionDTO){
        return new Facilidad(facilidadActualizacionDTO);
    }

}
