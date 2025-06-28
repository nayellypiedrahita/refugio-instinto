import { Component } from '@angular/core';
import { MascotasService } from '../../../shared/services/mascotas/mascotas.service';
import { Mascotas } from '../../../shared/model/mascotas';

@Component({
  selector: 'app-testimonios-de-peluditos',
  templateUrl: './testimonios-de-peluditos.component.html',
  styleUrl: './testimonios-de-peluditos.component.css'
})
export class TestimoniosDePeluditosComponent {

mascotasConTestimonio: Mascotas[] = [];

  constructor(private mascotasService: MascotasService) {}

  ngOnInit(): void {
    this.mascotasService.getMascotasConTestimonio().subscribe((mascotas) => {
      this.mascotasConTestimonio = mascotas;
    });
  }
}