package com.hotelLosViejos.HotelLosViejos.Datos.Servicios;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IFacilidad;
import com.hotelLosViejos.HotelLosViejos.Datos.Repositorios.FacilidadRepositorio;
import com.hotelLosViejos.HotelLosViejos.Dominio.Facilidad;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacilidadServicio implements IFacilidad {

    @Autowired
    private final FacilidadRepositorio facilidadRepositorio;

    public FacilidadServicio(FacilidadRepositorio facilidadRepositorio) {
        this.facilidadRepositorio = facilidadRepositorio;
    }

    @Override
    public boolean registrarFacilidad(Facilidad facilidad) {
        try {

            this.facilidadRepositorio.save(facilidad);
            return true;

        }catch (Exception e){
            return false;
        }
    }

    @Override
    public List<Facilidad> obtenerFacilidades() {
        return this.facilidadRepositorio.findAll();
    }

    @Modifying
    @Transactional
    @Override
    public boolean actualizarFacilidad(Facilidad facilidadNueva) {
        try {

            Facilidad facilidadEncontrada = this.facilidadRepositorio.findById(facilidadNueva.getId())
                    .orElseThrow( () -> new Exception("Facilidad no encontrada") );

            facilidadEncontrada = facilidadNueva;

            this.facilidadRepositorio.save(facilidadEncontrada);
            return true;

        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean eliminarFacilidad(int idFacilidad) {
        try {

            boolean facilidadEncontrada = this.facilidadRepositorio.existsById(idFacilidad);

            if(!facilidadEncontrada)
                throw new Exception("Facilidad no encontrada");

            this.facilidadRepositorio.deleteById(idFacilidad);
            return true;

        }catch (Exception e){
            return false;
        }
    }
}
