import { Component } from '@angular/core';
import { SolicitudAdopcion } from '../../../shared/model/solicitud-adopcion';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent {

  detalle: any;

  ngOnInit(): void {
    this.detalle = localStorage.getItem("detalle");
  }

}

 

