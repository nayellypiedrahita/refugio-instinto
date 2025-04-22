import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, of, tap } from 'rxjs';
import { signOut } from '@angular/fire/auth';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  focusNext(nextInput: HTMLInputElement) {
    nextInput.focus();
  }
  
  mostrarErrorLogin: boolean = false;
  loading: boolean = false;
  errorMsg: string = '';
  form: FormGroup;
  private adminService: AdminService;

  constructor(
    private router: Router
  ) {
    this.adminService = inject(AdminService);
    this.form = new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_\-]*')]),
      clave: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*')]),
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (this.form.valid) {
      this.loading = true;
      const usuario = this.form.controls['usuario'].value;
      const clave = this.form.controls['clave'].value;

      this.adminService.login({ usuario, clave: clave }).then((response) => {
        if (response) {
          this.router.navigate(["/admin/home"]);
        } else {
          this.errorMsg = "Datos incorrectos.";
          this.mostrarErrorLogin = true;
        }
        this.loading = false;
      });
    }
  }

}
