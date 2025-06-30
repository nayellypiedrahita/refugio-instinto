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
  comprobantesDonacionAgrupoados: { fecha: string; tipo: string; items: DonacionMonetaria[] }[] = [];
  private donacionMonetariaService: DonacionMonetariaService = inject(DonacionMonetariaService);
  route: any;

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
            map(donaciones => ({ fecha: group.key, tipo: "comprobantes-pasarelas", items: donaciones }))
          )
        ),
        toArray()
      )
      .subscribe((donacionesResponse) => {
        this.comprobantesDonacionAgrupoados  = donacionesResponse;
        this.mostrarLoading = false;
      });
  }

mostrarDetalleComprobante(items:any) {
  const comprobante=items as DonacionMonetaria;
  Swal.fire({
    html: `<img src="${comprobante.base64}" style="max-width: 700px; max-height: 700px; object-fit: cover">`,
    width: 750,
    confirmButtonText: 'Cerrar',
    showCancelButton: true,
    cancelButtonText: 'Eliminar',
    reverseButtons: true, 
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el comprobante permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(confirmacion => {
        if (confirmacion.isConfirmed) {
          this.eliminarcomprobante(comprobante.idDonacionMonetaria!)
        }
      });
    }
  });
}


 eliminarcomprobante(id:string){
    this.donacionMonetariaService.eliminarcomprobante(id)
    this.getDonacionesMonetarias();
  }
}