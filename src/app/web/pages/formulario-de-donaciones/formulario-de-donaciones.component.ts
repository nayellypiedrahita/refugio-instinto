import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-de-donaciones',
  templateUrl: './formulario-de-donaciones.component.html',
  styleUrl: './formulario-de-donaciones.component.css'
})
export class FormularioDeDonacionesComponent {

  constructor(
    private router: Router
  ){

  }

  toSolicitudEnviada(){
    this.router.navigate(["/web/solicitud-enviada"]);
  }

}
