export interface InformacionBase {
  id?: number,
  textoSobreNosotros?: string,
  textoBienvenida?: string,
  nombre?: string,
  nombreImagenBienvenida?: string
}

export interface InformacionRegistro extends Omit<InformacionBase, "id"> {}

