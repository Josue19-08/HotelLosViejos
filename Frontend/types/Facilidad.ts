export interface FacilidadBase {
    id?: number;
    titulo?: string;
    descripcion?: string;
    nombreImagen?: string;
}

export interface FacilidadRegistro extends Omit<FacilidadBase, "id"> {}