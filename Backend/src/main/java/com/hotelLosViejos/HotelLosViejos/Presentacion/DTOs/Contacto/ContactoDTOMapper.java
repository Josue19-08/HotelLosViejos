package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Contacto;

import com.hotelLosViejos.HotelLosViejos.Dominio.Contacto;

import java.util.List;
import java.util.stream.Collectors;

public class ContactoDTOMapper {

    public static Contacto convertirContactoRegistroDTOAContacto(ContactoRegistroDTO contactoRegistroDTO){

        return new Contacto(contactoRegistroDTO);

    }

    public static List<ContactoLecturaDTO> convertirContactosAContactosLecturaDTO(List<Contacto> contactos){

        return contactos.stream()
                .map(ContactoLecturaDTO::new)
                .collect(Collectors.toList());

    }

    public static Contacto convertirContactoActualizacionDTOAContacto(ContactoActualizacionDTO contactoActualizacionDTO){

        return new Contacto(contactoActualizacionDTO);

    }

}
