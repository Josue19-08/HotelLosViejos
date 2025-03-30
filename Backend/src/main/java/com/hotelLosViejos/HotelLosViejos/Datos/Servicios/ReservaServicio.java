package com.hotelLosViejos.HotelLosViejos.Datos.Servicios;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IReserva;
import com.hotelLosViejos.HotelLosViejos.Datos.Repositorios.ReservaRepositorio;
import com.hotelLosViejos.HotelLosViejos.Dominio.Habitacion;
import com.hotelLosViejos.HotelLosViejos.Dominio.Reserva;
import com.hotelLosViejos.HotelLosViejos.Infraestructura.Excepciones.ReservaExcepcion;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class ReservaServicio implements IReserva {

    @Autowired
    private final ReservaRepositorio reservaRepositorio;

    public ReservaServicio(ReservaRepositorio reservaRepositorio) {
        this.reservaRepositorio = reservaRepositorio;
    }

    @Override
    public boolean registrarReserva(Reserva reserva) {

        if (!estaDisponible(reserva.getHabitacion(), reserva.getFechaLlegada(), reserva.getFechaSalida())) {
            throw new ReservaExcepcion("Habitacion no disponible");
        }

        this.reservaRepositorio.save(reserva);
        return true;
    }

    @Modifying
    @Transactional
    @Override
    public boolean actualizarReserva(Reserva reserva) {
        try {
            Reserva existente = this.reservaRepositorio.findById(reserva.getId())
                    .orElseThrow(() -> new Exception("Reserva no encontrada"));

            if (!estaDisponible(reserva.getHabitacion(), reserva.getFechaLlegada(), reserva.getFechaSalida(), reserva.getId())) {
                throw new ReservaExcepcion("Habitacion no disponible");
            }

            this.reservaRepositorio.save(reserva);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean eliminarReserva(int idReserva) {
        try {
            if (!this.reservaRepositorio.existsById(idReserva))
                throw new Exception("Reserva no encontrada");

            this.reservaRepositorio.deleteById(idReserva);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<Reserva> obtenerReservas() {
        return this.reservaRepositorio.findAll();
    }

    @Override
    public Reserva obtenerReservaPorId(int id) {
        return this.reservaRepositorio.findById(id).orElse(null);
    }

    @Override
    public boolean estaDisponible(Habitacion habitacion, LocalDateTime llegada, LocalDateTime salida) {
        return estaDisponible(habitacion, llegada, salida, -1);
    }

    @Override
    public boolean estaDisponible(Habitacion habitacion, LocalDateTime llegada, LocalDateTime salida, int idActual) {
        List<Reserva> reservas = reservaRepositorio.findByHabitacion(habitacion);

        for (Reserva r : reservas) {
            if (r.getId() == idActual) continue;

            LocalDateTime existenteInicio = r.getFechaLlegada();
            LocalDateTime existenteFin = r.getFechaSalida();

            if (!(salida.isBefore(existenteInicio) || llegada.isAfter(existenteFin))) {
                return false;
            }
        }
        return true;
    }

}
