import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { inject } from '@angular/core';
@Component({
  selector: 'app-actualizar-contrasena',
  templateUrl: './actualizar_contrasena.component.html',
  styleUrls: ['./actualizar_contrasena.component.css']
})
export class ActualizarContrasenaComponent {
  updateForm: FormGroup;
  loading = false;
  passwordUpdated = false;
  errorMsg = '';
  usuario: string = '';
  private adminService: AdminService = inject(AdminService);

  constructor(
    private route: ActivatedRoute
  ) {
    this.updateForm = new FormGroup({
      nueva_contrasena: new FormControl('', [
        Validators.required, 
        Validators.minLength(6)
      ]),
      confirmar_contrasena: new FormControl('', [
        Validators.required
      ])
    }, [this.mustMatch('nueva_contrasena', 'confirmar_contrasena')]);
  }

  // Validador personalizado para verificar que las contraseñas coincidan
  mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const formGroup = control as FormGroup;
      const controlToMatch = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (!controlToMatch || !matchingControl) {
        return null;
      }

      // Si el otro control no ha sido inicializado o no tiene errores
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      // Compara los valores
      if (controlToMatch.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  }

  onSubmit() {
    if (this.updateForm.valid) {
      this.loading = true;
      const nueva_contrasena = this.updateForm.controls["nueva_contrasena"].value;
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.adminService.actualizarContrasena(nueva_contrasena, id).then((response) => {
          if (response) {
            this.passwordUpdated = true;
            this.loading = false;
          }
        });
      }
    }
  }
}
