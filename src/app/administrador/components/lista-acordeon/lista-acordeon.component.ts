import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SolicitudAdopcion } from '../../../shared/model/solicitud-adopcion';

@Component({
  selector: 'app-lista-acordeon',
  templateUrl: './lista-acordeon.component.html',
  styleUrl: './lista-acordeon.component.css'
})
export class ListaAcordeonComponent {


  @Input({ required: true})
  datosAgrupados: { fecha: string; tipo: string; items: any[] }[] = [];

 @Output()
clickedItem: EventEmitter<SolicitudAdopcion> = new EventEmitter();

emitirEvento(item: SolicitudAdopcion) {
  this.clickedItem.emit(item);
}


}
