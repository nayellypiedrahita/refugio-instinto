import { Component } from '@angular/core';

@Component({
  selector: 'app-pasarelas',
  templateUrl: './pasarelas.component.html',
  styleUrl: './pasarelas.component.css'
})
export class PasarelasComponent {
 mostrarAlerta: boolean = false;
 
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