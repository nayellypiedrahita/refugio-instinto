import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  ngOnInit(): void {
    this.javascript();
    
  }

  solicitudVoluntariado() {
    if (!this.voluntariadoForm.invalid) {
      
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
