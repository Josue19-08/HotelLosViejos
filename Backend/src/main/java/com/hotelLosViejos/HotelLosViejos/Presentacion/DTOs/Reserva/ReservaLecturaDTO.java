package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Reserva;

import com.hotelLosViejos.HotelLosViejos.Dominio.Reserva;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Cliente.ClienteLecturaDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Cliente.ClienteMapperDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Habitacion.HabitacionLecturaDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Habitacion.HabitacionMapperDTO;

import java.time.LocalDateTime;

public record ReservaLecturaDTO(
        int id,
        String numeroReserva,
        LocalDateTime fechaLlegada,
        LocalDateTime fechaSalida,
        ClienteLecturaDTO cliente,
        HabitacionLecturaDTO habitacion
) {
    public ReservaLecturaDTO(Reserva r) {
        this(r.getId(),
                r.getNumeroReserva(),
                r.getFechaLlegada(),
                r.getFechaSalida(),
                ClienteMapperDTO.convertirClienteAClienteLecturaDTO(r.getCliente()),
                HabitacionMapperDTO.convertirHabitacionAHabitacionLecturaDTO(r.getHabitacion())
                );
    }
}
