package com.hotelLosViejos.HotelLosViejos.Dominio;

import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Facilidad.FacilidadActualizacionDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Facilidad.FacilidadRegistroDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Facilidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String titulo;

    @Column(length = 2000)
    private String descripcion;

    @Column(length = 1000)
    private String nombreImagen;

    public Facilidad(FacilidadRegistroDTO facilidadRegistroDTO) {
        this.titulo = facilidadRegistroDTO.titulo();
        this.descripcion = facilidadRegistroDTO.descripcion();
        this.nombreImagen = facilidadRegistroDTO.nombreImagen();
    }

    public Facilidad(FacilidadActualizacionDTO facilidadActualizacionDTO) {
        this.id = facilidadActualizacionDTO.id();
        this.titulo = facilidadActualizacionDTO.titulo();
        this.descripcion = facilidadActualizacionDTO.descripcion();
        this.nombreImagen = facilidadActualizacionDTO.nombreImagen();
    }
}
