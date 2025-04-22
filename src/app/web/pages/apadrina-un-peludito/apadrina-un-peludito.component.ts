import { Component, inject, OnInit } from '@angular/core';
import { MascotasService } from '../../../shared/services/mascotas/mascotas.service';
import { Mascotas } from '../../../shared/model/mascotas';
import { EstadosBajoCuidado } from '../../../shared/enum/estados.enum';

@Component({
  selector: 'app-apadrina-un-peludito',
  templateUrl: './apadrina-un-peludito.component.html',
  styleUrl: './apadrina-un-peludito.component.css'
})
export class ApadrinaUnPeluditoComponent implements OnInit {

  mascotas: Mascotas[] = [];
  loading: boolean = false;
  private mascotasService: MascotasService = inject(MascotasService);

  ngOnInit() {
    this.getMascotas();
  }

  getMascotas() {
    this.loading = true;
    this.mascotasService.getMascotas(EstadosBajoCuidado)
      .subscribe(response => {
        this.mascotas = response;
        this.loading = false;
      });
  }

}
