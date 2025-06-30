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
    this.mascota= { ...mascota, fechaNacimiento: new Date(mascota.fechaNacimiento) };
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

  calcularEdad() {
    const hoy = new Date();
    let anios = hoy.getFullYear() - this.mascota.fechaNacimiento.getFullYear();
    const meses = hoy.getMonth() - this.mascota.fechaNacimiento.getMonth();
    const dias = hoy.getDay() - this.mascota.fechaNacimiento.getDay();

    if (meses < 0 || (meses === 0 && dias < 0)) {
      anios--;
    }

     if (anios >= 1) {
      return `${anios} años`;
    }
    
    else {
      let edadEnMeses = meses;
      if (dias < 0) {
        edadEnMeses--;
      }
      
      if (edadEnMeses < 0) {
          edadEnMeses += 12;
      }

      if(meses === 0 && dias === 0){
        return 'Recién nacido';
      }

      if (edadEnMeses > 0) {
          return `${edadEnMeses} ${edadEnMeses === 1 ? 'mes' : 'meses'}`;
      }
      else {
          const diffTime = Math.abs(hoy.getTime() - this.mascota.fechaNacimiento.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return `${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
      }
    }
  }
  getEstadoClase(estado: string): string {
  switch (estado.toLowerCase()) {
    case 'critico':
      return 'estado-critico';
    case 'urgente':
      return 'estado-urgente';
    case 'leve':
      return 'estado-leve';
    case 'disponible':
      return 'estado-disponible';
    case 'adoptado':
      return 'estado-adoptado';
    case 'nodisponible':
      return 'estado-nodisponible';
    default:
      return '';
  }
}

}
