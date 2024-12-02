import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donaciones-monetarias',
  templateUrl: './donaciones-monetarias.component.html',
  styleUrl: './donaciones-monetarias.component.css'
})
export class DonacionesMonetariasComponent {

  constructor(
    private router: Router
  ) {}

  toComprobanteDonacion() {
    this.router.navigate(["/web/comprobante-donacion"]);
  }

}
