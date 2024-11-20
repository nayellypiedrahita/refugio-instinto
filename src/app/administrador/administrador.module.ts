import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AdministradorComponent } from './administrador.component';
import { AppRoutingModule } from '../app-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdministradorComponent,
    LoginComponent,
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdministradorModule { }
