import { Component, inject, OnInit } from '@angular/core';
import { SolicitudVoluntariadoService } from '../../../shared/services/solicitud-voluntariado/solicitud-voluntariado.service';
import { from, groupBy, map, mergeMap, toArray } from 'rxjs';
import { SolicitudVoluntariado } from '../../../shared/model/solicitud-voluntariado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitudes-voluntariado',
  templateUrl: './solicitudes-voluntariado.component.html',
  styleUrl: './solicitudes-voluntariado.component.css'
})
export class SolicitudesVoluntariadoComponent implements OnInit {

  mostrarLoading: boolean = false;
  solicitudesVoluntariado: { fecha: string, tipo: string; items: SolicitudVoluntariado[] }[] = [];
  voluntariadoService: SolicitudVoluntariadoService = inject(SolicitudVoluntariadoService);
  
  constructor (private router: Router) {

  }

  ngOnInit(): void {
    this.getSolicitudesVoluntariado();
  }

  getSolicitudesVoluntariado() {
    this.mostrarLoading = true;
    this.voluntariadoService.getSolicitudesVoluntariado()
      .pipe(
        mergeMap(solicitudes => from(solicitudes)),
        groupBy(solicitudes => solicitudes.fecha),
        mergeMap(group => 
          group.pipe(
            toArray(),
            map(solicitudes => ({ fecha: group.key, tipo: 'voluntariado', items: solicitudes }))
          )
        ),
        toArray()
      )
      .subscribe((solicitudesResponse) => {
        this.solicitudesVoluntariado  = solicitudesResponse;
        this.mostrarLoading = false;
      });
  }

  redireccionarADetalle(item: any) {
    const detalle = { tipo: "solicitud-voluntariado", objeto: item as SolicitudVoluntariado};
    this.voluntariadoService.noNewSolicitudVoluntariado(detalle.objeto.idSolicitud!)
    localStorage.setItem('detalle', JSON.stringify(detalle));
    this.router.navigate(['/admin/detalles']);
  }

}
