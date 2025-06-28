import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PasarelasService } from '../../../shared/services/pasarelas/pasarelas.service';
import { Pasarelas } from '../../../shared/model/pasarela.model';

@Component({
  selector: 'app-donaciones-monetarias',
  templateUrl: './donaciones-monetarias.component.html',
  styleUrl: './donaciones-monetarias.component.css'
})
export class DonacionesMonetariasComponent implements OnInit {
  pasarela1: Pasarelas | null = null;
  pasarela2: Pasarelas | null = null;
  pasarela3: Pasarelas | null = null;
  
  constructor(
    private router: Router, 
    private pasarelasService: PasarelasService
  ) {}

  ngOnInit(): void {
    this.pasarelasService.getPasarelas().subscribe({
      next: (pasarelas) => {
        this.pasarela1 = pasarelas[0];
        this.pasarela2 = pasarelas[1];
        this.pasarela3 = pasarelas[2];
      }
    })
  }

  toComprobanteDonacion() {
    this.router.navigate(["/web/comprobante-donacion"]);
  }

}
