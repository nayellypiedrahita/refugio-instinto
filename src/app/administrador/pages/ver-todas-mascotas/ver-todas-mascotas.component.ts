import { Component, inject, OnInit } from '@angular/core';
import { MascotasService } from '../../../shared/services/mascotas/mascotas.service';
import { Mascotas } from '../../../shared/model/mascotas';
import { EstadosTodos } from '../../../shared/enum/estados.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-todas-mascotas',
  templateUrl: './ver-todas-mascotas.component.html',
  styleUrl: './ver-todas-mascotas.component.css'
})
export class VerTodasMascotasComponent implements OnInit {

  mascotas: Mascotas[] = [];
  loading: boolean = false;
  private mascotasService: MascotasService = inject(MascotasService);

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMascotas();
  }

  getMascotas() {
    this.loading = true;
    this.mascotasService.getMascotas(EstadosTodos).subscribe(mascotas => {
      this.mascotas = mascotas;
      this.loading = false;
    });
  }
  
  redirectToComponent() {
    sessionStorage.removeItem("perfil-paciente");
    this.router.navigate(["/admin/add-mascota"]);
  }

}
