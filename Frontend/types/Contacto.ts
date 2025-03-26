export interface ContactoBase {
    id?: number,
    correo?: string,
    telefono?: string,
    codigoPostal?: string,
    direccion?: string,
}

export interface ContactoRegistro extends Omit<ContactoBase,"id"> {}