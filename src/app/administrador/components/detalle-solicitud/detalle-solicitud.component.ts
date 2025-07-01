import { Component, EventEmitter, Inject, inject, Input, OnInit, Output } from '@angular/core';
import { SolicitudAdopcion } from '../../../shared/model/solicitud-adopcion';
import { SolicitudAdopcionService } from '../../../shared/services/solicitud-adopcion/solicitud-adopcion.service';
import { Router } from '@angular/router';
import { SolicitudVoluntariado } from '../../../shared/model/solicitud-voluntariado';
import { SolicitudVoluntariadoService } from '../../../shared/services/solicitud-voluntariado/solicitud-voluntariado.service';
import { SolicitudApadrinamiento } from '../../../shared/model/solicitud-apadrinamiento';
import { SolicitudApadrinamientoService } from '../../../shared/services/solicitud-apadrinamiento/solicitud-apadrinamiento.service';
import { SolicitudDonaciones } from '../../../shared/model/solicitud-donaciones';
import { SolicitudDonacionService } from '../../../shared/services/solicitud-donacion/solicitud-donacion.service';
import { MascotasService } from '../../../shared/services/mascotas/mascotas.service';
import { DepartamentoService } from '../../../shared/services/departamento/departamento.service';

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
  parentComponent: string = "";

  solicitudAdopcionService: SolicitudAdopcionService = inject(SolicitudAdopcionService);
  solicitudVoluntariadoService: SolicitudVoluntariadoService = inject(SolicitudVoluntariadoService);
  solcitudApadrinamientoservice:  SolicitudApadrinamientoService = inject(SolicitudApadrinamientoService);
  solicitudDonacionService: SolicitudDonacionService = inject(SolicitudDonacionService);
  constructor(
    private route: Router,
    private mascotaservice: MascotasService,
    private departamentoservice: DepartamentoService,
    
  ) {}

  

  async ngOnInit() {
    if (this.datosAgrupados) {
      const detalle = JSON.parse(this.datosAgrupados) as { tipo: string; objeto: any};
      let objeto = null;
      this.parentComponent = detalle.tipo;
      switch(detalle.tipo) {
        case "solicitud-apadrinamiento":
          objeto = detalle.objeto as SolicitudApadrinamiento;
          await this.mascotaservice.getMascotaByIdPromise(objeto.mascota).then(response=>{
            detalle.objeto = { ...detalle.objeto, mascota: response!.nombre } as SolicitudApadrinamiento;
          });
          objeto = { ...detalle.objeto } as SolicitudApadrinamiento;
          this.solicitud = { tipo: detalle.tipo, id: objeto.idSolicitud! }
          break;
        case "solicitud-adopcion":
          objeto = detalle.objeto as SolicitudAdopcion;
          await this.mascotaservice.getMascotaByIdPromise(objeto.mascota).then(response=>{
            detalle.objeto = { ...detalle.objeto, mascota: response!.nombre } as SolicitudAdopcion;
          });
          await this.departamentoservice.getDepartamentosByIdPromise(objeto.departamento).then(response=>{
            detalle.objeto = { ...detalle.objeto, departamento: response!.nombre } as SolicitudAdopcion;
          });
          objeto = { ...detalle.objeto } as SolicitudAdopcion; 
          this.solicitud = { tipo: detalle.tipo, id: objeto.idSolicitud! }
          break;
        case "solicitud-voluntariado":
          objeto = detalle.objeto as SolicitudVoluntariado;
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
      case "solicitud-voluntariado":
        this.solicitudVoluntariadoService.eliminarSolicitudVoluntariado(this.solicitud.id)
        this.route.navigate(["/admin/solicitudes-voluntariado"]);
        break;
      case "solicitud-apadrinamiento":
        this.solcitudApadrinamientoservice.eliminarSolicitudApadrinamiento(this.solicitud.id);
        this.route.navigate(["/admin/solicitud-apadrinamiento"]);
        break;
      case "solicitud-especie":
        this.solicitudDonacionService.eliminarSolicitudDonacion(this.solicitud.id);
        this.route.navigate(["/admin/solicitud-en-especie"]);
        break;
    } 

  }

    redirectToParent() {
    switch(this.parentComponent) {
      case "solicitud-adopcion":
        this.route.navigate(["/admin/solicitudes-adopcion"]);
        break;
      case "solicitud-voluntariado":
        this.route.navigate(["/admin/solicitudes-voluntariado"]);
        break;
      case "solicitud-apadrinamiento":
        this.route.navigate(["/admin/solicitud-apadrinamiento"]);
        break;
      case "solicitud-especie":
        this.route.navigate(["/admin/solicitud-en-especie"]);
        break;
    }
  }

}
