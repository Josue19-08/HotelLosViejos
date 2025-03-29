package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Reserva;

import com.hotelLosViejos.HotelLosViejos.Dominio.Cliente;
import com.hotelLosViejos.HotelLosViejos.Dominio.Habitacion;
import com.hotelLosViejos.HotelLosViejos.Dominio.Reserva;

import java.util.List;
import java.util.stream.Collectors;

public class ReservaMapperDTO {

    public static Reserva convertirRegistroDTOAReserva(ReservaRegistroDTO dto, Cliente cliente, Habitacion habitacion) {
        Reserva reserva = new Reserva();
        reserva.setNumeroReserva("RES-" + System.currentTimeMillis());
        reserva.setFechaLlegada(dto.fechaLlegada());
        reserva.setFechaSalida(dto.fechaSalida());
        reserva.setCliente(cliente);
        reserva.setHabitacion(habitacion);
        return reserva;
    }

    public static Reserva convertirActualizacionDTOAReserva(ReservaActualizacionDTO dto, Reserva existente) {
        existente.setFechaLlegada(dto.fechaLlegada());
        existente.setFechaSalida(dto.fechaSalida());
        return existente;
    }

    public static List<ReservaLecturaDTO> convertirReservasALectura(List<Reserva> reservas) {
        return reservas.stream()
                .map(ReservaLecturaDTO::new)
                .collect(Collectors.toList());
    }

    public static List<ReservaLecturaDTO> convertirReservasALecturaDTOs(List<Reserva> reservas) {
        return reservas.stream()
                .map(ReservaLecturaDTO::new)
                .collect(Collectors.toList());
    }
}
