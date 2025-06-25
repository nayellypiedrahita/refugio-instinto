import { Component, inject } from '@angular/core';
import { DonacionMonetariaService } from '../../../shared/services/donacion-monetaria/donacion-monetaria.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comprobante-donacion',
  templateUrl: './comprobante-donacion.component.html',
  styleUrl: './comprobante-donacion.component.css'
})
export class ComprobanteDonacionComponent {

  base64: string = "";
  selectedImage: boolean = false;
  loading: boolean = false;
  private donacionMonetariaService: DonacionMonetariaService = inject(DonacionMonetariaService);
  private router: Router = inject(Router);
  donacionForm: FormGroup;

  constructor() {
    this.donacionForm = new FormGroup({
      nombreCompleto: new FormControl('', [
        Validators.required
      ]),
      whatsapp: new FormControl('', [
        Validators.required
      ])
    });
  }

  fileSelected(event: any) {
    this.selectedImage = false;
    if (event.target.files.length > 1) {
      alert("Solo se tendra en cuenta el primer archivo seleccionado")
    }
    const file: File = event.target.files[0];

    if (!file.type.startsWith("image/")) {
      alert("El elemento seleccionado no es una imagen")
    }

    const fileReader = new FileReader();

    fileReader.onload = (event: any) => {      
      this.base64 = event.target.result;
      this.selectedImage = true;
    };

    fileReader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };
    fileReader.readAsDataURL(file);
  }

  quitarImagen() {
    this.base64 = "";
    this.selectedImage = false;
  }

  onSubmit() {
    if (this.donacionForm.valid) {
      if (this.base64 == "") {
        alert("Debe seleccionar un comprobante primero.");
        return;
      }
      this.loading = true;
      const nombreCompleto = this.donacionForm.controls['nombreCompleto'].value;
      const whatsapp = this.donacionForm.controls['whatsapp'].value;
      this.donacionMonetariaService.addDonacion(this.base64, nombreCompleto, whatsapp).then(response => {
        if (response) {
          this.router.navigate(["/web/tu-imagen-ha-sido-enviada"]);
          this.loading = false;
        }
      });
    }
  }

}
