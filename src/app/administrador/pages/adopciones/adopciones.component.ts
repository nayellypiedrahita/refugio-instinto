import { Component, inject, OnInit } from '@angular/core';
import { Mascotas } from '../../../shared/model/mascotas';
import { MascotasService } from '../../../shared/services/mascotas/mascotas.service';
import { EstadosAdopciones } from '../../../shared/enum/estados.enum';

@Component({
  selector: 'app-adopciones',
  templateUrl: './adopciones.component.html',
  styleUrl: './adopciones.component.css'
})
export class AdopcionesComponent implements OnInit{

  mascotas: Mascotas[] = [];
  loading: boolean = false;
  private mascotasService: MascotasService = inject(MascotasService);

  ngOnInit(): void {
    this.getMascotas();
  }

  getMascotas() {
    this.loading = true;
    this.mascotasService.getMascotas(EstadosAdopciones).subscribe(mascotas => {
      this.mascotas = mascotas;
      this.loading = false;
    });
  }

}
