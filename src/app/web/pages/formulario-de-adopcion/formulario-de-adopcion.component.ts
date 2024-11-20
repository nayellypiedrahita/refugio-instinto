import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-de-adopcion',
  templateUrl: './formulario-de-adopcion.component.html',
  styleUrl: './formulario-de-adopcion.component.css'
})
export class FormularioDeAdopcionComponent implements OnInit {

  idMascota: string | null = null;

  constructor(
    private routerParams: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.idMascota = this.routerParams.snapshot.paramMap.get('idMascota');
  }

  solicitudAdopcion() {
    this.router.navigate(["/web/solicitud-enviada"]);
  }

}
