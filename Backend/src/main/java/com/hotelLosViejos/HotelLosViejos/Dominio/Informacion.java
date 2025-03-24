package com.hotelLosViejos.HotelLosViejos.Dominio;

import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Informacion.InformacionRegistroDTO;
import com.hotelLosViejos.HotelLosViejos.Presentacion.DTOs.Informacion.InformactionActualizacionDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Informacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 5000)
    private String textoSobreNosotros;

    @Column(length = 5000)
    private String textoBienvenida;

    private String nombre;

    private String nombreImagenBienvenida;

    public Informacion(InformacionRegistroDTO informacionRegistroDTO) {
        this.textoSobreNosotros = informacionRegistroDTO.textoSobreNosotros();
        this.textoBienvenida = informacionRegistroDTO.textoBienvenida();
        this.nombre = informacionRegistroDTO.nombre();
        this.nombreImagenBienvenida = informacionRegistroDTO.nombreImagenBienvenida();
    }

    public Informacion(InformactionActualizacionDTO informactionActualizacionDTO) {
        this.id = informactionActualizacionDTO.id();
        this.textoSobreNosotros = informactionActualizacionDTO.textoSobreNosotros();
        this.textoBienvenida = informactionActualizacionDTO.textoBienvenida();
        this.nombre = informactionActualizacionDTO.nombre();
        this.nombreImagenBienvenida = informactionActualizacionDTO.nombreImagenBienvenida();
    }
}
