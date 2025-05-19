package com.hotelLosViejos.HotelLosViejos.Datos.Interfaces;

import com.hotelLosViejos.HotelLosViejos.Dominio.Administrador;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IAdministrador {

    public List<Administrador> obtenerAdministradores();

    public boolean registrarAdministrador(Administrador administrador);

    public boolean actualizarAdministrador(Administrador administrador);

    public boolean eliminarAdminPorId(int id);

}
