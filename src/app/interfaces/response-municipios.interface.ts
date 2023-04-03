export interface ResponseMunicipios {
  msgEstdo: string;
  estadoOperacion: boolean;
  fechaOperacion: string;
  lstRespuesta: ListaMunipios[];
}

export interface ListaMunipios {
  idMunicipio: number;
  idDepartamento: number;
  codigo: number;
  nombre: string;
  tipo: string;
  latitud: string;
  longitud: string;
  codigoInternoSaymir: string;
  paginacion: boolean;
}

export interface MunipioMigrado {
  idMunicipio: number;
  nombre: string;
}
