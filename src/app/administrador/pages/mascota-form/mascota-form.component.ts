import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MascotasService } from '../../../shared/services/mascotas/mascotas.service';
import { Mascotas } from '../../../shared/model/mascotas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrl: './mascota-form.component.css'
})
export class MascotaFormComponent {

  mascotaForm = new FormGroup({
    'nombre': new FormControl('', [Validators.required]),
    'raza': new FormControl('', [Validators.required]),
    'edad': new FormControl('', [Validators.required]),
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
      this.mascotaForm.controls.nombre.value != null &&
      this.mascotaForm.controls.raza.value != null &&
      this.mascotaForm.controls.edad.value != null &&
      this.mascotaForm.controls.sexo.value != null &&
      this.mascotaForm.controls.esterilizada.value != null &&
      this.mascotaForm.controls.estado.value != null &&
      this.mascotaForm.controls.condiciones.value != null &&
      this.mascotaForm.controls.tamano.value != null &&
      this.mascotaForm.controls.historia.value != null &&
      !this.mascotaForm.invalid && 
      this.imagesBase64.length > 0) {
      this.loading = true;
      const mascota: Mascotas = {
        nombre: this.mascotaForm.controls.nombre.value,
        raza: this.mascotaForm.controls.raza.value,
        edad: this.mascotaForm.controls.edad.value,
        sexo: this.mascotaForm.controls.sexo.value,
        esterilizada: true,//this.mascotaForm.controls.esterilizada.value,
        estado: this.mascotaForm.controls.estado.value,
        condiciones: this.mascotaForm.controls.condiciones.value,
        tamano: this.mascotaForm.controls.tamano.value,
        historia: this.mascotaForm.controls.historia.value,
        imagenes: this.imagesBase64,
      }

      this.mascotasService.addMascotas(mascota).then(response => {
        if (response) {
          this.router.navigate(["/admin/ver-todas-mascotas"]);
        }
        this.loading = false;
      })
    }
  }

}
