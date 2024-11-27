import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-de-donaciones',
  templateUrl: './formulario-de-donaciones.component.html',
  styleUrl: './formulario-de-donaciones.component.css'
})
export class FormularioDeDonacionesComponent {

  donacionForm: FormGroup = new FormGroup({
    nombreCompleto: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z ]{5,50}')]),
    numeroCelular: new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$")]),
    otro: new FormControl("", [Validators.required]),
  });

  loadingForm: boolean = false;


  constructor(
    private router: Router
  ){

  }

  toSolicitudEnviada(){
    this.router.navigate(["/web/solicitud-enviada"]);
  }

}
