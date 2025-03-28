package com.hotelLosViejos.HotelLosViejos.Presentacion.Controladores;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.ICliente;
import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IDatoPago;
import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IHabitacion;
import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IReserva;
import com.hotelLosViejos.HotelLosViejos.Dominio.Cliente;
import com.hotelLosViejos.HotelLosViejos.Dominio.DatoPago;
import com.hotelLosViejos.HotelLosViejos.Dominio.Habitacion;
import com.hotelLosViejos.HotelLosViejos.Dominio.Reserva;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Cliente.ClienteMapperDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.DatoPago.DatoPagoMapperDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Reserva.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reserva")
public class ReservaControlador {

    @Autowired
    private final IReserva iReserva;

    @Autowired
    private final ICliente iCliente;

    @Autowired
    private final IHabitacion iHabitacion;

    @Autowired
    private final IDatoPago iDatoPago;

    public ReservaControlador(IReserva iReserva, ICliente iCliente, IHabitacion iHabitacion, IDatoPago iDatoPago) {
        this.iReserva = iReserva;
        this.iCliente = iCliente;
        this.iHabitacion = iHabitacion;
        this.iDatoPago = iDatoPago;
    }

    @PostMapping
    public ResponseEntity<Boolean> registrarReserva(@RequestBody @Valid ReservaRegistroDTO dto) {
        Cliente cliente = iCliente.obtenerClientePorId(dto.clienteId());
        Habitacion habitacion = iHabitacion.obtenerHabitacionPorId(dto.habitacionId());

        if (cliente == null || habitacion == null) return ResponseEntity.badRequest().body(false);

        Reserva reserva = ReservaMapperDTO.convertirRegistroDTOAReserva(dto, cliente, habitacion);
        return ResponseEntity.created(null).body(iReserva.registrarReserva(reserva));
    }

    @PostMapping("/completa")
    public ResponseEntity<ReservaLecturaDTO> registrarReservaCompleta(@RequestBody @Valid ReservaFullDTO dto) {
        // Crear cliente
        Cliente cliente = new Cliente();
        cliente.setNombre(dto.nombre());
        cliente.setApellidos(dto.apellidos());
        cliente.setCorreo(dto.correo());

        boolean clienteCreado = iCliente.registrarCliente(cliente);
        if (!clienteCreado) return ResponseEntity.badRequest().build();

        // Crear dato de pago
        DatoPago pago = new DatoPago();
        pago.setNumeroTarjeta(dto.numeroTarjeta());
        pago.setCliente(cliente);

        boolean pagoCreado = iDatoPago.registrar(pago);
        if (!pagoCreado) return ResponseEntity.badRequest().build();

        // Obtener habitación
        Habitacion habitacion = iHabitacion.obtenerHabitacionPorId(dto.habitacionId());
        if (habitacion == null) return ResponseEntity.badRequest().build();

        // Crear reserva
        Reserva reserva = ReservaMapperDTO.convertirRegistroDTOAReserva(
                new ReservaRegistroDTO(dto.fechaLlegada(), dto.fechaSalida(), cliente.getId(), dto.habitacionId()),
                cliente,
                habitacion
        );

        boolean creada = iReserva.registrarReserva(reserva);
        if (!creada) return ResponseEntity.badRequest().build();

        return ResponseEntity.ok(new ReservaLecturaDTO(reserva));
    }

    @GetMapping
    public ResponseEntity<List<ReservaLecturaDTO>> obtenerReservas() {
        return ResponseEntity.ok(ReservaMapperDTO.convertirReservasALecturaDTOs(iReserva.obtenerReservas()));
    }

    @PutMapping
    public ResponseEntity<Boolean> actualizarReserva(@RequestBody @Valid ReservaActualizacionDTO dto) {
        Reserva existente = iReserva.obtenerReservaPorId(dto.id());
        if (existente == null) return ResponseEntity.badRequest().body(false);

        Reserva actualizada = ReservaMapperDTO.convertirActualizacionDTOAReserva(dto, existente);
        return ResponseEntity.ok(iReserva.actualizarReserva(actualizada));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> eliminarReserva(@PathVariable @Min(value = 1, message = "{reserva.id.mayor1}") int id) {
        return ResponseEntity.ok(iReserva.eliminarReserva(id));
    }
}
