package com.hotelLosViejos.HotelLosViejos.Datos.Servicios;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IDatoPago;
import com.hotelLosViejos.HotelLosViejos.Datos.Repositorios.DatoPagoRepositorio;
import com.hotelLosViejos.HotelLosViejos.Dominio.DatoPago;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DatoPagoServicio implements IDatoPago {

    @Autowired
    private final DatoPagoRepositorio repositorio;

    public DatoPagoServicio(DatoPagoRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    @Override
    public boolean registrar(DatoPago datoPago) {
        try {
            repositorio.save(datoPago);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    @Override
    public boolean actualizar(DatoPago datoPago) {
        try {
            DatoPago existente = repositorio.findById(datoPago.getId())
                    .orElseThrow(() -> new Exception("DatoPago no encontrado"));

            existente.setNumeroTarjeta(datoPago.getNumeroTarjeta());
            existente.setCliente(datoPago.getCliente());

            repositorio.save(existente);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean eliminar(int id) {
        try {
            if (!repositorio.existsById(id)) return false;
            repositorio.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public DatoPago obtenerPorId(int id) {
        return repositorio.findById(id).orElse(null);
    }

    @Override
    public List<DatoPago> obtenerTodos() {
        return repositorio.findAll();
    }
}
