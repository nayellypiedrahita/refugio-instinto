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

  constructor() {}

  logout() {
    this.adminService.logout();
    this.router.navigate(["/login"]);
  }

}
