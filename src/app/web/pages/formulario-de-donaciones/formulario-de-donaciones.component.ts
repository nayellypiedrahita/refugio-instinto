import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudDonaciones } from '../../../shared/model/solicitud-donaciones';
import { SolicitudDonacionService } from '../../../shared/services/solicitud-donacion/solicitud-donacion.service';

@Component({
  selector: 'app-formulario-de-donaciones',
  templateUrl: './formulario-de-donaciones.component.html',
  styleUrl: './formulario-de-donaciones.component.css'
})
export class FormularioDeDonacionesComponent {

  donacionForm: FormGroup = new FormGroup({
    nombreCompleto: new FormControl("", {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        (control) => {
          const value = control.value;
          if (value && value.startsWith(' ')) {
            return { startsWithSpace: true };
          }
          return null;
        }
      ],
      updateOn: 'blur' // Solo validar al salir del campo
    }),
    numeroCelular: new FormControl("", [
      Validators.required, 
      Validators.pattern('^[0-9]+$'),
      Validators.minLength(6),
      Validators.maxLength(13)
    ]),
    alimentoGatos: new FormControl(""),
    alimentoPerros: new FormControl(""),
    peine: new FormControl(""),
    medicamentos: new FormControl(""),
    camas: new FormControl(""),
    arena: new FormControl(""),
    collares: new FormControl(""),
    limpieza: new FormControl(""),
    jaulas: new FormControl(""),
    otro: new FormControl(""),
  });
  loadingForm: boolean = false;
  private solicitudDonacionService: SolicitudDonacionService = inject(SolicitudDonacionService);

  // Maneja la entrada de texto para capitalizar la primera letra de cada palabra
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const cursorPosition = input.selectionStart || 0;
    const value = input.value;
    
    // Capitalizar la primera letra de cada palabra
    const words = value.split(' ');
    const capitalizedWords = words.map(word => {
      if (!word) return ''; // Saltar palabras vacías
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    
    const newValue = capitalizedWords.join(' ');
    
    // Actualizar el valor solo si hubo cambios
    if (newValue !== value) {
      this.donacionForm.get('nombreCompleto')?.setValue(newValue, { emitEvent: false });
      
      // Restaurar la posición del cursor
      setTimeout(() => {
        input.setSelectionRange(cursorPosition, cursorPosition);
      });
    }
  }

  // Maneja el pegado de texto para limpiar espacios al inicio
  onPaste(event: ClipboardEvent) {
    const input = event.target as HTMLInputElement;
    const clipboardData = event.clipboardData?.getData('text/plain') || '';
    const selectionStart = input.selectionStart || 0;
    
    // Si se está pegando al inicio del campo
    if (selectionStart === 0) {
      const cleanText = clipboardData.trimStart();
      
      // Si el texto pegado comienza con espacios, prevenimos el pegado normal
      // y lo hacemos manualmente
      if (cleanText !== clipboardData) {
        event.preventDefault();
        const currentValue = input.value || '';
        const newValue = cleanText + currentValue.substring(input.selectionEnd || 0);
        this.donacionForm.get('nombreCompleto')?.setValue(newValue);
        
        // Posicionamos el cursor al final del texto pegado
        setTimeout(() => {
          input.setSelectionRange(cleanText.length, cleanText.length);
        });
      }
    }
  }

  constructor(
    private router: Router
  ) {
    // Suscribirse a cambios en los checkboxes para actualizar la validación del campo 'otro'
    const checkboxes = ['alimentoGatos', 'alimentoPerros', 'peine', 'medicamentos', 'camas', 'arena', 'collares', 'jaulas'];
    
    // Función para verificar si hay al menos un checkbox seleccionado
    const checkIfAnyCheckboxSelected = () => {
      return checkboxes.some(checkbox => this.donacionForm.get(checkbox)?.value);
    };

    // Actualizar validación del campo 'otro' cuando cambia cualquier checkbox
    checkboxes.forEach(checkbox => {
      this.donacionForm.get(checkbox)?.valueChanges.subscribe(() => {
        const otroControl = this.donacionForm.get('otro');
        if (checkIfAnyCheckboxSelected()) {
          // Si hay algún checkbox seleccionado, hacer que 'otro' no sea obligatorio
          otroControl?.clearValidators();
          otroControl?.setValue('');
        } else {
          // Si no hay checkboxes seleccionados, hacer que 'otro' sea obligatorio
          otroControl?.setValidators([Validators.required, Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{5,50}')]);
        }
        otroControl?.updateValueAndValidity();
      });
    });
    // Suscribirse a cambios en el campo numeroCelular para limpiar caracteres no numéricos
    this.donacionForm.get('numeroCelular')?.valueChanges.subscribe(value => {
      if (value) {
        // Eliminar cualquier carácter que no sea número
        const cleanValue = value.replace(/[^0-9]/g, '');
        if (cleanValue !== value) {
          this.donacionForm.get('numeroCelular')?.setValue(cleanValue, { emitEvent: false });
        }
      }
    });
    // Suscribirse a cambios en el campo nombreCompleto para limpiar espacios al inicio
    this.donacionForm.get('nombreCompleto')?.valueChanges.subscribe(value => {
      if (value && value.startsWith(' ')) {
        const cleanValue = value.trimStart();
        this.donacionForm.get('nombreCompleto')?.setValue(cleanValue, { emitEvent: false });
      }
    });
  }

  // Función para capitalizar la primera letra de cada palabra
  private capitalizeWords(str: string): string {
    if (!str) return str;
    
    return str
      .toLowerCase()
      .split(' ')
      .filter(word => word.length > 0) // Filtrar palabras vacías
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  toSolicitudEnviada(){
    if (!this.donacionForm.invalid){
      this.loadingForm = true;
      const nombreCompleto = this.donacionForm.controls['nombreCompleto'].value;
      const numeroCelular = this.donacionForm.controls['numeroCelular'].value;
      const alimentoGatos = this.donacionForm.controls['alimentoGatos'].value; 
      const alimentoPerros = this.donacionForm.controls['alimentoPerros'].value;
      const peine = this.donacionForm.controls['peine'].value;
      const medicamentos = this.donacionForm.controls['medicamentos'].value;
      const camas = this.donacionForm.controls['camas'].value;
      const arena = this.donacionForm.controls['arena'].value;
      const collares = this.donacionForm.controls['collares'].value;
      const jaulas = this.donacionForm.controls['jaulas'].value;
      const otro = this.donacionForm.controls['otro'].value;

      const articulos: string[] = [];
      if (alimentoGatos) {
        articulos.push('Alimento para gatos');
      }
      if (alimentoPerros) {
        articulos.push('Alimento para perros');
      }
      if (peine) {
        articulos.push('Peine o cepillo');
      }
      if (medicamentos) {
        articulos.push('Medicamentos veterinarios');
      }
      if (camas) {
        articulos.push('Camas y mantas');
      }
      if (arena) {
        articulos.push('Arena para gatos');
      }
      if (collares) {
        articulos.push('Collares y correas');
      }
      if (jaulas) {
        articulos.push('Jaulas y transportadoras');
      } 
      
      if (articulos.length == 0 && (otro == null || otro == "")) {
        // Mostrar error para que seleccione como minimo un articulo
        alert("Debes seleccionar al menos 1 articulo o especificar otro.");
        this.loadingForm = false;
        return;
      }

      const solicitudDonaciones: SolicitudDonaciones = {
        nombreCompleto,
        numeroCelular,
        articulos,
        otro,
        fecha: new Date().toISOString().slice(0, 10),
        isNew: true
      };


      this.solicitudDonacionService.addSolicitudDonacion(solicitudDonaciones).then(response => {
        if(response) {
          this.router.navigate(["/web/solicitud-enviada"]);
        }
        this.loadingForm = false;
      });
    }
  }

}
