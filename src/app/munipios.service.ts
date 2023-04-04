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
    const url = `./assets/data/lista-municipios.json`;
    return this.http.get<ResponseMunicipios>(url);
  }

  getMunicipiosMigrados(): Observable<MunipioMigrado[]> {
    return this.http.get<MunipioMigrado[]>('https://srv-appeon-000-w23.adacsc.co/municipiosApi/municipio/listar');
  }
}
