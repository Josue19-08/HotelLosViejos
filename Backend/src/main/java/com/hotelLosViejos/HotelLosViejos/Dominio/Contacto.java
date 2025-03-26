package com.hotelLosViejos.HotelLosViejos.Dominio;

import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Contacto.ContactoActualizacionDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Contacto.ContactoRegistroDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Contacto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String correo;

    private String telefono;

    private String codigoPostal;

    @Column(length = 2500)
    private String direccion;

    public Contacto(ContactoRegistroDTO contactoRegistroDTO) {
        this.correo = contactoRegistroDTO.correo();
        this.telefono = contactoRegistroDTO.telefono();
        this.codigoPostal = contactoRegistroDTO.codigoPostal();
        this.direccion = contactoRegistroDTO.direccion();
    }

    public Contacto(ContactoActualizacionDTO contactoActualizacionDTO) {
        this.id = contactoActualizacionDTO.id();
        this.correo = contactoActualizacionDTO.correo();
        this.telefono = contactoActualizacionDTO.telefono();
        this.codigoPostal = contactoActualizacionDTO.codigoPostal();
        this.direccion = contactoActualizacionDTO.direccion();
    }
}
