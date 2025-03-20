import { Component } from '@angular/core';

@Component({
  selector: 'app-detalle-comprobantes',
  templateUrl: './detalle-comprobantes.component.html',
  styleUrl: './detalle-comprobantes.component.css'
})
export class DetalleComprobantesComponent {
  mostrarAlerta: boolean = false;

  mostrarDialogo() {
    this.mostrarAlerta = true;
  }

  cerrarDialogo() {
    this.mostrarAlerta = false;
  }

  eliminarSolicitud() {
    alert('Solicitud eliminada correctamente.');
    this.cerrarDialogo();
  }
}
