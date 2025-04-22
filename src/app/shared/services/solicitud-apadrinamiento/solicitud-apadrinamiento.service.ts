import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore } from '@angular/fire/firestore';
import { SolicitudApadrinamiento } from '../../model/solicitud-apadrinamiento';

@Injectable({
  providedIn: 'root'
})
export class SolicitudApadrinamientoService {


   private firestore: Firestore = inject(Firestore);
  private solicitudApadrinamientoCollection: CollectionReference;

  constructor() { 
    this.solicitudApadrinamientoCollection = collection(this.firestore, 'solicitudes-apadrinamiento');
  }

    addSolicitudapadrinamiento(solicitud : SolicitudApadrinamiento) {
      return addDoc(this.solicitudApadrinamientoCollection, solicitud);
    }
}
