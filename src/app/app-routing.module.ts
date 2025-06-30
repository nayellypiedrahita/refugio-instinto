import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './web/pages/home/home.component';
import { WebComponent } from './web/web.component';
import { NosotrosComponent } from './web/pages/nosotros/nosotros.component';
import { DonacionesComponent } from './web/pages/donaciones/donaciones.component';
import { AdoptaUnPeluditoComponent } from './web/pages/adopta-un-peludito/adopta-un-peludito.component';
import { VoluntariadoComponent } from './web/pages/voluntariado/voluntariado.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { LoginComponent } from './administrador/pages/login/login.component';
import { DonacionesEspecieComponent } from './web/pages/donaciones-especie/donaciones-especie.component';
import { TestimoniosDePeluditosComponent } from './web/pages/testimonios-de-peluditos/testimonios-de-peluditos.component';
import { DonacionesMonetariasComponent } from './web/pages/donaciones-monetarias/donaciones-monetarias.component';
import { TextoApadrinarComponent } from './web/pages/texto-apadrinar/texto-apadrinar.component';
import { ApadrinaUnPeluditoComponent } from './web/pages/apadrina-un-peludito/apadrina-un-peludito.component';
import { FormularioDeAdopcionComponent } from './web/pages/formulario-de-adopcion/formulario-de-adopcion.component';
import { FormularioDeDonacionesComponent } from './web/pages/formulario-de-donaciones/formulario-de-donaciones.component';
import { InformacionDePeluditosEnAdopcionComponent } from './web/pages/informacion-de-peluditos-en-adopcion/informacion-de-peluditos-en-adopcion.component';
import { TuImagenHaSidoEnviadaComponent } from './web/pages/tu-imagen-ha-sido-enviada/tu-imagen-ha-sido-enviada.component';
import { SolicitudEnviadaComponent } from './web/pages/solicitud-enviada/solicitud-enviada.component';
import { FormularioDeApadrinamientoComponent } from './web/pages/formulario-de-apadrinamiento/formulario-de-apadrinamiento.component';
import { PerfilDelPacienteComponent } from './administrador/pages/perfil-del-paciente/perfil-del-paciente.component';
import { AdminHomeComponent } from './administrador/pages/admin-home/admin-home.component';
import { FormularioPacienteMascotasComponent } from './web/pages/formulario-paciente-mascotas/formulario-paciente-mascotas.component';
import { BajoCuidadoComponent } from './administrador/pages/bajo-cuidado/bajo-cuidado.component';
import { AdopcionesComponent } from './administrador/pages/adopciones/adopciones.component';
import { ComprobanteDonacionComponent } from './web/pages/comprobante-donacion/comprobante-donacion.component';
import { AuthGuard } from './administrador/guards/auth.guard';
import { PasswordResetGuard } from './administrador/guards/password-reset.guard';
import { SolicitudEnEspecieComponent } from './administrador/pages/solicitud-en-especie/solicitud-en-especie.component';
import { ArticulosDeDonacionComponent } from './administrador/pages/articulos-de-donacion/articulos-de-donacion.component';
import { DetalleComponent } from './administrador/pages/detalle/detalle.component';
import { ComprobantesYPasarelasComponent } from './administrador/pages/comprobantes-y-pasarelas/comprobantes-y-pasarelas.component';
import { DetalleComprobantesComponent } from './administrador/pages/detalle-comprobantes/detalle-comprobantes.component';
import { TestimoniosComponent } from './administrador/pages/testimonios/testimonios.component';
import { PasarelasComponent } from './administrador/pages/pasarelas/pasarelas.component';
import { MascotaFormComponent } from './administrador/pages/mascota-form/mascota-form.component';
import { VerTodasMascotasComponent } from './administrador/pages/ver-todas-mascotas/ver-todas-mascotas.component';
import { SolicitudesVoluntariadoComponent } from './administrador/pages/solicitudes-voluntariado/solicitudes-voluntariado.component';
import { SolicitudApadrinamientoComponent } from './administrador/pages/solicitud-apadrinamiento/solicitud-apadrinamiento.component';
import { SolicitudAdopcionComponent } from './administrador/pages/solicitud-adopcion/solicitud-adopcion.component';
import { OlvidoSuContrasenaComponent } from './administrador/pages/olvido_su_contrasena/olvido_su_contrasena.component';
import { ActualizarContrasenaComponent } from './administrador/pages/actualizar_contrasena/actualizar_contrasena.component';
import { AddTestimonioComponent } from './administrador/pages/add-testimonio/add-testimonio.component';
import { ContratoAdopcionComponent } from './administrador/pages/contrato-adopcion/contrato-adopcion.component';


const routes: Routes = [
  { 
    path: 'web', component: WebComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'nosotros', component: NosotrosComponent },
      { path: 'donaciones', component: DonacionesComponent },
      { path: 'adopta-un-peludito', component: AdoptaUnPeluditoComponent },
      { path: 'voluntariado', component: VoluntariadoComponent },
      { path: 'donaciones-especie', component: DonacionesEspecieComponent },
      { path: 'testimonios-de-peluditos', component: TestimoniosDePeluditosComponent },
      { path: 'donaciones-monetarias', component: DonacionesMonetariasComponent },
      { path: 'texto-apadrinar', component: TextoApadrinarComponent },
      { path: 'apadrina-un-peludito', component: ApadrinaUnPeluditoComponent },
      { path: 'formulario-de-adopcion/:idMascota', component: FormularioDeAdopcionComponent },
      { path: 'formulario-de-donaciones', component: FormularioDeDonacionesComponent },
      { path: 'informacion-de-peluditos-en-adopcion/:idMascota', component: InformacionDePeluditosEnAdopcionComponent },
      { path: 'tu-imagen-ha-sido-enviada', component: TuImagenHaSidoEnviadaComponent },
      { path: 'solicitud-enviada', component: SolicitudEnviadaComponent },
      { path: 'formulario-de-apadrinamiento', component: FormularioDeApadrinamientoComponent },
      { path: "formulario-paciente-mascotas", component: FormularioPacienteMascotasComponent},
      { path: 'comprobante-donacion', component: ComprobanteDonacionComponent },
      { path: '**', pathMatch: 'full', redirectTo: '/web/home' }
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "olvido-contrasena", component: OlvidoSuContrasenaComponent },
  { 
    path: "actualizar-contrasena/:id", 
    component: ActualizarContrasenaComponent,
    canActivate: [PasswordResetGuard]
  },
  {
    path: "admin", component: AdministradorComponent, canActivateChild: [ AuthGuard ], children: [
      { path: "home", component: AdminHomeComponent },
      { path: "solicitud-en-especie", component: SolicitudEnEspecieComponent }, 
      { path: "articulos-de-donacion", component: ArticulosDeDonacionComponent },  
      { path: "comprobantes-y-pasarelas", component: ComprobantesYPasarelasComponent },  
      { path: "detalles", component: DetalleComponent },    
      { path: "detalle-Comprobantes", component:DetalleComprobantesComponent,},
      { path: "testimonios", component:TestimoniosComponent,},   
      { path: "perfil-del-paciente", component: PerfilDelPacienteComponent},
      { path: "bajo-cuidado", component: BajoCuidadoComponent},
      { path: "pasarelas", component: PasarelasComponent},
      { path: "adopciones", component: AdopcionesComponent},
      { path: "add-mascota", component: MascotaFormComponent},
      { path: "ver-todas-mascotas", component: VerTodasMascotasComponent},
      { path: "solicitudes-voluntariado", component: SolicitudesVoluntariadoComponent},
      { path: "solicitud-apadrinamiento", component: SolicitudApadrinamientoComponent},
      { path: "solicitudes-adopcion", component: SolicitudAdopcionComponent},
      { path: "agregar-testimonio",  component: AddTestimonioComponent },
      { path: "contrato-adopcion",  component: ContratoAdopcionComponent },
      { path: '**', pathMatch: 'full', redirectTo: '/admin/home' }
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: '/web/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
