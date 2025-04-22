import { Component, inject, OnInit } from '@angular/core';
import { DonacionMonetariaService } from '../../../shared/services/donacion-monetaria/donacion-monetaria.service';
import { DonacionMonetaria } from '../../../shared/model/donacion-monetaria';
import { from, groupBy, map, mergeMap, toArray } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comprobantes-y-pasarelas',
  templateUrl: './comprobantes-y-pasarelas.component.html',
  styleUrl: './comprobantes-y-pasarelas.component.css'
})
export class ComprobantesYPasarelasComponent implements OnInit {

  mostrarLoading: boolean = false;
  comprobantesDonacionAgrupoados: { fecha: string; donaciones: DonacionMonetaria[] }[] = [];
  private donacionMonetariaService: DonacionMonetariaService = inject(DonacionMonetariaService);

  ngOnInit(): void {
    this.getDonacionesMonetarias();
  }

  getDonacionesMonetarias() {
    this.mostrarLoading = true;
    this.donacionMonetariaService.getDonaciones()
      .pipe(
        mergeMap(donaciones => from(donaciones)),
        groupBy(donacion => donacion.fecha),
        mergeMap(group => 
          group.pipe(
            toArray(),
            map(donaciones => ({ fecha: group.key, donaciones: donaciones }))
          )
        ),
        toArray()
      )
      .subscribe((donacionesResponse) => {
        this.comprobantesDonacionAgrupoados  = donacionesResponse;
        this.mostrarLoading = false;
      });
  }

  mostrarDetalleComprobante(base64: string) {
    
    Swal.fire({
      html: `<img src="${base64}" style="max-width: 700px; max-height: 700px; object-fit: cover">`,
      width: 750,
      confirmButtonText: 'Cerrar'
    });
  }
}