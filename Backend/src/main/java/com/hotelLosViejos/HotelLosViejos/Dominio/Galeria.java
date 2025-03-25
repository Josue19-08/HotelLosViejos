package com.hotelLosViejos.HotelLosViejos.Dominio;

import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Galeria.GaleriaActualizacionDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Galeria.GaleriaRegistroDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Galeria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 2000)
    private String descripcion;

    @Column(length = 1000)
    private String nombreImagen;

    public Galeria(GaleriaRegistroDTO galeriaRegistroDTO) {
        this.descripcion = galeriaRegistroDTO.descripcion();
        this.nombreImagen = galeriaRegistroDTO.nombreImagen();
    }

    public Galeria(GaleriaActualizacionDTO galeriaActualizacionDTO) {
        this.id = galeriaActualizacionDTO.id();
        this.descripcion = galeriaActualizacionDTO.descripcion();
        this.nombreImagen = galeriaActualizacionDTO.nombreImagen();
    }
}
