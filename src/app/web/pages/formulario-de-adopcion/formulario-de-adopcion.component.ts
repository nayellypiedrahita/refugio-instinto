import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Departamento } from '../../model/departamento';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SolicitudAdopcion } from '../../../shared/model/solicitud-adopcion';
import { SolicitudAdopcionService } from '../../../shared/services/solicitud-adopcion/solicitud-adopcion.service';
import { DepartamentoService } from '../../../shared/services/departamento/departamento.service';

@Component({
  selector: 'app-formulario-de-adopcion',
  templateUrl: './formulario-de-adopcion.component.html',
  styleUrl: './formulario-de-adopcion.component.css'
})
export class FormularioDeAdopcionComponent implements OnInit {

  idMascota: string | null = null;
  departamentos: Departamento[] = [];
  
  // Validador personalizado para evitar espacios al inicio
  private noEspaciosAlInicio(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value;
      if (valor && valor.length > 0 && valor[0] === ' ') {
        return { 'espaciosAlInicio': true };
      }
      return null;
    };
  }
  
  adopcionForm: FormGroup = new FormGroup({
    nombre: new FormControl("", [
      Validators.required, 
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$'),
      this.noEspaciosAlInicio()
    ]),
    tipoDocumento: new FormControl('ninguno', [Validators.required, this.emptySelect()]),
    numeroDocumento: new FormControl("", [
      Validators.required, 
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(6),
      Validators.maxLength(12)
    ]),
    correo: new FormControl("", [
      Validators.required, 
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
    ]),
    celular: new FormControl("", [
      Validators.required, 
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(6),
      Validators.maxLength(12)
    ]),
    ciudad: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z ]{3,50}')]),
    departamento: new FormControl('ninguno', [Validators.required, this.emptySelect()]),
  });
  loadingForm: boolean = false;

  private departamentoService: DepartamentoService = inject(DepartamentoService);
  private solicitudAdopcionService: SolicitudAdopcionService = inject(SolicitudAdopcionService);

  constructor(
    private routerParams: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.idMascota = this.routerParams.snapshot.paramMap.get('idMascota');
    this.departamentoService.getAllDepartamentos().then(response => {
      this.departamentos = response;
    })
  }

  solicitudAdopcion() {
    if (!this.adopcionForm.invalid) {
      this.loadingForm = true;
      const nombre = this.adopcionForm.controls['nombre'].value;
      const tipoDocumento = this.adopcionForm.controls['tipoDocumento'].value;
      const numeroDocumento = this.adopcionForm.controls['numeroDocumento'].value;
      const correo = this.adopcionForm.controls['correo'].value;
      const celular = this.adopcionForm.controls['celular'].value;
      const ciudad = this.adopcionForm.controls['ciudad'].value;
      const departamento = this.adopcionForm.controls['departamento'].value;
      
      const solicitudAdopcion: SolicitudAdopcion = {
        nombre,
        tipoDocumento,
        numeroDocumento,
        correo,
        celular,
        ciudad,
        departamento,
        mascota: this.idMascota as string,
        fecha: new Date().toISOString().slice(0, 10),
        isNew: true
      };

      this.solicitudAdopcionService.addSolicitudAdopcion(solicitudAdopcion).then(response => {
        if (response) {
          this.router.navigate(["/web/solicitud-enviada"]);
          this.loadingForm = false;
        }
      });

    }
  }

  // Formatea el nombre con la primera letra de cada palabra en mayúscula
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
      this.adopcionForm.get('nombre')?.setValue(value);
    }
  }

  // Valida y formatea el número de celular
  onCelularInput(event: any) {
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
      this.adopcionForm.get('celular')?.setValue(value);
    }
  }

  // Formatea y valida el correo electrónico
  onEmailInput(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.trim();
    
    // Convertir a minúsculas para consistencia
    value = value.toLowerCase();
    
    // Actualizar el valor en el input y en el formulario
    if (input.value !== value) {
      input.value = value;
      this.adopcionForm.get('correo')?.setValue(value);
    }
  }

  // Valida que solo se ingresen números en el campo de documento
  onDocumentoInput(event: any) {
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
      this.adopcionForm.get('numeroDocumento')?.setValue(value);
    }
  }

  emptySelect(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      return value === 'ninguno' ? { required: true } : null;
    }
  }

}
