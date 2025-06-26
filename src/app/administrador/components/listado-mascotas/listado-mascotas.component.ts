import { Component, Input } from '@angular/core';
import { Mascotas } from '../../../shared/model/mascotas';
import { Router } from '@angular/router';

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

constructor(private route:Router){}
  buscarMascotas(): void {
    this.estadoFiltrado = this.estadoSeleccionado;  
  }
  seleccionarmascota(mascota: Mascotas){ 
    sessionStorage.setItem('perfil-paciente', JSON.stringify(mascota));
    this.route.navigate(["/admin/perfil-del-paciente"]);
  }
 
  get mascotasFiltradas(): Mascotas[] {
    if (!this.estadoFiltrado) return this.mascotas;  
    return this.mascotas.filter(m => m.estado === this.estadoFiltrado);  
  }
}
