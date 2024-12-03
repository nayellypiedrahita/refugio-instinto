import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebComponent } from './web.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { DonacionesComponent } from './pages/donaciones/donaciones.component';
import { AdoptaUnPeluditoComponent } from './pages/adopta-un-peludito/adopta-un-peludito.component';
import { VoluntariadoComponent } from './pages/voluntariado/voluntariado.component';
import { DonacionesEspecieComponent } from './pages/donaciones-especie/donaciones-especie.component';
import { TestimoniosDePeluditosComponent } from './pages/testimonios-de-peluditos/testimonios-de-peluditos.component';
import { DonacionesMonetariasComponent } from './pages/donaciones-monetarias/donaciones-monetarias.component';
import { TextoApadrinarComponent } from './pages/texto-apadrinar/texto-apadrinar.component';
import { ApadrinaUnPeluditoComponent } from './pages/apadrina-un-peludito/apadrina-un-peludito.component';
import { FormularioDeAdopcionComponent } from './pages/formulario-de-adopcion/formulario-de-adopcion.component';
import { FormularioDeDonacionesComponent } from './pages/formulario-de-donaciones/formulario-de-donaciones.component';
import { InformacionDePeluditosEnAdopcionComponent } from './pages/informacion-de-peluditos-en-adopcion/informacion-de-peluditos-en-adopcion.component';
import { TuImagenHaSidoEnviadaComponent } from './pages/tu-imagen-ha-sido-enviada/tu-imagen-ha-sido-enviada.component';
import { SolicitudEnviadaComponent } from './pages/solicitud-enviada/solicitud-enviada.component';
import { FormularioDeApadrinamientoComponent } from './pages/formulario-de-apadrinamiento/formulario-de-apadrinamiento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormularioPacienteMascotasComponent } from './pages/formulario-paciente-mascotas/formulario-paciente-mascotas.component';


@NgModule({
  declarations: [
    WebComponent,
    HomeComponent,
    FooterComponent,
    NosotrosComponent,
    DonacionesComponent,
    AdoptaUnPeluditoComponent,
    VoluntariadoComponent,
    DonacionesEspecieComponent,
    TestimoniosDePeluditosComponent,
    DonacionesMonetariasComponent,
    TextoApadrinarComponent,
    ApadrinaUnPeluditoComponent,
    FormularioDeAdopcionComponent,
    FormularioDeDonacionesComponent,
    InformacionDePeluditosEnAdopcionComponent,
    TuImagenHaSidoEnviadaComponent,
    SolicitudEnviadaComponent,
    FormularioDeApadrinamientoComponent,
    FormularioPacienteMascotasComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    WebComponent
  ]
})
export class WebModule { }
