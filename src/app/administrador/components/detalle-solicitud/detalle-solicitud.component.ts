import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-detalle-solicitud',
  templateUrl: './detalle-solicitud.component.html',
  styleUrl: './detalle-solicitud.component.css'
})
export class DetalleSolicitudComponent {

  @Input({ required: true})
  datosAgrupados: { fecha: string; tipo: string; items: any[] }[] = [];

 @Output()
clickedItem: EventEmitter<any> = new EventEmitter();

emitirEvento(item: any) {
  this.clickedItem.emit(item);
}

}
