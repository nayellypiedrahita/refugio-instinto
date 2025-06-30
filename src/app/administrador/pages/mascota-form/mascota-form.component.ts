import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MascotasService } from '../../../shared/services/mascotas/mascotas.service';
import { Mascotas } from '../../../shared/model/mascotas';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrl: './mascota-form.component.css'
})
export class MascotaFormComponent implements OnInit {

  mascotaForm = new FormGroup({
    'nombre': new FormControl('', [Validators.required]),
    'raza': new FormControl('', [Validators.required]),
    'fechaNacimiento': new FormControl('', [Validators.required]),
    'sexo': new FormControl('', [Validators.required]),
    'esterilizada': new FormControl('', [Validators.required]),
    'estado': new FormControl('', [Validators.required]),
    'condiciones': new FormControl('', [Validators.required]),
    'tamano': new FormControl('', [Validators.required]),
    'historia': new FormControl('', [Validators.required]),
  });
  imagesBase64: string[] = [];
  loading: boolean = false;
  private mascotasService: MascotasService = inject(MascotasService);
  private router: Router = inject(Router);
  
  mascota:Mascotas | null = null;

  
  
  ngOnInit(): void {
    
    const mascotastring = sessionStorage.getItem('perfil-paciente');
   
    if (mascotastring){
      const mascota = JSON.parse(mascotastring) as Mascotas;
      this.mascota=mascota; 
      this.mascotaForm.controls["nombre"].setValue(this.mascota.nombre);
      this.mascotaForm.controls["raza"].setValue(this.mascota.raza);
      this.mascotaForm.controls["fechaNacimiento"].setValue(formatDate(this.mascota.fechaNacimiento,'yyyy-MM-dd','en'));
      this.mascotaForm.controls["sexo"].setValue(this.mascota.sexo);2
      this.mascotaForm.controls["esterilizada"].setValue(this.mascota.esterilizada ? "Sí": "No");
      this.mascotaForm.controls["estado"].setValue(this.mascota.estado);
      this.mascotaForm.controls["condiciones"].setValue(this.mascota.condiciones);
      this.mascotaForm.controls["tamano"].setValue(this.mascota.tamano);
      this.mascotaForm.controls["historia"].setValue(this.mascota.historia);
    }else {this.mascota = null}

let estadoAnterior = this.mascotaForm.controls['estado'].value;

this.mascotaForm.controls['estado'].valueChanges.subscribe(nuevoEstado => {
  if (nuevoEstado === 'no disponible' && this.mascota) {
    Swal.fire({
      title: '¿Deseas eliminar esta mascota?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mascotasService.eliminarMascota(this.mascota!.idMascota!).then(() => {
          Swal.fire('Eliminada', 'La mascota ha sido eliminada correctamente', 'success');
          sessionStorage.removeItem('perfil-paciente');
          this.router.navigate(['/admin/ver-todas-mascotas']);
        });
      } else {
        this.mascotaForm.controls['estado'].setValue(estadoAnterior, { emitEvent: false });
      }
    });
  } else {
    estadoAnterior = nuevoEstado;
  }
});

  }

  imagesSelected(event: any) {
    if (this.imagesBase64.length >= 2) {
      alert("Ya ha seleccionado 2 imagenes.")
      return;
    }
    if (event.target.files.length > 2) {
      alert("Solo se tendran en cuenta las primeras 2 imagenes seleccionadas")
    }

    for (let i = 0; i < event.target.files.length; i++) {
      const file: File = event.target.files[i];
      if (!file.type.startsWith("image/")) {
        alert("El elemento seleccionado no es una imagen")
        break
      }

      const fileReader = new FileReader();

      fileReader.onload = (event: any) => {      
        this.imagesBase64.push(event.target.result);
      };

      fileReader.onerror = (event: any) => {
        console.log("File could not be read: " + event.target.error.code);
      };
      fileReader.readAsDataURL(file);
    }
  
  }

 addMascota() {
  if (
    this.mascotaForm.valid &&
    this.mascotaForm.controls.nombre.value &&
    this.mascotaForm.controls.raza.value &&
    this.mascotaForm.controls.fechaNacimiento.value &&
    this.mascotaForm.controls.sexo.value &&
    this.mascotaForm.controls.esterilizada.value &&
    this.mascotaForm.controls.estado.value &&
    this.mascotaForm.controls.condiciones.value &&
    this.mascotaForm.controls.tamano.value &&
    this.mascotaForm.controls.historia.value
  ) {
    this.loading = true;

    const mascota: Mascotas = {
      nombre: this.mascotaForm.controls.nombre.value,
      raza: this.mascotaForm.controls.raza.value,
      fechaNacimiento: new Date(this.mascotaForm.controls.fechaNacimiento.value),
      sexo: this.mascotaForm.controls.sexo.value,
      esterilizada: true,
      estado: this.mascotaForm.controls.estado.value,
      condiciones: this.mascotaForm.controls.condiciones.value,
      tamano: this.mascotaForm.controls.tamano.value,
      historia: this.mascotaForm.controls.historia.value,
      imagenes: this.imagesBase64,
    };

    if (this.mascota) {
      mascota.imagenes = this.mascota.imagenes;
      this.mascotasService.actualizarMascota(mascota, this.mascota.idMascota!).then(response => {
        sessionStorage.removeItem('perfil-paciente');
        if (response) {
          if (mascota.estado === 'adoptado') {
            this.preguntarTestimonio();
          } else {
            this.router.navigate(["/admin/ver-todas-mascotas"]);
          }
        }
        this.loading = false;
      });
    } else {
      if (this.imagesBase64.length > 0) {
        this.mascotasService.addMascotas(mascota).then(response => {
          if (response) {
            if (mascota.estado === 'adoptado') {
              this.preguntarTestimonio();
            } else {
              this.router.navigate(["/admin/ver-todas-mascotas"]);
            }
          }
          this.loading = false;
        });
      }
    }
  }
}

preguntarTestimonio() {
  Swal.fire({
    title: '¿Quieres agregar un testimonio?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No'
  }).then((result) => {
    if (result.isConfirmed) {
      sessionStorage.setItem('infomascota', JSON.stringify(this.mascota));
      this.router.navigate (['/admin/agregar-testimonio']);
  
    } else {
      this.router.navigate(['/admin/ver-todas-mascotas']);
    }
  });
}

volver() {
  sessionStorage.removeItem('perfil-paciente');
  this.router.navigate(["/admin/ver-todas-mascotas"]);
}

}
