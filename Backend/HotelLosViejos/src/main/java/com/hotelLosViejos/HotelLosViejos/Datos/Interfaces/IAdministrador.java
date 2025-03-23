package com.hotelLosViejos.HotelLosViejos.Datos.Interfaces;

import com.hotelLosViejos.HotelLosViejos.Dominio.Administrador;

import java.util.List;

public interface IAdministrador {

    public List<Administrador> obtenerAdministradores();

    public boolean registrarAdministrador(Administrador administrador);

    public boolean actualizarAdministrador(Administrador administrador);

    public boolean eliminarAdminPorId(int id);
}
