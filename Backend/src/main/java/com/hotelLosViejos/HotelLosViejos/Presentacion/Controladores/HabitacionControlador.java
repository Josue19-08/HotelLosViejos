package com.hotelLosViejos.HotelLosViejos.Presentacion.Controladores;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IHabitacion;
import com.hotelLosViejos.HotelLosViejos.Datos.Repositorios.CaracteristicaRepositorio;
import com.hotelLosViejos.HotelLosViejos.Dominio.Caracteristica;
import com.hotelLosViejos.HotelLosViejos.Dominio.Habitacion;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Habitacion.*;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/habitacion")
public class HabitacionControlador {

    @Autowired
    private final IHabitacion iHabitacion;

    @Autowired
    private final CaracteristicaRepositorio caracteristicaRepositorio;

    public HabitacionControlador(IHabitacion iHabitacion, CaracteristicaRepositorio caracteristicaRepositorio) {
        this.iHabitacion = iHabitacion;
        this.caracteristicaRepositorio = caracteristicaRepositorio;
    }

    @PostMapping
    public ResponseEntity<Boolean> registrarHabitacion(@RequestBody HabitacionRegistroDTO dto) {
        List<Caracteristica> caracteristicas = caracteristicaRepositorio.findAllById(dto.caracteristicasIds());
        Habitacion habitacion = HabitacionMapperDTO.convertirHabitacionRegistroDTOAHabitacion(dto);
        habitacion.setCaracteristicas(caracteristicas);
        return ResponseEntity.created(null).body(iHabitacion.registrarHabitacion(habitacion));
    }

    @GetMapping
    public ResponseEntity<List<HabitacionLecturaDTO>> obtenerHabitaciones() {
        return ResponseEntity.ok(
                HabitacionMapperDTO.convertirHabitacionesAHabitacionLecturaDTO(
                        iHabitacion.obtenerHabitaciones()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<HabitacionLecturaDTO> obtenerHabitacionPorId(@PathVariable int id) {
        Habitacion habitacion = iHabitacion.obtenerHabitacionPorId(id);
        if (habitacion == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new HabitacionLecturaDTO(habitacion));
    }

    @PutMapping
    public ResponseEntity<Boolean> actualizarHabitacion(@RequestBody HabitacionActualizacionDTO dto) {
        List<Caracteristica> caracteristicas = caracteristicaRepositorio.findAllById(dto.caracteristicasIds());
        Habitacion habitacion = HabitacionMapperDTO.convertirHabitacionActualizacionDTOAHabitacion(dto);
        habitacion.setCaracteristicas(caracteristicas);
        return ResponseEntity.ok(iHabitacion.actualizarHabitacion(habitacion));
    }

    @DeleteMapping("/{idHabitacion}")
    public ResponseEntity<Boolean> eliminarHabitacion(@Min(value = 1, message = "{habitacion.id.minimo}")
                                                      @PathVariable int idHabitacion) {
        return ResponseEntity.ok(iHabitacion.eliminarHabitacion(idHabitacion));
    }
}
