package com.hotelLosViejos.HotelLosViejos.Datos.Servicios;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IInformacion;
import com.hotelLosViejos.HotelLosViejos.Datos.Repositorios.InformacionRepositorio;
import com.hotelLosViejos.HotelLosViejos.Dominio.Informacion;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InformacionServicio implements IInformacion {

    @Autowired
    private final InformacionRepositorio informacionRepositorio;

    public InformacionServicio(InformacionRepositorio informacionRepositorio) {
        this.informacionRepositorio = informacionRepositorio;
    }

    @Override
    public boolean registrarInformacion(Informacion informacion) {
        try {

            this.informacionRepositorio.save(informacion);
            return true;

        }catch (Exception e){
            return false;
        }
    }

    @Override
    public List<Informacion> obtenerInformacion() {
        return this.informacionRepositorio.findAll();
    }

    @Modifying
    @Transactional
    @Override
    public boolean actualizarInformacion(Informacion informacionNueva) {
        try {

            Informacion informacionEncontrada = this.informacionRepositorio.findById(informacionNueva.getId())
                    .orElseThrow( () -> new Exception("Informacion no encontrada") );

            informacionEncontrada = informacionNueva;

            this.informacionRepositorio.save(informacionEncontrada);
            return true;

        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean eliminarInformacion(int idInformacion) {
        try {

            boolean informacionEncontrada = this.informacionRepositorio.existsById(idInformacion);

            if(!informacionEncontrada)
                throw new Exception("Informacion no encontrada");

            this.informacionRepositorio.deleteById(idInformacion);
            return true;

        }catch (Exception e){
            return false;
        }
    }
}
