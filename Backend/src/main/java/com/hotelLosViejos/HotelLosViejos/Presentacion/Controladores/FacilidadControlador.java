package com.hotelLosViejos.HotelLosViejos.Presentacion.Controladores;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IFacilidad;
import com.hotelLosViejos.HotelLosViejos.Dominio.Facilidad;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Facilidad.FacilidadActualizacionDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Facilidad.FacilidadLecturaDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Facilidad.FacilidadMapperDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Facilidad.FacilidadRegistroDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/facilidad")
public class FacilidadControlador {

    @Autowired
    private final IFacilidad iFacilidad;

    public FacilidadControlador(IFacilidad iFacilidad) {
        this.iFacilidad = iFacilidad;
    }

    @PostMapping
    public ResponseEntity<Boolean> registrarFacilidad(@Valid @RequestBody FacilidadRegistroDTO facilidadRegistroDTO){

        Facilidad facilidad = FacilidadMapperDTO
                .convertirFacilidadRegistroDTOAFacilidad(facilidadRegistroDTO);

        return ResponseEntity.created(null).body(this.iFacilidad.registrarFacilidad(facilidad));

    }

    @GetMapping
    public ResponseEntity<List<FacilidadLecturaDTO>> obtenerFacilidades(){

        return ResponseEntity.
                ok(FacilidadMapperDTO.
                        convertirFacilidadesAFacilidadesLecturaDTO(
                        this.iFacilidad.obtenerFacilidades()));
    }

    @PutMapping
    public ResponseEntity<Boolean> actualizarFacilidad( @Valid @RequestBody FacilidadActualizacionDTO facilidadActualizacionDTO){

        Facilidad facilidad = FacilidadMapperDTO
                .convertirFacilidadActualizacionDTOAFacilidad(facilidadActualizacionDTO);

        return ResponseEntity.ok(this.iFacilidad.actualizarFacilidad(facilidad));

    }

    @DeleteMapping("/{idFacilidad}")
    public ResponseEntity<Boolean> eliminarFacilidad
            ( @Min(value = 1, message = "{facilidad.id.mayor1}") @PathVariable int idFacilidad){

        return ResponseEntity.ok(this.iFacilidad.eliminarFacilidad(idFacilidad));

    }

}
