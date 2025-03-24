package com.hotelLosViejos.HotelLosViejos.Datos.Repositorios;

import com.hotelLosViejos.HotelLosViejos.Dominio.Informacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InformacionRepositorio extends JpaRepository<Informacion, Integer> {
}
