package com.hotelLosViejos.HotelLosViejos.Datos.Repositorios;

import com.hotelLosViejos.HotelLosViejos.Dominio.Contacto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactoRepositorio extends JpaRepository<Contacto,Integer> {
}
