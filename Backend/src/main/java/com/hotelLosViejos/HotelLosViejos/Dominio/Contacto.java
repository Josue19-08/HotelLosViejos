package com.hotelLosViejos.HotelLosViejos.Dominio;

import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Contacto.ContactoActualizacionDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Contacto.ContactoRegistroDTO;
import jakarta.persistence.*;
import jakarta.validation.groups.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.bind.DefaultValue;

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

    private String latitud;

    private String longitud;

    public Contacto(ContactoRegistroDTO contactoRegistroDTO) {
        this.correo = contactoRegistroDTO.correo();
        this.telefono = contactoRegistroDTO.telefono();
        this.codigoPostal = contactoRegistroDTO.codigoPostal();
        this.direccion = contactoRegistroDTO.direccion();
        this.latitud = contactoRegistroDTO.latitud();
        this.longitud = contactoRegistroDTO.longitud();
    }

    public Contacto(ContactoActualizacionDTO contactoActualizacionDTO) {
        this.id = contactoActualizacionDTO.id();
        this.correo = contactoActualizacionDTO.correo();
        this.telefono = contactoActualizacionDTO.telefono();
        this.codigoPostal = contactoActualizacionDTO.codigoPostal();
        this.direccion = contactoActualizacionDTO.direccion();
        this.longitud = contactoActualizacionDTO.longitud();
        this.latitud = contactoActualizacionDTO.latitud();
    }
}
