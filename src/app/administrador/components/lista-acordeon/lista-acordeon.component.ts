import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DonacionMonetaria } from '../../../shared/model/donacion-monetaria';

@Component({
  selector: 'app-lista-acordeon',
  templateUrl: './lista-acordeon.component.html',
  styleUrls: ['./lista-acordeon.component.css']
})
export class ListaAcordeonComponent {
  @Input() datosAgrupados: any[] = [];
  @Output() clickedItem = new EventEmitter<any>();

  emitirEvento(valor: any) {
    this.clickedItem.emit(valor);
  }
}
