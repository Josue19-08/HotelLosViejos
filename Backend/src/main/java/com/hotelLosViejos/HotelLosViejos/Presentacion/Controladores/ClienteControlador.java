package com.hotelLosViejos.HotelLosViejos.Presentacion.Controladores;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.ICliente;
import com.hotelLosViejos.HotelLosViejos.Dominio.Cliente;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Cliente.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cliente")
public class ClienteControlador {

    @Autowired
    private final ICliente iCliente;

    public ClienteControlador(ICliente iCliente) {
        this.iCliente = iCliente;
    }

    @PostMapping
    public ResponseEntity<Boolean> registrarCliente(@RequestBody @Valid ClienteRegistroDTO dto) {
        Cliente cliente = ClienteMapperDTO.convertirClienteRegistroDTOACliente(dto);
        return ResponseEntity.ok(iCliente.registrarCliente(cliente));
    }

    @PutMapping
    public ResponseEntity<Boolean> actualizarCliente(@RequestBody @Valid ClienteActualizacionDTO dto) {
        Cliente cliente = ClienteMapperDTO.convertirClienteActualizacionDTOACliente(dto);
        return ResponseEntity.ok(iCliente.actualizarCliente(cliente));
    }

    @GetMapping
    public ResponseEntity<List<ClienteLecturaDTO>> obtenerClientes() {
        List<Cliente> clientes = iCliente.obtenerClientes();
        return ResponseEntity.ok(ClienteMapperDTO.convertirClientesAClientesLecturaDTO(clientes));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteLecturaDTO> obtenerClientePorId(@PathVariable int id) {
        Cliente cliente = iCliente.obtenerClientePorId(id);
        if (cliente == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new ClienteLecturaDTO(cliente));
    }

}
