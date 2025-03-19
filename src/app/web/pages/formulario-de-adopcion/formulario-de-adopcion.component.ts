import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Departamento } from '../../model/departamento';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SolicitudAdopcion } from '../../../shared/model/solicitud-adopcion';
import { SolicitudAdopcionService } from '../../../shared/services/solicitud-adopcion/solicitud-adopcion.service';
import { DepartamentoService } from '../../services/departamento/departamento.service';

@Component({
  selector: 'app-formulario-de-adopcion',
  templateUrl: './formulario-de-adopcion.component.html',
  styleUrl: './formulario-de-adopcion.component.css'
})
export class FormularioDeAdopcionComponent implements OnInit {

  idMascota: string | null = null;
  departamentos: Departamento[] = [];
  adopcionForm: FormGroup = new FormGroup({
    nombre: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z ]{3,50}')]),
    tipoDocumento: new FormControl('ninguno', [Validators.required, this.emptySelect()]),
    numeroDocumento: new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$")]),
    correo: new FormControl("", [Validators.required, Validators.email]),
    celular: new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$")]),
    ciudad: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z ]{3,50}')]),
    departamento: new FormControl('ninguno', [Validators.required, this.emptySelect()]),
  });
  loadingForm: boolean = false;

  private departamentoService: DepartamentoService = inject(DepartamentoService);
  private solicitudAdopcionService: SolicitudAdopcionService = inject(SolicitudAdopcionService);

  constructor(
    private routerParams: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.idMascota = this.routerParams.snapshot.paramMap.get('idMascota');
    this.departamentoService.getAllDepartamentos().then(response => {
      this.departamentos = response;
    })
  }

  solicitudAdopcion() {
    if (!this.adopcionForm.invalid) {
      this.loadingForm = true;
      const nombre = this.adopcionForm.controls['nombre'].value;
      const tipoDocumento = this.adopcionForm.controls['tipoDocumento'].value;
      const numeroDocumento = this.adopcionForm.controls['numeroDocumento'].value;
      const correo = this.adopcionForm.controls['correo'].value;
      const celular = this.adopcionForm.controls['celular'].value;
      const ciudad = this.adopcionForm.controls['ciudad'].value;
      const departamento = this.adopcionForm.controls['departamento'].value;
      
      const solicitudAdopcion: SolicitudAdopcion = {
        nombre,
        tipoDocumento,
        numeroDocumento,
        correo,
        celular,
        ciudad,
        departamento,
        mascota: this.idMascota as string
      };

      this.solicitudAdopcionService.addSolicitudAdopcion(solicitudAdopcion).then(response => {
        if (response) {
          this.router.navigate(["/web/solicitud-enviada"]);
          this.loadingForm = false;
        }
      });

    }
  }

  emptySelect(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      return value === 'ninguno' ? { required: true } : null;
    }
  }

}
