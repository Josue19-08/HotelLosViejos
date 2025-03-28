package com.hotelLosViejos.HotelLosViejos.Datos.Servicios;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.ICliente;
import com.hotelLosViejos.HotelLosViejos.Datos.Repositorios.ClienteRepositorio;
import com.hotelLosViejos.HotelLosViejos.Dominio.Cliente;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteServicio implements ICliente {

    private final ClienteRepositorio clienteRepositorio;

    public ClienteServicio(ClienteRepositorio clienteRepositorio) {
        this.clienteRepositorio = clienteRepositorio;
    }

    @Override
    public boolean registrarCliente(Cliente cliente) {
        try {
            clienteRepositorio.save(cliente);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    @Override
    public boolean actualizarCliente(Cliente cliente) {
        try {
            Cliente clienteExistente = clienteRepositorio.findById(cliente.getId())
                    .orElseThrow(() -> new Exception("Cliente no encontrado"));

            clienteExistente.setNombre(cliente.getNombre());
            clienteExistente.setApellidos(cliente.getApellidos());
            clienteExistente.setCorreo(cliente.getCorreo());

            clienteRepositorio.save(clienteExistente);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<Cliente> obtenerClientes() {
        return clienteRepositorio.findAll();
    }

    @Override
    public Cliente obtenerClientePorId(int id) {
        return clienteRepositorio.findById(id).orElse(null);
    }
}
