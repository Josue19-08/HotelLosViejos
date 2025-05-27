export interface OfertaBase {
    id?: number;
    titulo?: string;
    descripcion?: string;
    porcentaje?: number;
    aplica?: string;
    fechaInicio?: string;
    fechaFin?: string;
}

export interface OfertaRegistro extends Omit<OfertaBase, "id"> {}

export interface OfertaActualizacion extends Omit<OfertaBase, "id"> {}
