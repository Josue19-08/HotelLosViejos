package com.hotelLosViejos.HotelLosViejos.Datos.Servicios;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IAdministrador;
import com.hotelLosViejos.HotelLosViejos.Datos.Repositorios.AdministradorRepositorio;
import com.hotelLosViejos.HotelLosViejos.Dominio.Administrador;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdministradorServicio implements IAdministrador {

    @Autowired
    private final AdministradorRepositorio administradorRepositorio;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AdministradorServicio(AdministradorRepositorio administradorRepositorio) {
        this.administradorRepositorio = administradorRepositorio;
    }


    @Override
    public List<Administrador> obtenerAdministradores() {
        return this.administradorRepositorio.findAll();
    }

    @Override
    public boolean registrarAdministrador(Administrador administrador) {

        try {
            String contraseniaHash = this.passwordEncoder.encode(administrador.getContrasenia());
            administrador.setContrasenia(contraseniaHash);
            this.administradorRepositorio.save(administrador);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    @Modifying
    @Transactional
    @Override
    public boolean actualizarAdministrador(Administrador administradorNuevo) {

        try {

            Administrador administradorEncontrado = this.administradorRepositorio.findById(administradorNuevo.getId()).orElseThrow( () -> new Exception("no se concentric"));

            administradorEncontrado = administradorNuevo;

            this.administradorRepositorio.save(administradorEncontrado);

            return true;
        } catch (Exception e) {
            return false;
        }

    }

    @Override
    public boolean eliminarAdminPorId(int id) {

        try {
            this.administradorRepositorio.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    @Override
    public boolean autenticarAdmin(Administrador administradorCredenciales) {

        Optional<Administrador> adminOptional = this.administradorRepositorio
                .findByCorreo(administradorCredenciales.getCorreo());

        if (adminOptional.isEmpty()) return false;

        Administrador admin = adminOptional.get();
        return passwordEncoder.matches(administradorCredenciales.getContrasenia()
                , admin.getContrasenia());
    }


}
