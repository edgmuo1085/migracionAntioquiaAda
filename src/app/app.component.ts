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
      202300623497, 202300623496, 202300623493, 202300623482, 202300623480, 202300623479, 202300623478, 202300623475, 202300623473,
      202300623444, 202300623443, 202300623441, 202300623417, 202300623342, 202300623335, 202300623335, 202300623317, 202300623270,
      202300623266, 202300623265, 202300623227, 202300623227, 202300623227, 202300623198, 202300623197, 202300623195, 202300623189,
      202300623188, 202300623187, 202300623186, 202300623184, 202300623180, 202300623152, 202300623152, 202300623152, 202300623151,
      202300623151, 202300623151, 202300623111, 202300623111, 202300623111, 202300623111, 202300623111, 202300623111, 202300623111,
      202300623111, 202300623103, 202300623103, 202300623096, 202300623051, 202300623006, 202300622940, 202300622852, 202300622818,
      202300622718, 202300622709, 202300622707, 202300622707, 202300622707, 202300622704, 202300622702, 202300622701, 202300622700,
      202300622699, 202300622698, 202300622697, 202300622696, 202300622695, 202300622692, 202300622691, 202300622690, 202300622689,
      202300622685, 202300622684, 202300622681, 202300622680, 202300622679, 202300622677, 202300622675, 202300622674, 202300622673,
      202300622593, 202300622570, 202300622555, 202300622523, 202300622522, 202300622498, 202300622495, 202300622494, 202300622493,
      202300622454, 202300622453, 202300622452, 202300622450, 202300622448, 202300622443, 202300622434, 202300622431, 202300622429,
      202300622428, 202300622425, 202300622424, 202300622420, 202300622415, 202300622330, 202300622316, 202300622315, 202300622242,
      202300622242, 202300622242, 202300622242, 202300622242, 202300622242, 202300622242, 202300622242, 202300622242, 202300622242,
      202300622192, 202300622186, 202300622177, 202300622168, 202300622075,
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
