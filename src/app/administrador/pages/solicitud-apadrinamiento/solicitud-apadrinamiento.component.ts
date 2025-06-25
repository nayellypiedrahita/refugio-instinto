import { Component, OnInit, inject } from '@angular/core';
import { SolicitudApadrinamientoService } from '../../../shared/services/solicitud-apadrinamiento/solicitud-apadrinamiento.service';
import { SolicitudApadrinamiento } from '../../../shared/model/solicitud-apadrinamiento';
import { from, groupBy, map, mergeMap, toArray, filter } from 'rxjs';

@Component({
  selector: 'app-solicitud-apadrinamiento',
  templateUrl: './solicitud-apadrinamiento.component.html',
  styleUrl: './solicitud-apadrinamiento.component.css'
})
export class SolicitudApadrinamientoComponent implements OnInit {

  mostrarLoading: boolean = false;
  solicitudesApadrinamiento: { fecha: string; tipo: string; items: SolicitudApadrinamiento[] }[] = [];
  apadrinamientoService: SolicitudApadrinamientoService = inject(SolicitudApadrinamientoService);

  ngOnInit(): void {
    this.obtenerSolicitudesApadrinamiento();
  }

  obtenerSolicitudesApadrinamiento() {
    this.mostrarLoading = true;
    this.apadrinamientoService.getSolicitudesApadrinamiento()
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
              tipo: 'apadrinamiento',
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
        this.solicitudesApadrinamiento = res;
        this.mostrarLoading = false;
      });
  }

  redireccionarADetalle() {
    console.log("Detalle de solicitud de apadrinamiento");
  }
}

