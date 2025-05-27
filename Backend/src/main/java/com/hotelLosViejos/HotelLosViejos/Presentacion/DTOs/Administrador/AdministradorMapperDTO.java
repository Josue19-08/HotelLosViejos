package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Administrador;

import com.hotelLosViejos.HotelLosViejos.Dominio.Administrador;

public class AdministradorMapperDTO {

    public static Administrador convertirCredencialesAdministradorDTOAAdministrador
            (CredencialesAdministradorDTO credencialesAdministradorDTO){
        return new Administrador(credencialesAdministradorDTO);
    }

}
