import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donaciones',
  templateUrl: './donaciones.component.html',
  styleUrl: './donaciones.component.css'
})
export class DonacionesComponent {

  constructor(
    private router: Router
  ){

  }

  toDonacionesMonetarias(){
    this.router.navigate(["/web/donaciones-monetarias"]);
  }



  toDonacionesEspecie(){
    this.router.navigate(["/web/donaciones-especie"]);
  }




}
