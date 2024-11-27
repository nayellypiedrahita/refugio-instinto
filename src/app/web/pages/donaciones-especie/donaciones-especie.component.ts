import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donaciones-especie',
  templateUrl: './donaciones-especie.component.html',
  styleUrl: './donaciones-especie.component.css'
})
export class DonacionesEspecieComponent {

  constructor(
    private router: Router
  ){

  }

  toFormularioDeDonaciones(){
    this.router.navigate(["/web/formulario-de-donaciones"]);
  }

}
