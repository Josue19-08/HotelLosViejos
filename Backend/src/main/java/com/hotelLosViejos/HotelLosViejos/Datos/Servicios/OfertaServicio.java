package com.hotelLosViejos.HotelLosViejos.Datos.Servicios;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IOferta;
import com.hotelLosViejos.HotelLosViejos.Datos.Repositorios.OfertaRepositorio;
import com.hotelLosViejos.HotelLosViejos.Dominio.Oferta;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfertaServicio implements IOferta {

    @Autowired
    private final OfertaRepositorio ofertaRepositorio;

    public OfertaServicio(OfertaRepositorio ofertaRepositorio) {
        this.ofertaRepositorio = ofertaRepositorio;
    }

    @Override
    public boolean registrarOferta(Oferta oferta) {
        try {
            this.ofertaRepositorio.save(oferta);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<Oferta> obtenerOfertas() {
        return this.ofertaRepositorio.findAll();
    }

    @Modifying
    @Transactional
    @Override
    public boolean actualizarOferta(Oferta ofertaNueva) {
        try {
            Oferta ofertaEncontrada = this.ofertaRepositorio.findById(ofertaNueva.getId())
                    .orElseThrow(() -> new Exception("Oferta no encontrada"));

            // Actualizar campos manualmente para evitar perder la referencia a la entidad gestionada
            ofertaEncontrada.setTitulo(ofertaNueva.getTitulo());
            ofertaEncontrada.setDescripcion(ofertaNueva.getDescripcion());
            ofertaEncontrada.setPorcentaje(ofertaNueva.getPorcentaje());
            ofertaEncontrada.setAplica(ofertaNueva.getAplica());
            ofertaEncontrada.setFechaInicio(ofertaNueva.getFechaInicio());
            ofertaEncontrada.setFechaFin(ofertaNueva.getFechaFin());

            this.ofertaRepositorio.save(ofertaEncontrada);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean eliminarOferta(int idOferta) {
        try {
            boolean ofertaEncontrada = this.ofertaRepositorio.existsById(idOferta);

            if (!ofertaEncontrada)
                throw new Exception("Oferta no encontrada");

            this.ofertaRepositorio.deleteById(idOferta);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
