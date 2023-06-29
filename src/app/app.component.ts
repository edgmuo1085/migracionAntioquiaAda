import { Component } from '@angular/core';
import { ListaMunipios } from './interfaces/response-municipios.interface';
import { MunipiosService } from './munipios.service';
import { TIPO_URL } from './interfaces/cod-interno.enum';
import { FacturaSaymir } from './interfaces/factura.interface';

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

  facturas: FacturaSaymir[] = [];

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
    aLink.href = this.urlSiteOld;
    aLink.setAttribute('target', '_parent');
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink);
  }

  async llamar() {
    const facturas = [
      202300621683, 202300621004, 202300620929, 202300620901, 202300620890, 202300620888, 202300620868, 202300620779, 202300620777,
      202300620564, 202300620559, 202300620531, 202300620525, 202300620423, 202300620411, 202300620410, 202300620409, 202300620406,
      202300620371, 202300620366, 202300620309, 202300620302, 202300620298, 202300620269, 202300620264, 202300620204, 202300620143,
      202300620070, 202300620020,
    ];

    for await (const factura of facturas) {
      this.municipiosService.consultar(factura).subscribe({
        next: response => {
          console.log(response);
          if (response.factura.estado === 'P') {
            this.facturas = [...this.facturas, response];
          }
        },
        error: err => {
          console.error(err);
        },
      });
    }
  }
}
