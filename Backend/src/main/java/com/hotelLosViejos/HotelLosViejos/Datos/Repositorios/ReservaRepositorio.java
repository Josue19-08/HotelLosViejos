package com.hotelLosViejos.HotelLosViejos.Datos.Repositorios;

import com.hotelLosViejos.HotelLosViejos.Dominio.Habitacion;
import com.hotelLosViejos.HotelLosViejos.Dominio.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservaRepositorio extends JpaRepository<Reserva, Integer> {
    List<Reserva> findByHabitacion(Habitacion habitacion);
}
