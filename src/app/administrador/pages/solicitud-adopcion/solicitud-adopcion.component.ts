import { Component, OnInit, inject } from '@angular/core';
import { SolicitudAdopcionService } from '../../../shared/services/solicitud-adopcion/solicitud-adopcion.service';
import { SolicitudAdopcion } from '../../../shared/model/solicitud-adopcion';
import { from, groupBy, map, mergeMap, toArray } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-adopcion',
  templateUrl: './solicitud-adopcion.component.html',
  styleUrl: './solicitud-adopcion.component.css'
})
export class SolicitudAdopcionComponent implements OnInit {

  mostrarLoading: boolean = false;
  solicitudesAdopcion: { fecha: string; tipo: string; items: SolicitudAdopcion[] }[] = [];
  adopcionService: SolicitudAdopcionService = inject(SolicitudAdopcionService);

  ngOnInit(): void {
    this.obtenerSolicitudesAdopcion();
  }

  obtenerSolicitudesAdopcion() {
    this.mostrarLoading = true;
    this.adopcionService.getSolicitudesAdopcion()
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
              tipo: 'adopcion',
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
        this.solicitudesAdopcion = res;
        this.mostrarLoading = false;
      });
  }

constructor(private router: Router) {}

redireccionarADetalle(item: any) {
  this.router.navigate(['admin/detalles'], { state: { solicitud: item } });
}
}
