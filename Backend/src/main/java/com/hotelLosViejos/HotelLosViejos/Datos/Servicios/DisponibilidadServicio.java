package com.hotelLosViejos.HotelLosViejos.Datos.Servicios;

import com.hotelLosViejos.HotelLosViejos.Datos.Interfaces.IDisponibilidad;
import com.hotelLosViejos.HotelLosViejos.Dominio.Disponibilidad;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class DisponibilidadServicio implements IDisponibilidad {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Disponibilidad> consultarCostoEstadia(Date fechaInicio, Date fechaFin, String tipoHabitacion) {
        StoredProcedureQuery spQuery = entityManager.createStoredProcedureQuery("ConsultarCostoEstadia");

        // Registrar los parámetros que espera el stored procedure
        spQuery.registerStoredProcedureParameter("FechaInicio", java.sql.Date.class, jakarta.persistence.ParameterMode.IN);
        spQuery.registerStoredProcedureParameter("FechaFin", java.sql.Date.class, jakarta.persistence.ParameterMode.IN);
        spQuery.registerStoredProcedureParameter("TipoHabitacion", String.class, jakarta.persistence.ParameterMode.IN);

        // Asignar valores
        spQuery.setParameter("FechaInicio", new java.sql.Date(fechaInicio.getTime()));
        spQuery.setParameter("FechaFin", new java.sql.Date(fechaFin.getTime()));
        spQuery.setParameter("TipoHabitacion", tipoHabitacion != null ? tipoHabitacion : "all");

        // Ejecutar y obtener resultados
        List<Object[]> resultados = spQuery.getResultList();

        // Mapear resultados a lista de Disponibilidad
        return resultados.stream().map(r -> {
            Disponibilidad d = new Disponibilidad();
            d.setNumeroHabitacion((Integer) r[0]);
            d.setTipoHabitacion((String) r[1]);
            d.setCostoEstadia(((Number) r[2]).doubleValue());
            return d;
        }).toList();

    }
}
