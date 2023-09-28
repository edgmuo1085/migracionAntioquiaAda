import { Component } from '@angular/core';
import { ListaMunipios } from './interfaces/response-municipios.interface';
import { MunipiosService } from './munipios.service';
import { TIPO_URL } from './interfaces/cod-interno.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'migracionAntioquiaAda';
  listaMunicipios: ListaMunipios[] = [];
  urlBase: string = '';
  urlSiteNew: string = '';
  urlSiteOld: string = '';

  constructor(private municipiosService: MunipiosService) {
    this.municipiosService.retornarComercio(TIPO_URL.SEARCH_CITIES_MIGRATE).subscribe({
      next: response => {
        if (!response.lstRespuesta) {
          return;
        }

        if (!response.lstRespuesta.length) {
          return;
        }

        this.urlBase = response.lstRespuesta[0].valor;
      },
      error: err => {
        console.error(err);
      },
    });
    this.municipiosService.retornarComercio(TIPO_URL.URL_MIGRATE_SITE_NEW).subscribe({
      next: response => {
        if (!response.lstRespuesta) {
          return;
        }

        if (!response.lstRespuesta.length) {
          return;
        }

        this.urlSiteNew = response.lstRespuesta[0].valor;
      },
      error: err => {
        console.error(err);
      },
    });
    this.municipiosService.retornarComercio(TIPO_URL.URL_MIGRATE_SITE_OLD).subscribe({
      next: response => {
        if (!response.lstRespuesta) {
          return;
        }

        if (!response.lstRespuesta.length) {
          return;
        }

        this.urlSiteOld = response.lstRespuesta[0].valor;
      },
      error: err => {
        console.error(err);
      },
    });
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
    this.municipiosService.getMunicipiosMigrados(this.urlBase).subscribe({
      next: response => {
        if (!response.length) {
          return;
        }

        const encontrado = response.find(item => item.idMunicipio === +event);
        if (encontrado) {
          console.log('sitio nuevo');
          this.getRedirectTo(this.urlSiteNew);
          return;
        }

        console.log('sitio viejo');
        this.getRedirectTo(this.urlSiteOld);
      },
      error: err => {
        console.error(err);
      },
    });
  }

  getRedirectTo(url: string) {
    const aLink = document.createElement('a');
    aLink.href = url;
    aLink.setAttribute('target', '_parent');
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink);
  }

  submitPosesionBienes() {
    const aLink = document.createElement('a');
    aLink.href = this.urlSiteNew;
    aLink.setAttribute('target', '_parent');
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink);
  }
}
