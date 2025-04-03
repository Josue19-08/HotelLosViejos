package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Contacto;

import com.hotelLosViejos.HotelLosViejos.Dominio.Contacto;

public record ContactoLecturaDTO(

        Integer id,

        String correo,

        String telefono,

        String codigoPostal,

        String direccion,

        String latitud,

        String longitud
) {

    public ContactoLecturaDTO(Contacto contacto){
        this(contacto.getId(), contacto.getCorreo(), contacto.getTelefono(),
                contacto.getCodigoPostal(), contacto.getDireccion(), contacto.getLatitud(),
                contacto.getLongitud());
    }

}
