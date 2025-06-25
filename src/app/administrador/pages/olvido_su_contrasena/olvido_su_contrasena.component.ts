import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-olvido-su-contrasena',
  templateUrl: './olvido_su_contrasena.component.html',
  styleUrls: ['./olvido_su_contrasena.component.css']
})
export class OlvidoSuContrasenaComponent {
  recoveryForm: FormGroup;
  loading = false;
  errorMessage: boolean = false;
  private adminService: AdminService = inject(AdminService);

  constructor(
    private router: Router
  ) {
    this.recoveryForm = new FormGroup({
      usuario: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      codigo_secreto: new FormControl('', [
        Validators.required
      ])
    });
  }

  onSubmit() {
    if (this.recoveryForm.valid) {
      this.loading = true;
      const usuario = this.recoveryForm.controls["usuario"].value;
      const codigo_secreto = this.recoveryForm.controls["codigo_secreto"].value;
      this.adminService.recuperarContrasena(usuario, codigo_secreto).then((response) => {
        if (response != "") {
          // Establecer flag para indicar que viene del flujo de recuperación
          sessionStorage.setItem('fromPasswordReset', 'true');
          this.router.navigate(['/actualizar-contrasena', response]);
        } else {
          this.errorMessage = true;
          this.recoveryForm.reset();
        }
        this.loading = false;
      });
    }
  }
  
  volverAlLogin() {
    this.router.navigate(['/login']);
  }
}