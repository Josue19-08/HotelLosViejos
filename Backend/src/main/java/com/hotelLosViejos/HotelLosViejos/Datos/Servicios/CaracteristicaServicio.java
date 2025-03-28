package com.hotelLosViejos.HotelLosViejos.Datos.Servicios;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.ICaracteristica;
import com.hotelLosViejos.HotelLosViejos.Datos.Repositorios.CaracteristicaRepositorio;
import com.hotelLosViejos.HotelLosViejos.Dominio.Caracteristica;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CaracteristicaServicio implements ICaracteristica {

    @Autowired
    private final CaracteristicaRepositorio caracteristicaRepositorio;

    public CaracteristicaServicio(CaracteristicaRepositorio caracteristicaRepositorio) {
        this.caracteristicaRepositorio = caracteristicaRepositorio;
    }

    @Override
    public boolean registrarCaracteristica(Caracteristica caracteristica) {
        try {
            this.caracteristicaRepositorio.save(caracteristica);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<Caracteristica> obtenerCaracteristicas() {
        return this.caracteristicaRepositorio.findAll();
    }

    @Modifying
    @Transactional
    @Override
    public boolean actualizarCaracteristica(Caracteristica nueva) {
        try {
            Caracteristica existente = this.caracteristicaRepositorio.findById(nueva.getId())
                    .orElseThrow(() -> new Exception("Característica no encontrada"));

            existente = nueva;
            this.caracteristicaRepositorio.save(existente);
            return true;

        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean eliminarCaracteristica(int idCaracteristica) {
        try {
            boolean existe = this.caracteristicaRepositorio.existsById(idCaracteristica);
            if (!existe)
                throw new Exception("No existe");

            this.caracteristicaRepositorio.deleteById(idCaracteristica);
            return true;

        } catch (Exception e) {
            return false;
        }
    }
}
