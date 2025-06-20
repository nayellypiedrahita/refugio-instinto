import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SolicitudApadrinamientoService } from '../../../shared/services/solicitud-apadrinamiento/solicitud-apadrinamiento.service';
import { SolicitudApadrinamiento } from '../../../shared/model/solicitud-apadrinamiento';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formulario-de-apadrinamiento',
  templateUrl: './formulario-de-apadrinamiento.component.html',
  styleUrl: './formulario-de-apadrinamiento.component.css'
})
export class FormularioDeApadrinamientoComponent {

   apadrinamientoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,50}')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    celular: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    notificacion: new FormControl(''),
  });
  loading: boolean = false;
  private solicitudApadrinamientoservice:SolicitudApadrinamientoService = inject(SolicitudApadrinamientoService);

 
 constructor(
    private router: Router
  ) {
  }
solicitudApadrinamiento(){
if (!this.apadrinamientoForm.invalid){
  this.loading = true;
  const nombre = this.apadrinamientoForm.controls['nombre'].value;
  const email = this.apadrinamientoForm.controls['email'].value;
  const celular = this.apadrinamientoForm.controls['celular'].value;
  const notificacion = this.apadrinamientoForm.controls['notificacion'].value;

  const solicitudApadrinamiento:SolicitudApadrinamiento = {
  nombre,
  email,
  celular,
  notificacion
  };

  this.solicitudApadrinamientoservice.addSolicitudapadrinamiento(solicitudApadrinamiento).then(response => {
    if (response) {
      this.router.navigate(["/web/solicitud-enviada"]);
      this.loading = false;
    }
  });

}


}


}
