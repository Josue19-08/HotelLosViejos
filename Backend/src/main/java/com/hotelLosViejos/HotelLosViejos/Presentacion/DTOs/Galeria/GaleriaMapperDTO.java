package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Galeria;

import com.hotelLosViejos.HotelLosViejos.Dominio.Galeria;

import java.util.List;
import java.util.stream.Collectors;

public class GaleriaMapperDTO {

    public static Galeria convertirGaleriaRegistroDTOAGaleria(GaleriaRegistroDTO galeriaRegistroDTO){
        return new Galeria(galeriaRegistroDTO);
    }

    public static List<GaleriaLecturaDTO> convertirGaleriasAGaleriasLecturaDTO(List<Galeria> galerias){
        return galerias.stream()
                .map(GaleriaLecturaDTO::new)
                .collect(Collectors.toList());
    }

    public static List<Galeria> convertirGaleriasActualizacionDTOAGalerias(List<GaleriaActualizacionDTO> galeriasActualizacionDTO){
        return galeriasActualizacionDTO.stream()
                .map(Galeria::new)
                .collect(Collectors.toList());
    }

}
