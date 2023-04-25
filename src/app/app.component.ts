import { Component } from '@angular/core';
import { ListaMunipios } from './interfaces/response-municipios.interface';
import { MunipiosService } from './munipios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'migracionAntioquiaAda';
  listaMunicipios: ListaMunipios[] = [];

  constructor(private municipiosService: MunipiosService) {
    this.municipiosService.getCities().subscribe({
      next: response => {
        if (!response.lstRespuesta) {
          return;
        }

        if (!response.lstRespuesta.length) {
          return;
        }

        this.listaMunicipios = response.lstRespuesta;
      },
      error: err => {
        console.error(err);
      },
    });
  }

  consultarMunicipios(event: string) {
    this.municipiosService.getMunicipiosMigrados().subscribe({
      next: response => {
        if (!response.length) {
          return;
        }

        const encontrado = response.find(item => item.idMunicipio === +event);
        if (encontrado) {
          console.log('sitio nuevo');
          (window as any).location = 'https://www.catastroantioquia.co/';
        } else {
          console.log('sitio viejo');
          (window as any).location = 'https://www.catastroantioquia.co/';
        }
      },
      error: err => {
        console.error(err);
      },
    });
  }
}
