package com.hotelLosViejos.HotelLosViejos.Datos.Servicios;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IGaleria;
import com.hotelLosViejos.HotelLosViejos.Datos.Repositorios.GaleriaRepositorio;
import com.hotelLosViejos.HotelLosViejos.Dominio.Galeria;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GaleriaServicio implements IGaleria {

    @Autowired
    private final GaleriaRepositorio galeriaRepositorio;

    public GaleriaServicio(GaleriaRepositorio galeriaRepositorio) {
        this.galeriaRepositorio = galeriaRepositorio;
    }

    @Override
    public boolean registrarGaleria(Galeria galeria) {
        try {

            this.galeriaRepositorio.save(galeria);
            return true;

        }catch (Exception e){
            return false;
        }
    }

    @Override
    public List<Galeria> obtenerGalerias() {
        return this.galeriaRepositorio.findAll();
    }

    @Modifying
    @Transactional
    @Override
    public boolean actualizarGalerias(List<Galeria> nuevasGalerias) {
        try {
            List<Integer> nuevosIds = nuevasGalerias.stream()
                    .map(Galeria::getId)
                    .filter(id -> id != null) // evitar nulls
                    .toList();

            List<Galeria> existentes = galeriaRepositorio.findAll();

            List<Galeria> paraEliminar = existentes.stream()
                    .filter(img -> !nuevosIds.contains(img.getId()))
                    .toList();

            galeriaRepositorio.deleteAll(paraEliminar);

            galeriaRepositorio.saveAll(nuevasGalerias);

            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    @Override
    public boolean eliminarGaleria(int idGaleria) {
        try {

            boolean galeriaEncontrada = this.galeriaRepositorio.existsById(idGaleria);

            if(!galeriaEncontrada)
                throw new Exception("Galeria no encontrada");

            this.galeriaRepositorio.deleteById(idGaleria);
            return true;

        }catch (Exception e){
            return false;
        }
    }
}
