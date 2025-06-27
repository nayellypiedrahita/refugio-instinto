import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { SolicitudAdopcion } from '../../../shared/model/solicitud-adopcion';
import { SolicitudAdopcionService } from '../../../shared/services/solicitud-adopcion/solicitud-adopcion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle-solicitud.component.html',
  styleUrl: './detalle-solicitud.component.css'
})
export class DetalleSolicitudComponent implements OnInit {

  @Input({ required: true})
  datosAgrupados: any;
  solicitud: { tipo: string; id: string} | null = null; 
  detalle: { key: string; value: string }[] = [];

  solicitudAdopcionService: SolicitudAdopcionService = inject(SolicitudAdopcionService);
  constructor(
    private route: Router
  ) {}

  ngOnInit(): void {
    if (this.datosAgrupados) {
      const detalle = JSON.parse(this.datosAgrupados) as { tipo: string; objeto: any};
      let objeto = null;
      switch(detalle.tipo) {
        case "solicitud-adopcion":
          objeto = detalle.objeto as SolicitudAdopcion;
          this.solicitud = { tipo: detalle.tipo, id: objeto.idSolicitud! }
          break;

      }
      for(const [key, value] of Object.entries(objeto!)) {
        this.detalle.push({ key, value });
      }
    }
  }

  eliminar() {
    switch(this.solicitud?.tipo) {
      case "solicitud-adopcion":
        this.solicitudAdopcionService.eliminarSolicitudAdopcion(this.solicitud.id);
        this.route.navigate(["/admin/solicitudes-adopcion"]);
    } 

  }

}
