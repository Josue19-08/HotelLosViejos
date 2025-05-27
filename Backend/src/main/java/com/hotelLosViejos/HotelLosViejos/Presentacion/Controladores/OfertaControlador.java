package com.hotelLosViejos.HotelLosViejos.Presentacion.Controladores;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IOferta;
import com.hotelLosViejos.HotelLosViejos.Dominio.Oferta;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Oferta.OfertaActualizacionDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Oferta.OfertaLecturaDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Oferta.OfertaMapperDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Oferta.OfertaRegistroDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/oferta")
public class OfertaControlador {

    @Autowired
    private final IOferta iOferta;

    public OfertaControlador(IOferta iOferta) {
        this.iOferta = iOferta;
    }

    @PostMapping
    public ResponseEntity<Boolean> registrarOferta(@Valid @RequestBody OfertaRegistroDTO ofertaRegistroDTO){

        Oferta oferta = OfertaMapperDTO
                .convertirOfertaRegistroDTOAOferta(ofertaRegistroDTO);

        return ResponseEntity.created(null).body(this.iOferta.registrarOferta(oferta));

    }

    @GetMapping
    public ResponseEntity<List<OfertaLecturaDTO>> obtenerOfertas(){

        return ResponseEntity
                .ok(OfertaMapperDTO
                        .convertirOfertasAOfertaLecturaDTO(
                                this.iOferta.obtenerOfertas()));
    }

    @PutMapping
    public ResponseEntity<Boolean> actualizarOferta(@Valid @RequestBody OfertaActualizacionDTO ofertaActualizacionDTO){

        Oferta oferta = OfertaMapperDTO
                .convertirOfertaActualizacionDTOAOferta(ofertaActualizacionDTO);

        return ResponseEntity.ok(this.iOferta.actualizarOferta(oferta));

    }

    @DeleteMapping("/{idOferta}")
    public ResponseEntity<Boolean> eliminarOferta(
            @Min(value = 1, message = "{oferta.id.mayor1}") @PathVariable int idOferta){

        return ResponseEntity.ok(this.iOferta.eliminarOferta(idOferta));

    }

}
