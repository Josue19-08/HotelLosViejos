export interface GaleriaBase {
    id?: number;
    descripcion?: string;
    nombreImagen?: string;
}

export interface GaleriaRegistro extends Omit<GaleriaBase,"id"> {}