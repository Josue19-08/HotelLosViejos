package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Habitacion;

import com.hotelLosViejos.HotelLosViejos.Dominio.Caracteristica;
import com.hotelLosViejos.HotelLosViejos.Dominio.Habitacion;

import java.util.List;
import java.util.stream.Collectors;

public record HabitacionLecturaDTO(
        int id,
        int numero,
        float tarifaDiariaBase,
        String nombreImagen,
        String tipo,
        String estado,
        List<CaracteristicaBasicaDTO> caracteristicas
) {
    public HabitacionLecturaDTO(Habitacion habitacion) {
        this(
                habitacion.getId(),
                habitacion.getNumero(),
                habitacion.getTarifaDiariaBase(),
                habitacion.getNombreImagen(),
                habitacion.getTipo().name(),
                habitacion.getEstado().name(),
                habitacion.getCaracteristicas().stream()
                        .map(CaracteristicaBasicaDTO::new)
                        .collect(Collectors.toList())
        );
    }

    public record CaracteristicaBasicaDTO(
            int id,
            String titulo,
            String descripcion
    ) {
        public CaracteristicaBasicaDTO(Caracteristica c) {
            this(c.getId(), c.getTitulo(), c.getDescripcion());
        }
    }
}
