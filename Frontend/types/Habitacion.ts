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
  tipo: "ESTANDAR" | "JUNIOR";
  estado: "LIBRE" | "OCUPADA" | "LIMPIEZA" | "DESHABILITADA";
  caracteristicas: Caracteristica[];
}
