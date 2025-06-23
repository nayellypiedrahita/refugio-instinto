import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lista-acordeon',
  templateUrl: './lista-acordeon.component.html',
  styleUrl: './lista-acordeon.component.css'
})
export class ListaAcordeonComponent {


  @Input({ required: true})
  datosAgrupados: { fecha: string; tipo: string; items: any[] }[] = [];

  @Output()
  clickedItem: EventEmitter<string> = new EventEmitter();

  emitirEvento(param: string) {
    this.clickedItem.emit(param);
  }

}
