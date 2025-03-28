package com.hotelLosViejos.HotelLosViejos.Presentacion.Controladores;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.ICaracteristica;
import com.hotelLosViejos.HotelLosViejos.Dominio.Caracteristica;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Caracteristica.*;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/caracteristicas")
public class CaracteristicaControlador {

    @Autowired
    private final ICaracteristica iCaracteristica;

    public CaracteristicaControlador(ICaracteristica iCaracteristica) {
        this.iCaracteristica = iCaracteristica;
    }

    @PostMapping
    public ResponseEntity<Boolean> registrar(@RequestBody CaracteristicaRegistroDTO dto) {
        Caracteristica c = CaracteristicaMapperDTO.convertirRegistroDTOACaracteristica(dto);
        return ResponseEntity.created(null).body(this.iCaracteristica.registrarCaracteristica(c));
    }

    @GetMapping
    public ResponseEntity<List<CaracteristicaLecturaDTO>> obtener() {
        return ResponseEntity.ok(
                CaracteristicaMapperDTO.convertirLista(this.iCaracteristica.obtenerCaracteristicas())
        );
    }

    @PutMapping
    public ResponseEntity<Boolean> actualizar(@RequestBody CaracteristicaActualizacionDTO dto) {
        Caracteristica c = CaracteristicaMapperDTO.convertirActualizacionDTOACaracteristica(dto);
        return ResponseEntity.ok(this.iCaracteristica.actualizarCaracteristica(c));
    }

    @DeleteMapping("/{idCaracteristica}")
    public ResponseEntity<Boolean> eliminar(@Min(value = 1, message = "{caracteristica.id.minimo}")
                                            @PathVariable int idCaracteristica) {
        return ResponseEntity.ok(this.iCaracteristica.eliminarCaracteristica(idCaracteristica));
    }
}
