package com.hotelLosViejos.HotelLosViejos.Datos.Repositorios;

import com.hotelLosViejos.HotelLosViejos.Dominio.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepositorio extends JpaRepository<Cliente, Integer> {
}
