import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SolicitudApadrinamientoService } from '../../../shared/services/solicitud-apadrinamiento/solicitud-apadrinamiento.service';
import { SolicitudApadrinamiento } from '../../../shared/model/solicitud-apadrinamiento';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formulario-de-apadrinamiento',
  templateUrl: './formulario-de-apadrinamiento.component.html',
  styleUrl: './formulario-de-apadrinamiento.component.css'
})
export class FormularioDeApadrinamientoComponent {

   apadrinamientoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ][a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$')
      ]
    }),
    email: new FormControl('', [Validators.required, Validators.email]),
    celular: new FormControl('', [
      Validators.required, 
      Validators.pattern("^[0-9]{6,13}$"),
      Validators.minLength(6),
      Validators.maxLength(13)
    ]),
    notificacion: new FormControl(''),
  });
  loading: boolean = false;
  private solicitudApadrinamientoservice:SolicitudApadrinamientoService = inject(SolicitudApadrinamientoService);

 
  constructor(
    private router: Router
  ) {
    // Suscribirse a cambios en el campo celular para permitir solo números
    this.apadrinamientoForm.get('celular')?.valueChanges.subscribe(value => {
      if (value) {
        const cleanValue = value.replace(/[^0-9]/g, '');
        if (cleanValue !== value) {
          this.apadrinamientoForm.get('celular')?.setValue(cleanValue, { emitEvent: false });
        }
      }
    });

    // Suscribirse a cambios en el campo email para eliminar espacios
    this.apadrinamientoForm.get('email')?.valueChanges.subscribe(value => {
      if (value && value.includes(' ')) {
        const cleanValue = value.replace(/\s/g, '');
        this.apadrinamientoForm.get('email')?.setValue(cleanValue, { emitEvent: false });
      }
    });
    // Suscribirse a cambios en el campo nombre para limpiar y formatear
    this.apadrinamientoForm.get('nombre')?.valueChanges.subscribe(value => {
      if (value) {
        const input = document.getElementById('nombre') as HTMLInputElement;
        const cursorPosition = input?.selectionStart || 0;
        let cleanValue = value;
        
        // Eliminar caracteres que no sean letras o espacios
        cleanValue = cleanValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '');
        
        // Eliminar espacios al inicio
        cleanValue = cleanValue.replace(/^\s+/g, '');
        
        // Capitalizar primera letra de cada palabra
        cleanValue = cleanValue.toLowerCase().replace(/^(\s*\w)|(\s+\w)/g, (match: string) => {
          return match.toUpperCase();
        });
        
        // Actualizar el valor solo si hubo cambios
        if (cleanValue !== value) {
          this.apadrinamientoForm.get('nombre')?.setValue(cleanValue, { emitEvent: false });
          
          // Restaurar la posición del cursor
          if (input) {
            setTimeout(() => {
              const newPosition = cursorPosition - (value.length - cleanValue.length);
              input.setSelectionRange(newPosition, newPosition);
            });
          }
        }
      }
    });
  }
solicitudApadrinamiento(){
if (!this.apadrinamientoForm.invalid){
  this.loading = true;
  const nombre = this.apadrinamientoForm.controls['nombre'].value;
  const email = this.apadrinamientoForm.controls['email'].value;
  const celular = this.apadrinamientoForm.controls['celular'].value;
  const notificacion = this.apadrinamientoForm.controls['notificacion'].value;

  const solicitudApadrinamiento:SolicitudApadrinamiento = {
  nombre,
  email,
  celular,
  notificacion,
  fecha: new Date().toISOString().slice(0, 10),
  isNew: true
  };

  this.solicitudApadrinamientoservice.addSolicitudapadrinamiento(solicitudApadrinamiento).then(response => {
    if (response) {
      this.router.navigate(["/web/solicitud-enviada"]);
      this.loading = false;
    }
  });

}


}


}
