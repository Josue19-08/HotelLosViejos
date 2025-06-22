package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Habitacion;

import com.hotelLosViejos.HotelLosViejos.Dominio.Habitacion;

import java.util.List;
import java.util.stream.Collectors;

public class HabitacionMapperDTO {

    public static Habitacion convertirHabitacionRegistroDTOAHabitacion(HabitacionRegistroDTO dto) {
        Habitacion habitacion = new Habitacion();
        habitacion.setNumero(dto.numero());
        habitacion.setTarifaDiariaBase(dto.tarifaDiariaBase());
        habitacion.setNombreImagen(dto.nombreImagen());
        habitacion.setTipo(Habitacion.TipoHabitacion.valueOf(dto.tipo().toUpperCase()));
        habitacion.setEstado(Habitacion.EstadoHabitacion.valueOf(dto.estado().toUpperCase()));
        return habitacion;
    }

    public static Habitacion convertirHabitacionActualizacionDTOAHabitacion(HabitacionActualizacionDTO dto) {
        Habitacion habitacion = new Habitacion();
        habitacion.setId(dto.id());
        habitacion.setNumero(dto.numero());
        habitacion.setTarifaDiariaBase(dto.tarifaDiariaBase());
        habitacion.setNombreImagen(dto.nombreImagen());
        habitacion.setTipo(Habitacion.TipoHabitacion.valueOf(dto.tipo().toUpperCase()));
        habitacion.setEstado(Habitacion.EstadoHabitacion.valueOf(dto.estado().toUpperCase()));
        return habitacion;
    }

    public static List<HabitacionLecturaDTO> convertirHabitacionesAHabitacionLecturaDTO(List<Habitacion> habitaciones) {
        return habitaciones.stream()
                .map(HabitacionLecturaDTO::new)
                .collect(Collectors.toList());
    }

    public static HabitacionLecturaDTO convertirHabitacionAHabitacionLecturaDTO(Habitacion habitacion){
        return new HabitacionLecturaDTO(habitacion);
    }
}
