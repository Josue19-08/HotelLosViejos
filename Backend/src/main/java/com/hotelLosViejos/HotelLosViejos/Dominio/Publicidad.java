package com.hotelLosViejos.HotelLosViejos.Dominio;

import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Publicidad.PublicidadActualizacionDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Publicidad.PublicidadRegistroDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor



public class Publicidad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 5000)
    private String nombre;

    @Column(length = 5000)
    private String imagen;

    private String enlace;
    @Column(length = 5000)

    private String descripcion;

    private String titulo;


    public Publicidad(PublicidadRegistroDTO publicidadRegistroDTO) {
        this.nombre = publicidadRegistroDTO.nombre();
        this.imagen = publicidadRegistroDTO.imagen();
        this.enlace = publicidadRegistroDTO.enlace();
        this.descripcion = publicidadRegistroDTO.descripcion();
        this.titulo = publicidadRegistroDTO.titulo();

    }

    public Publicidad(PublicidadActualizacionDTO publicidadActualizacionDTO) {
        this.id = publicidadActualizacionDTO.id();
        this.nombre = publicidadActualizacionDTO.nombre();
        this.imagen = publicidadActualizacionDTO.imagen();
        this.enlace = publicidadActualizacionDTO.enlace();
        this.descripcion = publicidadActualizacionDTO.descripcion();
        this.titulo = publicidadActualizacionDTO.titulo();

    }
}
