package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Contacto;

import com.hotelLosViejos.HotelLosViejos.Dominio.Contacto;

public record ContactoLecturaDTO(

        Integer id,

        String correo,

        String telefono,

        String codigoPostal,

        String direccion
) {

    public ContactoLecturaDTO(Contacto contacto){
        this(contacto.getId(), contacto.getCorreo(), contacto.getTelefono(),
                contacto.getCodigoPostal(), contacto.getDireccion());
    }

}
