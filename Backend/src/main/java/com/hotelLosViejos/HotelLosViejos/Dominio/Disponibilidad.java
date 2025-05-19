package com.hotelLosViejos.HotelLosViejos.Dominio;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Disponibilidad {
    private String TipoHabitacion;
    private int NumeroHabitacion;
    private double CostoEstadia;
}
