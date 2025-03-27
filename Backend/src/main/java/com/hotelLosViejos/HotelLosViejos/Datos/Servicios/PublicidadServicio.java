package com.hotelLosViejos.HotelLosViejos.Datos.Servicios;


import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IPublicidad;
import com.hotelLosViejos.HotelLosViejos.Datos.Repositorios.PublicidadRepositorio;
import com.hotelLosViejos.HotelLosViejos.Dominio.Publicidad;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublicidadServicio implements IPublicidad {

    @Autowired
    private final PublicidadRepositorio publicidadRepositorio;

    public PublicidadServicio(PublicidadRepositorio publicidadRepositorio) {
        this.publicidadRepositorio = publicidadRepositorio;
    }

    @Override
    public boolean registrarPublicidad(Publicidad publicidad) {
        try {

            this.publicidadRepositorio.save(publicidad);
            return true;

        }catch (Exception e){
            return false;
        }
    }

    @Override
    public List<Publicidad> obtenerPublicidad() {
        return this.publicidadRepositorio.findAll();
    }

    @Modifying
    @Transactional
    @Override
    public boolean actualizarPublicidad(Publicidad publicidadNueva) {
        try {

            Publicidad publicidadEncontrada = this.publicidadRepositorio.findById(publicidadNueva.getId())
                    .orElseThrow( () -> new Exception("Publicidad no encontrada") );

            publicidadEncontrada = publicidadNueva;

            this.publicidadRepositorio.save(publicidadEncontrada);
            return true;

        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean eliminarPublicidad(int idPublicidad) {
        try {

            boolean publicidadEncontrada = this.publicidadRepositorio.existsById(idPublicidad);

            if(!publicidadEncontrada)
                throw new Exception("Publicidad no encontrada");

            this.publicidadRepositorio.deleteById(idPublicidad);
            return true;

        }catch (Exception e){
            return false;
        }
    }

}
