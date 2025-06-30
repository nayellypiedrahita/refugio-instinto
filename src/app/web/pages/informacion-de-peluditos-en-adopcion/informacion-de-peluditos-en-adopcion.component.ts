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

}
