import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './services/admin.service';
import { DonacionMonetariaService } from '../shared/services/donacion-monetaria/donacion-monetaria.service';
import { SolicitudDonacionService } from '../shared/services/solicitud-donacion/solicitud-donacion.service';
import { SolicitudAdopcionService } from '../shared/services/solicitud-adopcion/solicitud-adopcion.service';
import { SolicitudVoluntariadoService } from '../shared/services/solicitud-voluntariado/solicitud-voluntariado.service';
import { SolicitudApadrinamientoService } from '../shared/services/solicitud-apadrinamiento/solicitud-apadrinamiento.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent implements OnInit {

  router: Router = inject(Router);
  adminService: AdminService = inject(AdminService);
  countDonaciones: number = 0;
  countSolicitudDonacion: number = 0;
  countSolicitudesAdopcion: number = 0;
  countSolicitudesVoluntariado: number = 0;
  countSolicitudesApadrinamiento: number = 0;

  showModal: boolean = false;

  constructor(
    private donacionMonetariaService: DonacionMonetariaService,
    private solicitudDonacionService: SolicitudDonacionService,
    private solicitudAdopcionService: SolicitudAdopcionService,
    private solicitudVoluntariadoService: SolicitudVoluntariadoService,
    private solicitudApadrinamientoService: SolicitudApadrinamientoService,
  ) {}

  ngOnInit(): void {
    this.donacionMonetariaService.getCountDonaciones();
    this.donacionMonetariaService.countDonacionesPublico.subscribe(response => {
      this.countDonaciones = response;
    });
    this.solicitudDonacionService.getCountSolicitudesDonacion();
    this.solicitudDonacionService.countSolicitudesDonaciones.subscribe(response => {
      this.countSolicitudDonacion = response;
    });
    this.solicitudAdopcionService.getCountSolicitudesAdopcion();
    this.solicitudAdopcionService.countSolicitudesAdopcionPublico.subscribe(response => {
      this.countSolicitudesAdopcion = response;
    });
    this.solicitudVoluntariadoService.getCountSolicitudesVoluntariado();
    this.solicitudVoluntariadoService.countSolicitudesVoluntariado.subscribe(response => {
      this.countSolicitudesVoluntariado = response;
    });
    this.solicitudApadrinamientoService.getCountSolicitudesApadrinamiento();
    this.solicitudApadrinamientoService.countSolicitudesApadrinamientoPublico.subscribe(response => {
      this.countSolicitudesApadrinamiento = response;
    });
  }
 
  openLogoutConfirmation(): void {
    this.showModal = true; 
  }

  
  closeModal(): void {
    this.showModal = false; 
  }

 
  logout(): void {
   
    this.adminService.logout();
    
   
    this.router.navigate(["/Home"]);
    
    
    this.showModal = false; 
  }

}