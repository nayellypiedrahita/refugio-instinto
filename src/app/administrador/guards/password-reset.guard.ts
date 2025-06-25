import { inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';

export const PasswordResetGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  
  // Verificar si existe el flag en sessionStorage que indica que vino de olvido-contrasena
  const fromPasswordReset = sessionStorage.getItem('fromPasswordReset');
  
  if (!fromPasswordReset) {
    // Si no viene del flujo de recuperación, redirigir al login
    router.navigate(['/login']);
    return false;
  }
  
  // Si pasó la validación, limpiar el flag para futuros accesos
  sessionStorage.removeItem('fromPasswordReset');
  return true;
};
