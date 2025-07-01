import { Component, OnInit } from '@angular/core';
import { Mascotas } from '../../../shared/model/mascotas';
import { MascotasService } from '../../../shared/services/mascotas/mascotas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testimonios',
  templateUrl: './testimonios.component.html',
  styleUrls: ['./testimonios.component.css']
})
export class TestimoniosComponent implements OnInit {
  mascotasConTestimonio: Mascotas[] = [];

  constructor(private mascotasService: MascotasService, private router:Router)  {}

  ngOnInit(): void {
    this.mascotasService.getMascotasConTestimonio().subscribe((mascotas) => {
      this.mascotasConTestimonio = mascotas;
    });
  }

 redireccionartestimonio(mascota:Mascotas){
 localStorage.setItem("infomascota",JSON.stringify(mascota));

 this.router.navigate(["/admin/agregar-testimonio"]);
 }
}
