import { Component, inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasarelasService } from '../../../shared/services/pasarelas/pasarelas.service';
import { Pasarelas } from '../../../shared/model/pasarela.model';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-pasarelas',
  templateUrl: './pasarelas.component.html',
  styleUrls: ['./pasarelas.component.css']
})
export class PasarelasComponent implements OnInit {
  pasarelas: Pasarelas[] = [];
  cuentaForm: FormGroup;
  alertaeliminar: boolean = false;
  loading = false;
  maxCuentas: number = 3;
  mostrarAlertaLimite: boolean = false;
  mostrarAlertaCamposVacios: boolean = false;
  editandoId: string | null = null;
  // Inyectar el servicio
  private pasarelasService: PasarelasService = inject(PasarelasService);

  // Validador personalizado para espacios al inicio
  private noWhitespaceValidator(control: AbstractControl) {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const hasLeadingSpace = (value + '').startsWith(' ');
    return !hasLeadingSpace ? null : { whitespace: true };
  }

  // Validador para solo letras
  private onlyLettersValidator(control: AbstractControl) {
    if (!control.value) return null;
    const value = control.value.toString();
    const isValid = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value);
    return isValid ? null : { onlyLetters: true };
  }

  // Validador personalizado para números
  private numbersOnlyValidator(control: AbstractControl) {
    if (!control.value) return null;
    const value = control.value.toString();
    const isValid = /^\d+$/.test(value);
    return isValid ? null : { numbersOnly: true };
  }

  // Manejar cambios en los inputs para validación en tiempo real
  onInputChange(fieldName: string) {
    const control = this.cuentaForm.get(fieldName);
    if (control) {
      // Si es el campo de nombre, asegurarse de que solo contenga letras y capitalizar
      if (fieldName === 'nombreCuenta' && control.value) {
        // Mantener solo letras y espacios
        let newValue = control.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
        
        // Capitalizar primera letra de cada palabra
        newValue = newValue.toLowerCase()
          .split(' ')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        // Actualizar el valor si hubo cambios
        if (newValue !== control.value) {
          control.setValue(newValue, { emitEvent: false });
        }
      }
      // Si es el campo de número de cuenta, asegurarse de que solo contenga números
      else if (fieldName === 'numeroCuenta' && control.value) {
        // Mantener solo dígitos numéricos
        const numbersOnly = control.value.replace(/\D/g, '');
        
        // Actualizar el valor si hubo cambios
        if (numbersOnly !== control.value) {
          control.setValue(numbersOnly, { emitEvent: false });
        }
      }
      
      // Actualizar estado de validación
      control.updateValueAndValidity();
      
      // Marcar como tocado para mostrar errores
      if (!control.touched) {
        control.markAsTouched();
      }
      
      // Forzar la detección de cambios
      this.cdr.detectChanges();
    }
  }

  // Definir tipos para los mensajes de validación
  private validationMessages = {
    nombreCuenta: {
      required: 'El nombre de la cuenta es obligatorio',
      minlength: 'El nombre debe tener al menos 3 letras',
      onlyLetters: 'Solo se permiten letras',
      nombreDuplicado: 'Este nombre de cuenta ya está en uso',
      whitespace: 'unicamente espacios no es valido'
    },
    tipoCuenta: {
      required: 'El tipo de cuenta es obligatorio'
    },
    numeroCuenta: {
      required: 'El número de cuenta es obligatorio',
      minlength: 'El número debe tener al menos 6 dígitos',
      numbersOnly: 'Solo se permiten números',
      numeroDuplicado: 'Este número de cuenta ya está registrado',
      whitespace: 'unicamente espacios no es valido'
    }
  } as const;

  // Tipos para las claves de validación (el orden determina la prioridad)
  private validationKeys = {
    nombreCuenta: ['required', 'whitespace', 'onlyLetters', 'minlength', 'nombreDuplicado'] as const,
    tipoCuenta: ['required'] as const,
    numeroCuenta: ['required', 'whitespace', 'numbersOnly', 'minlength', 'numeroDuplicado'] as const
  };

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.cuentaForm = new FormGroup({
      nombreCuenta: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        this.noWhitespaceValidator,
        this.onlyLettersValidator
      ], [this.validarNombreUnico.bind(this)]),
      tipoCuenta: new FormControl('Ahorros', [
        Validators.required
      ]), // Campo requerido con valor por defecto 'Ahorros'
      numeroCuenta: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        this.noWhitespaceValidator,
        this.numbersOnlyValidator
      ], [this.validarNumeroUnico.bind(this)])
    });
  }

  ngOnInit(): void {
    this.getPasarelas();
  }

  getPasarelas(){
    this.pasarelasService.getPasarelas().subscribe((pasarelas) => {
      this.pasarelas = pasarelas;
    });
  }

  guardarCuenta() {
    if (this.cuentaForm.invalid) {
      // Marcar todos los campos como tocados para mostrar los mensajes de error
      this.cuentaForm.markAllAsTouched();
      this.mostrarAlertaCamposVacios = true;
      return;
    }
    
    // Verificar si se ha alcanzado el límite de cuentas
    if (this.pasarelas.length >= this.maxCuentas && !this.editandoId) {
      this.mostrarAlertaLimite = true;
      return;
    }

    // Obtener los valores del formulario
    const nombreCuenta = this.cuentaForm.get('nombreCuenta')?.value;
    const tipoCuenta = this.cuentaForm.get('tipoCuenta')?.value as 'Ahorros' | 'Corriente';
    const numeroCuenta = this.cuentaForm.get('numeroCuenta')?.value;

    this.loading = true;

    if (this.editandoId) {
      this.pasarelasService.updatePasarela(
        { 
          idPasarela: this.editandoId,
          nombreCuenta, 
          tipoCuenta, 
          numeroCuenta,
          fechaActualizacion: new Date()
        }, 
        this.editandoId
      ).then(response => {
        this.loading = false;
        if (response) {
          this.getPasarelas();
          this.limpiarFormulario();
        }
      }).catch(() => this.loading = false);
    } else {
      this.pasarelasService.addPasarela({ 
        nombreCuenta, 
        tipoCuenta, 
        numeroCuenta 
      }).then(response => {  
        this.loading = false;
        if (response) {
          this.getPasarelas();
          this.limpiarFormulario();
        }
      }).catch(() => this.loading = false);  
    }
  }

  limpiarFormulario() {
    this.cuentaForm.reset({
      tipoCuenta: 'Ahorros' // Establecer valor por defecto al limpiar
    });
    this.editandoId = null;
  }

  // Validadores asíncronos personalizados
  private async validarNombreUnico(control: AbstractControl): Promise<ValidationErrors | null> {
    const nombre = control.value;
    if (!nombre) return null;

    const pasarelas = await firstValueFrom(this.pasarelasService.getPasarelas());
    const existe = pasarelas.some(p => 
      p.nombreCuenta.toLowerCase() === nombre.toLowerCase() && 
      p.idPasarela !== this.editandoId
    );
    
    return existe ? { nombreDuplicado: true } : null;
  }

  private async validarNumeroUnico(control: AbstractControl): Promise<ValidationErrors | null> {
    const numero = control.value;
    if (!numero) return null;

    const pasarelas = await firstValueFrom(this.pasarelasService.getPasarelas());
    const existe = pasarelas.some(p => 
      p.numeroCuenta.toString() === numero.toString() && 
      p.idPasarela !== this.editandoId
    );
    
    return existe ? { numeroDuplicado: true } : null;
  }

  // Método auxiliar para obtener mensajes de validación
  getValidationMessage(controlName: 'nombreCuenta' | 'tipoCuenta' | 'numeroCuenta'): string {
    const control = this.cuentaForm.get(controlName);
    if (!control || !control.errors || !control.touched) return '';

    // Si es tipoCuenta y no tiene valor, no mostrar mensaje de error
    if (controlName === 'tipoCuenta' && !control.value) return '';

    for (const key of this.validationKeys[controlName]) {
      if (control.errors[key as keyof typeof control.errors]) {
        return this.validationMessages[controlName][key as keyof typeof this.validationMessages[typeof controlName]] || '';
      }
    }
    return '';
  }

  cancelarEdicion(){
    this.cuentaForm.reset()
  }

  toggleEstado(cuenta: string){

  }

  editarCuenta(cuenta: Pasarelas) {
    this.editandoId = cuenta.idPasarela!;
    this.cuentaForm.patchValue({
      nombreCuenta: cuenta.nombreCuenta,
      tipoCuenta: cuenta.tipoCuenta,
      numeroCuenta: cuenta.numeroCuenta
    });
  }

  mostraralerta (){
    this.alertaeliminar = true;
  }

  eliminarCuenta(idPasarela: string){
    this.alertaeliminar = false; // Ocultar el diálogo de confirmación
    this.pasarelasService.eliminarCuenta(idPasarela).then((response: boolean) => {
      if (response){
        this.getPasarelas();
      }
    });
    sessionStorage.removeItem('pasarelas');
  }

  ocultaralerta(){
    this.alertaeliminar = false;
  }


}