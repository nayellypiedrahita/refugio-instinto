import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SolicitudVoluntariadoService } from '../../../shared/services/solicitud-voluntariado/solicitud-voluntariado.service';
import { SolicitudVoluntariado } from '../../../shared/model/solicitud-voluntariado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voluntariado',
  templateUrl: './voluntariado.component.html',
  styleUrl: './voluntariado.component.css'
})
export class VoluntariadoComponent implements OnInit {

  currentSlide: number = 0;

  voluntariadoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,50}')]),
    apellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,50}')]),
    celular: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    paseadorPerros: new FormControl(''),
    hadaGatuna: new FormControl(''),
    heroeBaño: new FormControl(''),
    chefAnimal: new FormControl(''),
    embajadorAdopciones: new FormControl(''),
    heroeLimpieza: new FormControl(''),
    voluntarioVirtual: new FormControl(''),
    angelRecaudador: new FormControl(''), 
  });
  loading: boolean = false;
  private solicitudVoluntariadoService: SolicitudVoluntariadoService = inject(SolicitudVoluntariadoService);

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    this.javascript();
    
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
