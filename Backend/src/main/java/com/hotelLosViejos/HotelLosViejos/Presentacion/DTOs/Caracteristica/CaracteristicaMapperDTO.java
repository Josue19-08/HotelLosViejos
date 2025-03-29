package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Caracteristica;

import com.hotelLosViejos.HotelLosViejos.Dominio.Caracteristica;

import java.util.List;
import java.util.stream.Collectors;

public class CaracteristicaMapperDTO {

    public static Caracteristica convertirRegistroDTOACaracteristica(CaracteristicaRegistroDTO dto) {
        Caracteristica c = new Caracteristica();
        c.setTitulo(dto.titulo());
        c.setDescripcion(dto.descripcion());
        return c;
    }

    public static Caracteristica convertirActualizacionDTOACaracteristica(CaracteristicaActualizacionDTO dto) {
        Caracteristica c = new Caracteristica();
        c.setId(dto.id());
        c.setTitulo(dto.titulo());
        c.setDescripcion(dto.descripcion());
        return c;
    }

    public static List<CaracteristicaLecturaDTO> convertirLista(List<Caracteristica> lista) {
        return lista.stream()
                .map(CaracteristicaLecturaDTO::new)
                .collect(Collectors.toList());
    }
}
