import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DonacionMonetaria } from '../../../shared/model/donacion-monetaria';

@Component({
  selector: 'app-lista-acordeon',
  templateUrl: './lista-acordeon.component.html',
  styleUrls: ['./lista-acordeon.component.css']
})
export class ListaAcordeonComponent implements OnInit {
  @Input() datosAgrupados: any[] = [];
  @Output() clickedItem = new EventEmitter<any>();

  ngOnInit(): void {
  }

  emitirEvento(valor: any) {
    this.clickedItem.emit(valor);
  }

  countNewByDate(items: any) {
    return items.filter((item: any) => item?.isNew).length;
  }
}
