package com.hotelLosViejos.HotelLosViejos.Datos.Repositorios;

import com.hotelLosViejos.HotelLosViejos.Dominio.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdministradorRepositorio extends JpaRepository<Administrador, Integer> {

    public Optional<Administrador> findByCorreo(String correo);

}
