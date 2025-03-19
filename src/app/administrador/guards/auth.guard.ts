import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';

export const AuthGuard: CanActivateChildFn = async (childRoute, state) => {
  const router: Router = inject(Router);
  const session = sessionStorage.getItem('auth');
  const adminService = inject(AdminService);

  if (session) {
    const loguin = JSON.parse(session) as { usuario: string, clave: string };
    const decript = CryptoJS.AES.decrypt(loguin.clave, environment.encrypt_key);
    loguin.clave = decript.toString(CryptoJS.enc.Utf8);
  
    const response = await adminService.login(loguin);
    if (response) {
      return true;
    }
  }

  router.navigate(["/login"]);
  return false;
};
