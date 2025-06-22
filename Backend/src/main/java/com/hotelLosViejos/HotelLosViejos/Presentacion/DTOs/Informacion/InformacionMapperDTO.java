package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Informacion;

import com.hotelLosViejos.HotelLosViejos.Dominio.Informacion;

import java.util.List;
import java.util.stream.Collectors;

public class InformacionMapperDTO {

    public static Informacion convertirInformacionRegistroDTOAInformacion(InformacionRegistroDTO informacionRegistroDTO){

        return new Informacion(informacionRegistroDTO);

    }

    public static List<InformacionLecturaDTO> convertirListaInformacionAListaInformacionLecturaDTO(List<Informacion> listaInformacionLecturaDTO){

        return listaInformacionLecturaDTO.stream()
                .map(InformacionLecturaDTO::new)
                .collect(Collectors.toList());
    }

    public static Informacion convertirInformacionActualizacionDTOAInformacion(InformactionActualizacionDTO informactionActualizacionDTO){

        return new Informacion(informactionActualizacionDTO);

    }
}

