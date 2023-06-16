export interface ResponseApiRest {
  msgEstdo: string;
  estadoOperacion: boolean;
  fechaOperacion: string;
  lstRespuesta: LstRespuesta[];
}

export interface LstRespuesta {
  idParametro: number;
  nombre: string;
  valor: string;
  codInterno: string;
  orden: number;
  fechaCreacion: string;
  estado: number;
  ubicacion: number;
  paginacion: boolean;
}
