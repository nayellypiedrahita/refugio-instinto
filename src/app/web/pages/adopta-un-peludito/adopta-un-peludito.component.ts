import { Component, inject, OnInit } from '@angular/core';
import { MascotasService } from '../../../shared/services/mascotas.service';
import { Mascotas } from '../../../shared/model/mascotas';

@Component({
  selector: 'app-adopta-un-peludito',
  templateUrl: './adopta-un-peludito.component.html',
  styleUrl: './adopta-un-peludito.component.css'
})
export class AdoptaUnPeluditoComponent implements OnInit {

  private mascotaService: MascotasService = inject(MascotasService);
  mascotas: Mascotas[] = [];

  ngOnInit(): void {
    this.mascotaService.getMascotas().subscribe((mascotasResponse: Mascotas[]) => {
      this.mascotas = mascotasResponse;
    })
  }

}
