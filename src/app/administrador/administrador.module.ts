import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { AdministradorComponent } from './administrador.component';
import { AppRoutingModule } from '../app-routing.module';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from './components/title/title.component';
import { TestimoniosAdminComponent } from './pages/testimonios-admin/testimonios-admin.component';
import { ActualizarTestimoniosComponent } from './pages/actualizar-testimonios/actualizar-testimonios.component';
import { AceptarAgregarTestimonioComponent } from './pages/aceptar-agregar-testimonio/aceptar-agregar-testimonio.component';

@NgModule({
  declarations: [
    AdministradorComponent,
    LoginComponent,
    AdminHomeComponent,
    TitleComponent,
    TestimoniosAdminComponent,
    ActualizarTestimoniosComponent,
    AceptarAgregarTestimonioComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
})
export class AdministradorModule { }
