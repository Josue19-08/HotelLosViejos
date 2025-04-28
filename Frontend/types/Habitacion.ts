export interface Caracteristica {
  id: number;
  titulo: string;
  descripcion: string;
}

export interface HabitacionBase {
  id: number;
  numero: number;
  tarifaDiariaBase: number;
  nombreImagen: string;
  tipo: string;
  estado: string;
  caracteristicas: Caracteristica[];
}


export interface Habitacion {
  id: number;
  numero: number;
  tarifaDiariaBase: number;
  nombreImagen: string;
  tipo: string;
  estado: string;
  caracteristicasIds: number[];
}

export interface HabitacionRegistro extends Omit<Habitacion, "id"> {}

export interface HabitacionActualizacion extends Omit<Habitacion, "id"> {}
