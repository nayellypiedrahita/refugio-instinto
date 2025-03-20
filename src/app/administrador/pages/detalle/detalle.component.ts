import { Component } from '@angular/core';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {
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
