import { Component, Input } from '@angular/core';
import { Mascotas } from '../../../shared/model/mascotas';

@Component({
  selector: 'app-listado-mascotas',
  templateUrl: './listado-mascotas.component.html',
  styleUrl: './listado-mascotas.component.css'
})
export class ListadoMascotasComponent {

  @Input({ required: true })
  mascotas: Mascotas[] = [];

  @Input({ required: true })
  loading: boolean = false;

  estadoSeleccionado: string = '';
  

  estadoFiltrado: string = '';


  buscarMascotas(): void {
    this.estadoFiltrado = this.estadoSeleccionado;  
  }

 
  get mascotasFiltradas(): Mascotas[] {
    if (!this.estadoFiltrado) return this.mascotas;  
    return this.mascotas.filter(m => m.estado === this.estadoFiltrado);  
  }
}
