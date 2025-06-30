import { Component, inject, OnInit } from '@angular/core';
import { Mascotas } from '../../../shared/model/mascotas';
import { MascotasService } from '../../../shared/services/mascotas/mascotas.service';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-del-paciente',
  templateUrl: './perfil-del-paciente.component.html',
  styleUrl: './perfil-del-paciente.component.css'
})
export class PerfilDelPacienteComponent {

  mascota: Mascotas;

  alertaeliminar: boolean = false;

  mascotaservice: MascotasService = inject(MascotasService);

  constructor(private route:Router) {
    const mascotastring = sessionStorage.getItem('perfil-paciente');
    const mascota = JSON.parse(mascotastring!) as Mascotas;
    this.mascota=mascota;  
  }

  mostraralerta (){
    this.alertaeliminar = true;
  }
  eliminarmascota (){
    this.mascotaservice.eliminarMascota(this.mascota.idMascota!)
    sessionStorage.removeItem('perfil-paciente');
    this.route.navigate(["/admin/ver-todas-mascotas"]);
  }

  ocultaralerta(){
    this.alertaeliminar = false;
  }

  volver() {
    sessionStorage.removeItem('perfil-paciente');
    this.route.navigate(["/admin/ver-todas-mascotas"]);
  }
}
