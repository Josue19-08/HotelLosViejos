package com.hotelLosViejos.HotelLosViejos.Presentacion.Controladores;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IDatoPago;
import com.hotelLosViejos.HotelLosViejos.Dominio.DatoPago;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.DatoPago.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dato-pago")
public class DatoPagoControlador {

    @Autowired
    private final IDatoPago servicio;

    public DatoPagoControlador(IDatoPago servicio) {
        this.servicio = servicio;
    }

    @PostMapping
    public ResponseEntity<Boolean> registrar(@RequestBody @Valid DatoPagoRegistroDTO dto) {
        DatoPago datoPago = DatoPagoMapperDTO.convertirRegistroDTOADatoPago(dto);
        return ResponseEntity.ok(servicio.registrar(datoPago));
    }

    @PutMapping
    public ResponseEntity<Boolean> actualizar(@RequestBody @Valid DatoPagoActualizacionDTO dto) {
        DatoPago datoPago = DatoPagoMapperDTO.convertirActualizacionDTOADatoPago(dto);
        return ResponseEntity.ok(servicio.actualizar(datoPago));
    }

    @GetMapping
    public ResponseEntity<List<DatoPagoLecturaDTO>> obtenerTodos() {
        return ResponseEntity.ok(DatoPagoMapperDTO.convertirListaADTO(servicio.obtenerTodos()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> eliminar(@PathVariable @Min(value = 1, message = "{datoPago.id.mayor1}") int id) {
        return ResponseEntity.ok(servicio.eliminar(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DatoPagoLecturaDTO> obtenerPorId(@PathVariable int id) {
        DatoPago datoPago = servicio.obtenerPorId(id);
        return datoPago != null ? ResponseEntity.ok(new DatoPagoLecturaDTO(datoPago)) : ResponseEntity.notFound().build();
    }
}
