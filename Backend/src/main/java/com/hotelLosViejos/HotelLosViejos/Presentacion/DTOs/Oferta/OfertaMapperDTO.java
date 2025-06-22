package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Oferta;

import com.hotelLosViejos.HotelLosViejos.Dominio.Oferta;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Oferta.OfertaActualizacionDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Oferta.OfertaLecturaDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Oferta.OfertaRegistroDTO;

import java.util.List;
import java.util.stream.Collectors;

public class OfertaMapperDTO {

    public static List<OfertaLecturaDTO> convertirOfertasAOfertaLecturaDTO(List<Oferta> ofertas) {
        return ofertas.stream()
                .map(OfertaLecturaDTO::new)
                .collect(Collectors.toList());
    }

    public static Oferta convertirOfertaRegistroDTOAOferta(OfertaRegistroDTO ofertaRegistroDTO) {
        return new Oferta(ofertaRegistroDTO);
    }

    public static Oferta convertirOfertaActualizacionDTOAOferta(OfertaActualizacionDTO ofertaActualizacionDTO) {
        return new Oferta(ofertaActualizacionDTO);
    }
}
