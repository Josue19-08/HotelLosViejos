export interface ContactoBase {
    id?: number,
    correo?: string,
    telefono?: string,
    codigoPostal?: string,
    direccion?: string,
    latitud?: string,
    longitud?: string
}

export interface ContactoRegistro extends Omit<ContactoBase,"id"> {}

export interface ContactoActualizacion extends ContactoBase {}
