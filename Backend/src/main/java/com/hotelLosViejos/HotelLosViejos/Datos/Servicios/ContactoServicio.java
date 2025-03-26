package com.hotelLosViejos.HotelLosViejos.Datos.Servicios;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IContacto;
import com.hotelLosViejos.HotelLosViejos.Datos.Repositorios.ContactoRepositorio;
import com.hotelLosViejos.HotelLosViejos.Dominio.Contacto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactoServicio implements IContacto {

    @Autowired
    private final ContactoRepositorio contactoRepositorio;

    public ContactoServicio(ContactoRepositorio contactoRepositorio) {
        this.contactoRepositorio = contactoRepositorio;
    }

    @Override
    public boolean registrarContacto(Contacto contacto) {
        try {

            this.contactoRepositorio.save(contacto);
            return true;

        }catch (Exception e){
            return false;
        }
    }

    @Override
    public List<Contacto> obtenerContacto() {
        return this.contactoRepositorio.findAll();
    }

    @Modifying
    @Transactional
    @Override
    public boolean actualizarContacto(Contacto nuevoContacto) {
        try {

            Contacto contactoEncontrado = this.contactoRepositorio.findById(nuevoContacto.getId())
                    .orElseThrow( () -> new Exception("Contacto no encontrado") );

            contactoEncontrado = nuevoContacto;

            this.contactoRepositorio.save(contactoEncontrado);
            return true;

        }catch (Exception e){
            return false;
        }
    }

    @Override
    public boolean eliminarContacto(int idContacto) {
        try {

            boolean contactoEncontrado = this.contactoRepositorio.existsById(idContacto);

            if(!contactoEncontrado)
                throw new Exception("Contacto no encontrado");

            this.contactoRepositorio.deleteById(idContacto);
            return true;

        }catch (Exception e){
            return false;
        }
    }
}
