import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AdministradorComponent } from './administrador.component';
import { AppRoutingModule } from '../app-routing.module';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from './components/title/title.component';
import { SolicitudEnEspecieComponent } from './pages/solicitud-en-especie/solicitud-en-especie.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { ComprobantesYPasarelasComponent } from './pages/comprobantes-y-pasarelas/comprobantes-y-pasarelas.component';
import { ArticulosDeDonacionComponent } from './pages/articulos-de-donacion/articulos-de-donacion.component';
import { DetalleComprobantesComponent } from './pages/detalle-comprobantes/detalle-comprobantes.component';
import { TestimoniosComponent } from './pages/testimonios/testimonios.component';
import { PerfilDelPacienteComponent } from './pages/perfil-del-paciente/perfil-del-paciente.component';
import { BajoCuidadoComponent } from './pages/bajo-cuidado/bajo-cuidado.component';
import { AdopcionesComponent } from './pages/adopciones/adopciones.component';
import { PasarelasComponent } from './pages/pasarelas/pasarelas.component';


@NgModule({
  declarations: [
    AdministradorComponent,
    LoginComponent,
    AdminHomeComponent,
    TitleComponent,
    SolicitudEnEspecieComponent,
    DetalleComponent,
    ComprobantesYPasarelasComponent,
    ArticulosDeDonacionComponent,
    DetalleComprobantesComponent,
    TestimoniosComponent,
    PerfilDelPacienteComponent,
    BajoCuidadoComponent,
    AdopcionesComponent,
    PasarelasComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
})
export class AdministradorModule { }
