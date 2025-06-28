import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { SolicitudAdopcion } from '../../../shared/model/solicitud-adopcion';
import { SolicitudAdopcionService } from '../../../shared/services/solicitud-adopcion/solicitud-adopcion.service';
import { Router } from '@angular/router';
import { SolicitudDonaciones } from '../../../shared/model/solicitud-donaciones';
import { SolicitudDonacionService } from '../../../shared/services/solicitud-donacion/solicitud-donacion.service';

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
  solicitudDonacionService: SolicitudDonacionService = inject(SolicitudDonacionService);
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
        case "solicitud-especie":
          objeto = detalle.objeto as SolicitudDonaciones;
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
        break;
      case "solicitud-especie":
        this.solicitudDonacionService.eliminarSolicitudDonacion(this.solicitud.id);
        this.route.navigate(["/admin/solicitud-en-especie"]);
        break;
    } 

  }

}
