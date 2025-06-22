package com.hotelLosViejos.HotelLosViejos.Datos.Repositorios;

import com.hotelLosViejos.HotelLosViejos.Dominio.Habitacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HabitacionRepositorio extends JpaRepository<Habitacion, Integer> {
}
