import { Component, OnInit, inject } from '@angular/core';
import { SolicitudApadrinamientoService } from '../../../shared/services/solicitud-apadrinamiento/solicitud-apadrinamiento.service';
import { SolicitudApadrinamiento } from '../../../shared/model/solicitud-apadrinamiento';
import { from, groupBy, map, mergeMap, toArray, filter } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-apadrinamiento',
  templateUrl: './solicitud-apadrinamiento.component.html',
  styleUrl: './solicitud-apadrinamiento.component.css'
})
export class SolicitudApadrinamientoComponent implements OnInit {

  mostrarLoading: boolean = false;
  solicitudesApadrinamiento: { fecha: string; tipo: string; items: SolicitudApadrinamiento[] }[] = [];
  apadrinamientoService: SolicitudApadrinamientoService = inject(SolicitudApadrinamientoService);

  constructor(
    private router:Router
    ){

  }

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

  redireccionarADetalle(item:any) {
  const detalle = { tipo: "solicitud-apadrinamiento", objeto: item as SolicitudApadrinamiento };
  localStorage.setItem("detalle", JSON.stringify(detalle));
  this.router.navigate(["/admin/detalles"]);
  }
}

