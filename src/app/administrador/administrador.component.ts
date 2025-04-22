import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css'
})
export class AdministradorComponent {

  router: Router = inject(Router);
  adminService: AdminService = inject(AdminService); 

  showModal: boolean = false;

  constructor() {}

 
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