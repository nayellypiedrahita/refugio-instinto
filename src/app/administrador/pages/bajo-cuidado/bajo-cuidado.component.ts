import { Component, inject, OnInit } from '@angular/core';
import { Mascotas } from '../../../shared/model/mascotas';
import { MascotasService } from '../../../shared/services/mascotas/mascotas.service';
import { EstadosBajoCuidado } from '../../../shared/enum/estados.enum';

@Component({
  selector: 'app-bajo-cuidado',
  templateUrl: './bajo-cuidado.component.html',
  styleUrl: './bajo-cuidado.component.css'
})
export class BajoCuidadoComponent implements OnInit {

  mascotas: Mascotas[] = [];
  loading: boolean = false;
  private mascotasService: MascotasService = inject(MascotasService);

  ngOnInit(): void {
    this.getMascotas();
  }

  getMascotas() {
    this.loading = true;
    this.mascotasService.getMascotas(EstadosBajoCuidado).subscribe(mascotas => {
      this.mascotas = mascotas;
      this.loading = false;
    });
  }

}
