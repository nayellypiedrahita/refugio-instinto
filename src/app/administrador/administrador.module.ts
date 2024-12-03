import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AdministradorComponent } from './administrador.component';
import { AppRoutingModule } from '../app-routing.module';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from './components/title/title.component';
import { PerfilDelPacienteComponent } from './pages/perfil-del-paciente/perfil-del-paciente.component';
import { BajoCuidadoComponent } from './pages/bajo-cuidado/bajo-cuidado.component';
import { AdopcionesComponent } from './pages/adopciones/adopciones.component';

@NgModule({
  declarations: [
    AdministradorComponent,
    LoginComponent,
    AdminHomeComponent,
    TitleComponent,
    PerfilDelPacienteComponent,
    BajoCuidadoComponent,
    AdopcionesComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdministradorModule { }
