package com.hotelLosViejos.HotelLosViejos.Presentacion.Controladores;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IInformacion;
import com.hotelLosViejos.HotelLosViejos.Dominio.Informacion;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Informacion.InformacionLecturaDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Informacion.InformacionMapperDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Informacion.InformacionRegistroDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Informacion.InformactionActualizacionDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/informacion")
public class InformacionControlador {

    @Autowired
    private final IInformacion Iinformacion;

    public InformacionControlador(IInformacion iinformacion) {
        Iinformacion = iinformacion;
    }

    @PostMapping
    public ResponseEntity<Boolean> registrarInformacion( @Valid @RequestBody InformacionRegistroDTO informacionRegistroDTO){

        Informacion informacion = InformacionMapperDTO
                .convertirInformacionRegistroDTOAInformacion(informacionRegistroDTO);

        return ResponseEntity.created(null).body(this.Iinformacion.registrarInformacion(informacion));

    }

    @GetMapping
    public ResponseEntity<List<InformacionLecturaDTO>> obtenerInformacion(){

        return ResponseEntity.
                ok(InformacionMapperDTO.
                        convertirListaInformacionAListaInformacionLecturaDTO
                                (this.Iinformacion.obtenerInformacion()));
    }

    @PutMapping
    public ResponseEntity<Boolean> actualizarInformacion( @Valid @RequestBody InformactionActualizacionDTO informactionActualizacionDTO){

        Informacion informacion = InformacionMapperDTO
                .convertirInformacionActualizacionDTOAInformacion(informactionActualizacionDTO);

        return ResponseEntity.ok(this.Iinformacion.actualizarInformacion(informacion));

    }

    @DeleteMapping("/{idInformacion}")
    public ResponseEntity<Boolean> eliminarInformacion
             ( @Min (value = 1, message = "{informacion.id.mayor1}") @PathVariable int idInformacion){

        return ResponseEntity.ok(this.Iinformacion.eliminarInformacion(idInformacion));

    }


}
