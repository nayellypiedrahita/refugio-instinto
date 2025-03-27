import { Component, Input, OnInit } from '@angular/core';
import { Mascotas } from '../../../shared/model/mascotas';

@Component({
  selector: 'app-listado-mascotas',
  templateUrl: './listado-mascotas.component.html',
  styleUrl: './listado-mascotas.component.css'
})
export class ListadoMascotasComponent {

  @Input({ required: true })
  mascotas: Mascotas[] = [];

  @Input({ required: true })
  loading: boolean = false;

}
