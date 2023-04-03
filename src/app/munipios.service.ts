import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MunipioMigrado } from './interfaces/municipios-migrados.interface';
import { ResponseMunicipios } from './interfaces/response-municipios.interface';

@Injectable({
  providedIn: 'root',
})
export class MunipiosService {
  constructor(private http: HttpClient) {}

  getDeparmentos(): Observable<ResponseMunicipios> {
    const headers = {
      'Content-Type': 'text/plain; charset=UTF-8',
      Accept: 'text/plain, */*',
      'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, token, Authorization',
      'access-control-allow-methods': 'GET, PUT,POST,DELETE,OPTIONS,PATCH',
      'access-control-allow-origin': '*',
      appCode: '6',
      token: '22',
      Authorization: 'Basic dXQxalR4dFYxaDl5WG5adWozdzVWRjp4YVlhWlNrdUYmT0A=',
    };
    let json = window.btoa('{}');
    const url = `https://catastro.rionegro.gov.co/ApiRest/depto/consultafiltro/${json}`;
    return this.http.get<ResponseMunicipios>(url, { headers: headers });
  }

  getMunicipiosMigrados(): Observable<MunipioMigrado[]> {
    return this.http.get<MunipioMigrado[]>('./assets/data/municipios-listos.json');
  }
}
