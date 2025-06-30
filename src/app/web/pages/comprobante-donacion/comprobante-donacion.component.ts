import { Component, inject } from '@angular/core';
import { DonacionMonetariaService } from '../../../shared/services/donacion-monetaria/donacion-monetaria.service';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

// Validador personalizado para evitar que el primer carácter sea un espacio
export function noEspaciosAlInicio(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    if (valor && valor.length > 0 && valor[0] === ' ') {
      return { 'espaciosAlInicio': true };
    }
    return null;
  };
}

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
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$'),
        noEspaciosAlInicio()
      ]),
      whatsapp: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(6),
        Validators.maxLength(12)
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

  // Formatea el nombre con la primera letra de cada palabra en mayúscula
  // y previene números y espacios al inicio
  onNombreInput(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    
    // Eliminar cualquier número del valor
    value = value.replace(/[0-9]/g, '');
    
    // Eliminar espacios al inicio
    value = value.trimStart();
    
    // Convertir a minúsculas primero
    value = value.toLowerCase();
    
    // Capitalizar la primera letra de cada palabra
    value = value.replace(/\b\w/g, (char) => char.toUpperCase());
    
    // Actualizar el valor en el input y en el formulario
    if (input.value !== value) {
      input.value = value;
      this.donacionForm.get('nombreCompleto')?.setValue(value);
    }
  }

  // Valida que solo se ingresen números en el campo de WhatsApp
  onWhatsAppInput(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    
    // Eliminar cualquier caracter que no sea número
    value = value.replace(/[^0-9]/g, '');
    
    // Limitar a 12 caracteres
    if (value.length > 12) {
      value = value.substring(0, 12);
    }
    
    // Actualizar el valor en el input y en el formulario
    if (input.value !== value) {
      input.value = value;
      this.donacionForm.get('whatsapp')?.setValue(value);
    }
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
