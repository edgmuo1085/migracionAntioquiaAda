export interface ResponseMunicipios {
  msgEstdo: string;
  estadoOperacion: boolean;
  fechaOperacion: string;
  lstRespuesta: ListaMunipios[];
}

export interface ListaMunipios {
  idDepartamento: number;
  nombre: string;
  codigo: number;
  paginacion: boolean;
}
