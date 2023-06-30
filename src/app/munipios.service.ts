import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MunipioMigrado, ResponseMunicipios } from './interfaces/response-municipios.interface';
import { ResponseApiRest } from './interfaces/api-rest.interface';

@Injectable({
  providedIn: 'root',
})
export class MunipiosService {
  ipPub: string = 'http://141.148.95.161';
  ipPrepro: string = 'http://10.0.200.131:8080';
  ipDev: string = 'http://10.0.200.160:8080';
  ipDom: string = 'https://serviciosdigitales.catastroantioquia.co';

  constructor(private http: HttpClient) {}

  getCities(): Observable<ResponseMunicipios> {
    const url = `./assets/data/lista-municipios.json`;
    return this.http.get<ResponseMunicipios>(url);
  }

  getMunicipiosMigrados(urlBase: string): Observable<MunipioMigrado[]> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get<MunipioMigrado[]>(`${urlBase}/municipio/listar`, { headers });
  }

  retornarComercio(codInterno: string): Observable<ResponseApiRest> {
    const data = { codInterno: codInterno };
    const json = window.btoa(JSON.stringify(data));
    const headers = new HttpHeaders().set('content-type', 'text/plain').set('appCode', '6');
    return this.http.get<ResponseApiRest>(`${this.ipDom}/ApiRest/param/consultafiltro/${json}`, {
      headers,
    });
  }
}
