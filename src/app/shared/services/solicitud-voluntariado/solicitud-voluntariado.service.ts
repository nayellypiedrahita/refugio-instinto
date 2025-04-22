import { inject, Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore } from '@angular/fire/firestore';
import { SolicitudVoluntariado } from '../../model/solicitud-voluntariado';

@Injectable({
  providedIn: 'root'
})
export class SolicitudVoluntariadoService {

  private firestore: Firestore = inject(Firestore);
  private solicitudVoluntariadoCollection: CollectionReference;

  constructor() {
    this.solicitudVoluntariadoCollection = collection(this.firestore, 'solicitudes-voluntariado');
  }

  addSolicitudVoluntariado(solicitud: SolicitudVoluntariado) {
    return addDoc(this.solicitudVoluntariadoCollection, solicitud);
  }

}
