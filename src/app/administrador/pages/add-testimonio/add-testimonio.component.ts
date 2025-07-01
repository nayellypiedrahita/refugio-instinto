import { Component, Input } from '@angular/core';
import { Mascotas } from '../../../shared/model/mascotas';
import { MascotasService } from '../../../shared/services/mascotas/mascotas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-testimonio',
  templateUrl: './add-testimonio.component.html',
  styleUrls: ['./add-testimonio.component.css']
})
export class AddTestimonioComponent {
  testimonio:string="";
  mascota:Mascotas;
  route: any;

    alertaeliminar: boolean = false;

 constructor(private mascotasService: MascotasService, private router: Router) {
  const mascotastring = localStorage.getItem('infomascota');
  const mascota = JSON.parse(mascotastring!) as Mascotas;
  this.mascota = mascota;
  this.testimonio = mascota.testimonio ? mascota.testimonio : "";
}

errorTestimonio: string = ''; 
async enviar() {
  const texto = this.testimonio.trim();

  if (texto === '') {
    this.errorTestimonio = 'El testimonio no puede estar vacío';
    return;
  }

  if (texto.length > 300) {
    this.errorTestimonio = 'El testimonio no debe superar los 300 caracteres';
    return;
  }

  const mascotaActualizada: Mascotas = {
    ...this.mascota,
    fechaNacimiento: new Date(this.mascota.fechaNacimiento),
    testimonio: texto
  };

  const result = await this.mascotasService.actualizarMascota(mascotaActualizada, this.mascota.idMascota!);
  if (result) {
    console.log('Testimonio guardado correctamente');
    this.testimonio = '';
    this.errorTestimonio = '';
    this.router.navigate(['/admin/testimonios']); 
  } else {
    console.error('Error al guardar el testimonio');
  }
}




  cancelar() {
    this.testimonio = '';
  }

   mostraralerta (){
    this.alertaeliminar = true;
  }

 eliminarmascota() {
  const mascotaSinTestimonio: Mascotas = {
    ...this.mascota,
    testimonio: '' 
  };

  this.mascotasService.actualizarMascota(mascotaSinTestimonio, this.mascota.idMascota!)
    .then(() => {
      this.route.navigate(['/admin/testimonios']);
    })
    .catch((error) => {
      console.error('Error al quitar el testimonio:', error);
    });
}


   ocultaralerta(){
    this.alertaeliminar = false;
  }
  
}

