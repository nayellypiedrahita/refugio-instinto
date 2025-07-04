import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AdministradorComponent } from './administrador.component';
import { AppRoutingModule } from '../app-routing.module';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { MascotaFormComponent } from './pages/mascota-form/mascota-form.component';
import { ListadoMascotasComponent } from './components/listado-mascotas/listado-mascotas.component';
import { VerTodasMascotasComponent } from './pages/ver-todas-mascotas/ver-todas-mascotas.component';
import { OlvidoSuContrasenaComponent } from './pages/olvido_su_contrasena/olvido_su_contrasena.component';
import { ActualizarContrasenaComponent } from './pages/actualizar_contrasena/actualizar_contrasena.component';
import { ListaAcordeonComponent } from './components/lista-acordeon/lista-acordeon.component';
import { SolicitudesVoluntariadoComponent } from './pages/solicitudes-voluntariado/solicitudes-voluntariado.component';
import { SolicitudApadrinamientoComponent } from './pages/solicitud-apadrinamiento/solicitud-apadrinamiento.component';
import { SolicitudAdopcionComponent } from './pages/solicitud-adopcion/solicitud-adopcion.component';
import { DetalleSolicitudComponent } from './components/detalle-solicitud/detalle-solicitud.component';
import { AddTestimonioComponent } from './pages/add-testimonio/add-testimonio.component';
import { EnviadoTestimonioComponent } from './pages/enviado-testimonio/enviado-testimonio.component';
import { ContratoAdopcionComponent } from './pages/contrato-adopcion/contrato-adopcion.component';

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
    PasarelasComponent,
    MascotaFormComponent,
    ListadoMascotasComponent,
    VerTodasMascotasComponent,
    ListaAcordeonComponent,
    SolicitudesVoluntariadoComponent,
    SolicitudApadrinamientoComponent,
    SolicitudAdopcionComponent,
    OlvidoSuContrasenaComponent,
    ActualizarContrasenaComponent,
    DetalleSolicitudComponent,
    AddTestimonioComponent,
    EnviadoTestimonioComponent,
    ContratoAdopcionComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class AdministradorModule { }
