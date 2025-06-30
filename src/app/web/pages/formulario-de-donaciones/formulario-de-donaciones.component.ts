import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudDonaciones } from '../../../shared/model/solicitud-donaciones';
import { SolicitudDonacionService } from '../../../shared/services/solicitud-donacion/solicitud-donacion.service';

@Component({
  selector: 'app-formulario-de-donaciones',
  templateUrl: './formulario-de-donaciones.component.html',
  styleUrl: './formulario-de-donaciones.component.css'
})
export class FormularioDeDonacionesComponent {

  donacionForm: FormGroup = new FormGroup({
    nombreCompleto: new FormControl("", [Validators.required,Validators.minLength(3),Validators.maxLength(50), Validators.pattern('[a-zA-Z ]{5,50}')]),
    numeroCelular: new FormControl("", [Validators.required, Validators.pattern("^[0-9]{7,15}$")]),
    alimentoGatos: new FormControl(""),
    alimentoPerros: new FormControl(""),
    peine: new FormControl(""),
    medicamentos: new FormControl(""),
    camas: new FormControl(""),
    arena: new FormControl(""),
    collares: new FormControl(""),
    limpieza: new FormControl(""),
    jaulas: new FormControl(""),
    otro: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z ]{5,50}')]),
  });
  loadingForm: boolean = false;
  private solicitudDonacionService: SolicitudDonacionService = inject(SolicitudDonacionService);

  constructor(
    private router: Router
  ){

  }

  toSolicitudEnviada(){
    if (!this.donacionForm.invalid){
      this.loadingForm = true;
      const nombreCompleto = this.donacionForm.controls['nombreCompleto'].value;
      const numeroCelular = this.donacionForm.controls['numeroCelular'].value;
      const alimentoGatos = this.donacionForm.controls['alimentoGatos'].value; 
      const alimentoPerros = this.donacionForm.controls['alimentoPerros'].value;
      const peine = this.donacionForm.controls['peine'].value;
      const medicamentos = this.donacionForm.controls['medicamentos'].value;
      const camas = this.donacionForm.controls['camas'].value;
      const arena = this.donacionForm.controls['arena'].value;
      const collares = this.donacionForm.controls['collares'].value;
      const jaulas = this.donacionForm.controls['jaulas'].value;
      const otro = this.donacionForm.controls['otro'].value;

      const articulos: string[] = [];
      if (alimentoGatos) {
        articulos.push('Alimento para gatos');
      }
      if (alimentoPerros) {
        articulos.push('Alimento para perros');
      }
      if (peine) {
        articulos.push('Peine o cepillo');
      }
      if (medicamentos) {
        articulos.push('Medicamentos veterinarios');
      }
      if (camas) {
        articulos.push('Camas y mantas');
      }
      if (arena) {
        articulos.push('Arena para gatos');
      }
      if (collares) {
        articulos.push('Collares y correas');
      }
      if (jaulas) {
        articulos.push('Jaulas y transportadoras');
      } 
      
      if (articulos.length == 0 && (otro == null || otro == "")) {
        // Mostrar error para que seleccione como minimo un articulo
        alert("Debes seleccionar al menos 1 articulo o especificar otro.");
        this.loadingForm = false;
        return;
      }

      const solicitudDonaciones: SolicitudDonaciones = {
  nombreCompleto,
  numeroCelular,
  articulos,
  otro,
  fecha: new Date().toISOString().slice(0, 10)
};


      this.solicitudDonacionService.addSolicitudDonacion(solicitudDonaciones).then(response => {
        if(response) {
          this.router.navigate(["/web/solicitud-enviada"]);
        }
        this.loadingForm = false;
      });
    }
  }

}
