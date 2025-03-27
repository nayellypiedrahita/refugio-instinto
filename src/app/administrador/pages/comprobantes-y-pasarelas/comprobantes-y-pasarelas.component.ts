import { Component, inject, OnInit } from '@angular/core';
import { DonacionMonetariaService } from '../../../shared/services/donacion-monetaria/donacion-monetaria.service';
import { DonacionMonetaria } from '../../../shared/model/donacion-monetaria';
import { from, groupBy, map, mergeMap, toArray } from 'rxjs';
import swal from 'sweetalert2';


@Component({
  selector: 'app-comprobantes-y-pasarelas',
  templateUrl: './comprobantes-y-pasarelas.component.html',
  styleUrl: './comprobantes-y-pasarelas.component.css'
})
export class ComprobantesYPasarelasComponent implements OnInit {
  
  comprobantesDonacionAgrupoados: { fecha: string; donaciones: DonacionMonetaria[] }[] = [];
  private donacionMonetariaService: DonacionMonetariaService = inject(DonacionMonetariaService);

  ngOnInit(): void {
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
      });
  }

  mostrarDetalleComprobante(base64: string) {
  }

}
