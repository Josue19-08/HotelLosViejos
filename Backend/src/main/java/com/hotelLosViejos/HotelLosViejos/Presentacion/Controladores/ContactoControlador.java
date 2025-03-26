package com.hotelLosViejos.HotelLosViejos.Presentacion.Controladores;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IContacto;
import com.hotelLosViejos.HotelLosViejos.Dominio.Contacto;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Contacto.ContactoActualizacionDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Contacto.ContactoDTOMapper;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Contacto.ContactoLecturaDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Contacto.ContactoRegistroDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contacto")
public class ContactoControlador {

    @Autowired
    private final IContacto iContacto;

    public ContactoControlador(IContacto iContacto) {
        this.iContacto = iContacto;
    }


    @PostMapping
    public ResponseEntity<Boolean> registrarContacto(@Valid @RequestBody ContactoRegistroDTO contactoRegistroDTO){

        Contacto contacto = ContactoDTOMapper
                .convertirContactoRegistroDTOAContacto(contactoRegistroDTO);

        return ResponseEntity.created(null).body(this.iContacto.registrarContacto(contacto));

    }

    @GetMapping
    public ResponseEntity<List<ContactoLecturaDTO>> obtenerContacto(){

        return ResponseEntity.
                ok(ContactoDTOMapper.
                        convertirContactosAContactosLecturaDTO(
                                this.iContacto.obtenerContacto()));
    }

    @PutMapping
    public ResponseEntity<Boolean> actualizarContacto( @Valid @RequestBody ContactoActualizacionDTO contactoActualizacionDTO){

        Contacto contacto = ContactoDTOMapper
                .convertirContactoActualizacionDTOAContacto(contactoActualizacionDTO);

        return ResponseEntity.ok(this.iContacto.actualizarContacto(contacto));

    }

    @DeleteMapping("/{idContacto}")
    public ResponseEntity<Boolean> eliminarContacto
            ( @Min(value = 1, message = "{facilidad.id.mayor1}") @PathVariable int idContacto){

        return ResponseEntity.ok(this.iContacto.eliminarContacto(idContacto));

    }
}
