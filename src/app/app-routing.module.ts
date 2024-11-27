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
import { AdminHomeComponent } from './administrador/pages/admin-home/admin-home.component';
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
      { path: 'formulario-de-apadrinamiento', component: FormularioDeApadrinamientoComponent }
    ]
  },
  { path: "login", component: LoginComponent },
  {
    path: "admin", component: AdministradorComponent, children: [
      { path: "home", component: AdminHomeComponent }
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: '/web/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
