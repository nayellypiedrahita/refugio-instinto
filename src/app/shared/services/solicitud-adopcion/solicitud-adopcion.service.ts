import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore } from '@angular/fire/firestore';
import { SolicitudAdopcion } from '../../model/solicitud-adopcion';

@Injectable({
  providedIn: 'root'
})
export class SolicitudAdopcionService {

  private firetsore: Firestore = inject(Firestore);
  private solicitudAdopcionCollection: CollectionReference;

  constructor() {
    this.solicitudAdopcionCollection = collection(this.firetsore, 'solicitudes-adopcion');
  }

  addSolicitudAdopcion(solicitudAdopcion: SolicitudAdopcion) {
    return addDoc(this.solicitudAdopcionCollection, solicitudAdopcion);
  }


}
