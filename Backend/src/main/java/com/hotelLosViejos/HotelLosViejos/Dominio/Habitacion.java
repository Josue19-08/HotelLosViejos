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
public class Habitacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int numero;

    private float tarifaDiariaBase;

    private String nombreImagen;

    @Enumerated(EnumType.STRING)
    private TipoHabitacion tipo;

    @Enumerated(EnumType.STRING)
    private EstadoHabitacion estado;

    @ManyToMany
    @JoinTable(
            name = "habitacion_caracteristica",
            joinColumns = @JoinColumn(name = "habitacion_id"),
            inverseJoinColumns = @JoinColumn(name = "caracteristica_id")
    )
    private List<Caracteristica> caracteristicas;

    public enum TipoHabitacion {
        ESTANDAR, JUNIOR
    }

    public enum EstadoHabitacion {
        LIBRE, OCUPADA, LIMPIEZA, DESHABILITADA
    }
}
