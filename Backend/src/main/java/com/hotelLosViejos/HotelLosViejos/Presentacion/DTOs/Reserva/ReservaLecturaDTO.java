package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Reserva;

import com.hotelLosViejos.HotelLosViejos.Dominio.Reserva;

import java.time.LocalDateTime;

public record ReservaLecturaDTO(
        int id,
        String numeroReserva,
        LocalDateTime fechaLlegada,
        LocalDateTime fechaSalida,
        String clienteNombre,
        int habitacionId
) {
    public ReservaLecturaDTO(Reserva r) {
        this(r.getId(), r.getNumeroReserva(), r.getFechaLlegada(), r.getFechaSalida(), r.getCliente().getNombre(), r.getHabitacion().getId());
    }
}
