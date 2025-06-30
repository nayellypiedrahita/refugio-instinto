import { Component } from '@angular/core';
import { SolicitudAdopcion } from '../../../shared/model/solicitud-adopcion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {

  detalle: any;
  parentComponent: string = "";

  constructor(
    private route: Router
  ) {}

  ngOnInit(): void {
    this.detalle = localStorage.getItem("detalle");
    const getTipo = JSON.parse(this.detalle) as { tipo: string; objeto: any };
    this.parentComponent = getTipo.tipo;
  }

  redirectToParent() {
    switch(this.parentComponent) {
      case "solicitud-adopcion":
        this.route.navigate(["/admin/solicitudes-adopcion"]);
        break;
      case "solicitud-voluntariado":
        this.route.navigate(["/admin/solicitudes-voluntariado"]);
        break;
      case "solicitud-apadrinamiento":
        this.route.navigate(["/admin/solicitud-apadrinamiento"]);
        break;
      case "solicitud-especie":
        this.route.navigate(["/admin/solicitud-en-especie"]);
        break;
    }
  }

}

 

