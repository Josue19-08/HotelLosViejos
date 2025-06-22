package com.hotelLosViejos.HotelLosViejos.Dominio;

import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Oferta.OfertaActualizacionDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Oferta.OfertaRegistroDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Oferta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String titulo;

    @Column(length = 2000)
    private String descripcion;

    private int porcentaje;

    private String aplica;

    private LocalDateTime fechaInicio;

    private LocalDateTime fechaFin;

    // Constructor para crear desde DTO de registro
    public Oferta(OfertaRegistroDTO ofertaRegistroDTO) {
        this.titulo = ofertaRegistroDTO.titulo();
        this.descripcion = ofertaRegistroDTO.descripcion();
        this.porcentaje = ofertaRegistroDTO.porcentaje();
        this.aplica = ofertaRegistroDTO.aplica();
        this.fechaInicio = ofertaRegistroDTO.fechaInicio();
        this.fechaFin = ofertaRegistroDTO.fechaFin();
    }

    // Constructor para actualizar desde DTO de actualización
    public Oferta(OfertaActualizacionDTO ofertaActualizacionDTO) {
        this.id = ofertaActualizacionDTO.id();
        this.titulo = ofertaActualizacionDTO.titulo();
        this.descripcion = ofertaActualizacionDTO.descripcion();
        this.porcentaje = ofertaActualizacionDTO.porcentaje();
        this.aplica = ofertaActualizacionDTO.aplica();
        this.fechaInicio = ofertaActualizacionDTO.fechaInicio();
        this.fechaFin = ofertaActualizacionDTO.fechaFin();
    }
}
