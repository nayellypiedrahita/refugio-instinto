import { Component, inject } from '@angular/core';
import { SolicitudAdopcion } from '../../../shared/model/solicitud-adopcion';
import { SolicitudAdopcionService } from '../../../shared/services/solicitud-adopcion/solicitud-adopcion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {
  
 solicitud: SolicitudAdopcion | null = null;

get solicitudAgrupada() {
  return this.solicitud ? [{
    fecha: this.solicitud.fecha,
    tipo: 'adopcion',
    items: [this.solicitud]
  }] : [];
}

ngOnInit(): void {
  this.solicitud = history.state?.solicitud || null;
}


}

 

