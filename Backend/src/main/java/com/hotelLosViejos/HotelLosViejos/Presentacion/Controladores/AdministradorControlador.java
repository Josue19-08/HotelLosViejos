package com.hotelLosViejos.HotelLosViejos.Presentacion.Controladores;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IAdministrador;
import com.hotelLosViejos.HotelLosViejos.Dominio.Administrador;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Administrador.AdministradorMapperDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Administrador.CredencialesAdministradorDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/administrador")
public class AdministradorControlador {

    @Autowired
    private final IAdministrador iAdministrador;

    public AdministradorControlador(IAdministrador iAdministrador) {
        this.iAdministrador = iAdministrador;
    }

    @GetMapping
    public ResponseEntity<List<Administrador>> obtenerAdministradores(){
        return ResponseEntity.ok(this.iAdministrador.obtenerAdministradores());
    }

    @PostMapping
    public ResponseEntity<Boolean> registrarAdministrador( @RequestBody Administrador administrador){
        return ResponseEntity.created(null).body(this.iAdministrador.registrarAdministrador(administrador));
    }

    @PutMapping
    public ResponseEntity<Boolean> actualizarAdministrador( @RequestBody Administrador administrador){
        return ResponseEntity.status(HttpStatusCode.valueOf(200))
                .body(this.iAdministrador.actualizarAdministrador(administrador));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> eliminarAdministrador( @PathVariable int id){
        return ResponseEntity.ok(this.iAdministrador.eliminarAdminPorId(id));
    }

    @PostMapping("/autenticar")
    public ResponseEntity<Boolean> autenticarAdmin
            ( @RequestBody CredencialesAdministradorDTO credencialesAdministradorDTO){

        Administrador administrador = AdministradorMapperDTO.convertirCredencialesAdministradorDTOAAdministrador(credencialesAdministradorDTO);

        return ResponseEntity.ok(this.iAdministrador.autenticarAdmin(administrador));
    }

}
