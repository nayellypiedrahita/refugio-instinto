import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mascotas } from '../../../shared/model/mascotas';
import { MascotasService } from '../../../shared/services/mascotas/mascotas.service';

@Component({
  selector: 'app-informacion-de-peluditos-en-adopcion',
  templateUrl: './informacion-de-peluditos-en-adopcion.component.html',
  styleUrl: './informacion-de-peluditos-en-adopcion.component.css'
})
export class InformacionDePeluditosEnAdopcionComponent implements OnInit {

  idMascota: string | null = null;
  mascota: Mascotas = {} as Mascotas;
  loadingMascota: boolean = false;
  private mascotaService: MascotasService = inject(MascotasService);

  constructor(
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadingMascota = true;
    const mascotaId = this.router.snapshot.paramMap.get('idMascota');
    this.idMascota = mascotaId;
    if (mascotaId) {
      this.mascotaService.getMascotaById(mascotaId).subscribe((response) => {
        if (response) {
          this.mascota = response;
        } else {
          alert("NO SE ENCONTRO LA MASCOTA");
        }
        this.loadingMascota = false;
      });
    }
    
  }



}
