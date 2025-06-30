import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators, ValidationErrors } from '@angular/forms';
import { SolicitudVoluntariadoService } from '../../../shared/services/solicitud-voluntariado/solicitud-voluntariado.service';
import { SolicitudVoluntariado } from '../../../shared/model/solicitud-voluntariado';
import { Router } from '@angular/router';
import { Timestamp } from '@angular/fire/firestore';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-voluntariado',
  templateUrl: './voluntariado.component.html',
  styleUrl: './voluntariado.component.css'
})
export class VoluntariadoComponent implements OnInit {

  currentSlide: number = 0;

  // Validador personalizado para espacios al inicio
  noEspaciosAlInicio(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const value = control.value;
      if (value && value.trim() !== '' && value.startsWith(' ')) {
        return {'espaciosAlInicio': true};
      }
      return null;
    };
  }

  voluntariadoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [
      Validators.required, 
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$'),
      this.noEspaciosAlInicio()
    ]),
    apellido: new FormControl('', [
      Validators.required, 
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$'),
      this.noEspaciosAlInicio()
    ]),
    celular: new FormControl('', [
      Validators.required, 
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(6),
      Validators.maxLength(13),
      this.noEspaciosAlInicio()
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
      this.noEspaciosAlInicio()
    ]),
    paseadorPerros: new FormControl(''),
    hadaGatuna: new FormControl(''),
    heroeBaño: new FormControl(''),
    chefAnimal: new FormControl(''),
    embajadorAdopciones: new FormControl(''),
    heroeLimpieza: new FormControl(''),
    voluntarioVirtual: new FormControl(''),
    angelRecaudador: new FormControl(''),
    otro: new FormControl('', [
      Validators.maxLength(150),
      this.noEspaciosAlInicio()
    ]),
  });
  loading: boolean = false;

  constructor(
    private solicitudVoluntariadoService: SolicitudVoluntariadoService,
    private router: Router
  ) {}

  // Maneja la entrada del campo de correo electrónico
  onEmailInput(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.trim();
    
    // Convertir a minúsculas para consistencia
    value = value.toLowerCase();
    
    // Actualizar el valor en el input y en el formulario
    if (input.value !== value) {
      input.value = value;
      this.voluntariadoForm.get('email')?.setValue(value);
    }
  }

  // Maneja la entrada del campo de WhatsApp
  onCelularInput(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    
    // Eliminar cualquier caracter que no sea número
    value = value.replace(/[^0-9]/g, '');
    
    // Limitar a 13 caracteres
    if (value.length > 13) {
      value = value.substring(0, 13);
    }
    
    // Actualizar el valor en el input y en el formulario
    if (input.value !== value) {
      input.value = value;
      this.voluntariadoForm.get('celular')?.setValue(value);
    }
  }

  // Maneja la entrada del campo 'otro'
  onOtroInput(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    
    // Eliminar espacios al inicio
    value = value.trimStart();
    
    // Actualizar el valor en el input y en el formulario
    if (input.value !== value) {
      input.value = value;
      this.voluntariadoForm.get('otro')?.setValue(value);
    }
  }

  // Maneja la entrada de texto para nombre y apellido
  onNombreInput(event: any, field: string) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    
    // Eliminar cualquier número o carácter especial
    value = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, '');
    
    // Eliminar espacios al inicio
    value = value.trimStart();
    
    // Convertir a minúsculas primero
    value = value.toLowerCase();
    
    // Capitalizar la primera letra de cada palabra
    value = value.replace(/\b\w/g, (char) => char.toUpperCase());
    
    // Actualizar el valor en el input y en el formulario
    if (input.value !== value) {
      input.value = value;
      this.voluntariadoForm.get(field)?.setValue(value);
    }
  }

  ngOnInit(): void {
    this.javascript();
    
    // Suscribirse a cambios en los checkboxes
    const checkboxes = [
      'paseadorPerros', 'hadaGatuna', 'heroeBaño', 'chefAnimal',
      'embajadorAdopciones', 'heroeLimpieza',
      'voluntarioVirtual', 'angelRecaudador'
    ];
    
    // Observar cambios en los checkboxes
    checkboxes.forEach(checkbox => {
      this.voluntariadoForm.get(checkbox)?.valueChanges.subscribe(() => {
        this.updateOtroValidation();
      });
    });
    
    // Validación inicial
    this.updateOtroValidation();
  }
  
  // Actualiza la validación del campo 'otro' basado en los checkboxes seleccionados
  private updateOtroValidation() {
    const otroControl = this.voluntariadoForm.get('otro');
    const anyCheckboxSelected = [
      this.voluntariadoForm.get('paseadorPerros')?.value,
      this.voluntariadoForm.get('hadaGatuna')?.value,
      this.voluntariadoForm.get('heroeBaño')?.value,
      this.voluntariadoForm.get('chefAnimal')?.value,
      this.voluntariadoForm.get('embajadorAdopciones')?.value,
      this.voluntariadoForm.get('heroeLimpieza')?.value,
      this.voluntariadoForm.get('voluntarioVirtual')?.value,
      this.voluntariadoForm.get('angelRecaudador')?.value
    ].some(value => value === true);
    
    if (anyCheckboxSelected) {
      otroControl?.clearValidators();
      otroControl?.setValidators([
        Validators.maxLength(150),
        this.noEspaciosAlInicio()
      ]);
    } else {
      otroControl?.setValidators([
        Validators.required,
        Validators.maxLength(150),
        this.noEspaciosAlInicio()
      ]);
    }
    
    otroControl?.updateValueAndValidity();
  }  

  solicitudVoluntariado() {
    if (!this.voluntariadoForm.invalid) {
      this.loading = true;
      const nombre = this.voluntariadoForm.controls['nombre'].value;
      const apellido = this.voluntariadoForm.controls['apellido'].value;
      const celular = this.voluntariadoForm.controls['celular'].value;
      const email = this.voluntariadoForm.controls['email'].value;
      const paseadorPerros = this.voluntariadoForm.controls['paseadorPerros'].value;
      const hadaGatuna = this.voluntariadoForm.controls['hadaGatuna'].value;
      const heroeBaño = this.voluntariadoForm.controls['heroeBaño'].value;
      const chefAnimal = this.voluntariadoForm.controls['chefAnimal'].value;
      const embajadorAdopciones = this.voluntariadoForm.controls['embajadorAdopciones'].value;
      const heroeLimpieza = this.voluntariadoForm.controls['heroeLimpieza'].value;
      const voluntarioVirtual = this.voluntariadoForm.controls['voluntarioVirtual'].value;
      const angelRecaudador = this.voluntariadoForm.controls['angelRecaudador'].value;

      const actividades: string[] = [];

      if (paseadorPerros) {
        actividades.push('paseadorPerros');
      }
      if (hadaGatuna) {
        actividades.push('hadaGatuna');
      }
      if (heroeBaño) {
        actividades.push('heroeBaño');
      }
      if (chefAnimal) {
        actividades.push('chefAnimal');
      }
      if (embajadorAdopciones) {
        actividades.push('embajadorAdopciones');
      }
      if (heroeLimpieza) {
        actividades.push('heroeLimpieza');
      }
      if (voluntarioVirtual) {
        actividades.push('voluntarioVirtual');
      }
      if (angelRecaudador) {
        actividades.push('angelRecaudador');
      }

      if (actividades.length == 0) {
        // Mostrar error para que seleccione como minimo un articulo
        alert("Debes seleccionar al menos 1 articulo o especificar otro.");
        return;
      }

      const solicitudVoluntariado: SolicitudVoluntariado = {
        nombre,
        apellido,
        celular,
        email,
        fecha: formatDate(Timestamp.now().toDate(), 'yyyy-MM-dd', 'en-US'),
        actividades
      };

      this.solicitudVoluntariadoService.addSolicitudVoluntariado(solicitudVoluntariado).then(response => {
        if(response) {
          this.router.navigate(["/web/solicitud-enviada"]);
          this.loading = false;
        }
      });
      
    }
  }

  javascript() {
    document.addEventListener('DOMContentLoaded', () => {
      const prevButton = document.querySelector('.prev');
      const nextButton = document.querySelector('.next');
  
      prevButton!.addEventListener('click', () => this.changeSlide(-1));
      nextButton!.addEventListener('click', () => this.changeSlide(1));
  
      // Ensure the slider resizes correctly on window resize
      window.addEventListener('resize', () => {
          const slideWidth = document.querySelector('.slide')!.clientWidth;
          const slidesContainer = document.querySelector('.slides') as HTMLElement;
          slidesContainer!.style.transform = `translateX(${-this.currentSlide * slideWidth}px)`;
      });
    });
  }

  
  changeSlide(direction: number) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    this.currentSlide += direction;

    if (this.currentSlide < 0) {
        this.currentSlide = totalSlides - 1;
    } else if (this.currentSlide >= totalSlides) {
        this.currentSlide = 0;
    }

    const slideWidth = slides[0].clientWidth;
    const slidesContainer = document.querySelector('.slides') as HTMLElement;
    slidesContainer!.style.transform = `translateX(${-this.currentSlide * slideWidth}px)`;
  }

  
  myFunction() {
    var x = document.getElementById("myTopnav")!;
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
    }
  }

}
