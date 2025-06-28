import { Component, Input } from '@angular/core';
import { Mascotas } from '../../../shared/model/mascotas';
import { MascotasService } from '../../../shared/services/mascotas/mascotas.service';


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

  constructor(private mascotasService: MascotasService) {
    const mascotastring = sessionStorage.getItem('infomascota');
    const mascota = JSON.parse(mascotastring!) as Mascotas;
    this.mascota=mascota;
    this.testimonio=mascota.testimonio?mascota.testimonio:"";
  }

  async enviar() {
      if (this.testimonio.trim() !=""){
          const mascotaActualizada: Mascotas = {
        ...this.mascota,
        testimonio: this.testimonio
      };
  const result = await this.mascotasService.actualizarMascota(mascotaActualizada, this.mascota.idMascota!);
  if (result) {
   console.log('Testimonio guardado correctamente');
    this.testimonio = '';
    } else {
    console.error('Error al guardar el testimonio');
    }

      }
  }

  cancelar() {
    this.testimonio = '';
  }

   mostraralerta (){
    this.alertaeliminar = true;
  }

  eliminarmascota (){
    this.mascotasService.eliminarMascota(this.mascota.idMascota!)
    this.route.navigate(["/admin/testimonios"]);
  }

   ocultaralerta(){
    this.alertaeliminar = false;
  }
  
}

