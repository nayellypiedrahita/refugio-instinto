import { Component, OnInit, inject } from '@angular/core';
import { SolicitudDonacionService } from '../../../shared/services/solicitud-donacion/solicitud-donacion.service';
import { SolicitudDonaciones } from '../../../shared/model/solicitud-donaciones';
import { filter, from, groupBy, map, mergeMap, toArray } from 'rxjs';

@Component({
  selector: 'app-solicitud-en-especie',
  templateUrl: './solicitud-en-especie.component.html',
  styleUrl: './solicitud-en-especie.component.css'
})
export class SolicitudEnEspecieComponent implements OnInit {

  mostrarLoading: boolean = false;
  solicitudesDonaciones: { fecha: string; tipo: string; items: SolicitudDonaciones[] }[] = [];
  donacionService: SolicitudDonacionService = inject(SolicitudDonacionService);

  ngOnInit(): void {
    this.obtenerSolicitudesDonaciones();
  }

 obtenerSolicitudesDonaciones() {
  this.mostrarLoading = true;
  this.donacionService.getSolicitudesDonaciones()
    .pipe(
      mergeMap(solicitudes =>
        from(solicitudes.filter(s => s.fecha))
      ),
      groupBy(solicitud => solicitud.fecha),
      mergeMap(group =>
        group.pipe(
          toArray(),
          map(items => ({
            fecha: group.key!,
            tipo: 'donaciones',
            items
          }))
        )
      ),
      toArray(),
      map(grupos =>
        grupos.sort((a, b) =>
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
        )
      )
    )
    .subscribe(res => {
      this.solicitudesDonaciones = res;
      this.mostrarLoading = false;
    });
}


  redireccionarADetalle() {
    console.log("Detalle de solicitud en especie");
  }

}

