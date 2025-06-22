export interface FacilidadBase {
    id?: number;
    titulo?: string;
    descripcion?: string;
    nombreImagen?: string;
    _uuid?: string;
}

export interface FacilidadRegistro extends Omit<FacilidadBase, "id"> {}

export interface FacilidadActualizacion extends Omit<FacilidadBase, "id"> {}

export interface FacilidadEliminacion extends Pick<FacilidadBase, "id"> {}
