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
import { PapeleraComponent } from './pages/papelera/papelera.component';
import { PapeleraDeComprobantesComponent } from './pages/papelera-de-comprobantes/papelera-de-comprobantes.component';
import { PapeleraAdopcionComponent } from './pages/papelera-adopcion/papelera-adopcion.component';
import { PapeleraEspecieComponent } from './pages/papelera-especie/papelera-especie.component';
import { PapeleraVoluntariadoComponent } from './pages/papelera-voluntariado/papelera-voluntariado.component';
import { PapeleraaApadrinamientoComponent } from './pages/papeleraa-apadrinamiento/papeleraa-apadrinamiento.component';
import { PapeleraAdopcionesComponent } from './pages/papelera-adopciones/papelera-adopciones.component';


@NgModule({
  declarations: [
    AdministradorComponent,
    LoginComponent,
    AdminHomeComponent,
    TitleComponent,
    PerfilDelPacienteComponent,
    BajoCuidadoComponent,
    AdopcionesComponent,
    PapeleraComponent,
    PapeleraDeComprobantesComponent,
    PapeleraAdopcionComponent,
    PapeleraEspecieComponent,
    PapeleraVoluntariadoComponent,
    PapeleraaApadrinamientoComponent,
    PapeleraAdopcionesComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
})
export class AdministradorModule { }
