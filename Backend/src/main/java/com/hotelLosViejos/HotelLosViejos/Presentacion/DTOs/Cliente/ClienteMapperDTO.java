package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Cliente;

import com.hotelLosViejos.HotelLosViejos.Dominio.Cliente;

import java.util.List;
import java.util.stream.Collectors;

public class ClienteMapperDTO {

    public static Cliente convertirClienteRegistroDTOACliente(ClienteRegistroDTO dto) {
        Cliente cliente = new Cliente();
        cliente.setId(dto.id());
        cliente.setNombre(dto.nombre());
        cliente.setApellidos(dto.apellidos());
        cliente.setCorreo(dto.correo());
        return cliente;
    }

    public static Cliente convertirClienteActualizacionDTOACliente(ClienteActualizacionDTO dto) {
        Cliente cliente = new Cliente();
        cliente.setId(dto.id());
        cliente.setNombre(dto.nombre());
        cliente.setApellidos(dto.apellidos());
        cliente.setCorreo(dto.correo());
        return cliente;
    }

    public static List<ClienteLecturaDTO> convertirClientesAClientesLecturaDTO(List<Cliente> clientes) {
        return clientes.stream().map(ClienteLecturaDTO::new).collect(Collectors.toList());
    }

    public static ClienteLecturaDTO convertirClienteAClienteLecturaDTO(Cliente cliente){
        return new ClienteLecturaDTO(cliente);
    }
}
