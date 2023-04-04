import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MunipioMigrado, ResponseMunicipios } from './interfaces/response-municipios.interface';

@Injectable({
  providedIn: 'root',
})
export class MunipiosService {
  constructor(private http: HttpClient) {}

  getCities(): Observable<ResponseMunicipios> {
    const headers = {
      Accept: '*/*',
      'Content-Type': 'text/plain',
      appCode: '6',
      token: '22',
      Authorization: 'Basic dXQxalR4dFYxaDl5WG5adWozdzVWRjp4YVlhWlNrdUYmT0A=',
    };
    let filtro = { idDepartamento: 1 };
    let json = window.btoa(JSON.stringify(filtro));
    const url = `https://catastro.rionegro.gov.co/ApiRest/mun/consultafiltro/${json}`;
    return this.http.get<ResponseMunicipios>(url, { headers: headers });
  }

  getMunicipiosMigrados(): Observable<MunipioMigrado[]> {
    const headers = {
      Accept: '*/*',
      'Content-Type': 'text/plain',
    };
    //return this.http.get<any>('http://localhost/municipios-listos.json', { headers: headers, responseType: 'blob' as 'json' });
    return this.http.get<MunipioMigrado[]>('./assets/data/municipios-listos.json');
  }
}
