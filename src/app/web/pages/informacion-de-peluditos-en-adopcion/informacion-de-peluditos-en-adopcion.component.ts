import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mascotas } from '../../../shared/model/mascotas';
import { MascotasService } from '../../../shared/services/mascotas/mascotas.service';
import { ContratoService } from '../../../administrador/services/contrato.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-informacion-de-peluditos-en-adopcion',
  templateUrl: './informacion-de-peluditos-en-adopcion.component.html',
  styleUrl: './informacion-de-peluditos-en-adopcion.component.css'
})
export class InformacionDePeluditosEnAdopcionComponent implements OnInit {

  idMascota: string | null = null;
  mascota: Mascotas = {} as Mascotas;
  loadingMascota: boolean = false;
  mostrarContrato: boolean = false;
  base64Contrato: SafeResourceUrl | null = null;
  private mascotaService: MascotasService = inject(MascotasService);

  constructor(
    private router: ActivatedRoute,
    private contratoService: ContratoService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadingMascota = true;
    const mascotaId = this.router.snapshot.paramMap.get('idMascota');
    this.idMascota = mascotaId;
    if (mascotaId) {
      this.mascotaService.getMascotaById(mascotaId).subscribe((response) => {
        if (response) {
          this.mascota = response;
        } else {
          alert("NO SE ENCONTRO LA MASCOTA");
        }
        this.loadingMascota = false;
      });
    }
    
  }
  
  obtenerContrato() {
    this.mostrarContrato = !this.mostrarContrato;
    this.contratoService.getContrato().subscribe(response => {
      if (response) {
        this.base64Contrato = this.sanitizer.bypassSecurityTrustResourceUrl(response[0].base64);
      }
    });
  }

  calcularEdad() {
    const hoy = new Date();
    let anios = hoy.getFullYear() - this.mascota.fechaNacimiento.getFullYear();
    const meses = hoy.getMonth() - this.mascota.fechaNacimiento.getMonth();
    const dias = hoy.getDay() - this.mascota.fechaNacimiento.getDay();

    if (meses < 0 || (meses === 0 && dias < 0)) {
      anios--;
    }

     if (anios >= 1) {
      return `${anios} años`;
    }
    
    else {
      let edadEnMeses = meses;
      if (dias < 0) {
        edadEnMeses--;
      }
      
      if (edadEnMeses < 0) {
          edadEnMeses += 12;
      }

      if(meses === 0 && dias === 0){
        return 'Recién nacido';
      }

      if (edadEnMeses > 0) {
          return `${edadEnMeses} ${edadEnMeses === 1 ? 'mes' : 'meses'}`;
      }
      else {
          const diffTime = Math.abs(hoy.getTime() - this.mascota.fechaNacimiento.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return `${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
      }
    }
  }

}
