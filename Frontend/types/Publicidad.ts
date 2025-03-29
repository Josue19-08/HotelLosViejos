export interface PublicidadBase {
    id?: number;
    nombre?: string;
    imagen?: string;
    enlace?: string;
    titulo?: string;
    descripcion?: string;
}

export interface PublicidadRegistro extends Omit<PublicidadBase, "id"> {}