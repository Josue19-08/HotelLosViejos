export interface PublicidadBase {
    id?: number;
    nombre?: string;
    imagen?: string;
    enlace?: string;
    descripcion?: string;
    titulo?: string;
}

export interface PublicidadRegistro extends Omit<PublicidadBase, "id"> {}

export interface PublicidadActualizacion extends Omit<PublicidadBase, "id"> {}
