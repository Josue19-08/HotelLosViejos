package com.hotelLosViejos.HotelLosViejos.Dominio;

import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Administrador.CredencialesAdministradorDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Administrador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String correo;

    private String contrasenia;


    public Administrador(CredencialesAdministradorDTO credencialesAdministradorDTO) {
        this.correo = credencialesAdministradorDTO.correo();
        this.contrasenia = credencialesAdministradorDTO.contrasenia();
    }
}
