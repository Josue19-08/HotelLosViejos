package com.hotelLosViejos.HotelLosViejos.Presentacion.Controladores;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IPublicidad;
import com.hotelLosViejos.HotelLosViejos.Dominio.Publicidad;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Publicidad.PublicidadLecturaDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Publicidad.PublicidadMapperDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Publicidad.PublicidadRegistroDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Publicidad.PublicidadActualizacionDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publicidad")
public class PublicidadControlador {


    @Autowired
    private final IPublicidad Ipublicidad;

    public PublicidadControlador(IPublicidad ipublicidad) {
        Ipublicidad = ipublicidad;
    }

    @PostMapping
    public ResponseEntity<Boolean> registrarPublicidad( @Valid @RequestBody PublicidadRegistroDTO publicidadRegistroDTO){

        Publicidad publicidad = PublicidadMapperDTO
                .convertirPublicidadRegistroDTOAPublicidad(publicidadRegistroDTO);

        return ResponseEntity.created(null).body(this.Ipublicidad.registrarPublicidad(publicidad));

    }

    @GetMapping
    public ResponseEntity<List<PublicidadLecturaDTO>> obtenerPublicidad(){

        return ResponseEntity.
                ok(PublicidadMapperDTO.
                        convertirListaPublicidadAListaPublicidadLecturaDTO
                                (this.Ipublicidad.obtenerPublicidad()));
    }

    @PutMapping
    public ResponseEntity<Boolean> actualizarPublicidad( @Valid @RequestBody PublicidadActualizacionDTO publicidadActualizacionDTO){

        Publicidad publicidad = PublicidadMapperDTO
                .convertirPublicidadActualizacionDTOAPublicidad(publicidadActualizacionDTO);

        return ResponseEntity.ok(this.Ipublicidad.actualizarPublicidad(publicidad));

    }

    @DeleteMapping("/{idPublicidad}")
    public ResponseEntity<Boolean> eliminarPublicidad
            ( @Min (value = 1, message = "{publicidad.id.mayor1}") @PathVariable int idPublicidad){

        return ResponseEntity.ok(this.Ipublicidad.eliminarPublicidad(idPublicidad));

    }

}
