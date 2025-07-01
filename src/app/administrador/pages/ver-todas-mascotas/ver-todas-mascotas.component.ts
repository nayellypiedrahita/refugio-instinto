import { Component, inject, OnInit } from '@angular/core';
import { MascotasService } from '../../../shared/services/mascotas/mascotas.service';
import { Mascotas } from '../../../shared/model/mascotas';
import { EstadosTodos } from '../../../shared/enum/estados.enum';

@Component({
  selector: 'app-ver-todas-mascotas',
  templateUrl: './ver-todas-mascotas.component.html',
  styleUrl: './ver-todas-mascotas.component.css'
})
export class VerTodasMascotasComponent implements OnInit {

  mascotas: Mascotas[] = [];
  loading: boolean = false;
  private mascotasService: MascotasService = inject(MascotasService);


  ngOnInit(): void {
    this.getMascotas();
    this.mascotasService.getmascotasfrombacken().subscribe(response=>{
      console.log(response)
    })
  }

  getMascotas() {
    this.loading = true;
    this.mascotasService.getMascotas(EstadosTodos).subscribe(mascotas => {
      this.mascotas = mascotas;
      this.loading = false;
    });
  }

}
