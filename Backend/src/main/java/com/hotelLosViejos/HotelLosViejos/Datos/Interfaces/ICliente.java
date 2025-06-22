package com.hotelLosViejos.HotelLosViejos.Datos.Interfaces;

import com.hotelLosViejos.HotelLosViejos.Dominio.Cliente;

import java.util.List;

public interface ICliente {

    boolean registrarCliente(Cliente cliente);

    boolean actualizarCliente(Cliente cliente);

    List<Cliente> obtenerClientes();

    Cliente obtenerClientePorId(int id);
}
