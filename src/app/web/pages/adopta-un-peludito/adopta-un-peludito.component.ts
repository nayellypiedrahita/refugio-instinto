import { Component, inject, OnInit } from '@angular/core';
import { MascotasService } from '../../../shared/services/mascotas/mascotas.service';
import { Mascotas } from '../../../shared/model/mascotas';
import { Estados } from '../../../shared/enum/estados.enum';

@Component({
  selector: 'app-adopta-un-peludito',
  templateUrl: './adopta-un-peludito.component.html',
  styleUrl: './adopta-un-peludito.component.css'
})
export class AdoptaUnPeluditoComponent implements OnInit {

  private mascotaService: MascotasService = inject(MascotasService);
  mascotas: Mascotas[] = [];
  loadingMascotas: boolean = false;

  filtroTamanio: string = '';
  filtroEdad: string = '';
  
  todasLasMascotas: Mascotas[] = [];
  
  ngOnInit(): void {
    this.loadingMascotas = true;
    this.mascotaService.getMascotas([Estados.Disponible]).subscribe((mascotasResponse: Mascotas[]) => {
      this.mascotas = mascotasResponse;
      this.todasLasMascotas = mascotasResponse; 
      this.loadingMascotas = false;
    });
  }
  filtrarMascotas(): void {
    console.log('Filtrando con tamaño:', this.filtroTamanio, 'y edad:', this.filtroEdad);
    
    this.mascotas = this.todasLasMascotas.filter(m => {
      const coincideTamanio = this.filtroTamanio ? m.tamano === this.filtroTamanio : true;
  
   
      const coincideEdad = false /*this.filtroEdad 
        ? (m.edad === this.filtroEdad || `${m.edad} años` === this.filtroEdad) 
        : true*/;
  
      console.log('Mascota:', m.nombre, 'Tamaño:', m.tamano, 'Edad:', m.fechaNacimiento, 'Coincide Tamanio:', coincideTamanio, 'Coincide Edad:', coincideEdad);
      return coincideTamanio && coincideEdad;
    });
  
    console.log('Mascotas filtradas:', this.mascotas);
  }
  
  
 
}
