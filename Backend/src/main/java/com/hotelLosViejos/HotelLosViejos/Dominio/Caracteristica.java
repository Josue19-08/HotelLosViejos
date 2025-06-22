package com.hotelLosViejos.HotelLosViejos.Dominio;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Caracteristica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String titulo;

    @Column(length = 2000)
    private String descripcion;

    @ManyToMany(mappedBy = "caracteristicas")
    private List<Habitacion> habitaciones;
}
