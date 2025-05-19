package com.hotelLosViejos.HotelLosViejos.Presentacion.Controladores;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IDisponibilidad;
import com.hotelLosViejos.HotelLosViejos.Dominio.Disponibilidad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/disponibilidad")
public class DisponibilidadControlador {

    @Autowired
    private final IDisponibilidad iDisponibilidad;

    public DisponibilidadControlador(IDisponibilidad iDisponibilidad) {
        this.iDisponibilidad = iDisponibilidad;
    }

    // Endpoint para consultar disponibilidad y costo de estadía
    @GetMapping
    public ResponseEntity<List<Disponibilidad>> consultarCostoEstadia(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fechaInicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date fechaFin,
            @RequestParam(defaultValue = "all") String tipoHabitacion
    ) {
        List<Disponibilidad> listaDisponibilidad = iDisponibilidad.consultarCostoEstadia(fechaInicio, fechaFin, tipoHabitacion);
        return ResponseEntity.ok(listaDisponibilidad);
    }
}
