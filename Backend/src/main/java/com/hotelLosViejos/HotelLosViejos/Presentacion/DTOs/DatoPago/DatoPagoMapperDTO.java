package com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.DatoPago;

import com.hotelLosViejos.HotelLosViejos.Dominio.Cliente;
import com.hotelLosViejos.HotelLosViejos.Dominio.DatoPago;

import java.util.List;
import java.util.stream.Collectors;

public class DatoPagoMapperDTO {

    public static DatoPago convertirRegistroDTOADatoPago(DatoPagoRegistroDTO dto) {
        DatoPago datoPago = new DatoPago();
        datoPago.setNumeroTarjeta(dto.numeroTarjeta());

        Cliente cliente = new Cliente();
        cliente.setId(dto.idCliente());
        datoPago.setCliente(cliente);

        return datoPago;
    }

    public static DatoPago convertirActualizacionDTOADatoPago(DatoPagoActualizacionDTO dto) {
        DatoPago datoPago = new DatoPago();
        datoPago.setId(dto.id());
        datoPago.setNumeroTarjeta(dto.numeroTarjeta());

        Cliente cliente = new Cliente();
        cliente.setId(dto.idCliente());
        datoPago.setCliente(cliente);

        return datoPago;
    }

    public static List<DatoPagoLecturaDTO> convertirListaADTO(List<DatoPago> lista) {
        return lista.stream().map(DatoPagoLecturaDTO::new).collect(Collectors.toList());
    }
}
