import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-articulos-de-donacion',
  templateUrl: './articulos-de-donacion.component.html',
  styleUrl: './articulos-de-donacion.component.css'
})
export class ArticulosDeDonacionComponent {
  mostrarAlerta: boolean = false;

  constructor(private elRef: ElementRef) {}

  cambiarEstadoBoton(event: Event) {
    const boton = event.target as HTMLButtonElement;
    if (boton.classList.contains('aprobado')) {
      boton.classList.remove('aprobado');
      boton.classList.add('rechazado');
      boton.textContent = 'Deshabilitado';
    } else {
      boton.classList.remove('rechazado');
      boton.classList.add('aprobado');
      boton.textContent = 'Habilitado';
    }
  }

  cambiarEstadoAlerta() {
    this.mostrarAlerta = true;
    setTimeout(() => {
      this.mostrarAlerta = false;
    }, 1000);
  }
}
